import { and, eq, gt, inArray, isNull, or } from "drizzle-orm";
import { getDb } from "@/db/postgres";
import { donations } from "@/db/schema";
import {
  createPayment,
  isValidDonationAmount,
  LyPayError,
  MAX_ACTIVE_PENDING_ORDERS,
  MAX_DONATION_AMOUNT,
  MAX_DONOR_NAME_LENGTH,
  MIN_DONATION_AMOUNT,
  normalizeDonationMessage,
  normalizeDonorName,
} from "@/lib/lypay";
import {
  buildSessionCookie,
  ensureSessionId,
  getClientIp,
  isSecureRequest,
} from "@/lib/session";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);

  return false;
}

function json(body: unknown, status: number, setCookie?: string | null) {
  return Response.json(body, {
    status,
    headers: setCookie ? { "Set-Cookie": setCookie } : undefined,
  });
}

/**
 * Menghitung pembayaran yang masih aktif (belum final dan belum kedaluwarsa)
 * untuk sesi/IP ini. Order kedaluwarsa tidak dihitung supaya orang tidak
 * terkunci selamanya oleh order lama yang tidak pernah dibayar.
 */
async function countActivePendingOrders(
  sessionId: string,
  clientIp: string,
): Promise<number> {
  const db = getDb();

  const identityMatch =
    clientIp && clientIp !== "unknown"
      ? or(eq(donations.sessionId, sessionId), eq(donations.clientIp, clientIp))
      : eq(donations.sessionId, sessionId);

  const rows = await db
    .select({ id: donations.id })
    .from(donations)
    .where(
      and(
        inArray(donations.status, ["CREATED", "PENDING"]),
        or(isNull(donations.expiresAt), gt(donations.expiresAt, new Date())),
        identityMatch,
      ),
    )
    .limit(MAX_ACTIVE_PENDING_ORDERS);

  return rows.length;
}

export async function POST(request: Request) {
  // Identitas anti-abuse: session cookie (persisten antar reload) + IP.
  // Cookie baru dikirim balik lewat Set-Cookie di setiap response di bawah.
  const { sessionId, isNew } = ensureSessionId(request);
  const clientIp = getClientIp(request);
  const setCookie = isNew
    ? buildSessionCookie(sessionId, isSecureRequest(request))
    : null;

  if (isRateLimited(clientIp)) {
    return json(
      { error: "Terlalu banyak permintaan. Coba lagi sebentar." },
      429,
      setCookie,
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json(
      { error: "Body request harus berupa JSON yang valid." },
      400,
      setCookie,
    );
  }

  const body = (payload ?? {}) as Record<string, unknown>;

  const donorName = normalizeDonorName(body.donorName);
  const message = normalizeDonationMessage(body.message);
  const amount = body.amount;

  if (!donorName) {
    return json(
      {
        error: `Nama harus diisi antara 2 sampai ${MAX_DONOR_NAME_LENGTH} karakter.`,
      },
      400,
      setCookie,
    );
  }

  if (
    body.message !== undefined &&
    body.message !== null &&
    body.message !== "" &&
    message === null
  ) {
    return json({ error: "Format pesan tidak valid." }, 400, setCookie);
  }

  if (!isValidDonationAmount(amount)) {
    return json(
      {
        error: `Nominal harus bilangan bulat antara Rp ${MIN_DONATION_AMOUNT.toLocaleString("id-ID")} sampai Rp ${MAX_DONATION_AMOUNT.toLocaleString("id-ID")}.`,
      },
      400,
      setCookie,
    );
  }

  // Batas order pending: cegah satu sesi/IP menumpuk pembayaran yang tidak
  // diselesaikan. Gagal cek (mis. DB sempat down) dianggap lolos supaya donasi
  // sah tidak ikut terblokir; rate limiter di atas tetap jadi pengaman.
  try {
    const activePending = await countActivePendingOrders(sessionId, clientIp);

    if (activePending >= MAX_ACTIVE_PENDING_ORDERS) {
      return json(
        {
          error: `Kamu masih punya ${activePending} pembayaran yang belum diselesaikan. Selesaikan atau tunggu kedaluwarsa dulu sebelum membuat donasi baru.`,
          code: "PENDING_LIMIT",
          maxActive: MAX_ACTIVE_PENDING_ORDERS,
        },
        429,
        setCookie,
      );
    }
  } catch (error) {
    console.error("Gagal memeriksa batas pembayaran pending:", error);
  }

  const externalReference = `donate-${crypto.randomUUID()}`;

  let payment;

  try {
    payment = await createPayment({
      amount: amount as number,
      description: `Donasi dari ${donorName}`,
      externalReference,
      idempotencyKey: externalReference,
      metadata: {
        source: "portfolio-web",
        donorName,
      },
    });
  } catch (error) {
    if (error instanceof LyPayError) {
      return json({ error: error.message }, error.status, setCookie);
    }

    console.error("Gagal membuat pembayaran LYDEV Pay:", error);

    return json(
      { error: "Gagal membuat pembayaran. Coba lagi sebentar lagi." },
      503,
      setCookie,
    );
  }

  try {
    const db = getDb();

    await db.insert(donations).values({
      orderId: payment.orderId,
      donorName,
      message,
      amount: payment.amount,
      fee: payment.fee,
      providerAmount: payment.providerAmount,
      status: payment.status === "PAID" ? "PAID" : "PENDING",
      sessionId,
      clientIp,
      expiresAt: payment.expiresAt ? new Date(payment.expiresAt) : null,
      paidAt: payment.paidAt ? new Date(payment.paidAt) : null,
    });
  } catch (error) {
    // Pembayaran tetap valid di sisi LYDEV Pay, jadi QRIS tetap bisa dibayar.
    // Kegagalan di sini hanya membuat order tidak muncul di leaderboard.
    console.error("Gagal menyimpan donasi ke database:", error);
  }

  return json(
    {
      orderId: payment.orderId,
      status: payment.status,
      amount: payment.amount,
      fee: payment.fee,
      providerAmount: payment.providerAmount,
      checkoutUrl: payment.checkoutUrl,
      expiresAt: payment.expiresAt,
    },
    201,
    setCookie,
  );
}

export async function GET() {
  return json({ error: "Method not allowed" }, 405);
}

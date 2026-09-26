import { getDb } from "@/db/postgres";
import { donations } from "@/db/schema";
import {
  createPayment,
  isValidDonationAmount,
  LyPayError,
  MAX_DONATION_AMOUNT,
  MAX_DONOR_NAME_LENGTH,
  MIN_DONATION_AMOUNT,
  normalizeDonationMessage,
  normalizeDonorName,
} from "@/lib/lypay";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const requestLog = new Map<string, number[]>();

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

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

function json(body: unknown, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return json(
      { error: "Terlalu banyak permintaan. Coba lagi sebentar." },
      429,
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json({ error: "Body request harus berupa JSON yang valid." }, 400);
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
    );
  }

  if (
    body.message !== undefined &&
    body.message !== null &&
    body.message !== "" &&
    message === null
  ) {
    return json({ error: "Format pesan tidak valid." }, 400);
  }

  if (!isValidDonationAmount(amount)) {
    return json(
      {
        error: `Nominal harus bilangan bulat antara Rp ${MIN_DONATION_AMOUNT.toLocaleString("id-ID")} sampai Rp ${MAX_DONATION_AMOUNT.toLocaleString("id-ID")}.`,
      },
      400,
    );
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
      return json({ error: error.message }, error.status);
    }

    console.error("Gagal membuat pembayaran LYDEV Pay:", error);

    return json(
      { error: "Gagal membuat pembayaran. Coba lagi sebentar lagi." },
      503,
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
  );
}

export async function GET() {
  return json({ error: "Method not allowed" }, 405);
}

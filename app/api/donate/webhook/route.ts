import { eq } from "drizzle-orm";
import { getDb } from "@/db/postgres";
import { donationStatuses, donations, webhookDeliveries } from "@/db/schema";
import { type LyPayStatus, verifyWebhookSignature } from "@/lib/lypay";

const knownDonationStatuses = new Set<string>(donationStatuses);

function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  // Signature dihitung dari raw body, jadi body harus dibaca apa adanya
  // sebelum di-parse ulang.
  const rawBody = await request.text();

  let signatureValid: boolean;

  try {
    signatureValid = verifyWebhookSignature({
      rawBody,
      timestamp: request.headers.get("x-lydev-timestamp"),
      signature: request.headers.get("x-lydev-signature"),
    });
  } catch (error) {
    console.error("Verifikasi webhook LYDEV Pay gagal dijalankan:", error);
    return json({ error: "Webhook secret belum dikonfigurasi." }, 500);
  }

  if (!signatureValid) {
    return json({ error: "invalid signature" }, 401);
  }

  let event: {
    event?: string;
    deliveryId?: string;
    data?: {
      orderId?: string;
      status?: string;
      amount?: number;
      fee?: number | null;
      providerAmount?: number | null;
      paidAt?: string | null;
    };
  };

  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ error: "Payload webhook bukan JSON yang valid." }, 400);
  }

  const deliveryId = event.deliveryId;
  const eventName = event.event;
  const data = event.data;
  const orderId = data?.orderId;
  const status = data?.status as LyPayStatus | undefined;

  if (!deliveryId || !eventName || !orderId || !status) {
    return json({ error: "Payload webhook tidak lengkap." }, 400);
  }

  if (!knownDonationStatuses.has(status)) {
    return json({ error: "Status pembayaran tidak dikenal." }, 400);
  }

  let db;

  try {
    db = getDb();
  } catch (error) {
    console.error("Database tidak tersedia saat menerima webhook:", error);
    return json({ error: "Database tidak tersedia." }, 503);
  }

  // Pengiriman bersifat at-least-once, jadi delivery yang sama harus diabaikan
  // agar satu pembayaran tidak terhitung berkali-kali di leaderboard.
  const inserted = await db
    .insert(webhookDeliveries)
    .values({ deliveryId, event: eventName, orderId })
    .onConflictDoNothing()
    .returning({ deliveryId: webhookDeliveries.deliveryId });

  if (inserted.length === 0) {
    return json({ ok: true, duplicate: true });
  }

  const updated = await db
    .update(donations)
    .set({
      status,
      ...(data.amount !== undefined ? { amount: data.amount } : {}),
      ...(data.fee !== undefined ? { fee: data.fee } : {}),
      ...(data.providerAmount !== undefined
        ? { providerAmount: data.providerAmount }
        : {}),
      // paidAt hanya diisi saat lunas dan tidak pernah dikosongkan lagi, supaya
      // jejak pembayaran tetap ada kalau order kemudian di-refund.
      ...(status === "PAID"
        ? { paidAt: data.paidAt ? new Date(data.paidAt) : new Date() }
        : {}),
    })
    .where(eq(donations.orderId, orderId))
    .returning({ orderId: donations.orderId });

  if (updated.length === 0) {
    // Balas 200 supaya LYDEV Pay tidak melakukan retry untuk order yang bukan
    // milik project ini.
    console.warn(`Webhook untuk order yang tidak dikenal: ${orderId}`);
    return json({ ok: true, unknownOrder: true });
  }

  return json({ ok: true });
}

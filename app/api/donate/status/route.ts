import { and, eq, ne } from "drizzle-orm";
import { getDb } from "@/db/postgres";
import { donationStatuses, donations, type DonationStatus } from "@/db/schema";
import { getPayment, LyPayError, type LyPayStatus } from "@/lib/lypay";

const finalStatuses = new Set<string>([
  "PAID",
  "FAILED",
  "EXPIRED",
  "CANCELLED",
  "REFUNDED",
]);

function json(body: unknown, status: number) {
  return Response.json(body, {
    status,
    // Endpoint polling: jangan pernah disimpan di cache browser/CDN.
    headers: { "Cache-Control": "no-store" },
  });
}

/**
 * Webhook adalah sumber utama perubahan status, tapi pengirimannya bisa telat
 * atau gagal. Polling ini jadi jaring pengaman: begitu LYDEV Pay melaporkan
 * status final, database kita ikut disamakan supaya leaderboard tidak
 * ketinggalan. Operasinya idempoten, jadi aman dipanggil berulang.
 */
async function reconcileDonation(
  orderId: string,
  status: LyPayStatus,
  paidAt: string | null,
) {
  const db = getDb();

  await db
    .update(donations)
    .set({
      status: status as DonationStatus,
      ...(status === "PAID"
        ? { paidAt: paidAt ? new Date(paidAt) : new Date() }
        : {}),
    })
    .where(and(eq(donations.orderId, orderId), ne(donations.status, status)));
}

export async function GET(request: Request) {
  const orderId = new URL(request.url).searchParams.get("order");

  if (!orderId) {
    return json({ error: "Parameter order wajib diisi." }, 400);
  }

  if (!/^LY-[0-9A-HJKMNP-TV-Z]{26}$/.test(orderId)) {
    return json({ error: "Format orderId tidak valid." }, 400);
  }

  try {
    const payment = await getPayment(orderId);

    const shouldReconcile =
      finalStatuses.has(payment.status) &&
      donationStatuses.includes(payment.status as DonationStatus);

    if (shouldReconcile) {
      try {
        await reconcileDonation(payment.orderId, payment.status, payment.paidAt);
      } catch (error) {
        // Status tetap dilaporkan ke klien walau rekonsiliasi gagal, karena
        // webhook masih bisa menyusul.
        console.error("Gagal merekonsiliasi status donasi:", error);
      }
    }

    return json(
      {
        orderId: payment.orderId,
        status: payment.status,
        amount: payment.amount,
        fee: payment.fee,
        providerAmount: payment.providerAmount,
        paidAt: payment.paidAt,
        expiresAt: payment.expiresAt,
      },
      200,
    );
  } catch (error) {
    if (error instanceof LyPayError) {
      if (error.status === 404) {
        return json({ error: "Pembayaran tidak ditemukan." }, 404);
      }

      return json({ error: error.message }, error.status);
    }

    console.error("Gagal memeriksa status pembayaran:", error);

    return json(
      { error: "Gagal memeriksa status. Coba lagi sebentar lagi." },
      503,
    );
  }
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PRESET_AMOUNTS = [10_000, 25_000, 50_000, 100_000];

const MAX_DONOR_NAME_LENGTH = 50;
const MAX_DONATION_MESSAGE_LENGTH = 140;

const POLL_INTERVAL_MS = 5_000;

const FINAL_STATUSES = new Set([
  "PAID",
  "FAILED",
  "EXPIRED",
  "CANCELLED",
  "REFUNDED",
]);

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

type CreatedDonation = {
  orderId: string;
  status: string;
  amount: number;
  fee: number | null;
  providerAmount: number | null;
  checkoutUrl: string;
  expiresAt: string | null;
};

type DonationFormProps = {
  minimumAmount: number;
  maximumAmount: number;
};

export function DonateForm({
  minimumAmount,
  maximumAmount,
}: DonationFormProps) {
  const router = useRouter();
  const [donorName, setDonorName] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    PRESET_AMOUNTS[1],
  );
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [donation, setDonation] = useState<CreatedDonation | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [paymentTabBlocked, setPaymentTabBlocked] = useState(false);

  const hasCustomAmount = customAmount.trim() !== "";
  const activeAmount = hasCustomAmount
    ? Number.parseInt(customAmount, 10)
    : selectedAmount;

  const amountError =
    activeAmount === null || Number.isNaN(activeAmount)
      ? "Pilih nominal donasi dulu."
      : activeAmount < minimumAmount || activeAmount > maximumAmount
        ? `Nominal harus antara ${rupiahFormatter.format(minimumAmount)} dan ${rupiahFormatter.format(maximumAmount)}.`
        : null;

  const canSubmit =
    donorName.trim().length >= 2 && !amountError && !isSubmitting;

  useEffect(() => {
    if (!donation || FINAL_STATUSES.has(status ?? "")) {
      return;
    }

    let cancelled = false;

    const poll = async () => {
      try {
        const response = await fetch(
          `/api/donate/status?order=${encodeURIComponent(donation.orderId)}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { status?: string };

        if (cancelled || !payload.status) {
          return;
        }

        setStatus(payload.status);

        if (payload.status === "PAID") {
          router.refresh();
        }
      } catch {
        // Polling dilanjutkan pada tick berikutnya bila jaringan bermasalah.
      }
    };

    const interval = window.setInterval(poll, POLL_INTERVAL_MS);
    void poll();

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [donation, status, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (amountError) {
      setErrorMessage(amountError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setStatus(null);
    setDonation(null);
    setPaymentTabBlocked(false);

    // Tab dibuka di dalam gesture klik, sebelum await, supaya tidak diblokir
    // popup blocker. Location-nya diisi setelah checkoutUrl diterima.
    const paymentTab = window.open("about:blank", "_blank");

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName,
          amount: activeAmount,
          message: message || undefined,
        }),
      });

      const payload = (await response.json()) as Partial<CreatedDonation> & {
        error?: string;
      };

      if (!response.ok || !payload.checkoutUrl) {
        paymentTab?.close();
        setErrorMessage(
          typeof payload.error === "string"
            ? payload.error
            : "Gagal membuat pembayaran.",
        );
        return;
      }

      if (paymentTab) {
        paymentTab.opener = null;
        paymentTab.location.href = payload.checkoutUrl;
      } else {
        setPaymentTabBlocked(true);
      }

      setDonation(payload as CreatedDonation);
    } catch {
      paymentTab?.close();
      setErrorMessage("Gagal menghubungi server. Coba lagi sebentar lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setDonation(null);
    setStatus(null);
    setErrorMessage(null);
    setPaymentTabBlocked(false);
  }

  const isPaid = status === "PAID";

  return (
    <form className="donate-form" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="donate-label" htmlFor="donor-name">
          Nama donatur
        </label>
        <input
          id="donor-name"
          className="donate-input"
          type="text"
          value={donorName}
          onChange={(event) => setDonorName(event.target.value)}
          maxLength={MAX_DONOR_NAME_LENGTH}
          placeholder="Nama atau nickname kamu"
          autoComplete="nickname"
          disabled={isSubmitting}
          required
        />
        <p className="donate-hint">
          Muncul di leaderboard. Maksimal {MAX_DONOR_NAME_LENGTH} karakter.
        </p>
      </div>

      <fieldset disabled={isSubmitting}>
        <legend className="donate-label">Nominal donasi</legend>
        <div className="donate-amount-grid">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              className="donate-amount-option"
              aria-pressed={!hasCustomAmount && selectedAmount === preset}
              onClick={() => {
                setSelectedAmount(preset);
                setCustomAmount("");
              }}
            >
              {rupiahFormatter.format(preset)}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <label className="donate-hint" htmlFor="donor-custom-amount">
            Atau nominal lain
          </label>
          <input
            id="donor-custom-amount"
            className="donate-input mt-2"
            type="number"
            inputMode="numeric"
            min={minimumAmount}
            max={maximumAmount}
            step={1_000}
            value={customAmount}
            onChange={(event) => setCustomAmount(event.target.value)}
            placeholder={`Minimal ${minimumAmount.toLocaleString("id-ID")}`}
          />
        </div>

        {amountError ? (
          <p className="donate-error" role="alert">
            {amountError}
          </p>
        ) : null}
      </fieldset>

      <div>
        <label className="donate-label" htmlFor="donor-message">
          Pesan <span className="text-[var(--muted)]">(opsional)</span>
        </label>
        <input
          id="donor-message"
          className="donate-input"
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxLength={MAX_DONATION_MESSAGE_LENGTH}
          placeholder="Semangat terus belajarnya!"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        className="button button-primary w-full"
        disabled={!canSubmit}
      >
        {isSubmitting ? "Membuat pembayaran..." : "Konfirmasi donasi"}
        {isSubmitting ? null : <span aria-hidden="true">↗</span>}
      </button>

      {errorMessage ? (
        <p className="donate-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      {donation ? (
        <div className="donate-payment-panel" aria-live="polite">
          {isPaid ? (
            <div className="donate-success">
              <p className="eyebrow">Terima kasih</p>
              <p className="mt-3 text-lg font-semibold">
                Donasi {rupiahFormatter.format(donation.amount)} kamu sudah
                tercatat.
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Nama kamu sudah masuk ke leaderboard. Terima kasih sudah
                mendukung.
              </p>
            </div>
          ) : (
            <>
              <p className="donate-label">
                {paymentTabBlocked
                  ? "Halaman pembayaran siap dibuka"
                  : "Halaman pembayaran terbuka di tab baru"}
              </p>
              <p className="donate-hint mt-1">
                Bayar{" "}
                <span className="text-[var(--text)]">
                  {rupiahFormatter.format(
                    donation.providerAmount ?? donation.amount,
                  )}
                </span>
                {donation.fee
                  ? ` (termasuk biaya layanan ${rupiahFormatter.format(donation.fee)})`
                  : null}{" "}
                lewat QRIS di halaman LYDEV Pay.
                {paymentTabBlocked
                  ? " Browser memblokir tab otomatis, jadi buka lewat tombol di bawah."
                  : " Selesaikan pembayaran di tab itu; halaman ini otomatis mendeteksi begitu lunas."}
              </p>

              <a
                href={donation.checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="button button-primary w-full"
                aria-label="Buka halaman pembayaran LYDEV Pay di tab baru"
              >
                Buka halaman pembayaran <span aria-hidden="true">↗</span>
              </a>

              <p className="donate-hint">
                Status:{" "}
                <span className="text-[var(--text)]">
                  {status ?? donation.status}
                </span>
                {status === "PENDING" ? " — menunggu pembayaran." : null}
              </p>

              <button
                type="button"
                onClick={resetForm}
                className="donate-hint mt-1 underline underline-offset-4 transition hover:text-[var(--text)]"
              >
                Donasi lagi
              </button>
            </>
          )}
        </div>
      ) : null}
    </form>
  );
}

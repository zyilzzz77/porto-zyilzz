"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  clearActiveDonation,
  isFinalDonationStatus,
  setActiveDonation,
  updateActiveDonationStatus,
  useActiveDonation,
} from "@/components/donate/active-donation";
import {
  DonatePaymentModal,
  type PaymentPhase,
} from "@/components/donate/donate-payment-modal";

const PRESET_AMOUNTS = [10_000, 25_000, 50_000, 100_000];

const MAX_DONOR_NAME_LENGTH = 50;
const MAX_DONATION_MESSAGE_LENGTH = 140;

const POLL_INTERVAL_MS = 5_000;

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

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
  const [paymentTabBlocked, setPaymentTabBlocked] = useState(false);
  const [isModalDismissed, setIsModalDismissed] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Order aktif hidup di external store (localStorage) supaya popup bisa
  // dipulihkan setelah reload tanpa setState di dalam effect.
  const donation = useActiveDonation();
  const status = donation?.status ?? null;

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
    if (!donation || isFinalDonationStatus(donation.status)) {
      return;
    }

    let cancelled = false;
    const orderId = donation.orderId;

    const poll = async () => {
      try {
        const response = await fetch(
          `/api/donate/status?order=${encodeURIComponent(orderId)}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { status?: string };

        if (cancelled || !payload.status) {
          return;
        }

        updateActiveDonationStatus(orderId, payload.status);

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
  }, [donation, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (amountError) {
      setErrorMessage(amountError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setNotice(null);
    setPaymentTabBlocked(false);
    setIsModalDismissed(false);

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

      const payload = (await response.json()) as {
        orderId?: string;
        status?: string;
        amount?: number;
        fee?: number | null;
        providerAmount?: number | null;
        checkoutUrl?: string;
        expiresAt?: string | null;
        error?: string;
        code?: string;
      };

      if (!response.ok) {
        const serverMessage =
          typeof payload.error === "string"
            ? payload.error
            : "Gagal membuat pembayaran.";

        setErrorMessage(serverMessage);

        // Batas order pending tercapai: tampilkan lagi order yang belum
        // diselesaikan supaya user bisa langsung melunasinya.
        if (payload.code === "PENDING_LIMIT") {
          setNotice(serverMessage);
          setIsModalDismissed(false);
        }

        return;
      }

      if (
        !payload.orderId ||
        !payload.checkoutUrl ||
        typeof payload.amount !== "number"
      ) {
        setErrorMessage("Gagal membuat pembayaran.");
        return;
      }

      // Popup "memproses" sudah tampil saat menunggu response. Tab checkout
      // baru dibuka di sini, begitu link pembayarannya tersedia.
      const paymentTab = window.open(payload.checkoutUrl, "_blank");

      if (paymentTab) {
        paymentTab.opener = null;
      } else {
        // Diblokir popup blocker: modal menyediakan tombol buka manual.
        setPaymentTabBlocked(true);
      }

      setActiveDonation({
        orderId: payload.orderId,
        status: payload.status ?? "PENDING",
        amount: payload.amount,
        fee: payload.fee ?? null,
        providerAmount: payload.providerAmount ?? null,
        checkoutUrl: payload.checkoutUrl,
        expiresAt: payload.expiresAt ?? null,
      });
    } catch {
      setErrorMessage("Gagal menghubungi server. Coba lagi sebentar lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    clearActiveDonation();
    setErrorMessage(null);
    setNotice(null);
    setPaymentTabBlocked(false);
    setIsModalDismissed(false);
  }

  const isPaid = status === "PAID";

  const phase: PaymentPhase | null = isSubmitting
    ? "processing"
    : donation
      ? isPaid
        ? "paid"
        : "pending"
      : null;

  const showModal = phase !== null && !isModalDismissed;

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
        <label className="donate-label" htmlFor="donate-message">
          Pesan <span className="text-[var(--muted)]">(opsional)</span>
        </label>
        <input
          id="donate-message"
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

      {donation && isModalDismissed ? (
        <div className="donate-payment-panel" aria-live="polite">
          {isPaid ? (
            <div className="donate-success">
              <p className="eyebrow">Terima kasih</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Donasi {rupiahFormatter.format(donation.amount)} kamu sudah
                tercatat.
              </p>
            </div>
          ) : (
            <>
              <p className="donate-label">Pembayaran sedang diproses</p>
              <p className="donate-hint mt-1">
                Status:{" "}
                <span className="text-[var(--text)]">
                  {status ?? donation.status}
                </span>
              </p>
              <button
                type="button"
                className="button button-primary w-full"
                onClick={() => setIsModalDismissed(false)}
              >
                Lihat pembayaran
              </button>
            </>
          )}
        </div>
      ) : null}

      {showModal && phase ? (
        <DonatePaymentModal
          phase={phase}
          donation={donation}
          status={status}
          paymentTabBlocked={paymentTabBlocked}
          notice={notice}
          onClose={() => setIsModalDismissed(true)}
          onDonateAgain={resetForm}
        />
      ) : null}
    </form>
  );
}

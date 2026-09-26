"use client";

import { useEffect, useRef } from "react";
import type { ActiveDonation } from "@/components/donate/active-donation";

export type PaymentPhase = "processing" | "pending" | "paid";

type DonatePaymentModalProps = {
  phase: PaymentPhase;
  donation: ActiveDonation | null;
  status: string | null;
  paymentTabBlocked: boolean;
  notice?: string | null;
  onClose: () => void;
  onDonateAgain: () => void;
};

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function DonatePaymentModal({
  phase,
  donation,
  status,
  paymentTabBlocked,
  notice,
  onClose,
  onDonateAgain,
}: DonatePaymentModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Kunci scroll badan + tutup lewat Escape (kecuali saat masih memproses).
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && phase !== "processing") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [phase, onClose]);

  const payableAmount = donation
    ? rupiahFormatter.format(donation.providerAmount ?? donation.amount)
    : null;

  return (
    <div className="donate-modal-backdrop" onClick={phase === "processing" ? undefined : onClose}>
      <div
        className="donate-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-payment-title"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        {phase === "processing" ? (
          <div className="donate-modal-body donate-modal-centered">
            <span className="donate-spinner" aria-hidden="true" />
            <h2 id="donate-payment-title" className="donate-modal-title">
              Memproses pembayaran...
            </h2>
            <p className="donate-modal-text">
              Menyiapkan halaman pembayaran QRIS. Jangan tutup halaman ini.
            </p>
          </div>
        ) : null}

        {phase === "pending" && donation ? (
          <div className="donate-modal-body">
            <span className="donate-modal-badge" aria-hidden="true">
              <span className="donate-spinner donate-spinner-sm" />
            </span>
            <h2 id="donate-payment-title" className="donate-modal-title">
              Pembayaran sedang diproses
            </h2>
            <p className="donate-modal-text">
              Selesaikan pembayaran{" "}
              <span className="donate-modal-amount">{payableAmount}</span>
              {donation.fee
                ? ` (termasuk biaya layanan ${rupiahFormatter.format(donation.fee)})`
                : null}{" "}
              lewat QRIS di halaman LYDEV Pay. Halaman ini otomatis mendeteksi
              begitu pembayaran lunas.
            </p>

            {notice ? (
              <p className="donate-modal-notice" role="status">
                {notice}
              </p>
            ) : null}

            {donation.checkoutUrl ? (
              <a
                href={donation.checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="button button-primary w-full"
                aria-label="Buka halaman pembayaran LYDEV Pay di tab baru"
              >
                {paymentTabBlocked ? "Buka" : "Buka lagi"} halaman pembayaran{" "}
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}

            {paymentTabBlocked ? (
              <p className="donate-hint">
                Browser memblokir tab otomatis, jadi buka lewat tombol di atas.
              </p>
            ) : null}

            <p className="donate-modal-status" aria-live="polite">
              Status:{" "}
              <span className="donate-modal-amount">
                {status ?? "PENDING"}
              </span>
              {(status ?? "PENDING") === "PENDING"
                ? " — menunggu pembayaran."
                : null}
            </p>

            <button
              type="button"
              className="donate-modal-close"
              onClick={onClose}
            >
              Tutup
            </button>
          </div>
        ) : null}

        {phase === "paid" && donation ? (
          <div className="donate-modal-body donate-modal-centered">
            <span className="donate-modal-badge donate-modal-badge-success" aria-hidden="true">
              ✓
            </span>
            <h2 id="donate-payment-title" className="donate-modal-title">
              Terima kasih
            </h2>
            <p className="donate-modal-text">
              Donasi{" "}
              <span className="donate-modal-amount">
                {rupiahFormatter.format(donation.amount)}
              </span>{" "}
              kamu sudah tercatat dan masuk ke leaderboard. Terima kasih sudah
              mendukung.
            </p>
            <button
              type="button"
              className="button button-primary w-full"
              onClick={onDonateAgain}
            >
              Donasi lagi
            </button>
            <button
              type="button"
              className="donate-modal-close"
              onClick={onClose}
            >
              Tutup
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

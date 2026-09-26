"use client";

import { useSyncExternalStore } from "react";

export type ActiveDonation = {
  orderId: string;
  status: string;
  amount: number;
  fee: number | null;
  providerAmount: number | null;
  checkoutUrl: string;
  expiresAt: string | null;
};

export const FINAL_DONATION_STATUSES = new Set([
  "PAID",
  "FAILED",
  "EXPIRED",
  "CANCELLED",
  "REFUNDED",
]);

export function isFinalDonationStatus(status: string | null | undefined) {
  return FINAL_DONATION_STATUSES.has(status ?? "");
}

/**
 * Order terakhir yang masih berjalan disimpan di localStorage supaya popup
 * "pembayaran sedang diproses" bisa dipulihkan setelah reload. Ini hanya
 * kenyamanan UI; batas anti-abuse yang sebenarnya ditegakkan di server lewat
 * session cookie + IP.
 */
const STORAGE_KEY = "porto_active_donation";

// Nilai yang dipakai UI (snapshot) hidup di memori; localStorage hanya untuk
// memulihkan order yang belum lunas saat halaman dimuat ulang.
let memoryDonation: ActiveDonation | null = null;
let initialized = false;

const listeners = new Set<() => void>();

function readStoredDonation(): ActiveDonation | null {
  if (typeof window === "undefined") {
    return null;
  }

  let raw: string | null;

  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as ActiveDonation;

    if (!parsed || typeof parsed.orderId !== "string") {
      return null;
    }

    // Order final (termasuk PAID) dan yang kedaluwarsa tidak dipulihkan.
    if (isFinalDonationStatus(parsed.status)) {
      return null;
    }

    if (parsed.expiresAt) {
      const expiresAt = new Date(parsed.expiresAt).getTime();

      if (Number.isFinite(expiresAt) && expiresAt <= Date.now()) {
        return null;
      }
    }

    return parsed;
  } catch {
    return null;
  }
}

function persist(donation: ActiveDonation | null) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (donation) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(donation));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage bisa diblokir (mode privat); pemulihan lintas-reload dilewati.
  }
}

// Snapshot harus stabil antar render; nilai di memori hanya berubah lewat
// mutator di bawah, jadi referensinya aman dikembalikan apa adanya.
function getSnapshot(): ActiveDonation | null {
  if (!initialized) {
    initialized = true;
    memoryDonation = readStoredDonation();
  }

  return memoryDonation;
}

function getServerSnapshot(): ActiveDonation | null {
  return null;
}

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function setActiveDonation(donation: ActiveDonation) {
  initialized = true;
  memoryDonation = donation;
  persist(donation);
  notify();
}

export function updateActiveDonationStatus(orderId: string, status: string) {
  const current = getSnapshot();

  if (!current || current.orderId !== orderId || current.status === status) {
    return;
  }

  if (status === "PAID") {
    // Tahan status lunas di memori supaya popup "terima kasih" tampil, tapi
    // jangan disimpan agar tidak muncul lagi setelah reload.
    memoryDonation = { ...current, status: "PAID" };
    persist(null);
    notify();
    return;
  }

  if (isFinalDonationStatus(status)) {
    memoryDonation = null;
    persist(null);
    notify();
    return;
  }

  memoryDonation = { ...current, status };
  persist(memoryDonation);
  notify();
}

export function clearActiveDonation() {
  initialized = true;
  memoryDonation = null;
  persist(null);
  notify();
}

export function useActiveDonation(): ActiveDonation | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

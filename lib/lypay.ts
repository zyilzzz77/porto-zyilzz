import crypto from "node:crypto";

const LYPAY_BASE_URL = "https://pay.lydev.id";

/**
 * Header identitas klien. Sebagian proteksi di depan LYDEV Pay menilai request
 * dari header ini, dan mengirimnya juga praktik yang baik untuk API server-to-server.
 */
const LYPAY_CLIENT_HEADERS = {
  Accept: "application/json",
  "User-Agent": "porto-zyilzz/1.0 (+https://me.lydev.id)",
};

export const MIN_DONATION_AMOUNT = 10_000;
export const MAX_DONATION_AMOUNT = 10_000_000;

/**
 * Jumlah pembayaran pending (CREATED/PENDING dan belum kedaluwarsa) yang boleh
 * dimiliki satu sesi/IP sekaligus. Lewat dari ini, order lama harus diselesaikan
 * atau kedaluwarsa dulu sebelum membuat yang baru — mencegah orang spam order.
 */
export const MAX_ACTIVE_PENDING_ORDERS = 2;

export const MAX_DONOR_NAME_LENGTH = 50;
export const MAX_DONATION_MESSAGE_LENGTH = 140;

export type LyPayStatus =
  | "CREATED"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "EXPIRED"
  | "CANCELLED"
  | "REFUNDED";

export type LyPayPayment = {
  orderId: string;
  status: LyPayStatus;
  amount: number;
  fee: number | null;
  providerAmount: number | null;
  currency: string;
  description: string | null;
  externalReference: string | null;
  expiresAt: string | null;
  paidAt: string | null;
  createdAt: string;
  checkoutUrl: string;
  qrUrl: string;
};

type CreatePaymentInput = {
  amount: number;
  description: string;
  externalReference: string;
  idempotencyKey: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export class LyPayError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "LyPayError";
    this.status = status;
  }
}

function getApiKey() {
  const apiKey = process.env.LYPAY_API_KEY;

  if (!apiKey) {
    throw new LyPayError(
      "LYPAY_API_KEY belum diatur di environment server.",
      500,
    );
  }

  return apiKey;
}

/**
 * Membaca pesan error LYDEV Pay. Body dibaca sebagai teks lebih dulu karena
 * kegagalan yang datang dari lapisan depan (misalnya WAF) tidak berbentuk JSON,
 * sehingga isinya tetap tercatat di log server untuk memudahkan penelusuran.
 */
async function readErrorMessage(response: Response, fallback: string) {
  let raw: string;

  try {
    raw = await response.text();
  } catch {
    return fallback;
  }

  if (!response.ok) {
    console.error(
      `LYDEV Pay membalas ${response.status} untuk ${response.url}: ${raw.slice(0, 300) || "(body kosong)"}`,
    );
  }

  try {
    const parsed = JSON.parse(raw) as { error?: unknown };

    if (typeof parsed?.error === "string" && parsed.error) {
      return parsed.error;
    }
  } catch {
    // Body bukan JSON, pakai pesan cadangan.
  }

  return fallback;
}

async function parsePaymentResponse(response: Response) {
  if (!response.ok) {
    const message = await readErrorMessage(
      response,
      `LYDEV Pay membalas ${response.status}.`,
    );

    throw new LyPayError(message, response.status);
  }

  return (await response.json()) as LyPayPayment;
}

export async function createPayment({
  amount,
  description,
  externalReference,
  idempotencyKey,
  metadata,
}: CreatePaymentInput) {
  const response = await fetch(`${LYPAY_BASE_URL}/api/v1/payments`, {
    method: "POST",
    headers: {
      ...LYPAY_CLIENT_HEADERS,
      Authorization: `Bearer ${getApiKey()}`,
      "Idempotency-Key": idempotencyKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "IDR",
      description,
      externalReference,
      ...(metadata ? { metadata } : {}),
    }),
  });

  return parsePaymentResponse(response);
}

export async function getPayment(orderId: string) {
  const response = await fetch(
    `${LYPAY_BASE_URL}/api/v1/payments/${encodeURIComponent(orderId)}`,
    {
      headers: {
        ...LYPAY_CLIENT_HEADERS,
        Authorization: `Bearer ${getApiKey()}`,
      },
      // Endpoint ini dipakai untuk polling status, jadi hasilnya tidak boleh
      // diambil dari cache Fetch.
      cache: "no-store",
    },
  );

  return parsePaymentResponse(response);
}

export function normalizeDonorName(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().replace(/\s+/g, " ");

  if (normalized.length < 2 || normalized.length > MAX_DONOR_NAME_LENGTH) {
    return null;
  }

  return normalized;
}

export function normalizeDonationMessage(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().replace(/\s+/g, " ");

  if (!normalized) {
    return null;
  }

  return normalized.slice(0, MAX_DONATION_MESSAGE_LENGTH);
}

export function isValidDonationAmount(value: unknown) {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return false;
  }

  return value >= MIN_DONATION_AMOUNT && value <= MAX_DONATION_AMOUNT;
}

const WEBHOOK_TOLERANCE_SECONDS = 5 * 60;

export function verifyWebhookSignature({
  rawBody,
  timestamp,
  signature,
}: {
  rawBody: string;
  timestamp: string | null;
  signature: string | null;
}) {
  const webhookSecret = process.env.LYDEV_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error(
      "LYDEV_WEBHOOK_SECRET belum diatur di environment server.",
    );
  }

  if (!timestamp || !signature) {
    return false;
  }

  const sentAt = Number(timestamp);

  if (!Number.isFinite(sentAt)) {
    return false;
  }

  if (Math.abs(Date.now() / 1000 - sentAt) > WEBHOOK_TOLERANCE_SECONDS) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", webhookSecret)
    .update(`${timestamp}.${rawBody}`)
    .digest("base64url");

  const received = Buffer.from(signature);
  const computed = Buffer.from(`v1,${expected}`);

  if (received.length !== computed.length) {
    return false;
  }

  return crypto.timingSafeEqual(received, computed);
}

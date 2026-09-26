import crypto from "node:crypto";

const LYPAY_BASE_URL = "https://pay.lydev.id";

export const MIN_DONATION_AMOUNT = 10_000;
export const MAX_DONATION_AMOUNT = 10_000_000;

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

async function readErrorMessage(response: Response, fallback: string) {
  try {
    const body = (await response.json()) as { error?: unknown };

    if (typeof body?.error === "string" && body.error) {
      return body.error;
    }
  } catch {
    // LYDEV juga membalas body teks biasa untuk endpoint gambar QR.
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

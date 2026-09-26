const SESSION_COOKIE_NAME = "porto_sid";

/** Session anonim berlaku 30 hari, cukup panjang untuk mengejar order yang belum lunas. */
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

/** Hanya terima id berbentuk UUID supaya nilai cookie buatan klien tidak dipakai apa adanya. */
const SESSION_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function parseCookies(header: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};

  if (!header) {
    return cookies;
  }

  for (const part of header.split(";")) {
    const eq = part.indexOf("=");

    if (eq === -1) {
      continue;
    }

    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();

    if (!key) {
      continue;
    }

    try {
      cookies[key] = decodeURIComponent(value);
    } catch {
      cookies[key] = value;
    }
  }

  return cookies;
}

/**
 * Membaca session id dari cookie tanpa membuat yang baru. Dipakai endpoint yang
 * hanya perlu mengenali sesi yang sudah ada (mis. memuat order aktif).
 */
export function readSessionId(request: Request): string | null {
  const cookies = parseCookies(request.headers.get("cookie"));
  const value = cookies[SESSION_COOKIE_NAME];

  if (value && SESSION_ID_PATTERN.test(value)) {
    return value;
  }

  return null;
}

/**
 * Mengembalikan session id dari cookie, atau membuat yang baru bila belum ada.
 * `isNew` menandakan response perlu mengirim header Set-Cookie.
 */
export function ensureSessionId(request: Request): {
  sessionId: string;
  isNew: boolean;
} {
  const existing = readSessionId(request);

  if (existing) {
    return { sessionId: existing, isNew: false };
  }

  return { sessionId: crypto.randomUUID(), isNew: true };
}

/**
 * Menentukan apakah request datang lewat HTTPS. Cloudflare/Vercel meneruskan
 * skema asli lewat x-forwarded-proto; di local dev (http) cookie tidak boleh
 * dipaksa Secure supaya tetap tersimpan.
 */
export function isSecureRequest(request: Request): boolean {
  const forwardedProto = request.headers.get("x-forwarded-proto");

  if (forwardedProto) {
    return forwardedProto.split(",")[0].trim() === "https";
  }

  try {
    return new URL(request.url).protocol === "https:";
  } catch {
    return false;
  }
}

/** Membangun header Set-Cookie untuk session anonim. HttpOnly supaya tidak bisa dibaca/diubah JS klien. */
export function buildSessionCookie(sessionId: string, secure: boolean): string {
  const attributes = [
    `${SESSION_COOKIE_NAME}=${sessionId}`,
    "Path=/",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
    "HttpOnly",
    "SameSite=Lax",
  ];

  if (secure) {
    attributes.push("Secure");
  }

  return attributes.join("; ");
}

/**
 * Mengambil IP klien. CF-Connecting-IP (Cloudflare) paling dipercaya karena
 * selalu diisi satu IP asli; x-forwarded-for bisa berisi rantai proxy sehingga
 * diambil hop pertama.
 */
export function getClientIp(request: Request): string {
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  if (cfConnectingIp) {
    return cfConnectingIp.split(",")[0].trim() || "unknown";
  }

  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

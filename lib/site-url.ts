const LOCAL_SITE_URL = "http://localhost:3000";

function withProtocol(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return value.startsWith("localhost") ? `http://${value}` : `https://${value}`;
}

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    LOCAL_SITE_URL;

  try {
    return new URL(withProtocol(configuredUrl));
  } catch {
    return new URL(LOCAL_SITE_URL);
  }
}

export function absoluteUrl(pathname: string) {
  return new URL(pathname, getSiteUrl()).toString();
}

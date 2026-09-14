const LOCAL_SITE_URL = "http://localhost:3000";
const PRODUCTION_SITE_URL = "https://zyilzz.my.id";

function withProtocol(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return value.startsWith("localhost") ? `http://${value}` : `https://${value}`;
}

function getFallbackSiteUrl() {
  return process.env.NODE_ENV === "production"
    ? PRODUCTION_SITE_URL
    : LOCAL_SITE_URL;
}

function resolveSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    getFallbackSiteUrl();

  try {
    return new URL(withProtocol(configuredUrl));
  } catch {
    return new URL(getFallbackSiteUrl());
  }
}

export function getSiteUrl() {
  return resolveSiteUrl();
}

export function absoluteUrl(pathname: string) {
  return new URL(pathname, getSiteUrl()).toString();
}

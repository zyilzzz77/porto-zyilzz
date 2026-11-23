import { certificates, hardSkills, profile } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/site-url";

export function schemaIds() {
  const siteUrl = getSiteUrl();
  const siteRoot = siteUrl.toString().replace(/\/$/, "");

  return {
    siteUrl,
    siteRoot,
    personId: `${siteRoot}/#person`,
    websiteId: `${siteRoot}/#website`,
    profilePageId: `${siteRoot}/#profile-page`,
    schoolId: `${siteRoot}/experience/smkn-69-jakarta#school`,
  };
}

export function personJsonLd(): Record<string, unknown> {
  const { personId, profilePageId, schoolId, siteRoot } = schemaIds();
  const award = certificates.find((certificate) =>
    certificate.title.startsWith("Champion Award"),
  );
  const credentials = certificates.filter(
    (certificate) => certificate.verifyUrl,
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: profile.alternateNames,
    url: siteRoot,
    mainEntityOfPage: { "@id": profilePageId },
    image: {
      "@type": "ImageObject",
      url: "https://github.com/zyilzzz77.png?size=460",
      width: 460,
      height: 460,
      caption: "Foto profil Haqqi AnnaZili",
    },
    jobTitle: profile.role,
    description:
      "Haqqi AnnaZili adalah siswa SIJA di SMKN 69 Jakarta yang bergerak di IT support dan membangun produk web.",
    sameAs: [profile.github.url, profile.instagram.url],
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    affiliation: { "@id": schoolId },
    knowsLanguage: ["id"],
    knowsAbout: [...hardSkills, "Next.js", "React"],
    ...(award
      ? {
          award: {
            "@type": "Award",
            name: award.title,
            awardedBy: {
              "@type": "Organization",
              name: award.issuer.split(" · ")[0],
            },
          },
        }
      : {}),
    hasCredential: credentials.map((certificate) => ({
      "@type": "EducationalOccupationalCredential",
      "@id": `${siteRoot}/certificates#${certificate.slug}`,
      name: certificate.title,
      url: certificate.verifyUrl,
      credentialCategory: "certificate",
      recognizedBy: {
        "@type": "Organization",
        name: certificate.issuer.split(" · ")[0],
      },
    })),
  };
}

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: "Live" | "Building" | "Exploration" | "Temporarily Offline";
  tags: string[];
  image?: string;
  href?: string;
  availabilityNote?: string;
};

export type Experience = {
  period: string;
  title: string;
  organization: string;
  logo?: string;
  logoAlt?: string;
  href?: string;
  description: string;
  highlights: string[];
};

export type Certificate = {
  slug: string;
  title: string;
  issuer: string;
  issuedAt: string;
  credential?: string;
  category: "AI & Data" | "Cloud" | "Programming";
  image: string;
  file?: string;
  verifyUrl?: string;
};

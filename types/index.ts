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

export type CreativeCategory = "Photography" | "Editing";

export type CreativeImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Label opsional, misalnya "Original" dan "Hasil editing". */
  label?: string;
};

export type CreativeWork = {
  slug: string;
  title: string;
  category: CreativeCategory;
  description: string;
  year: string;
  location: string;
  role: string;
  images: CreativeImage[];
  /** Path gambar utama untuk kartu preview di halaman lain. */
  cover?: string;
  instagramUrl?: string;
  tools?: string[];
  /** true = slot contoh, belum ada file foto. Hilangkan setelah foto asli diisi. */
  placeholder?: boolean;
};

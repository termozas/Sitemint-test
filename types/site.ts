export interface SiteConfig {
  subdomain: string;
  name: string;
  description: string;
  owner?: {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
  } | null;
  theme?: {
    id?: string;
    primaryColor: string;
    secondaryColor: string;
  } | null;
  contact?: {
    id?: string;
    address?: string | null;
    city?: string | null;
    phone?: string | null;
    email?: string | null;
    workingHours?: string | null;
    areas?: string[] | null;
  } | null;
  hero?: {
    id?: string;
    mainTitle?: string | null;
    subtitle?: string | null;
    highlights?: string[] | null;
    ctaPrimary?: string | null;
    ctaSecondary?: string | null;
  } | null;
  services?: Array<{
    id?: string;
    title: string;
    description: string;
    price?: string | null;
  }> | null;
  socialMedia?: {
    id?: string;
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  } | null;
  id?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  githubRepoUrl?: string | null;
  vercelProjectUrl?: string | null;
}

export interface SiteDatabase {
  sites: {
    [key: string]: SiteConfig;
  };
}

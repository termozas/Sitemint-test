export interface Owner {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Theme {
  id: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface Contact {
  id: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  workingHours?: string;
  areas: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
}

export interface SocialMedia {
  id: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export interface Hero {
  id: string;
  mainTitle?: string;
  subtitle?: string;
  highlights: string[];
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export interface Site {
  id: string;
  subdomain: string;
  name: string;
  description: string;
  owner?: Owner;
  theme?: Theme;
  contact?: Contact;
  socialMedia?: SocialMedia;
  hero?: Hero;
  services: Service[];
  createdAt: Date;
  updatedAt: Date;
  githubRepoUrl?: string;
  vercelProjectUrl?: string;
}

interface SiteDatabase {
  sites: {
    [key: string]: Site | undefined;
  };
}

// Example siteDatabase structure.
// You'll need to populate this with actual site data.
export const siteDatabase: SiteDatabase = {
  sites: {
    // example: {
    //   id: "1",
    //   subdomain: "example",
    //   name: "Example Site",
    //   description: "This is an example site.",
    //   services: [],
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   highlights: [],
    //   areas: [],
    // },
  },
};

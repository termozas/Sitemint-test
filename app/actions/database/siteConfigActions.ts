"use server";

import { SiteConfig } from "@/types/site";
import { prisma } from "@/lib/prisma";

export async function saveSiteConfig(siteConfig: SiteConfig): Promise<void> {
  console.log("💾 Starting to save site configuration to database...");
  try {
    const {
      subdomain,
      name,
      description,
      owner,
      theme,
      contact,
      services,
      socialMedia,
      hero,
    } = siteConfig;

    const savedSite = await prisma.site.upsert({
      where: { subdomain },
      update: {
        name,
        description,
        owner: owner
          ? {
              upsert: {
                create: owner,
                update: owner,
              },
            }
          : undefined,
        theme: theme
          ? {
              upsert: {
                create: theme,
                update: theme,
              },
            }
          : undefined,
        contact: contact
          ? {
              upsert: {
                create: {
                  ...contact,
                  email: contact.email || "", // Provide default if optional and prisma expects string
                  areas: contact.areas || [],
                },
                update: {
                  ...contact,
                  email: contact.email || "", // Provide default
                  areas: contact.areas || [],
                },
              },
            }
          : undefined,
        services: services
          ? {
              deleteMany: {}, // Delete existing services first
              create: services.map((service) => ({
                // Now create new ones
                title: service.title,
                description: service.description,
                price: service.price ?? "N/A", // Provide default for potentially undefined price
              })),
            }
          : undefined,
        socialMedia: socialMedia
          ? {
              upsert: {
                create: socialMedia,
                update: socialMedia,
              },
            }
          : undefined,
        hero: hero
          ? {
              upsert: {
                create: {
                  ...hero,
                  highlights: hero.highlights || [],
                },
                update: {
                  ...hero,
                  highlights: hero.highlights || [],
                },
              },
            }
          : undefined,
      },
      create: {
        subdomain,
        name,
        description,
        owner: owner ? { create: owner } : undefined,
        theme: theme ? { create: theme } : undefined,
        contact: contact
          ? {
              create: {
                ...contact,
                email: contact.email || "",
                areas: contact.areas || [],
              },
            }
          : undefined,
        services: services
          ? {
              create: services.map((service) => ({
                title: service.title,
                description: service.description,
                price: service.price ?? "N/A", // Provide default for potentially undefined price
              })),
            }
          : undefined,
        socialMedia: socialMedia ? { create: socialMedia } : undefined,
        hero: hero
          ? { create: { ...hero, highlights: hero.highlights || [] } }
          : undefined,
      },
      include: {
        owner: true,
        theme: true,
        contact: true,
        services: true,
        socialMedia: true,
        hero: true,
      },
    });

    console.log("✅ Successfully saved site configuration to database:", {
      id: savedSite.id,
      subdomain: savedSite.subdomain,
      ownerId: savedSite.ownerId,
      themeId: savedSite.themeId,
      contactId: savedSite.contactId,
      socialMediaId: savedSite.socialMediaId,
      heroId: savedSite.heroId,
    });
  } catch (error) {
    console.error("❌ Error saving site configuration to database:", error);
    throw new Error("Failed to save site configuration to database");
  }
}

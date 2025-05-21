"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// Import Prisma namespace directly for error types, and other types as types
import {
  Prisma,
  type Site,
  type Owner,
  type Contact,
  type SocialMedia,
  type Hero,
} from "@/generated/prisma/client";

// Define interfaces for nested object inputs to ensure type safety
interface OwnerInput {
  name: string;
  email: string;
  phone?: string | null;
}

interface ContactInput {
  address?: string | null;
  city?: string | null;
  phone?: string | null;
  email?: string | null;
  workingHours?: string | null;
  areas?: string[]; // Prisma expects string[] for array fields
}

interface SocialMediaInput {
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
}

interface HeroInput {
  mainTitle?: string | null;
  subtitle?: string | null;
  highlights?: string[]; // Prisma expects string[]
  ctaPrimary?: string | null;
  ctaSecondary?: string | null;
}

export interface UpdateSiteDetailsPayload {
  name?: string;
  description?: string;
  subdomain?: string;
  githubRepoUrl?: string | null;
  vercelProjectUrl?: string | null;
  owner?: OwnerInput | null; // Payload can explicitly set to null to remove
  contact?: ContactInput | null;
  socialMedia?: SocialMediaInput | null;
  hero?: HeroInput | null;
}

// Fully typed Site for return, including relations
type SiteWithRelations = Site & {
  owner: Owner | null;
  contact: Contact | null;
  socialMedia: SocialMedia | null;
  hero: Hero | null;
  // services: Service[]; // services are not part of this update action for now
};

export async function updateSiteDetails(
  siteId: string,
  data: UpdateSiteDetailsPayload
): Promise<{
  success: boolean;
  message: string;
  site?: SiteWithRelations | null;
}> {
  try {
    const currentSite = await prisma.site.findUnique({
      where: { id: siteId },
      select: {
        ownerId: true,
        contactId: true,
        socialMediaId: true,
        heroId: true,
      },
    });

    if (!currentSite) {
      return { success: false, message: "Site not found.", site: null };
    }

    // Use Prisma.SiteUpdateInput for better type safety on updateData
    const updateData: Prisma.SiteUpdateInput = {};

    // Direct site fields
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.subdomain !== undefined) updateData.subdomain = data.subdomain;
    if (data.githubRepoUrl !== undefined)
      updateData.githubRepoUrl = data.githubRepoUrl;
    if (data.vercelProjectUrl !== undefined)
      updateData.vercelProjectUrl = data.vercelProjectUrl;

    // Handle owner relation
    if (data.owner === null) {
      // Explicit request to remove owner
      if (currentSite.ownerId) updateData.owner = { disconnect: true };
    } else if (data.owner) {
      // Upsert owner
      updateData.owner = {
        upsert: {
          create: data.owner as Prisma.OwnerCreateWithoutSiteInput,
          update: data.owner as Prisma.OwnerUpdateWithoutSiteInput,
        },
      };
    }
    // If data.owner is undefined, it's not included in updateData, Prisma won't touch it.

    // Handle contact relation
    if (data.contact === null) {
      if (currentSite.contactId) updateData.contact = { disconnect: true };
    } else if (data.contact) {
      updateData.contact = {
        upsert: {
          create: data.contact as Prisma.ContactCreateWithoutSiteInput,
          update: data.contact as Prisma.ContactUpdateWithoutSiteInput,
        },
      };
    }

    // Handle socialMedia relation
    if (data.socialMedia === null) {
      if (currentSite.socialMediaId)
        updateData.socialMedia = { disconnect: true };
    } else if (data.socialMedia) {
      updateData.socialMedia = {
        upsert: {
          create: data.socialMedia as Prisma.SocialMediaCreateWithoutSiteInput,
          update: data.socialMedia as Prisma.SocialMediaUpdateWithoutSiteInput,
        },
      };
    }

    // Handle hero relation
    if (data.hero === null) {
      if (currentSite.heroId) updateData.hero = { disconnect: true };
    } else if (data.hero) {
      updateData.hero = {
        upsert: {
          create: data.hero as Prisma.HeroCreateWithoutSiteInput,
          update: data.hero as Prisma.HeroUpdateWithoutSiteInput,
        },
      };
    }

    const updatedSite = await prisma.site.update({
      where: { id: siteId },
      data: updateData,
      include: {
        owner: true,
        contact: true,
        socialMedia: true,
        hero: true,
        // services: true, // services are not part of this update action for now
      },
    });

    revalidatePath(`/dashboard/projects/${siteId}`);
    revalidatePath(`/dashboard/projects`); // Also revalidate the list page for status changes etc.

    return {
      success: true,
      message: "Site details updated successfully!",
      site: updatedSite as SiteWithRelations, // Cast to ensure full type
    };
  } catch (error) {
    console.error("Error updating site details:", error);
    // Check if error is a PrismaKnownClientError for specific error codes
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        error.code === "P2002" &&
        (error.meta?.target as string[])?.includes("subdomain")
      ) {
        return {
          success: false,
          message:
            "This subdomain is already taken. Please choose another one.",
          site: null,
        };
      }
      return {
        success: false,
        message: `Prisma Error (${error.code}): ${error.message}`,
        site: null,
      };
    } else if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        site: null,
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred.",
      site: null,
    };
  }
}

export async function deleteSite(siteId: string): Promise<{
  success: boolean;
  message: string;
}> {
  console.log(`🗑️ Attempting to delete site with ID: ${siteId}`);
  try {
    // Fetch site details to get IDs of related one-to-one entities
    const site = await prisma.site.findUnique({
      where: { id: siteId },
      select: {
        ownerId: true,
        themeId: true,
        contactId: true,
        socialMediaId: true,
        heroId: true,
      },
    });

    if (!site) {
      console.warn(`⚠️ Site with ID ${siteId} not found for deletion.`);
      return { success: false, message: "Site not found." };
    }

    // Prisma transaction to ensure all or nothing deletion
    await prisma.$transaction(async (tx) => {
      console.log(`🧹 Starting cleanup for site ${siteId}...`);

      // Services are deleted by onDelete: Cascade in schema

      // Delete related one-to-one entities if they exist
      if (site.ownerId) {
        console.log(`   Deleting Owner: ${site.ownerId}`);
        await tx.owner.delete({ where: { id: site.ownerId } });
      }
      if (site.themeId) {
        console.log(`   Deleting Theme: ${site.themeId}`);
        await tx.theme.delete({ where: { id: site.themeId } });
      }
      if (site.contactId) {
        console.log(`   Deleting Contact: ${site.contactId}`);
        await tx.contact.delete({ where: { id: site.contactId } });
      }
      if (site.socialMediaId) {
        console.log(`   Deleting SocialMedia: ${site.socialMediaId}`);
        await tx.socialMedia.delete({ where: { id: site.socialMediaId } });
      }
      if (site.heroId) {
        console.log(`   Deleting Hero: ${site.heroId}`);
        await tx.hero.delete({ where: { id: site.heroId } });
      }

      // Finally, delete the site itself
      console.log(`🗑️ Deleting Site: ${siteId}`);
      await tx.site.delete({ where: { id: siteId } });

      console.log(
        `✅ Site ${siteId} and its related data deleted successfully.`
      );
    });

    revalidatePath("/dashboard/projects");
    console.log("🔄 Path /dashboard/projects revalidated.");

    return { success: true, message: "Site deleted successfully." };
  } catch (error) {
    console.error(`❌ Error deleting site ${siteId}:`, error);
    let errorMessage = "Failed to delete site.";
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      errorMessage = `Prisma Error (${error.code}): ${error.message}`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  IconGlobe,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconDeviceFloppy,
  IconX,
  IconPencil,
} from "@tabler/icons-react";
import Link from "next/link";
import {
  updateSiteDetails,
  type UpdateSiteDetailsPayload,
} from "@/app/actions/database/siteActions";
import { toast } from "sonner";
import type { SocialMedia } from "@/generated/prisma/client";

interface SocialMediaEditorProps {
  siteId: string;
  initialData: SocialMedia | null;
}

const defaultSocialMediaState = {
  facebook: "",
  instagram: "",
  linkedin: "",
};

export function SocialMediaEditor({
  siteId,
  initialData,
}: SocialMediaEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() =>
    initialData
      ? {
          facebook: initialData.facebook || "",
          instagram: initialData.instagram || "",
          linkedin: initialData.linkedin || "",
        }
      : { ...defaultSocialMediaState }
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData(
      initialData
        ? {
            facebook: initialData.facebook || "",
            instagram: initialData.instagram || "",
            linkedin: initialData.linkedin || "",
          }
        : { ...defaultSocialMediaState }
    );
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const payload: UpdateSiteDetailsPayload = {
      socialMedia: {
        facebook: formData.facebook || null,
        instagram: formData.instagram || null,
        linkedin: formData.linkedin || null,
      },
    };

    let effectivePayload = payload;
    if (
      !initialData &&
      !formData.facebook &&
      !formData.instagram &&
      !formData.linkedin
    ) {
      effectivePayload = { socialMedia: null };
    } else if (
      initialData &&
      !formData.facebook &&
      !formData.instagram &&
      !formData.linkedin
    ) {
      effectivePayload = { socialMedia: null };
    }

    const result = await updateSiteDetails(siteId, effectivePayload);
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message || "Social media links updated!");
      if (result.site?.socialMedia) {
        setFormData({
          facebook: result.site.socialMedia.facebook || "",
          instagram: result.site.socialMedia.instagram || "",
          linkedin: result.site.socialMedia.linkedin || "",
        });
      } else if (effectivePayload.socialMedia === null) {
        setFormData({ ...defaultSocialMediaState });
      }
      setIsEditing(false);
    } else {
      toast.error(result.message || "Failed to update social media links.");
    }
  };

  const handleCancel = () => {
    setFormData(
      initialData
        ? {
            facebook: initialData.facebook || "",
            instagram: initialData.instagram || "",
            linkedin: initialData.linkedin || "",
          }
        : { ...defaultSocialMediaState }
    );
    setIsEditing(false);
  };

  const hasSocialData =
    initialData || formData.facebook || formData.instagram || formData.linkedin;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <IconGlobe className="mr-2.5 size-5 text-muted-foreground" />
          <CardTitle className="text-lg">Social Media</CardTitle>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <IconPencil className="mr-1.5 size-4" />
            {initialData ? "Edit" : "Add Links"}
          </Button>
        )}
      </CardHeader>

      {(isEditing || hasSocialData) && (
        <CardContent className="space-y-3 pt-4">
          {isEditing ? (
            <>
              <div>
                <label
                  htmlFor="socialFacebook"
                  className="block text-sm font-medium text-foreground mb-1 flex items-center"
                >
                  <IconBrandFacebook className="mr-2 size-4 shrink-0 text-[#1877F2]" />{" "}
                  Facebook URL
                </label>
                <Input
                  id="socialFacebook"
                  name="facebook"
                  value={formData.facebook || ""}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <label
                  htmlFor="socialInstagram"
                  className="block text-sm font-medium text-foreground mb-1 flex items-center"
                >
                  <IconBrandInstagram className="mr-2 size-4 shrink-0 text-[#E4405F]" />{" "}
                  Instagram URL
                </label>
                <Input
                  id="socialInstagram"
                  name="instagram"
                  value={formData.instagram || ""}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
              <div>
                <label
                  htmlFor="socialLinkedin"
                  className="block text-sm font-medium text-foreground mb-1 flex items-center"
                >
                  <IconBrandLinkedin className="mr-2 size-4 shrink-0 text-[#0A66C2]" />{" "}
                  LinkedIn URL
                </label>
                <Input
                  id="socialLinkedin"
                  name="linkedin"
                  value={formData.linkedin || ""}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </>
          ) : initialData ? (
            <div className="space-y-2.5">
              {initialData.facebook && (
                <Link
                  href={initialData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  <IconBrandFacebook className="mr-2 size-4 shrink-0 text-[#1877F2]" />{" "}
                  Facebook
                </Link>
              )}
              {initialData.instagram && (
                <Link
                  href={initialData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  <IconBrandInstagram className="mr-2 size-4 shrink-0 text-[#E4405F]" />{" "}
                  Instagram
                </Link>
              )}
              {initialData.linkedin && (
                <Link
                  href={initialData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  <IconBrandLinkedin className="mr-2 size-4 shrink-0 text-[#0A66C2]" />{" "}
                  LinkedIn
                </Link>
              )}
              {!initialData.facebook &&
                !initialData.instagram &&
                !initialData.linkedin && (
                  <p className="text-sm text-muted-foreground italic">
                    No social media links provided.
                  </p>
                )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No social media links provided.
            </p>
          )}
        </CardContent>
      )}

      {isEditing && (
        <CardFooter className="justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            <IconX className="mr-1.5 size-4" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <IconDeviceFloppy className="mr-1.5 size-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

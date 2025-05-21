"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconStar,
  IconDeviceFloppy,
  IconX,
  IconPencil,
} from "@tabler/icons-react";
import {
  updateSiteDetails,
  type UpdateSiteDetailsPayload,
} from "@/app/actions/database/siteActions";
import { toast } from "sonner";
import type { Hero } from "@/generated/prisma/client";

interface HeroContentEditorProps {
  siteId: string;
  initialData: Hero | null;
}

const defaultHeroState = {
  mainTitle: "",
  subtitle: "",
  highlights: [] as string[],
  ctaPrimary: "",
  ctaSecondary: "",
};

export function HeroContentEditor({
  siteId,
  initialData,
}: HeroContentEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() =>
    initialData
      ? {
          mainTitle: initialData.mainTitle || "",
          subtitle: initialData.subtitle || "",
          highlights: initialData.highlights || [],
          ctaPrimary: initialData.ctaPrimary || "",
          ctaSecondary: initialData.ctaSecondary || "",
        }
      : { ...defaultHeroState }
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData(
      initialData
        ? {
            mainTitle: initialData.mainTitle || "",
            subtitle: initialData.subtitle || "",
            highlights: initialData.highlights || [],
            ctaPrimary: initialData.ctaPrimary || "",
            ctaSecondary: initialData.ctaSecondary || "",
          }
        : { ...defaultHeroState }
    );
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "highlights") {
      const highlightsArray = value
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h !== "");
      setFormData((prev) => ({ ...prev, [name]: highlightsArray }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const payload: UpdateSiteDetailsPayload = {
      hero: {
        mainTitle: formData.mainTitle || null,
        subtitle: formData.subtitle || null,
        highlights:
          formData.highlights && formData.highlights.length > 0
            ? formData.highlights
            : [],
        ctaPrimary: formData.ctaPrimary || null,
        ctaSecondary: formData.ctaSecondary || null,
      },
    };

    let effectivePayload = payload;
    if (
      !initialData &&
      !formData.mainTitle &&
      !formData.subtitle &&
      (!formData.highlights || formData.highlights.length === 0) &&
      !formData.ctaPrimary &&
      !formData.ctaSecondary
    ) {
      effectivePayload = { hero: null };
    } else if (
      initialData &&
      !formData.mainTitle &&
      !formData.subtitle &&
      (!formData.highlights || formData.highlights.length === 0) &&
      !formData.ctaPrimary &&
      !formData.ctaSecondary
    ) {
      effectivePayload = { hero: null };
    }

    const result = await updateSiteDetails(siteId, effectivePayload);
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message || "Hero content updated!");
      if (result.site?.hero) {
        setFormData({
          mainTitle: result.site.hero.mainTitle || "",
          subtitle: result.site.hero.subtitle || "",
          highlights: result.site.hero.highlights || [],
          ctaPrimary: result.site.hero.ctaPrimary || "",
          ctaSecondary: result.site.hero.ctaSecondary || "",
        });
      } else if (effectivePayload.hero === null) {
        setFormData({ ...defaultHeroState });
      }
      setIsEditing(false);
    } else {
      toast.error(result.message || "Failed to update hero content.");
    }
  };

  const handleCancel = () => {
    setFormData(
      initialData
        ? {
            mainTitle: initialData.mainTitle || "",
            subtitle: initialData.subtitle || "",
            highlights: initialData.highlights || [],
            ctaPrimary: initialData.ctaPrimary || "",
            ctaSecondary: initialData.ctaSecondary || "",
          }
        : { ...defaultHeroState }
    );
    setIsEditing(false);
  };

  const hasHeroData =
    initialData ||
    formData.mainTitle ||
    formData.subtitle ||
    (formData.highlights && formData.highlights.length > 0) ||
    formData.ctaPrimary ||
    formData.ctaSecondary;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <IconStar className="mr-2.5 size-5 text-muted-foreground" />
          <CardTitle className="text-lg">Hero Section</CardTitle>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <IconPencil className="mr-1.5 size-4" />
            {initialData ? "Edit" : "Add Hero Content"}
          </Button>
        )}
      </CardHeader>

      {(isEditing || hasHeroData) && (
        <CardContent className="space-y-4 pt-4">
          {isEditing ? (
            <>
              <div>
                <label
                  htmlFor="heroMainTitle"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Main Title
                </label>
                <Input
                  id="heroMainTitle"
                  name="mainTitle"
                  value={formData.mainTitle}
                  onChange={handleInputChange}
                  placeholder="Enter main hero title"
                />
              </div>
              <div>
                <label
                  htmlFor="heroSubtitle"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Subtitle
                </label>
                <Textarea
                  id="heroSubtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="Enter hero subtitle"
                  rows={2}
                />
              </div>
              <div>
                <label
                  htmlFor="heroHighlights"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Highlights (comma-separated)
                </label>
                <Textarea
                  id="heroHighlights"
                  name="highlights"
                  value={formData.highlights.join(", ")}
                  onChange={handleInputChange}
                  placeholder="e.g., Feature 1, Benefit 2, Unique Point 3"
                  rows={3}
                />
              </div>
              <div>
                <label
                  htmlFor="heroCtaPrimary"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Primary Call to Action
                </label>
                <Input
                  id="heroCtaPrimary"
                  name="ctaPrimary"
                  value={formData.ctaPrimary}
                  onChange={handleInputChange}
                  placeholder="e.g., Get Started"
                />
              </div>
              <div>
                <label
                  htmlFor="heroCtaSecondary"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Secondary Call to Action
                </label>
                <Input
                  id="heroCtaSecondary"
                  name="ctaSecondary"
                  value={formData.ctaSecondary}
                  onChange={handleInputChange}
                  placeholder="e.g., Learn More"
                />
              </div>
            </>
          ) : initialData ? (
            <>
              {initialData.mainTitle && (
                <h3 className="text-xl font-semibold text-foreground">
                  {initialData.mainTitle}
                </h3>
              )}
              {initialData.subtitle && (
                <p className="text-muted-foreground">{initialData.subtitle}</p>
              )}
              {initialData.highlights && initialData.highlights.length > 0 && (
                <div>
                  <h4 className="mb-1.5 text-xs font-medium uppercase text-muted-foreground">
                    Highlights
                  </h4>
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {initialData.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
              {(initialData.ctaPrimary || initialData.ctaSecondary) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {initialData.ctaPrimary && (
                    <Badge variant="default" className="px-3 py-1 text-sm">
                      {initialData.ctaPrimary}
                    </Badge>
                  )}
                  {initialData.ctaSecondary && (
                    <Badge variant="secondary" className="px-3 py-1 text-sm">
                      {initialData.ctaSecondary}
                    </Badge>
                  )}
                </div>
              )}
              {!initialData.mainTitle &&
                !initialData.subtitle &&
                (!initialData.highlights ||
                  initialData.highlights.length === 0) &&
                !initialData.ctaPrimary &&
                !initialData.ctaSecondary && (
                  <p className="text-sm text-muted-foreground italic">
                    No hero content provided.
                  </p>
                )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No hero content provided.
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

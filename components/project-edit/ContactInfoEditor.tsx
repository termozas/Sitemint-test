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
  IconBriefcase,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCalendarEvent,
  IconDeviceFloppy,
  IconX,
  IconPencil,
} from "@tabler/icons-react";
import {
  updateSiteDetails,
  type UpdateSiteDetailsPayload,
} from "@/app/actions/database/siteActions";
import { toast } from "sonner";
import type { Contact } from "@/generated/prisma/client";

interface ContactInfoEditorProps {
  siteId: string;
  initialData: Contact | null;
}

const defaultContactState = {
  address: "",
  city: "",
  phone: "",
  email: "",
  workingHours: "",
  areas: [] as string[], // Ensure areas is always string[]
};

export function ContactInfoEditor({
  siteId,
  initialData,
}: ContactInfoEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() =>
    initialData
      ? {
          ...initialData,
          areas: initialData.areas || [],
          phone: initialData.phone || "",
          email: initialData.email || "",
          address: initialData.address || "",
          city: initialData.city || "",
          workingHours: initialData.workingHours || "",
        }
      : { ...defaultContactState }
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData(
      initialData
        ? {
            ...initialData,
            areas: initialData.areas || [],
            phone: initialData.phone || "",
            email: initialData.email || "",
            address: initialData.address || "",
            city: initialData.city || "",
            workingHours: initialData.workingHours || "",
          }
        : { ...defaultContactState }
    );
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "areas") {
      // Split by comma, trim whitespace, and filter out empty strings
      const areasArray = value
        .split(",")
        .map((area) => area.trim())
        .filter((area) => area !== "");
      setFormData((prev) => ({ ...prev, [name]: areasArray }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const payload: UpdateSiteDetailsPayload = {
      contact: {
        address: formData.address || null,
        city: formData.city || null,
        phone: formData.phone || null,
        email: formData.email || null,
        workingHours: formData.workingHours || null,
        areas:
          formData.areas && formData.areas.length > 0 ? formData.areas : [], // Send empty array if no areas
      },
    };

    let effectivePayload = payload;
    // If all fields are empty for a new contact, send null
    if (
      !initialData &&
      !formData.address &&
      !formData.city &&
      !formData.phone &&
      !formData.email &&
      !formData.workingHours &&
      (!formData.areas || formData.areas.length === 0)
    ) {
      effectivePayload = { contact: null };
    } else if (
      initialData &&
      !formData.address &&
      !formData.city &&
      !formData.phone &&
      !formData.email &&
      !formData.workingHours &&
      (!formData.areas || formData.areas.length === 0)
    ) {
      // If initialData existed, and user clears all fields, we send null to remove the contact.
      effectivePayload = { contact: null };
    }

    const result = await updateSiteDetails(siteId, effectivePayload);
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message || "Contact details updated!");
      if (result.site?.contact) {
        setFormData({
          ...result.site.contact,
          areas: result.site.contact.areas || [],
          phone: result.site.contact.phone || "",
          email: result.site.contact.email || "",
          address: result.site.contact.address || "",
          city: result.site.contact.city || "",
          workingHours: result.site.contact.workingHours || "",
        });
      } else if (effectivePayload.contact === null) {
        setFormData({ ...defaultContactState });
      }
      setIsEditing(false);
    } else {
      toast.error(result.message || "Failed to update contact details.");
    }
  };

  const handleCancel = () => {
    setFormData(
      initialData
        ? {
            ...initialData,
            areas: initialData.areas || [],
            phone: initialData.phone || "",
            email: initialData.email || "",
            address: initialData.address || "",
            city: initialData.city || "",
            workingHours: initialData.workingHours || "",
          }
        : { ...defaultContactState }
    );
    setIsEditing(false);
  };

  const hasContactData =
    initialData ||
    Object.values(formData).some((val) =>
      Array.isArray(val) ? val.length > 0 : !!val
    );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <IconBriefcase className="mr-2.5 size-5 text-muted-foreground" />
          <CardTitle className="text-lg">Contact Details</CardTitle>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <IconPencil className="mr-1.5 size-4" />
            {initialData ? "Edit" : "Add Contact"}
          </Button>
        )}
      </CardHeader>

      {(isEditing || hasContactData) && (
        <CardContent className="space-y-3 pt-4">
          {isEditing ? (
            <>
              <div>
                <label
                  htmlFor="contactAddress"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Address
                </label>
                <Input
                  id="contactAddress"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., 123 Main St"
                />
              </div>
              <div>
                <label
                  htmlFor="contactCity"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  City
                </label>
                <Input
                  id="contactCity"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., Anytown"
                />
              </div>
              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Email
                </label>
                <Input
                  id="contactEmail"
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Phone
                </label>
                <Input
                  id="contactPhone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                />
              </div>
              <div>
                <label
                  htmlFor="contactWorkingHours"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Working Hours
                </label>
                <Input
                  id="contactWorkingHours"
                  name="workingHours"
                  value={formData.workingHours || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., Mon-Fri 9am-5pm"
                />
              </div>
              <div>
                <label
                  htmlFor="contactAreas"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Service Areas (comma-separated)
                </label>
                <Textarea
                  id="contactAreas"
                  name="areas"
                  value={
                    Array.isArray(formData.areas)
                      ? formData.areas.join(", ")
                      : ""
                  }
                  onChange={handleInputChange}
                  placeholder="e.g., Downtown, Suburbia, North End"
                  rows={2}
                />
              </div>
            </>
          ) : initialData ? (
            <>
              {initialData.address && (
                <div className="flex items-start text-sm text-muted-foreground">
                  <IconMapPin className="mr-2 mt-0.5 size-4 shrink-0" />
                  <span>
                    {initialData.address}, {initialData.city}
                  </span>
                </div>
              )}
              {initialData.email && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <IconMail className="mr-2 size-4 shrink-0" />
                  <a
                    href={`mailto:${initialData.email}`}
                    className="hover:text-foreground hover:underline"
                  >
                    {initialData.email}
                  </a>
                </div>
              )}
              {initialData.phone && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <IconPhone className="mr-2 size-4 shrink-0" />
                  <span>{initialData.phone}</span>
                </div>
              )}
              {initialData.workingHours && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <IconCalendarEvent className="mr-2 size-4 shrink-0" />
                  <span>{initialData.workingHours}</span>
                </div>
              )}
              {initialData.areas && initialData.areas.length > 0 && (
                <div className="pt-1">
                  <h4 className="mb-1.5 text-xs font-medium uppercase text-muted-foreground">
                    Service Areas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {initialData.areas.map((area) => (
                      <Badge
                        key={area}
                        variant="secondary"
                        className="font-normal"
                      >
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {/* Show this message if no specific fields are filled but initialData object exists (e.g. only id)*/}
              {!initialData.address &&
                !initialData.city &&
                !initialData.email &&
                !initialData.phone &&
                !initialData.workingHours &&
                (!initialData.areas || initialData.areas.length === 0) && (
                  <p className="text-sm text-muted-foreground italic">
                    No specific contact details provided.
                  </p>
                )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No contact information provided.
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

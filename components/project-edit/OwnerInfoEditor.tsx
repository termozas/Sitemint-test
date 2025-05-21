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
  IconUser,
  IconMail,
  IconPhone,
  IconDeviceFloppy,
  IconX,
  IconPencil,
} from "@tabler/icons-react";
import {
  updateSiteDetails,
  type UpdateSiteDetailsPayload,
} from "@/app/actions/database/siteActions";
import { toast } from "sonner";
import type { Owner } from "@/generated/prisma/client";

interface OwnerInfoEditorProps {
  siteId: string;
  initialData: Owner | null;
}

export function OwnerInfoEditor({ siteId, initialData }: OwnerInfoEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  // Initialize with initialData or default structure if null
  const [formData, setFormData] = useState(() =>
    initialData
      ? {
          name: initialData.name,
          email: initialData.email,
          phone: initialData.phone || "",
        }
      : { name: "", email: "", phone: "" }
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData(
      initialData
        ? {
            name: initialData.name,
            email: initialData.email,
            phone: initialData.phone || "",
          }
        : { name: "", email: "", phone: "" }
    );
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const payload: UpdateSiteDetailsPayload = {
      owner: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null, // Send null if empty
      },
    };

    // If all owner fields are empty, and there was no initial owner, treat as no owner to submit
    // Or, if user wants to clear an existing owner, we might need a separate "Remove Owner" button.
    // For now, if all fields are blank for a *new* owner, we don't send the owner object.
    // If an owner exists and fields are blanked, they will be updated to blank (or null for phone).
    let effectivePayload = payload;
    if (!initialData && !formData.name && !formData.email && !formData.phone) {
      effectivePayload = { owner: null }; // Signal to potentially disconnect if schema allows or just don't create
    } else if (
      initialData &&
      !formData.name &&
      !formData.email &&
      !formData.phone
    ) {
      // If initialData existed, and user clears all fields, we send null to remove the owner.
      effectivePayload = { owner: null };
    }

    const result = await updateSiteDetails(siteId, effectivePayload);
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message || "Owner details updated!");
      // Update formData based on the response if it contains the full owner object
      if (result.site?.owner) {
        setFormData({
          name: result.site.owner.name,
          email: result.site.owner.email,
          phone: result.site.owner.phone || "",
        });
      } else if (effectivePayload.owner === null) {
        // Owner was removed
        setFormData({ name: "", email: "", phone: "" });
      }
      setIsEditing(false);
    } else {
      toast.error(result.message || "Failed to update owner details.");
    }
  };

  const handleCancel = () => {
    setFormData(
      initialData
        ? {
            name: initialData.name,
            email: initialData.email,
            phone: initialData.phone || "",
          }
        : { name: "", email: "", phone: "" }
    );
    setIsEditing(false);
  };

  // Determine if there's any owner data to display (either initial or in form)
  const hasOwnerData =
    initialData || formData.name || formData.email || formData.phone;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <IconUser className="mr-2.5 size-5 text-muted-foreground" />
          <CardTitle className="text-lg">Owner Information</CardTitle>
        </div>
        {/* Show edit button only if there is data or if user wants to add an owner */}
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <IconPencil className="mr-1.5 size-4" />
            {initialData ? "Edit" : "Add Owner"}
          </Button>
        )}
      </CardHeader>

      {(isEditing || hasOwnerData) && (
        <CardContent className="space-y-3 pt-4">
          {isEditing ? (
            <>
              <div>
                <label
                  htmlFor="ownerName"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Full Name
                </label>
                <Input
                  id="ownerName"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter owner's full name"
                />
              </div>
              <div>
                <label
                  htmlFor="ownerEmail"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Email Address
                </label>
                <Input
                  id="ownerEmail"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="owner@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="ownerPhone"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Phone Number (Optional)
                </label>
                <Input
                  id="ownerPhone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                />
              </div>
            </>
          ) : initialData ? (
            <>
              <div className="flex items-center">
                <p className="font-medium text-foreground">
                  {initialData.name}
                </p>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <IconMail className="mr-2 size-4 shrink-0" />
                <a
                  href={`mailto:${initialData.email}`}
                  className="hover:text-foreground hover:underline"
                >
                  {initialData.email}
                </a>
              </div>
              {initialData.phone && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <IconPhone className="mr-2 size-4 shrink-0" />
                  <span>{initialData.phone}</span>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No owner information provided.
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

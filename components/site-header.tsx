"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useBreadcrumb } from "@/lib/contexts/BreadcrumbContext";

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function SiteHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // Split path and remove empty strings
  const { pageTitle } = useBreadcrumb();

  // Determine the base path and name for the first breadcrumb link
  const basePath = "/dashboard";
  const baseName = "Dashboard";

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={basePath}>{baseName}</BreadcrumbLink>
            </BreadcrumbItem>
            {segments.length > 1 && <BreadcrumbSeparator />}
            {segments.slice(1).map((segment, index) => {
              const isLast = index === segments.length - 2;
              const href = `/${segments.slice(0, index + 2).join("/")}`;
              const name =
                isLast &&
                pageTitle &&
                segments[0] === "dashboard" &&
                segments[1] === "projects" &&
                segments.length === 3
                  ? pageTitle
                  : capitalizeFirstLetter(segment.replace(/-/g, " "));

              return (
                <React.Fragment key={href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>{name}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && segments.length > 2 && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}

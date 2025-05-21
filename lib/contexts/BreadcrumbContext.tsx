"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface BreadcrumbContextType {
  pageTitle?: string;
  setPageTitle: (title: string | undefined) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const BreadcrumbProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pageTitle, setPageTitle] = useState<string | undefined>(undefined);

  return (
    <BreadcrumbContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = (): BreadcrumbContextType => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};

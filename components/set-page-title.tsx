"use client";

import { useEffect } from "react";
import { useBreadcrumb } from "@/lib/contexts/BreadcrumbContext";

interface SetPageTitleProps {
  title: string | undefined;
}

export const SetPageTitle: React.FC<SetPageTitleProps> = ({ title }) => {
  const { setPageTitle } = useBreadcrumb();

  useEffect(() => {
    setPageTitle(title);
    // Clear the title when the component unmounts or the title changes to undefined
    return () => {
      setPageTitle(undefined);
    };
  }, [title, setPageTitle]);

  return null; // This component does not render anything
};

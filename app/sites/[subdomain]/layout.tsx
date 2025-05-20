import { siteDatabase } from "@/config/sites";
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    subdomain: string;
  }>;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  // Await the params
  const { subdomain } = await params;
  const site = siteDatabase.sites[subdomain];

  return {
    title: site?.name || "Site Not Found",
    description: site?.description || "Carpenter website not found",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    ),
  };
}

export default function SiteLayout({ children }: LayoutProps) {
  return <div className="min-h-screen flex flex-col">{children}</div>;
}

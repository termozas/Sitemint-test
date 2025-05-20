import { SiteConfig } from "@/types/site";
import { Header } from "./header";
import { Hero } from "./hero";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Portfolio } from "@/components/sections/portfolio";
import { Contact } from "@/components/sections/contact";
import { Footer } from "./footer";
import { Hero2 } from "../sections/hero2";

interface CarpenterProps {
  site: SiteConfig;
}

export function Carpenter({ site }: CarpenterProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header site={site} />
      <Hero site={site} />
      <Hero2 site={site} />
      <Services site={site} />
      <About site={site} />
      <Portfolio site={site} />
      <Contact site={site} />
      <Footer site={site} />
    </div>
  );
}

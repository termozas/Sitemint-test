"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { SiteConfig } from "@/types/site";
import { Badge } from "@/components/ui/badge";

interface PortfolioProps {
  site: SiteConfig;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const portfolioItems = [
  {
    title: "Moderne Kjøkkenrenovering",
    image: "/kitchen.jpg",
    category: "Kjøkken",
  },
  {
    title: "Gipsplater Installasjon",
    image: "/kitchen.jpg",
    category: "Gipsplater",
  },
  {
    title: "Tak Rehabilitering",
    image: "/kitchen.jpg",
    category: "Tak",
  },
  {
    title: "Parkett og Gulvlegging",
    image: "/kitchen.jpg",
    category: "Gulv",
  },
  {
    title: "Innvendig Maling",
    image: "/kitchen.jpg",
    category: "Maling",
  },
  {
    title: "Skreddersydde Skap",
    image: "/kitchen.jpg",
    category: "Snekkerarbeid",
  },
];

export function Portfolio({ site }: PortfolioProps) {
  return (
    <section id="portfolio" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="mb-4"
              style={{
                borderColor: site.theme?.primaryColor || "",
                color: site.theme?.primaryColor || "",
              }}
            >
              Våre prosjekter
            </Badge>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Våre Siste Prosjekter
          </motion.h2>
          <motion.p
            className="mx-auto max-w-[700px] text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ta en titt på noen av våre nylige prosjekter og se kvaliteten på
            vårt håndverk.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {portfolioItems.map((portfolioItem, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={portfolioItem.image}
                  alt={portfolioItem.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ backgroundColor: `${site.theme?.primaryColor}CC` }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-xl font-semibold mb-2">
                    {portfolioItem.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-white border-white/40"
                  >
                    {portfolioItem.category}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

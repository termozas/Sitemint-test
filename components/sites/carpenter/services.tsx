"use client";

import { motion } from "framer-motion";
import { SiteConfig } from "@/types/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServicesProps {
  site: SiteConfig;
}

const features = [
  {
    number: "01",
    title: "Gratis befaring",
    description:
      "Vi kommer hjem til deg for en grundig vurdering av prosjektet. Vi måler, diskuterer dine ønsker og gir profesjonelle råd basert på vår lange erfaring.",
    icon: (
      <div className="relative w-full h-32 mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-[240px] rounded-lg bg-muted/50 p-4">
            <div className="space-y-2">
              <div className="h-2 w-1/2 rounded bg-primary/20" />
              <div className="h-2 w-full rounded bg-primary/20" />
              <div className="h-2 w-3/4 rounded bg-primary/20" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="h-6 rounded bg-primary/20" />
              <div className="h-6 rounded bg-primary/20" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Detaljert pristilbud",
    description:
      "Innen 48 timer mottar du et omfattende tilbud med fastpris. Vi bryter ned kostnadene for materialer og arbeid, slik at du får full oversikt over prosjektet.",
    icon: (
      <div className="relative w-full h-32 mx-auto grid grid-cols-2 gap-3">
        <div className="space-y-3">
          <div className="h-8 rounded-md bg-primary/20 animate-pulse" />
          <div className="h-8 rounded-md bg-primary/20 animate-pulse delay-100" />
        </div>
        <div className="space-y-3">
          <div className="h-8 rounded-md bg-primary/20 animate-pulse delay-200" />
          <div className="h-8 rounded-md bg-primary/20 animate-pulse delay-300" />
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Profesjonell utførelse",
    description:
      "Våre erfarne snekkere utfører arbeidet med høyeste kvalitet og presisjon. Vi holder deg informert gjennom hele prosessen og sikrer at resultatet overgår dine forventninger.",
    icon: (
      <div className="relative w-full h-32 mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-primary/20 animate-bounce delay-100" />
            <div className="h-16 w-16 rounded-full bg-primary/20 animate-bounce delay-200" />
            <div className="h-16 w-16 rounded-full bg-primary/20 animate-bounce delay-300" />
          </div>
        </div>
      </div>
    ),
  },
];

function FeatureCard({
  number,
  title,
  description,
  icon,
  index,
  site,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  site: SiteConfig;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true }}
    >
      <Card className="border-none bg-background/50 backdrop-blur">
        <CardHeader>
          <div
            className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium"
            style={{
              backgroundColor: `${site.theme?.primaryColor}20`,
              color: site.theme?.primaryColor || "",
            }}
          >
            {number}
          </div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-8">{description}</p>
          {icon}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Services({ site }: ServicesProps) {
  return (
    <section id="tjenester" className="container relative mb-20">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            className="rounded-full mb-4"
            style={{
              borderColor: site.theme?.primaryColor || "",
              color: site.theme?.primaryColor || "",
            }}
          >
            Slik jobber vi
          </Button>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">
            Kvalitetshåndverk i tre enkle steg
          </h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Fra første befaring til ferdig resultat - vi sørger for en smidig
            prosess og profesjonell utførelse av ditt snekkerprosjekt.
          </p>
        </motion.div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.number}
            {...feature}
            index={index}
            site={site}
          />
        ))}
      </div>
    </section>
  );
}

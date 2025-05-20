"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SiteConfig } from "@/types/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, ThumbsUp, Users } from "lucide-react";

interface AboutProps {
  site: SiteConfig;
}

const stats = [
  {
    icon: Clock,
    label: "Års Erfaring",
    value: "20+",
  },
  {
    icon: Users,
    label: "Fornøyde Kunder",
    value: "500+",
  },
  {
    icon: ThumbsUp,
    label: "Fullførte Prosjekter",
    value: "1000+",
  },
  {
    icon: Award,
    label: "Utmerkelser",
    value: "15+",
  },
];

export function About({ site }: AboutProps) {
  return (
    <section id="om-oss" className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 },
            }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src="/about-image.jpg"
                alt="Snekker i arbeid"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary/10 p-6 rounded-xl">
              <p className="text-4xl font-bold text-primary">20+</p>
              <p className="text-sm text-muted-foreground">År med Erfaring</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: 20 },
              show: { opacity: 1, x: 0 },
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Badge variant="secondary" className="w-fit">
                Om Oss
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Håndverk med Presisjon og Kvalitet
              </h2>
              <p className="text-muted-foreground">
                Med over to tiår med erfaring, bringer vi uovertruffen
                ekspertise og dedikasjon til hvert prosjekt vi påtar oss.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="border-none bg-muted/50">
                    <CardContent className="p-4 space-y-2">
                      <Icon className="h-6 w-6 text-primary" />
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                Vår forpliktelse til kvalitetshåndverk og oppmerksomhet på
                detaljer har gitt oss et rykte som en av de mest pålitelige
                snekkertjenestene i regionen.
              </p>
              <Button
                size="lg"
                className="group"
                onClick={() => (window.location.href = "#contact")}
              >
                Ta Kontakt
                <motion.span
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

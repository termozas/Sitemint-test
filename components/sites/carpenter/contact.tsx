"use client";

import { motion } from "framer-motion";
import { SiteConfig } from "@/types/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { toast } from "sonner";

interface ContactProps {
  site: SiteConfig;
}

function getContactInfo(site: SiteConfig) {
  return [
    {
      icon: Phone,
      label: "Ring Oss",
      value: site.contact?.phone || "",
    },
    {
      icon: Mail,
      label: "Send E-post",
      value: site.contact?.email || "",
    },
    {
      icon: MapPin,
      label: "Besøk Oss",
      value: `${site.contact?.address}, ${site.contact?.city}`,
    },
    {
      icon: Clock,
      label: "Åpningstider",
      value: site.contact?.workingHours || "",
    },
  ];
}

export function Contact({ site }: ContactProps) {
  const contactInfo = getContactInfo(site);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Takk for din henvendelse!", {
      description: "Vi tar kontakt med deg innen 24 timer.",
    });
  };

  return (
    <section id="kontakt" className="py-24 bg-muted/50">
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
              La oss snakke sammen
            </Badge>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Få et uforpliktende tilbud
          </motion.h2>
          <motion.p
            className="mx-auto max-w-[700px] text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Vi er her for å hjelpe deg med ditt neste prosjekt. Ta kontakt for
            en uforpliktende samtale om dine ønsker og behov.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Fornavn"
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Etternavn"
                    required
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="E-post"
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="tel"
                  placeholder="Telefon"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Beskriv ditt prosjekt"
                  required
                  className="min-h-[150px] bg-background resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                style={{
                  backgroundColor: site.theme?.primaryColor || "",
                  borderColor: site.theme?.secondaryColor || "",
                }}
              >
                <Send className="h-4 w-4" />
                Send Forespørsel
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid gap-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card
                    key={index}
                    className="border-none bg-background/50 backdrop-blur-sm"
                  >
                    <CardContent className="flex items-center space-x-4 p-4">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: `${site.theme?.primaryColor}20`,
                        }}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ color: site.theme?.primaryColor || "" }}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{info.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {info.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="aspect-video relative rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.2922926156740714!3d48.858370079287475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1647935921561!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

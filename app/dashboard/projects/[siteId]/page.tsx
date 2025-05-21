import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconAlertTriangle,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBriefcase,
  IconBuildingStore,
  IconCalendarEvent,
  IconExternalLink,
  IconGitFork,
  IconGlobe,
  IconLink,
  IconMail,
  IconMapPin,
  IconPhone,
  IconShieldCheck,
  IconStar,
  IconUser,
  IconWorldWww,
} from "@tabler/icons-react";
import Link from "next/link";

interface ProjectDetailsPageProps {
  params: {
    siteId: string;
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const site = await prisma.site.findUnique({
    where: { id: params.siteId },
    include: {
      owner: true,
      contact: true,
      socialMedia: true,
      hero: true,
      services: true,
      theme: true, // Assuming you might want to use theme colors later
    },
  });

  if (!site) {
    notFound();
  }

  return (
    <div className="@container/main flex flex-1 flex-col">
      {/* Page Header */}
      <div className=" px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start gap-y-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                {site.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Project ID: {site.id}
              </p>
            </div>
            {site.vercelProjectUrl ? (
              <Link
                href={site.vercelProjectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <IconExternalLink className="-ml-1 mr-2 size-5" />
                View Live Site
              </Link>
            ) : (
              <Badge variant="outline" className="flex items-center gap-x-1.5">
                <IconAlertTriangle className="size-4 text-amber-500" />
                Not Deployed
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Column */}
          <aside className="space-y-6 lg:col-span-4">
            {/* Owner Details Card */}
            {site.owner && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <IconUser className="mr-2.5 size-5 text-muted-foreground" />
                    Owner Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <p className="font-medium">{site.owner.name}</p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <IconMail className="mr-2 size-4 shrink-0" />
                    <a
                      href={`mailto:${site.owner.email}`}
                      className="hover:text-foreground hover:underline"
                    >
                      {site.owner.email}
                    </a>
                  </div>
                  {site.owner.phone && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <IconPhone className="mr-2 size-4 shrink-0" />
                      <span>{site.owner.phone}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Contact Details Card */}
            {site.contact && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <IconBriefcase className="mr-2.5 size-5 text-muted-foreground" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {site.contact.address && (
                    <div className="flex items-start text-sm text-muted-foreground">
                      <IconMapPin className="mr-2 mt-0.5 size-4 shrink-0" />
                      <span>
                        {site.contact.address}, {site.contact.city}
                      </span>
                    </div>
                  )}
                  {site.contact.email && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <IconMail className="mr-2 size-4 shrink-0" />
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="hover:text-foreground hover:underline"
                      >
                        {site.contact.email}
                      </a>
                    </div>
                  )}
                  {site.contact.phone && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <IconPhone className="mr-2 size-4 shrink-0" />
                      <span>{site.contact.phone}</span>
                    </div>
                  )}
                  {site.contact.workingHours && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <IconCalendarEvent className="mr-2 size-4 shrink-0" />
                      <span>{site.contact.workingHours}</span>
                    </div>
                  )}
                  {site.contact.areas && site.contact.areas.length > 0 && (
                    <div className="pt-1">
                      <h4 className="mb-1.5 text-xs font-medium uppercase text-muted-foreground">
                        Service Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {site.contact.areas.map((area) => (
                          <Badge
                            key={area}
                            variant="secondary"
                            className="font-normal"
                          >
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Social Media Card */}
            {site.socialMedia &&
              (site.socialMedia.facebook ||
                site.socialMedia.instagram ||
                site.socialMedia.linkedin) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <IconGlobe className="mr-2.5 size-5 text-muted-foreground" />
                      Social Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    {site.socialMedia.facebook && (
                      <Link
                        href={site.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground hover:underline"
                      >
                        <IconBrandFacebook className="mr-2 size-4 shrink-0 text-[#1877F2]" />
                        Facebook
                      </Link>
                    )}
                    {site.socialMedia.instagram && (
                      <Link
                        href={site.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground hover:underline"
                      >
                        <IconBrandInstagram className="mr-2 size-4 shrink-0 text-[#E4405F]" />
                        Instagram
                      </Link>
                    )}
                    {site.socialMedia.linkedin && (
                      <Link
                        href={site.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground hover:underline"
                      >
                        <IconBrandLinkedin className="mr-2 size-4 shrink-0 text-[#0A66C2]" />
                        LinkedIn
                      </Link>
                    )}
                  </CardContent>
                </Card>
              )}
          </aside>

          {/* Main Content Column */}
          <main className="space-y-6 lg:col-span-8">
            {/* Site Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <IconBuildingStore className="mr-2.5 size-5 text-muted-foreground" />
                  Site Information
                </CardTitle>
                {site.description && (
                  <CardDescription>{site.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {site.subdomain && (
                  <div className="flex items-center text-sm">
                    <IconWorldWww className="mr-2 size-4 shrink-0 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground mr-1">
                      Subdomain:
                    </span>
                    <Link
                      // Assuming local development with .localhost:3000, replace if different
                      href={`http://${site.subdomain}.localhost:3000`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {site.subdomain}
                    </Link>
                  </div>
                )}
                {site.githubRepoUrl && (
                  <div className="flex items-center text-sm">
                    <IconGitFork className="mr-2 size-4 shrink-0 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground mr-1">
                      GitHub:
                    </span>
                    <Link
                      href={site.githubRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Repository
                    </Link>
                  </div>
                )}
                {site.vercelProjectUrl && (
                  <div className="flex items-center text-sm">
                    <IconLink className="mr-2 size-4 shrink-0 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground mr-1">
                      Deployment:
                    </span>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 border-green-600/50"
                    >
                      <IconShieldCheck className="mr-1 size-3.5" />
                      Deployed
                    </Badge>
                  </div>
                )}
                {!site.vercelProjectUrl && (
                  <div className="flex items-center text-sm">
                    <IconLink className="mr-2 size-4 shrink-0 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground mr-1">
                      Deployment:
                    </span>
                    <Badge variant="outline">
                      <IconAlertTriangle className="mr-1 size-3.5 text-amber-500" />
                      Not Deployed
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hero Section Card */}
            {site.hero && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <IconStar className="mr-2.5 size-5 text-muted-foreground" />
                    Hero Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {site.hero.mainTitle && (
                    <h3 className="text-xl font-semibold text-foreground">
                      {site.hero.mainTitle}
                    </h3>
                  )}
                  {site.hero.subtitle && (
                    <p className="text-muted-foreground">
                      {site.hero.subtitle}
                    </p>
                  )}
                  {site.hero.highlights && site.hero.highlights.length > 0 && (
                    <div>
                      <h4 className="mb-1.5 text-xs font-medium uppercase text-muted-foreground">
                        Highlights
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                        {site.hero.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(site.hero.ctaPrimary || site.hero.ctaSecondary) && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      {site.hero.ctaPrimary && (
                        <Badge variant="default" className="px-3 py-1 text-sm">
                          {site.hero.ctaPrimary}
                        </Badge>
                      )}
                      {site.hero.ctaSecondary && (
                        <Badge
                          variant="secondary"
                          className="px-3 py-1 text-sm"
                        >
                          {site.hero.ctaSecondary}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Services Card */}
            {site.services && site.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                    {site.services.map((service) => (
                      <div
                        key={service.id}
                        className="rounded-md border bg-background/50 p-4"
                      >
                        <h3 className="font-semibold text-foreground">
                          {service.title}
                        </h3>
                        {service.price && (
                          <p className="text-sm text-muted-foreground">
                            {service.price}
                          </p>
                        )}
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            {!site.services ||
              (site.services.length === 0 && (
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-lg text-muted-foreground font-normal">
                      No Services Listed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This project does not have any services defined yet.
                    </p>
                  </CardContent>
                </Card>
              ))}
          </main>
        </div>
      </div>
    </div>
  );
}

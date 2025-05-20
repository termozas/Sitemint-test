import { SitesDataTable } from "@/components/sites-data-table";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const sites = await prisma.site.findMany({
    include: {
      owner: true,
      contact: true,
      socialMedia: true,
    },
  });

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <SitesDataTable sites={sites} />
        </div>
      </div>
    </div>
  );
}

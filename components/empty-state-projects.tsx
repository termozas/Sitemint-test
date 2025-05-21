import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyStateProjects() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have not generated any sites yet
        </h3>
        <p className="text-sm text-muted-foreground">
          Let&apos;s get you started with a new site.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/dashboard/maker">Generate a new site</Link>
        </Button>
      </div>
    </div>
  );
}

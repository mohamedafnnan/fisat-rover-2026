import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/shared/page-hero";

export const metadata = buildMetadata({
  title: "Search",
  description: "Search pages, docs, journal, team, and achievements.",
  path: "/search",
});

export default function SearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Search"
        title="Find anything on the site"
        description="Full search index ships with CMS. This UI is ready for the API stub at /api/search."
      />
      <section className="section-y pt-0">
        <Container className="max-w-2xl space-y-4">
          <form action="/search" className="flex flex-col gap-3 sm:flex-row">
            <Input
              name="q"
              type="search"
              placeholder="Search rover, team, journal…"
              aria-label="Search query"
              className="flex-1"
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">
            Try browsing{" "}
            <Link className="text-primary hover:underline" href="/engineering">
              Engineering
            </Link>
            ,{" "}
            <Link className="text-primary hover:underline" href="/journal">
              Journal
            </Link>
            , or{" "}
            <Link className="text-primary hover:underline" href="/team">
              Team
            </Link>{" "}
            while the index is offline.
          </p>
        </Container>
      </section>
    </>
  );
}

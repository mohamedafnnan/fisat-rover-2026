import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "The page you requested could not be found.",
  path: "/404",
  noIndex: true,
});

const suggestions = [
  { href: "/rover", label: "The Rover" },
  { href: "/engineering", label: "Engineering" },
  { href: "/join", label: "Join" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/search", label: "Search" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main-content" className="section-y flex-1" tabIndex={-1}>
        <Container className="max-w-2xl space-y-6 text-center">
          <p className="text-overline text-muted-foreground">404</p>
          <h1>Page not found</h1>
          <p className="text-body-lg text-muted-foreground">
            That route doesn&apos;t exist — or it moved. Try search or one of these
            destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="primary">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/search">Search</Link>
            </Button>
          </div>
          <ul className="flex flex-wrap justify-center gap-2 pt-4">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}

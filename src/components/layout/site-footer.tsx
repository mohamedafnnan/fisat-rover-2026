import Link from "next/link";
import { footerNav, siteConfig } from "@/config/site";
import { Separator } from "@/components/ui/separator";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { title: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-overline text-muted-foreground">{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-subtle" role="contentinfo">
      <div className="container-default section-y">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold">
              <span
                className="flex size-8 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground"
                aria-hidden
              >
                FR
              </span>
              {siteConfig.shortName}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Official website of the FISAT Rover Team. Engineering excellence,
              competition archives, sponsorship, and recruitment.
            </p>
          </div>
          <FooterColumn title="Explore" links={footerNav.explore} />
          <FooterColumn title="Engineering" links={footerNav.engineering} />
          <FooterColumn title="Get Involved" links={footerNav.getInvolved} />
          <FooterColumn title="Connect" links={footerNav.connect} />
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Affiliated with FISAT, Angamaly.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/press" className="hover:text-foreground">
              Press
            </Link>
            <a
              href={siteConfig.links.github}
              className="hover:text-foreground"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function SiteHeader() {
  const { direction, scrolled } = useScrollDirection(64);
  const hidden = scrolled && direction === "down";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[transform,background-color,border-color,box-shadow] duration-200",
        scrolled
          ? "border-border bg-background/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/75"
          : "border-transparent bg-background/0",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="container-default flex h-16 items-center gap-3">
        <Link
          href="/"
          className="mr-1 flex shrink-0 items-center gap-2 font-semibold tracking-tight"
        >
          <span
            className="flex size-8 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground"
            aria-hidden
          >
            FR
          </span>
          <span className="hidden sm:inline">{siteConfig.shortName}</span>
        </Link>

        <div className="flex flex-1 justify-center">
          <DesktopNav />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost" size="icon-sm" aria-label="Search">
            <Link href="/search">
              <Search className="size-4" aria-hidden />
            </Link>
          </Button>
          <ThemeToggle />
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="hidden md:inline-flex"
          >
            <Link href="/sponsors">Sponsor Us</Link>
          </Button>
          <Button asChild variant="primary" size="sm" className="hidden sm:inline-flex">
            <Link href="/join">Join</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

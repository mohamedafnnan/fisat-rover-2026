"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { homeHero, homeStats } from "@/components/sections/home/content";
import { CountUp } from "@/components/sections/home/reveal";

const HeroScene = dynamic(
  () => import("@/components/sections/home/hero-scene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => <Skeleton className="absolute inset-0 h-full w-full rounded-none" />,
  },
);

type Mode = "poster" | "loading" | "full" | "lite";

function probeHeroCapability(): { canFull: boolean; canLite: boolean } {
  if (typeof window === "undefined") return { canFull: false, canLite: false };
  let webgl2 = false;
  try {
    webgl2 = Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    webgl2 = false;
  }
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const saveData = Boolean(nav.connection?.saveData);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
  const narrow = window.matchMedia("(max-width: 767px)").matches;
  const canLite = webgl2 && !saveData && !narrow;
  const canFull = canLite && !reduced && !lowMemory;
  return { canFull, canLite };
}

function HeroPoster({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsl(var(--primary)/0.22),transparent_55%),radial-gradient(ellipse_at_80%_60%,hsl(var(--mars)/0.18),transparent_50%),linear-gradient(165deg,#120d0b_0%,#1c1410_45%,#0a0a0a_100%)]",
        className,
      )}
      aria-hidden
    >
      {/* Stylized static rover silhouette — LCP-safe, no assets required */}
      <div className="absolute inset-0 opacity-[0.14]">
        <div className="absolute top-1/2 left-1/2 h-40 w-64 -translate-x-1/2 -translate-y-[40%] rounded-xl border border-white/30 bg-white/10 shadow-[0_0_80px_hsl(var(--primary)/0.25)] md:h-56 md:w-96" />
        <div className="absolute top-[42%] left-1/2 h-24 w-2 -translate-x-[20%] bg-white/25 md:h-32" />
        <div className="absolute top-[38%] left-[calc(50%+1.5rem)] h-8 w-14 -translate-x-1/2 rounded-md bg-white/20" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent md:from-background/80" />
    </div>
  );
}

export function HomeHero() {
  const reduced = useReducedMotion();
  const [mode, setMode] = React.useState<Mode>("poster");
  const [forceStatic, setForceStatic] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted || forceStatic || reduced) {
      setMode("poster");
      return;
    }

    let cancelled = false;
    const start = () => {
      const { canFull, canLite } = probeHeroCapability();
      if (cancelled) return;
      if (!canFull && !canLite) {
        setMode("poster");
        return;
      }
      setMode("loading");
      // Hydrate after first paint / LCP window
      const t = window.setTimeout(() => {
        if (cancelled) return;
        setMode(canFull ? "full" : "lite");
      }, 450);
      return () => window.clearTimeout(t);
    };

    let cleanupTimer: (() => void) | undefined;
    let idleId: number | undefined;
    const ric = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof ric.requestIdleCallback === "function") {
      idleId = ric.requestIdleCallback(
        () => {
          cleanupTimer = start();
        },
        { timeout: 1200 },
      );
    } else {
      const id = window.setTimeout(() => {
        cleanupTimer = start();
      }, 600);
      cleanupTimer = () => window.clearTimeout(id);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof ric.cancelIdleCallback === "function") {
        ric.cancelIdleCallback(idleId);
      }
      cleanupTimer?.();
    };
  }, [mounted, forceStatic, reduced]);

  const showCanvas = mode === "full" || mode === "lite";

  return (
    <section
      className="relative isolate min-h-[min(92dvh,52rem)] overflow-hidden border-b border-border"
      aria-labelledby="home-hero-heading"
    >
      <HeroPoster />

      {mode === "loading" ? (
        <div className="absolute inset-0 z-[1]" aria-hidden>
          <Skeleton className="h-full w-full rounded-none opacity-40" />
        </div>
      ) : null}

      {showCanvas ? (
        <div className="absolute inset-0 z-[1] hidden md:block" aria-hidden>
          <HeroScene quality={mode === "lite" ? "lite" : "full"} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/55 to-transparent" />
        </div>
      ) : null}

      <Container className="relative z-[2] flex min-h-[min(92dvh,52rem)] flex-col justify-center py-16 md:py-24">
        <div className="max-w-2xl space-y-6">
          <Badge tone="mars">{homeHero.eyebrow}</Badge>
          <h1 id="home-hero-heading" className="text-display">
            {homeHero.headline}
          </h1>
          <p className="text-body-lg text-muted-foreground md:text-lg">{homeHero.subhead}</p>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero">
              <Link href={homeHero.primaryCta.href}>{homeHero.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={homeHero.worldCta.href}>{homeHero.worldCta.label}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={homeHero.secondaryCta.href}>{homeHero.secondaryCta.label}</Link>
            </Button>
            <Button asChild variant="tertiary" size="lg">
              <Link href={homeHero.tertiaryCta.href}>{homeHero.tertiaryCta.label}</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {mounted && !reduced ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                aria-pressed={forceStatic || mode === "poster"}
                onClick={() => setForceStatic((v) => !v)}
              >
                {forceStatic || mode === "poster"
                  ? homeHero.interactiveToggleLabel
                  : homeHero.staticToggleLabel}
              </Button>
            ) : null}
            <p className="text-caption text-muted-foreground">
              Interactive scene is optional · 2D site is complete without it
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4">
            {homeStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border/80 bg-card/70 p-3 backdrop-blur-sm">
                <dt className="text-caption text-muted-foreground">{stat.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight tabular-nums">
                  <CountUp value={stat.value} suffix={"suffix" in stat ? stat.suffix : ""} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <a
          href="#mission"
          className="text-muted-foreground hover:text-foreground absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-caption transition-colors md:flex"
        >
          <span>{homeHero.scrollCue}</span>
          <ChevronDown className="size-4 animate-bounce motion-reduce:animate-none" aria-hidden />
        </a>
      </Container>
    </section>
  );
}

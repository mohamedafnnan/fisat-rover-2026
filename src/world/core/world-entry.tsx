"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { probeWorldCapability } from "@/world/core/capability";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

const WorldCanvas = dynamic(
  () =>
    import("@/world/core/world-canvas").then((m) => m.WorldCanvas).catch(() => ({
      default: function WorldCanvasFallback() {
        return (
          <div className="flex h-dvh items-center justify-center bg-background p-6 text-center">
            <div className="max-w-md space-y-3">
              <h1 className="text-xl font-semibold">3D runtime failed to load</h1>
              <p className="text-sm text-muted-foreground">
                Use the 2D site — every Base Camp building maps to a normal page.
              </p>
              <Button asChild variant="primary">
                <Link href="/">Browse the site</Link>
              </Button>
            </div>
          </div>
        );
      },
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-dvh items-center justify-center bg-neutral-950">
        <Skeleton className="h-full w-full rounded-none opacity-40" />
      </div>
    ),
  },
);

type Mode = "idle" | "full" | "lite" | "blocked";

/**
 * Opt-in entry for Base Camp. Core site never imports this module
 * except via the /explore route (and a Home CTA link).
 */
export function WorldEntry() {
  const [mode, setMode] = React.useState<Mode>("idle");

  const start = React.useCallback((preferLite = false) => {
    const cap = probeWorldCapability();
    if (preferLite && cap.canRunLite) {
      setMode("lite");
      return;
    }
    if (cap.canRunFull) {
      setMode("full");
      return;
    }
    if (cap.canRunLite) {
      setMode("lite");
      return;
    }
    setMode("blocked");
  }, []);

  if (mode === "full" || mode === "lite") {
    return <WorldCanvas quality={mode} />;
  }

  if (mode === "blocked") {
    return (
      <div className="flex min-h-dvh items-center">
        <Container className="max-w-xl space-y-4">
          <Badge tone="warning">Device limit</Badge>
          <h1>Base Camp unavailable on this device</h1>
          <p className="text-muted-foreground">
            WebGL, data-saver, or hardware limits prevent the interactive world. The full
            2D site has the same content — every building is a normal page.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary">
              <Link href="/rover">Explore the Rover</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh items-center">
      <Container className="max-w-xl space-y-5">
        <Badge tone="mars">Interactive world</Badge>
        <h1 className="text-display text-4xl md:text-5xl">Base Camp</h1>
        <p className="text-muted-foreground text-body-lg">
          Drive the FISAT rover across a Martian research yard — Bruno Simon flavor,
          agency restraint. Buildings map 1:1 to site sections. The core site stays fast;
          this bundle loads only after you enter.
        </p>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li>· WASD / joystick to drive · E to enter buildings</li>
          <li>· Destinations menu for zero-skill travel</li>
          <li>· Exit to site anytime — full 2D IA always available</li>
        </ul>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="hero" onClick={() => start(false)}>
            Enter Base Camp
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={() => start(true)}>
            Lite mode
          </Button>
          <Button asChild variant="tertiary" size="lg">
            <Link href="/">Browse the site</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}

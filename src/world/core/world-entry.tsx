"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { probeWorldCapability } from "@/world/core/capability";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const WorldCanvas = dynamic(
  () =>
    import("@/world/core/world-canvas").then((m) => m.WorldCanvas).catch(() => ({
      default: function WorldCanvasFallback() {
        return (
          <div className="flex h-[70dvh] items-center justify-center rounded-lg border border-border bg-muted p-6 text-center text-sm text-muted-foreground">
            3D runtime failed to load. Use the 2D site instead.
          </div>
        );
      },
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[70dvh] items-center justify-center">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    ),
  },
);

type Mode = "idle" | "loading" | "full" | "lite" | "blocked";

/**
 * Opt-in entry for Base Camp. Core site never imports this module
 * except via the /explore route.
 */
export function WorldEntry() {
  const [mode, setMode] = React.useState<Mode>("idle");

  const start = React.useCallback(() => {
    const cap = probeWorldCapability();
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

  if (mode === "idle") {
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-start justify-center gap-4 px-4">
        <p className="text-overline text-muted-foreground">Interactive world</p>
        <h1 className="text-display text-4xl md:text-5xl">Base Camp</h1>
        <p className="text-muted-foreground">
          Opt-in Bruno Simon–inspired experience. The core site stays fast — this bundle
          loads only after you enter, on capable devices.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="hero" onClick={start}>
            Enter Base Camp
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/">Browse the site</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "blocked") {
    return (
      <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-start justify-center gap-4 px-4">
        <h1>World unavailable on this device</h1>
        <p className="text-muted-foreground">
          WebGL, data-saver, or hardware limits prevent the interactive world. The full 2D
          site has the same content.
        </p>
        <Button asChild variant="primary">
          <Link href="/rover">Explore the Rover</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh">
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <Button asChild variant="secondary" size="sm">
          <Link href="/">Exit to site</Link>
        </Button>
      </div>
      <WorldCanvas quality={mode === "lite" ? "lite" : "full"} />
    </div>
  );
}

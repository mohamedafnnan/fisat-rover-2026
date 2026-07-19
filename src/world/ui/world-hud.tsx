"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Compass,
  HelpCircle,
  Map as MapIcon,
  Navigation,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useWorldStore } from "@/store/world-store";
import { BUILDINGS, WORLD_BOUNDS, getBuilding } from "@/world/data/buildings";

export function WorldHud() {
  const router = useRouter();
  const nearbyBuilding = useWorldStore((s) => s.nearbyBuilding);
  const showMinimap = useWorldStore((s) => s.showMinimap);
  const showHelp = useWorldStore((s) => s.showHelp);
  const showDestinations = useWorldStore((s) => s.showDestinations);
  const roverPosition = useWorldStore((s) => s.roverPosition);
  const roverYaw = useWorldStore((s) => s.roverYaw);
  const currentZone = useWorldStore((s) => s.currentZone);
  const setShowHelp = useWorldStore((s) => s.setShowHelp);
  const setShowDestinations = useWorldStore((s) => s.setShowDestinations);
  const setShowMinimap = useWorldStore((s) => s.setShowMinimap);
  const setAutoDriveTarget = useWorldStore((s) => s.setAutoDriveTarget);
  const setCurrentZone = useWorldStore((s) => s.setCurrentZone);
  const setRoverPose = useWorldStore((s) => s.setRoverPose);
  const reset = useWorldStore((s) => s.reset);

  const nearby = nearbyBuilding ? getBuilding(nearbyBuilding) : null;
  const zone = currentZone ? getBuilding(currentZone) : null;

  React.useEffect(() => {
    if (!zone) return;
    // Brief dwell then navigate — allows cancel
    const t = window.setTimeout(() => {
      router.push(zone.href);
      setCurrentZone(null);
    }, 700);
    return () => window.clearTimeout(t);
  }, [zone, router, setCurrentZone]);

  const returnToPlaza = () => {
    setAutoDriveTarget("plaza");
    setCurrentZone(null);
  };

  const hardReset = () => {
    reset();
    setRoverPose([0, 0.35, 4], 0, 0);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 text-white">
      {/* Top bar */}
      <div className="pointer-events-auto absolute top-3 right-3 left-3 flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="secondary" size="sm" className="bg-black/55 text-white border-white/15 hover:bg-black/70">
            <Link href="/">Exit to site</Link>
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="bg-black/55 text-white border-white/15 hover:bg-black/70"
            onClick={() => setShowDestinations(!showDestinations)}
          >
            <Navigation className="size-3.5" aria-hidden />
            Destinations
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="bg-black/55 text-white border-white/15 hover:bg-black/70"
            aria-label={showMinimap ? "Hide minimap" : "Show minimap"}
            onClick={() => setShowMinimap(!showMinimap)}
          >
            <MapIcon className="size-3.5" aria-hidden />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="bg-black/55 text-white border-white/15 hover:bg-black/70"
            aria-label="Help"
            onClick={() => setShowHelp(!showHelp)}
          >
            <HelpCircle className="size-3.5" aria-hidden />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="bg-black/55 text-white border-white/15 hover:bg-black/70"
            aria-label="Return to plaza"
            onClick={returnToPlaza}
          >
            <Compass className="size-3.5" aria-hidden />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="bg-black/55 text-white border-white/15 hover:bg-black/70"
            aria-label="Reset rover"
            onClick={hardReset}
          >
            <RotateCcw className="size-3.5" aria-hidden />
          </Button>
        </div>
      </div>

      {/* Interact prompt */}
      {nearby && !zone ? (
        <div className="pointer-events-auto absolute bottom-28 left-1/2 z-30 w-[min(100%-2rem,22rem)] -translate-x-1/2 rounded-xl border border-white/20 bg-black/65 p-4 text-center backdrop-blur-md md:bottom-10">
          <Badge tone="accent" className="mb-2">
            Nearby
          </Badge>
          <p className="text-sm font-semibold">{nearby.name}</p>
          <p className="mt-1 text-caption text-white/70">{nearby.description}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => setCurrentZone(nearby.id)}
            >
              Enter · E
            </Button>
            <Button asChild variant="secondary" size="sm" className="bg-white/10 text-white border-white/20">
              <Link href={nearby.href}>Open 2D page</Link>
            </Button>
          </div>
        </div>
      ) : null}

      {zone ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="rounded-xl border border-white/20 bg-black/70 px-6 py-4 text-center">
            <p className="text-sm font-semibold">Entering {zone.name}…</p>
            <p className="text-caption text-white/70">Loading 2D route</p>
          </div>
        </div>
      ) : null}

      {/* Minimap */}
      {showMinimap ? (
        <div
          className="pointer-events-none absolute right-3 bottom-3 hidden h-36 w-36 overflow-hidden rounded-xl border border-white/20 bg-black/55 shadow-lg backdrop-blur-md sm:block"
          aria-hidden
        >
          <div className="relative h-full w-full">
            {BUILDINGS.map((b) => {
              const mx = ((b.position[0] / WORLD_BOUNDS) * 0.5 + 0.5) * 100;
              const mz = ((b.position[2] / WORLD_BOUNDS) * 0.5 + 0.5) * 100;
              return (
                <span
                  key={b.id}
                  className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    left: `${mx}%`,
                    top: `${mz}%`,
                    background: b.accent,
                    boxShadow: nearbyBuilding === b.id ? `0 0 8px ${b.accent}` : undefined,
                  }}
                />
              );
            })}
            <span
              className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-sky-400"
              style={{
                left: `${((roverPosition[0] / WORLD_BOUNDS) * 0.5 + 0.5) * 100}%`,
                top: `${((roverPosition[2] / WORLD_BOUNDS) * 0.5 + 0.5) * 100}%`,
                transform: `translate(-50%, -50%) rotate(${(roverYaw * 180) / Math.PI}deg)`,
              }}
            />
          </div>
          <p className="absolute bottom-1 left-0 right-0 text-center text-[9px] uppercase tracking-wider text-white/50">
            Base Camp
          </p>
        </div>
      ) : null}

      {/* Destinations panel — a11y backbone */}
      {showDestinations ? (
        <div className="pointer-events-auto absolute top-16 left-3 max-h-[min(70dvh,28rem)] w-[min(100%-1.5rem,18rem)] overflow-auto rounded-xl border border-white/15 bg-black/75 p-3 shadow-xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">Travel</p>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-white hover:bg-white/10"
              aria-label="Close destinations"
              onClick={() => setShowDestinations(false)}
            >
              <X className="size-4" />
            </Button>
          </div>
          <p className="mb-2 text-caption text-white/60">
            Auto-drive without keyboard skill. Esc toggles this list.
          </p>
          <ul className="space-y-1">
            {BUILDINGS.map((b) => (
              <li key={b.id}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                    nearbyBuilding === b.id && "bg-white/10",
                  )}
                  onClick={() => {
                    setAutoDriveTarget(b.id);
                    setShowDestinations(false);
                  }}
                >
                  <span>
                    <span className="font-medium">{b.label}</span>
                    <span className="mt-0.5 block text-caption text-white/55">{b.name}</span>
                  </span>
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ background: b.accent }}
                    aria-hidden
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Help */}
      {showHelp ? (
        <div className="pointer-events-auto absolute top-16 right-3 w-[min(100%-1.5rem,16rem)] rounded-xl border border-white/15 bg-black/75 p-3 text-caption text-white/85 shadow-xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Controls</p>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-white hover:bg-white/10"
              aria-label="Close help"
              onClick={() => setShowHelp(false)}
            >
              <X className="size-4" />
            </Button>
          </div>
          <ul className="space-y-1.5">
            <li>
              <kbd className="font-mono text-white">WASD</kbd> / arrows — drive
            </li>
            <li>
              <kbd className="font-mono text-white">Space</kbd> — brake
            </li>
            <li>
              <kbd className="font-mono text-white">E</kbd> — enter building
            </li>
            <li>
              <kbd className="font-mono text-white">Esc</kbd> — destinations
            </li>
            <li>
              <kbd className="font-mono text-white">M</kbd> minimap · <kbd className="font-mono text-white">H</kbd> help ·{" "}
              <kbd className="font-mono text-white">C</kbd> camera
            </li>
            <li>Touch: joystick + destinations list</li>
          </ul>
        </div>
      ) : null}

      {/* Desktop control hint */}
      <p className="pointer-events-none absolute bottom-3 left-3 hidden text-[10px] uppercase tracking-wider text-white/45 md:block">
        WASD drive · E enter · Esc menu
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useWorldStore } from "@/store/world-store";
import { Terrain } from "@/world/environment/terrain";
import { WorldLighting } from "@/world/environment/lighting";
import { Buildings } from "@/world/buildings/building-mesh";
import { RoverPlayer } from "@/world/player/rover";
import { ChaseCamera } from "@/world/systems/chase-camera";
import { PerformanceGuardian } from "@/world/systems/performance";
import { attachKeyboardControls } from "@/world/systems/keyboard-controls";
import { WorldHud } from "@/world/ui/world-hud";
import { MobileControls } from "@/world/ui/mobile-controls";

type WorldCanvasProps = {
  quality?: "full" | "lite";
};

function WorldScene({
  quality,
  darkMode,
}: {
  quality: "full" | "lite";
  darkMode: boolean;
}) {
  return (
    <>
      <WorldLighting quality={quality} darkMode={darkMode} />
      <Terrain quality={quality} />
      <Buildings quality={quality} />
      <RoverPlayer quality={quality} />
      <ChaseCamera />
      <PerformanceGuardian quality={quality} />
    </>
  );
}

/**
 * Base Camp world canvas — Bruno Simon–inspired drivable yard.
 * Loaded only via /explore after capability gate. Marketing never imports this.
 */
export function WorldCanvas({ quality = "full" }: WorldCanvasProps) {
  const reduced = useReducedMotion();
  const setQuality = useWorldStore((s) => s.setQuality);
  const { resolvedTheme } = useTheme();
  const darkMode = resolvedTheme !== "light";
  const dpr: [number, number] = quality === "lite" ? [1, 1.25] : [1, 1.75];
  const [touch, setTouch] = React.useState(false);

  React.useEffect(() => {
    setQuality(quality);
  }, [quality, setQuality]);

  React.useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
    return attachKeyboardControls();
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-neutral-950">
      <Canvas
        dpr={dpr}
        shadows={quality === "full" && !reduced}
        camera={{ position: [0, 4.5, 10], fov: 42, near: 0.1, far: 120 }}
        gl={{
          antialias: quality === "full",
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0a0a0a");
        }}
        aria-hidden
        role="presentation"
      >
        <React.Suspense fallback={null}>
          <WorldScene quality={quality} darkMode={darkMode} />
        </React.Suspense>
      </Canvas>

      <WorldHud />
      <MobileControls enabled={touch || quality === "lite"} />

      <p className="sr-only">
        Interactive FISAT Base Camp. Drive the rover with WASD or the on-screen
        joystick. Use the Destinations menu to travel without driving. Exit to
        site returns to the full 2D website. All buildings also exist as normal
        pages.
      </p>
    </div>
  );
}

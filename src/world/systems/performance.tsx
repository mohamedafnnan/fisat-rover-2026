"use client";

import * as React from "react";
import { useThree, useFrame } from "@react-three/fiber";

/**
 * Adaptive performance: lower DPR when frame time spikes.
 */
export function PerformanceGuardian({ quality }: { quality: "full" | "lite" }) {
  const setDpr = useThree((s) => s.setDpr);
  const samples = React.useRef<number[]>([]);
  const baseMax = quality === "lite" ? 1.25 : 1.75;

  useFrame((_, dt) => {
    samples.current.push(dt);
    if (samples.current.length < 45) return;
    const avg =
      samples.current.reduce((a, b) => a + b, 0) / samples.current.length;
    samples.current = [];
    const slow = quality === "lite" ? avg > 1 / 28 : avg > 1 / 40;
    const fast = avg < 1 / 55;
    if (slow) {
      setDpr(Math.max(1, baseMax * 0.75));
    } else if (fast) {
      setDpr(baseMax);
    }
  });

  return null;
}

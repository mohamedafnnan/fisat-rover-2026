"use client";

import * as React from "react";
import { useWorldStore } from "@/store/world-store";
import { cn } from "@/lib/utils";

/**
 * Touch controls for lite / mobile Base Camp.
 * Large targets; complements Destinations menu (tap-to-travel).
 */
export function MobileControls({ enabled }: { enabled: boolean }) {
  const setInput = useWorldStore((s) => s.setInput);
  const stickRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);
  const [knob, setKnob] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!enabled) {
      setInput({ forward: 0, turn: 0, brake: false });
    }
  }, [enabled, setInput]);

  const updateFromPointer = (clientX: number, clientY: number) => {
    const el = stickRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = (clientX - cx) / (rect.width / 2);
    let dy = (clientY - cy) / (rect.height / 2);
    const mag = Math.hypot(dx, dy);
    if (mag > 1) {
      dx /= mag;
      dy /= mag;
    }
    setKnob({ x: dx, y: dy });
    // y: up = forward (negative screen y)
    setInput({
      turn: -dx,
      forward: -dy,
    });
  };

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-4 p-4 md:hidden">
      {/* Joystick */}
      <div
        ref={stickRef}
        className="pointer-events-auto relative size-28 touch-none rounded-full border border-white/25 bg-black/45 backdrop-blur-md"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setActive(true);
          updateFromPointer(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (!active) return;
          updateFromPointer(e.clientX, e.clientY);
        }}
        onPointerUp={() => {
          setActive(false);
          setKnob({ x: 0, y: 0 });
          setInput({ forward: 0, turn: 0 });
        }}
        onPointerCancel={() => {
          setActive(false);
          setKnob({ x: 0, y: 0 });
          setInput({ forward: 0, turn: 0 });
        }}
        role="application"
        aria-label="Drive joystick"
      >
        <div
          className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 shadow"
          style={{
            transform: `translate(calc(-50% + ${knob.x * 36}px), calc(-50% + ${knob.y * 36}px))`,
          }}
        />
      </div>

      <div className="pointer-events-auto flex flex-col gap-2">
        <button
          type="button"
          className={cn(
            "min-h-12 min-w-20 rounded-xl border border-white/25 bg-black/45 px-4 text-sm font-semibold text-white backdrop-blur-md active:bg-sky-500/40",
          )}
          onPointerDown={() => setInput({ brake: true })}
          onPointerUp={() => setInput({ brake: false })}
          onPointerCancel={() => setInput({ brake: false })}
        >
          Brake
        </button>
        <button
          type="button"
          className="min-h-12 min-w-20 rounded-xl border border-white/25 bg-sky-500/80 px-4 text-sm font-semibold text-white backdrop-blur-md active:bg-sky-400"
          onClick={() => {
            const near = useWorldStore.getState().nearbyBuilding;
            if (near) useWorldStore.getState().setCurrentZone(near);
            else useWorldStore.getState().setShowDestinations(true);
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

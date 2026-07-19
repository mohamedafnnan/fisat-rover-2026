"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms when parent reveals children */
  delayMs?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * One-shot fade+rise on enter. Disabled under reduced motion.
 * Uses IntersectionObserver — no scroll hijacking.
 */
export function Reveal({
  children,
  className,
  delayMs = 0,
  as: Comp = "div",
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = React.useState(reduced);

  React.useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <Comp
      ref={ref as never}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-[var(--ease-out)] motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
      style={delayMs && !reduced ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}

type CountUpProps = {
  value: number;
  suffix?: string;
  className?: string;
  durationMs?: number;
};

/** Count-up when scrolled into view. Instant under reduced motion. */
export function CountUp({
  value,
  suffix = "",
  className,
  durationMs = 900,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [display, setDisplay] = React.useState(reduced ? value : 0);
  const started = React.useRef(false);

  React.useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const from = 0;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(from + (value - from) * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

"use client";

import * as React from "react";

type ScrollDirection = "up" | "down" | null;

/**
 * Tracks scroll direction and whether the page has left the top.
 * Used by the sticky header (hide-on-down / show-on-up).
 */
export function useScrollDirection(threshold = 80) {
  const [direction, setDirection] = React.useState<ScrollDirection>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > threshold);
      if (Math.abs(y - lastY.current) < 4) return;
      setDirection(y > lastY.current ? "down" : "up");
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, scrolled };
}

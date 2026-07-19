"use client";

/**
 * GSAP is loaded only from client islands.
 * Prefer CSS for micro-interactions; use GSAP for choreography.
 */

export async function loadGsap() {
  const gsap = (await import("gsap")).default;
  return gsap;
}

export async function loadGsapWithScrollTrigger() {
  const gsap = (await import("gsap")).default;
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

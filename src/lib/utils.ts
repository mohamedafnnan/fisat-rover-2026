import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution (shadcn standard). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Absolute URL helper for metadata / OG. */
export function absoluteUrl(path = "") {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fisatrover.in";
  if (!path) return base;
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

/** Format a date for UI (en-IN default). */
export function formatDate(
  input: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
) {
  return new Intl.DateTimeFormat("en-IN", options).format(new Date(input));
}

/** Safe external link attributes. */
export function externalRel(isExternal?: boolean) {
  return isExternal ? { rel: "noopener noreferrer", target: "_blank" as const } : {};
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Sleep helper for demos / staggered UI (avoid in production hot paths). */
export function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

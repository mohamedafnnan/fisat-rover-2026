import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const staticRoutes = [
  "",
  "/mission",
  "/rover",
  "/rover/subsystems",
  "/rover/archive",
  "/engineering",
  "/team",
  "/team/divisions",
  "/team/advisors",
  "/team/alumni",
  "/journal",
  "/achievements",
  "/sponsors",
  "/sponsors/tiers",
  "/sponsors/partners",
  "/join",
  "/join/roles",
  "/join/process",
  "/join/apply",
  "/contact",
  "/press",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/join" || route === "/sponsors" ? 0.9 : 0.7,
  }));
}

/** Shared foundation types. CMS-generated types will extend these later. */

export type SeoFields = {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
};

export type Cta = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "tertiary" | "hero";
  external?: boolean;
};

export type MediaRef = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
};

export type SubsystemSlug =
  | "mechanical"
  | "arm"
  | "electronics"
  | "software"
  | "autonomy"
  | "science";

export type PublishStatus = "draft" | "published" | "archived";

import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Apply",
  description: "Application form for the FISAT Rover Team.",
  path: "/join/apply",
});

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

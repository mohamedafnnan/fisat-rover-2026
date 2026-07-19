import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Single front door for all FISAT Rover Team inquiries.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

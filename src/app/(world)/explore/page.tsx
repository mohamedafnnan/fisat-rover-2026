import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { WorldEntry } from "@/world/core/world-entry";

export const metadata: Metadata = buildMetadata({
  title: "Base Camp",
  description:
    "Opt-in interactive Base Camp experience for the FISAT Rover Team. Progressive enhancement — the 2D site remains the primary experience.",
  path: "/explore",
  noIndex: true,
});

export default function ExplorePage() {
  return <WorldEntry />;
}

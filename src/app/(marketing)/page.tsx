import { buildMetadata } from "@/lib/seo/metadata";
import {
  HomeHero,
  HomeMission,
  HomeCurrentRover,
  HomeCompetitionHistory,
  HomeTeamPreview,
  HomeSponsorsPreview,
  HomeGalleryPreview,
  HomeRecruitmentCta,
} from "@/components/sections/home";

export const metadata = buildMetadata({
  path: "/",
  description:
    "Official website of the FISAT Rover Team — engineering excellence, competitions, sponsorship, and recruitment.",
});

/**
 * Home `/` — product composition only.
 * Footer comes from marketing layout. Other routes untouched.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeMission />
      <HomeCurrentRover />
      <HomeCompetitionHistory />
      <HomeTeamPreview />
      <HomeSponsorsPreview />
      <HomeGalleryPreview />
      <HomeRecruitmentCta />
    </>
  );
}

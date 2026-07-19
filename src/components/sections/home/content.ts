/**
 * Home page content — CMS-ready shape.
 * Swap this module for Payload fetchers without touching section components.
 */

export const homeHero = {
  eyebrow: "University Rover Challenge · FISAT",
  headline: "Engineering for Mars, built in Kerala.",
  subhead:
    "The official home of the FISAT Rover Team — competition-proven systems, open engineering culture, and a path for the next generation of builders.",
  primaryCta: { label: "Explore the Rover", href: "/rover" },
  secondaryCta: { label: "Join the Team", href: "/join" },
  tertiaryCta: { label: "Sponsor Us", href: "/sponsors" },
  scrollCue: "Scroll to explore",
  staticToggleLabel: "Static view",
  interactiveToggleLabel: "Interactive view",
} as const;

export const homeMission = {
  eyebrow: "Mission",
  title: "Build. Compete. Inspire.",
  body: "We design, fabricate, and field planetary rovers for international competitions — proving that student engineering from India can meet world-class standards in autonomy, science, and extreme terrain mobility.",
  values: [
    {
      title: "Engineering excellence",
      description: "Subsystem ownership, design reviews, and test-driven iteration from CAD to field.",
    },
    {
      title: "Competition grit",
      description: "URC-aligned missions: extreme traversal, equipment servicing, autonomous navigation, and science.",
    },
    {
      title: "Open culture",
      description: "Documented decisions, mentorship across batches, and knowledge that outlives a single season.",
    },
  ],
  cta: { label: "Read our mission", href: "/mission" },
} as const;

export const homeCurrentRover = {
  eyebrow: "Current rover",
  name: "Artemis · 2026",
  summary:
    "Our latest platform balances mass, modularity, and field serviceability — six-wheel rocker mobility, manipulator reach for equipment tasks, and a science bay built for rapid sample workflows.",
  specs: [
    { label: "Mass budget", value: "~50 kg" },
    { label: "Drive", value: "6× rocker" },
    { label: "Arm DOF", value: "6" },
    { label: "Compute", value: "Hybrid edge" },
  ],
  subsystems: [
    { title: "Mechanical", href: "/rover/subsystems/mechanical", blurb: "Chassis, suspension, thermal" },
    { title: "Arm", href: "/rover/subsystems/arm", blurb: "Manipulator & end-effector" },
    { title: "Electronics", href: "/rover/subsystems/electronics", blurb: "Power, harness, PCBs" },
    { title: "Software", href: "/rover/subsystems/software", blurb: "Control stack & tooling" },
    { title: "Autonomy", href: "/rover/subsystems/autonomy", blurb: "Perception & planning" },
    { title: "Science", href: "/rover/subsystems/science", blurb: "Sampling & analysis" },
  ],
  cta: { label: "Full rover overview", href: "/rover" },
} as const;

export const homeCompetitions = {
  eyebrow: "Competition history",
  title: "Proof on the field",
  body: "Seasons of design reports, system tests, and competition runs — archived so the next team starts ahead.",
  milestones: [
    {
      year: "2023",
      title: "Foundation season",
      result: "Team formed",
      detail: "First full design cycle, manufacturing pipeline, and competition readiness baseline.",
    },
    {
      year: "2024",
      title: "Systems integration",
      result: "Field trials",
      detail: "End-to-end subsystem integration, long-range comms, and science workflow dry runs.",
    },
    {
      year: "2025",
      title: "Competition campaign",
      result: "National stage",
      detail: "Competition deployment with documented lessons across mobility, arm, and autonomy.",
    },
    {
      year: "2026",
      title: "Artemis platform",
      result: "In progress",
      detail: "Next-gen rover with tighter mass control, modular science bay, and stronger autonomy stack.",
    },
  ],
  cta: { label: "View achievements", href: "/achievements" },
} as const;

export const homeTeam = {
  eyebrow: "Team",
  title: "Builders across six subsystems",
  body: "Mechanical, arm, electronics, software, autonomy, and science — led by students, mentored by faculty and alumni.",
  members: [
    { name: "A. Krishnan", role: "Team Lead", division: "Leadership" },
    { name: "S. Nair", role: "Mechanical Lead", division: "Mechanical" },
    { name: "R. Menon", role: "Autonomy Lead", division: "Autonomy" },
    { name: "P. Thomas", role: "Electronics Lead", division: "Electronics" },
    { name: "M. George", role: "Science Lead", division: "Science" },
    { name: "J. Fernandez", role: "Software Lead", division: "Software" },
  ],
  cta: { label: "Meet the team", href: "/team" },
} as const;

export const homeSponsors = {
  eyebrow: "Sponsors",
  title: "Partners who power the mission",
  body: "Hardware, tooling, travel, and mentorship — sponsorship funds real engineering outcomes, not vanity branding.",
  tiers: [
    { name: "Principal", note: "Platform partner" },
    { name: "Gold", note: "Systems partner" },
    { name: "Silver", note: "Tools & travel" },
    { name: "Community", note: "Local industry" },
  ],
  emptyCta: { label: "Become a founding sponsor", href: "/sponsors" },
  cta: { label: "Sponsorship tiers", href: "/sponsors/tiers" },
} as const;

export const homeGallery = {
  eyebrow: "Gallery",
  title: "From CAD to dust",
  body: "Manufacturing, integration, and field tests — a visual archive of how the rover comes together.",
  items: [
    { id: "g1", alt: "Chassis fabrication on the shop floor", label: "Fabrication" },
    { id: "g2", alt: "Arm integration on the rover deck", label: "Integration" },
    { id: "g3", alt: "Electronics harness routing", label: "Electronics" },
    { id: "g4", alt: "Field traverse on rocky terrain", label: "Field test" },
    { id: "g5", alt: "Science bay sample workflow", label: "Science" },
    { id: "g6", alt: "Team with rover after a trial run", label: "Team" },
  ],
  cta: { label: "More in the journal", href: "/journal" },
} as const;

export const homeRecruitment = {
  tone: "join" as const,
  eyebrow: "Recruitment",
  headline: "Build a Mars rover with us.",
  subhead:
    "Open roles across mechanical, electronics, software, autonomy, and science. No prior rover experience required — ownership and curiosity are.",
  primaryCta: { label: "View open roles", href: "/join/roles" },
  secondaryCta: { label: "How applications work", href: "/join/process" },
} as const;

export const homeStats = [
  { label: "Subsystems", value: 6 },
  { label: "Active builders", value: 40, suffix: "+" },
  { label: "Design seasons", value: 4 },
  { label: "Docs & reports", value: 25, suffix: "+" },
] as const;

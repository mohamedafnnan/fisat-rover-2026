export type PlaceholderRoute = {
  title: string;
  description: string;
  path: string;
};

export const placeholderRoutes = {
  mission: {
    title: "Mission",
    description: "Who we are, competitions we enter, and the milestones that define us.",
    path: "/mission",
  },
  rover: {
    title: "The Rover",
    description: "Current-season rover overview, specs, and subsystem entry points.",
    path: "/rover",
  },
  subsystems: {
    title: "Subsystems",
    description: "Mechanical, arm, electronics, software, autonomy, and science.",
    path: "/rover/subsystems",
  },
  subsystemDetail: {
    title: "Subsystem",
    description: "Subsystem detail page shell. Content arrives with CMS wiring.",
    path: "/rover/subsystems/[slug]",
  },
  archive: {
    title: "Rover Archive",
    description: "Historical record of every rover generation.",
    path: "/rover/archive",
  },
  archiveDetail: {
    title: "Rover Generation",
    description: "Archived rover detail shell.",
    path: "/rover/archive/[slug]",
  },
  engineering: {
    title: "Engineering",
    description: "Stripe-grade documentation hub for design reports and standards.",
    path: "/engineering",
  },
  engineeringCategory: {
    title: "Engineering Category",
    description: "Category listing shell for engineering documents.",
    path: "/engineering/[category]",
  },
  engineeringDoc: {
    title: "Engineering Document",
    description: "Document detail shell.",
    path: "/engineering/[category]/[slug]",
  },
  team: {
    title: "Team",
    description: "Leadership, divisions, advisors, and alumni.",
    path: "/team",
  },
  divisions: {
    title: "Divisions",
    description: "Subsystem divisions and members.",
    path: "/team/divisions",
  },
  advisors: {
    title: "Advisors",
    description: "Faculty and advisors.",
    path: "/team/advisors",
  },
  alumni: {
    title: "Alumni",
    description: "Alumni and where they are now.",
    path: "/team/alumni",
  },
  journal: {
    title: "Journal",
    description: "Build logs, competition diaries, and storytelling.",
    path: "/journal",
  },
  journalCategory: {
    title: "Journal Category",
    description: "Filtered journal listing shell.",
    path: "/journal/category/[slug]",
  },
  journalPost: {
    title: "Journal Post",
    description: "Article shell.",
    path: "/journal/[slug]",
  },
  achievements: {
    title: "Achievements",
    description: "Results, awards, rankings, and press.",
    path: "/achievements",
  },
  achievementDetail: {
    title: "Competition",
    description: "Competition recap shell.",
    path: "/achievements/[slug]",
  },
  sponsors: {
    title: "Sponsors",
    description: "Why sponsor us, tiers, partners, and prospectus.",
    path: "/sponsors",
  },
  sponsorTiers: {
    title: "Sponsorship Tiers",
    description: "Tier comparison and benefits.",
    path: "/sponsors/tiers",
  },
  sponsorPartners: {
    title: "Our Partners",
    description: "Sponsor wall and testimonials.",
    path: "/sponsors/partners",
  },
  join: {
    title: "Join the Team",
    description: "Recruitment landing — roles, process, and application.",
    path: "/join",
  },
  roles: {
    title: "Open Roles",
    description: "Roles by subsystem.",
    path: "/join/roles",
  },
  process: {
    title: "Recruitment Process",
    description: "Timeline, steps, and FAQ.",
    path: "/join/process",
  },
  apply: {
    title: "Apply",
    description: "Application form shell.",
    path: "/join/apply",
  },
  contact: {
    title: "Contact",
    description: "Single front door for all inquiries.",
    path: "/contact",
  },
  press: {
    title: "Press / Media Kit",
    description: "Brand assets, fact sheet, and press contact.",
    path: "/press",
  },
  privacy: {
    title: "Privacy",
    description: "Privacy policy.",
    path: "/privacy",
  },
  terms: {
    title: "Terms",
    description: "Terms of use.",
    path: "/terms",
  },
  search: {
    title: "Search",
    description: "Global search across pages, docs, journal, team, and achievements.",
    path: "/search",
  },
  explore: {
    title: "Base Camp",
    description: "Opt-in Bruno Simon–inspired interactive world (isolated island).",
    path: "/explore",
  },
} as const;

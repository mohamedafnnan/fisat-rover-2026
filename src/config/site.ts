export const siteConfig = {
  name: "FISAT Rover Team",
  shortName: "FISAT Rover",
  description:
    "Official website of the FISAT Rover Team — engineering excellence, competition archives, sponsorship, and recruitment.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fisatrover.in",
  ogImage: "/images/og-default.jpg",
  locale: "en_IN",
  creator: "FISAT Rover Team",
  keywords: [
    "FISAT Rover Team",
    "university rover",
    "URC",
    "Mars rover",
    "engineering",
    "robotics",
    "FISAT",
    "Angamaly",
  ],
  links: {
    github: "https://github.com/fisatrover",
    instagram: "https://instagram.com/fisatrover",
    linkedin: "https://linkedin.com/company/fisatrover",
    youtube: "https://youtube.com/@fisatrover",
    email: "mailto:rover@fisat.ac.in",
  },
} as const;

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
  external?: boolean;
};

/** Primary navigation — mirrors Architecture IA. CMS-ready shape. */
export const mainNav: NavItem[] = [
  {
    title: "The Rover",
    href: "/rover",
    description: "Current rover, subsystems, and archive",
    children: [
      {
        title: "Overview",
        href: "/rover",
        description: "Current-season rover and specs",
      },
      {
        title: "Subsystems",
        href: "/rover/subsystems",
        description: "Mechanical, arm, electronics, software, autonomy, science",
      },
      {
        title: "Archive",
        href: "/rover/archive",
        description: "Past rover generations",
      },
    ],
  },
  {
    title: "Engineering",
    href: "/engineering",
    description: "Design reports, architecture, standards",
    children: [
      {
        title: "Docs Home",
        href: "/engineering",
        description: "Browse all engineering documentation",
      },
      {
        title: "Design Reports",
        href: "/engineering/design-reports",
        description: "Competition design documentation",
      },
      {
        title: "Architecture",
        href: "/engineering/architecture",
        description: "System architecture and diagrams",
      },
      {
        title: "Testing",
        href: "/engineering/testing",
        description: "Test plans and validation",
      },
      {
        title: "Standards",
        href: "/engineering/standards",
        description: "Processes and conventions",
      },
      {
        title: "Resources",
        href: "/engineering/resources",
        description: "Downloads and open materials",
      },
    ],
  },
  {
    title: "Team",
    href: "/team",
    description: "Members, advisors, and alumni",
  },
  {
    title: "Journal",
    href: "/journal",
    description: "Build logs and stories",
  },
  {
    title: "Sponsors",
    href: "/sponsors",
    description: "Partner with the team",
  },
];

export const footerNav = {
  explore: [
    { title: "Mission", href: "/mission" },
    { title: "The Rover", href: "/rover" },
    { title: "Subsystems", href: "/rover/subsystems" },
    { title: "Rover Archive", href: "/rover/archive" },
    { title: "Achievements", href: "/achievements" },
  ],
  engineering: [
    { title: "Docs Home", href: "/engineering" },
    { title: "Design Reports", href: "/engineering/design-reports" },
    { title: "Architecture", href: "/engineering/architecture" },
    { title: "Standards", href: "/engineering/standards" },
    { title: "Resources", href: "/engineering/resources" },
  ],
  getInvolved: [
    { title: "Join the Team", href: "/join" },
    { title: "Open Roles", href: "/join/roles" },
    { title: "Sponsor Us", href: "/sponsors" },
    { title: "Sponsorship Tiers", href: "/sponsors/tiers" },
    { title: "Contact", href: "/contact" },
  ],
  connect: [
    { title: "Journal", href: "/journal" },
    { title: "Press / Media Kit", href: "/press" },
    { title: "Search", href: "/search" },
  ],
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

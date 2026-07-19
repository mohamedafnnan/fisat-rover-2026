/**
 * CMS-ready content for marketing pages.
 * Replace fetchers with Payload later without rewriting page composition.
 */

export const subsystems = [
  {
    slug: "mechanical",
    title: "Mechanical",
    summary: "Chassis, rocker suspension, thermal, and structural integrity under competition loads.",
    lead: "S. Nair",
    chips: ["CAD", "FEA", "Manufacturing"],
  },
  {
    slug: "arm",
    title: "Arm",
    summary: "Six-DOF manipulator, end-effector tooling, and equipment-servicing reach.",
    lead: "K. Pillai",
    chips: ["Kinematics", "Actuation", "Tooling"],
  },
  {
    slug: "electronics",
    title: "Electronics",
    summary: "Power distribution, harnessing, PCBs, and reliable field wiring.",
    lead: "P. Thomas",
    chips: ["Power", "PCB", "Harness"],
  },
  {
    slug: "software",
    title: "Software",
    summary: "Control stack, tooling, telemetry, and operator interfaces.",
    lead: "J. Fernandez",
    chips: ["ROS", "UI", "Telemetry"],
  },
  {
    slug: "autonomy",
    title: "Autonomy",
    summary: "Perception, planning, and long-range navigation for unattended traverse.",
    lead: "R. Menon",
    chips: ["Vision", "Planning", "SLAM"],
  },
  {
    slug: "science",
    title: "Science",
    summary: "Sample acquisition, onboard analysis workflow, and science bay packaging.",
    lead: "M. George",
    chips: ["Sampling", "Sensors", "Workflow"],
  },
] as const;

export const roverGenerations = [
  {
    slug: "artemis-2026",
    year: "2026",
    name: "Artemis",
    summary: "Current platform — modular science bay, tighter mass control, stronger autonomy stack.",
    result: "In progress",
    chips: ["~50 kg", "6× rocker", "6-DOF arm"],
  },
  {
    slug: "pathfinder-2025",
    year: "2025",
    name: "Pathfinder",
    summary: "Competition campaign rover with documented lessons across mobility, arm, and autonomy.",
    result: "National stage",
    chips: ["Field proven", "Comms", "Science bay"],
  },
  {
    slug: "pioneer-2024",
    year: "2024",
    name: "Pioneer",
    summary: "First full integration season — long-range comms and science dry runs.",
    result: "Field trials",
    chips: ["Integration", "Trials"],
  },
  {
    slug: "genesis-2023",
    year: "2023",
    name: "Genesis",
    summary: "Foundation season platform that established manufacturing and design review culture.",
    result: "Team formed",
    chips: ["Baseline", "Process"],
  },
] as const;

export const teamLeads = [
  { name: "A. Krishnan", role: "Team Lead", division: "Leadership", variant: "lead" as const, bio: "Owns season goals, systems integration, and external partnerships." },
  { name: "S. Nair", role: "Mechanical Lead", division: "Mechanical", variant: "lead" as const },
  { name: "R. Menon", role: "Autonomy Lead", division: "Autonomy", variant: "lead" as const },
  { name: "P. Thomas", role: "Electronics Lead", division: "Electronics", variant: "lead" as const },
  { name: "M. George", role: "Science Lead", division: "Science", variant: "lead" as const },
  { name: "J. Fernandez", role: "Software Lead", division: "Software", variant: "lead" as const },
];

export const advisors = [
  { name: "Dr. L. Mathew", role: "Faculty Advisor", division: "Mechanical", variant: "advisor" as const, bio: "Guides design reviews and manufacturing partnerships." },
  { name: "Prof. N. Joseph", role: "Faculty Advisor", division: "Electronics", variant: "advisor" as const, bio: "Supports power systems and embedded reliability." },
  { name: "Dr. A. Rahman", role: "Industry Mentor", division: "Autonomy", variant: "advisor" as const, bio: "Advises perception stack and field test methodology." },
];

export const alumni = [
  { name: "V. Iyer", role: "Former Team Lead", division: "Leadership", variant: "alumni" as const, bio: "Now in robotics systems engineering." },
  { name: "H. Das", role: "Former Autonomy Lead", division: "Autonomy", variant: "alumni" as const, bio: "Working on perception for industrial AGVs." },
  { name: "S. Rao", role: "Former Mechanical Lead", division: "Mechanical", variant: "alumni" as const, bio: "Product design at an EV startup." },
];

export const journalPosts = [
  {
    slug: "arm-integration-week",
    title: "Arm integration week on Artemis",
    summary: "End-effector swaps, reach envelopes, and the first full equipment-servicing dry run.",
    category: "Build log",
    date: "2026-06-12",
  },
  {
    slug: "field-trial-angamaly",
    title: "Field trial notes — rocky traverse",
    summary: "Suspension tuning after three days on broken terrain near campus.",
    category: "Field test",
    date: "2026-05-28",
  },
  {
    slug: "science-bay-v2",
    title: "Science bay v2 packaging",
    summary: "Faster sample workflows and cleaner cable routing for competition day.",
    category: "Science",
    date: "2026-05-04",
  },
  {
    slug: "recruitment-2026",
    title: "Why we recruit across six subsystems",
    summary: "How ownership works for first-years and what we look for beyond GPAs.",
    category: "Culture",
    date: "2026-04-18",
  },
  {
    slug: "design-review-3",
    title: "Design review #3 takeaways",
    summary: "Mass budget cuts, thermal margins, and autonomy fallback modes.",
    category: "Engineering",
    date: "2026-03-30",
  },
  {
    slug: "sponsor-day",
    title: "Sponsor day on the shop floor",
    summary: "What partners saw when Artemis rolled under its own power.",
    category: "Sponsors",
    date: "2026-03-08",
  },
] as const;

export const achievements = [
  {
    slug: "2025-national",
    year: "2025",
    title: "National stage — Pathfinder",
    result: "National stage",
    detail: "Competition deployment with documented lessons across mobility, arm, and autonomy.",
  },
  {
    slug: "2024-field",
    year: "2024",
    title: "Systems integration field trials",
    result: "Field trials",
    detail: "End-to-end subsystem integration, long-range comms, and science workflow dry runs.",
  },
  {
    slug: "2023-founding",
    year: "2023",
    title: "Team foundation",
    result: "Founded",
    detail: "First full design cycle, manufacturing pipeline, and competition readiness baseline.",
  },
] as const;

export const sponsorTiers = [
  {
    name: "Principal",
    price: "Custom",
    recommended: true,
    benefits: [
      "Primary rover branding",
      "Title placement on site & Base Camp",
      "Campus + competition visibility",
      "Quarterly engineering briefings",
      "Recruitment access",
    ],
  },
  {
    name: "Gold",
    price: "Season",
    recommended: false,
    benefits: [
      "Logo on rover + site tier wall",
      "Social + journal mentions",
      "Shop-floor visit day",
      "Resume book access",
    ],
  },
  {
    name: "Silver",
    price: "Season",
    recommended: false,
    benefits: [
      "Site + apparel logo",
      "Event shout-outs",
      "Team newsletter",
    ],
  },
  {
    name: "Community",
    price: "Flexible",
    recommended: false,
    benefits: [
      "Local industry recognition",
      "Site listing",
      "Open house invite",
    ],
  },
] as const;

export const openRoles = [
  { title: "Mechanical Design Engineer", subsystem: "Mechanical", status: "open" as const, summary: "CAD ownership for chassis modules and manufacturing drawings." },
  { title: "Arm Controls", subsystem: "Arm", status: "open" as const, summary: "Trajectory planning, payload handling, and tool sequences." },
  { title: "Power Electronics", subsystem: "Electronics", status: "open" as const, summary: "Battery management, distribution, and harness reliability." },
  { title: "Autonomy Perception", subsystem: "Autonomy", status: "open" as const, summary: "Vision pipelines and obstacle detection for traverse." },
  { title: "Science Ops", subsystem: "Science", status: "open" as const, summary: "Sample workflows, sensor calibration, and documentation." },
  { title: "Full-stack Tools", subsystem: "Software", status: "closed" as const, summary: "Internal dashboards and telemetry tooling — waitlist open." },
] as const;

export const engineeringCategories = [
  { slug: "design-reports", title: "Design Reports", summary: "Competition design documentation and system narratives." },
  { slug: "architecture", title: "Architecture", summary: "System diagrams, interfaces, and decision records." },
  { slug: "testing", title: "Testing", summary: "Test plans, validation matrices, and field results." },
  { slug: "standards", title: "Standards", summary: "Processes, conventions, and quality checklists." },
  { slug: "resources", title: "Resources", summary: "Downloads, templates, and open materials." },
] as const;

export const missionValues = [
  {
    title: "Engineering excellence",
    description: "Subsystem ownership, design reviews, and test-driven iteration from CAD to field.",
  },
  {
    title: "Competition grit",
    description: "URC-aligned missions: extreme traversal, equipment servicing, autonomy, and science.",
  },
  {
    title: "Open culture",
    description: "Documented decisions, mentorship across batches, and knowledge that outlives a season.",
  },
] as const;

export const galleryItems = [
  { id: "g1", label: "Fabrication", alt: "Chassis fabrication on the shop floor" },
  { id: "g2", label: "Integration", alt: "Arm integration on the rover deck" },
  { id: "g3", label: "Electronics", alt: "Electronics harness routing" },
  { id: "g4", label: "Field test", alt: "Field traverse on rocky terrain" },
  { id: "g5", label: "Science", alt: "Science bay sample workflow" },
  { id: "g6", label: "Team", alt: "Team with rover after a trial run" },
  { id: "g7", label: "Design review", alt: "Design review session with CAD on screen" },
  { id: "g8", label: "Competition prep", alt: "Competition packing and checklist" },
] as const;

export const joinFaqs = [
  {
    question: "Do I need prior rover experience?",
    answer: "No. We hire for ownership and curiosity. First-years regularly ship real subsystem work under leads.",
  },
  {
    question: "How long is the process?",
    answer: "Typically 2–3 weeks: application → short task or conversation → team fit discussion → offer.",
  },
  {
    question: "Can I apply to multiple subsystems?",
    answer: "Yes — list a primary and secondary preference. We place people where impact is highest.",
  },
  {
    question: "What is the time commitment?",
    answer: "Varies by season phase. Expect weekly ownership plus integration sprints before competitions.",
  },
] as const;

export const contactChannels = [
  { label: "General", value: "rover@fisat.ac.in", href: "mailto:rover@fisat.ac.in" },
  { label: "Sponsorship", value: "sponsors@fisatrover.in", href: "mailto:sponsors@fisatrover.in" },
  { label: "Press", value: "press@fisatrover.in", href: "mailto:press@fisatrover.in" },
  { label: "Campus", value: "FISAT, Angamaly, Kerala", href: "/contact" },
] as const;

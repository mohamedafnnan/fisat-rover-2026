export type BuildingId =
  | "plaza"
  | "engineering"
  | "archive"
  | "sponsors"
  | "mission-control"
  | "museum"
  | "science"
  | "trophy"
  | "broadcast"
  | "recruitment"
  | "comms";

export type BuildingDef = {
  id: BuildingId;
  name: string;
  label: string;
  href: string;
  /** World position [x, y, z] */
  position: [number, number, number];
  /** Building footprint half-extents for collision */
  size: [number, number, number];
  accent: string;
  description: string;
};

/** Radial Base Camp layout around central plaza — compact Bruno-style yard. */
export const BUILDINGS: BuildingDef[] = [
  {
    id: "plaza",
    name: "Central Plaza",
    label: "Current Rover",
    href: "/rover",
    position: [0, 0, 0],
    size: [3.2, 1.2, 3.2],
    accent: "#38bdf8",
    description: "Season rover on the lit podium",
  },
  {
    id: "comms",
    name: "Comms Array",
    label: "Contact",
    href: "/contact",
    position: [0, 0, -18],
    size: [2.4, 2.2, 2.4],
    accent: "#67e8f9",
    description: "Landing pad · exit to site",
  },
  {
    id: "recruitment",
    name: "Recruitment Airlock",
    label: "Join",
    href: "/join",
    position: [-14, 0, -10],
    size: [2.6, 1.8, 2.6],
    accent: "#4ade80",
    description: "Open roles & apply",
  },
  {
    id: "sponsors",
    name: "Sponsor Pavilion",
    label: "Sponsors",
    href: "/sponsors",
    position: [14, 0, -10],
    size: [3, 2, 3],
    accent: "#fbbf24",
    description: "Partners & tiers",
  },
  {
    id: "mission-control",
    name: "Mission Control",
    label: "Team",
    href: "/team",
    position: [-18, 0, 0],
    size: [3, 2.2, 3],
    accent: "#a78bfa",
    description: "Divisions & leads",
  },
  {
    id: "trophy",
    name: "Trophy Hall",
    label: "Achievements",
    href: "/achievements",
    position: [18, 0, 0],
    size: [3, 2.4, 3],
    accent: "#f472b6",
    description: "Competition results",
  },
  {
    id: "engineering",
    name: "Engineering Bay",
    label: "Subsystems",
    href: "/rover/subsystems",
    position: [-14, 0, 12],
    size: [3.4, 2, 3.4],
    accent: "#38bdf8",
    description: "Six subsystem bays",
  },
  {
    id: "science",
    name: "Science Center",
    label: "Engineering Docs",
    href: "/engineering",
    position: [14, 0, 12],
    size: [3, 2.2, 3],
    accent: "#2dd4bf",
    description: "Design reports archive",
  },
  {
    id: "archive",
    name: "Archive Hangar",
    label: "Rover Archive",
    href: "/rover/archive",
    position: [-8, 0, 20],
    size: [3.6, 1.8, 3],
    accent: "#94a3b8",
    description: "Past rover generations",
  },
  {
    id: "museum",
    name: "Museum Dome",
    label: "Gallery",
    href: "/press",
    position: [8, 0, 20],
    size: [3.2, 2.4, 3.2],
    accent: "#fb923c",
    description: "Media & field photos",
  },
  {
    id: "broadcast",
    name: "Broadcast Tower",
    label: "Journal",
    href: "/journal",
    position: [0, 0, 24],
    size: [2.2, 3.2, 2.2],
    accent: "#f87171",
    description: "Build logs & stories",
  },
];

export const WORLD_BOUNDS = 32;
export const INTERACT_RADIUS = 4.2;

export function getBuilding(id: BuildingId) {
  return BUILDINGS.find((b) => b.id === id);
}

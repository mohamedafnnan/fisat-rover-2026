import { BUILDINGS, WORLD_BOUNDS, type BuildingDef } from "@/world/data/buildings";

export type Vec2 = { x: number; z: number };

/** Soft valley rim — gently push back inside bounds. */
export function applyWorldBounds(x: number, z: number): Vec2 {
  const limit = WORLD_BOUNDS - 1.5;
  const soft = 2.5;
  let nx = x;
  let nz = z;

  const mag = Math.hypot(x, z);
  if (mag > limit) {
    const over = mag - limit;
    const t = Math.min(1, over / soft);
    const scale = 1 - t * 0.35;
    nx = x * scale;
    nz = z * scale;
    // hard clamp
    const m2 = Math.hypot(nx, nz);
    if (m2 > WORLD_BOUNDS - 0.2) {
      const s = (WORLD_BOUNDS - 0.2) / m2;
      nx *= s;
      nz *= s;
    }
  }
  return { x: nx, z: nz };
}

/** Axis-aligned box collision against building footprints (expanded). */
export function resolveBuildingCollisions(
  x: number,
  z: number,
  radius = 0.85,
): Vec2 {
  let nx = x;
  let nz = z;

  for (const b of BUILDINGS) {
    // Plaza podium is drive-around, not a hard wall at center
    if (b.id === "plaza") continue;

    const [hx, , hz] = b.size;
    const halfX = hx / 2 + radius;
    const halfZ = hz / 2 + radius;
    const [bx, , bz] = b.position;

    const dx = nx - bx;
    const dz = nz - bz;
    if (Math.abs(dx) < halfX && Math.abs(dz) < halfZ) {
      // Push out along least penetration axis
      const px = halfX - Math.abs(dx);
      const pz = halfZ - Math.abs(dz);
      if (px < pz) {
        nx = bx + Math.sign(dx || 1) * halfX;
      } else {
        nz = bz + Math.sign(dz || 1) * halfZ;
      }
    }
  }
  return { x: nx, z: nz };
}

export function nearestBuilding(
  x: number,
  z: number,
  maxDist: number,
): BuildingDef | null {
  let best: BuildingDef | null = null;
  let bestD = maxDist;
  for (const b of BUILDINGS) {
    if (b.id === "plaza") continue;
    const d = Math.hypot(x - b.position[0], z - b.position[2]);
    if (d < bestD) {
      bestD = d;
      best = b;
    }
  }
  return best;
}

export function distanceToBuilding(x: number, z: number, b: BuildingDef) {
  return Math.hypot(x - b.position[0], z - b.position[2]);
}

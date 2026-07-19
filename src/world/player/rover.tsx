"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWorldStore } from "@/store/world-store";
import { BUILDINGS, INTERACT_RADIUS } from "@/world/data/buildings";
import {
  applyWorldBounds,
  nearestBuilding,
  resolveBuildingCollisions,
  distanceToBuilding,
} from "@/world/systems/collision";

const MAX_SPEED = 9.5;
const ACCEL = 14;
const BRAKE = 22;
const DRAG = 3.2;
const TURN_RATE = 2.4;

type RoverProps = {
  quality?: "full" | "lite";
};

export function RoverPlayer({ quality = "full" }: RoverProps) {
  const group = React.useRef<THREE.Group>(null);
  const bodyRef = React.useRef({
    x: 0,
    z: 4,
    yaw: 0,
    speed: 0,
  });
  const wheelRefs = React.useRef<THREE.Mesh[]>([]);
  const interactLatch = React.useRef(false);

  useFrame((_, dt) => {
    const clampedDt = Math.min(dt, 0.05);
    const store = useWorldStore.getState();
    const { input, autoDriveTarget } = store;
    const body = bodyRef.current;

    let throttle = input.forward;
    let steer = input.turn;

    // Auto-drive toward destination (menu travel / tap-to-travel)
    if (autoDriveTarget) {
      const target = BUILDINGS.find((b) => b.id === autoDriveTarget);
      if (target) {
        const dx = target.position[0] - body.x;
        const dz = target.position[2] - body.z;
        const dist = Math.hypot(dx, dz);
        const desiredYaw = Math.atan2(dx, dz);
        let dyaw = desiredYaw - body.yaw;
        while (dyaw > Math.PI) dyaw -= Math.PI * 2;
        while (dyaw < -Math.PI) dyaw += Math.PI * 2;
        steer = THREE.MathUtils.clamp(dyaw * 1.8, -1, 1);
        throttle = dist > 2.2 ? 0.85 : dist > 1.1 ? 0.25 : 0;
        if (dist < 1.4) {
          store.setAutoDriveTarget(null);
          store.setNearbyBuilding(target.id);
        }
      }
    }

    // Arcade dynamics
    if (input.brake) {
      body.speed = THREE.MathUtils.damp(body.speed, 0, BRAKE, clampedDt);
    } else {
      body.speed += throttle * ACCEL * clampedDt;
      body.speed -= Math.sign(body.speed) * DRAG * clampedDt;
      if (Math.abs(body.speed) < 0.05 && throttle === 0) body.speed = 0;
    }
    body.speed = THREE.MathUtils.clamp(body.speed, -MAX_SPEED * 0.45, MAX_SPEED);

    const speedFactor = THREE.MathUtils.clamp(Math.abs(body.speed) / MAX_SPEED, 0, 1);
    body.yaw += steer * TURN_RATE * (0.35 + speedFactor) * Math.sign(body.speed || throttle || 1) * clampedDt;

    body.x += Math.sin(body.yaw) * body.speed * clampedDt;
    body.z += Math.cos(body.yaw) * body.speed * clampedDt;

    let pos = resolveBuildingCollisions(body.x, body.z);
    pos = applyWorldBounds(pos.x, pos.z);
    // bounce speed slightly on collision correction
    if (Math.hypot(pos.x - body.x, pos.z - body.z) > 0.001) {
      body.speed *= 0.55;
    }
    body.x = pos.x;
    body.z = pos.z;

    // Soft suspension bob
    const bob = Math.sin(performance.now() * 0.008 + body.speed) * 0.02 * speedFactor;

    if (group.current) {
      group.current.position.set(body.x, 0.35 + bob, body.z);
      group.current.rotation.y = body.yaw;
      // lean into turns
      group.current.rotation.z = THREE.MathUtils.damp(
        group.current.rotation.z,
        -steer * 0.08 * speedFactor,
        8,
        clampedDt,
      );
    }

    // Spin wheels
    const spin = body.speed * clampedDt * 2.2;
    for (const w of wheelRefs.current) {
      if (w) w.rotation.x += spin;
    }

    store.setRoverPose([body.x, 0.35, body.z], body.yaw, body.speed);

    const near = nearestBuilding(body.x, body.z, INTERACT_RADIUS);
    store.setNearbyBuilding(near?.id ?? null);

    // Interact edge
    if (input.interact && !interactLatch.current && near) {
      interactLatch.current = true;
      // Navigate via full page load from HUD layer — set zone for overlay
      store.setCurrentZone(near.id);
    }
    if (!input.interact) interactLatch.current = false;
  });

  const wheelPositions: [number, number, number][] = [
    [-0.55, -0.12, 0.55],
    [0.55, -0.12, 0.55],
    [-0.55, -0.12, 0],
    [0.55, -0.12, 0],
    [-0.55, -0.12, -0.55],
    [0.55, -0.12, -0.55],
  ];

  return (
    <group ref={group} position={[0, 0.35, 4]}>
      {/* chassis */}
      <mesh castShadow position={[0, 0.08, 0]}>
        <boxGeometry args={[1.2, 0.22, 1.5]} />
        <meshStandardMaterial color="#d7dbe0" metalness={0.45} roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.28, -0.05]}>
        <boxGeometry args={[0.85, 0.28, 1.05]} />
        <meshStandardMaterial color="#eef1f4" metalness={0.25} roughness={0.45} />
      </mesh>
      {/* mast */}
      <mesh castShadow position={[0.12, 0.62, -0.2]}>
        <cylinderGeometry args={[0.04, 0.045, 0.55, quality === "lite" ? 8 : 14]} />
        <meshStandardMaterial color="#9aa3ad" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0.12, 0.92, -0.12]}>
        <boxGeometry args={[0.28, 0.14, 0.18]} />
        <meshStandardMaterial color="#111827" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* arm */}
      <mesh castShadow position={[-0.4, 0.35, 0.25]} rotation={[0.3, 0.2, -0.4]}>
        <boxGeometry args={[0.08, 0.08, 0.7]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.35} roughness={0.45} />
      </mesh>
      {/* headlights */}
      <mesh position={[0.28, 0.18, 0.78]}>
        <boxGeometry args={[0.12, 0.08, 0.06]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fde68a" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-0.28, 0.18, 0.78]}>
        <boxGeometry args={[0.12, 0.08, 0.06]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fde68a" emissiveIntensity={0.8} />
      </mesh>
      {wheelPositions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) wheelRefs.current[i] = el;
          }}
          position={pos}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.2, 0.2, 0.16, quality === "lite" ? 10 : 18]} />
          <meshStandardMaterial color="#1f2937" roughness={0.85} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

/** Imperative helper for systems that need distance without store. */
export function getDistanceToBuildingId(
  x: number,
  z: number,
  id: string,
) {
  const b = BUILDINGS.find((item) => item.id === id);
  if (!b) return Infinity;
  return distanceToBuilding(x, z, b);
}

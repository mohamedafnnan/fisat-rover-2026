"use client";

import * as React from "react";
import * as THREE from "three";
import { WORLD_BOUNDS } from "@/world/data/buildings";

function Rock({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <mesh position={position} castShadow receiveShadow scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#5c4033" roughness={0.95} metalness={0.05} flatShading />
    </mesh>
  );
}

const ROCKS: { p: [number, number, number]; s: number }[] = [
  { p: [8, 0.35, -6], s: 0.9 },
  { p: [-10, 0.4, 6], s: 1.1 },
  { p: [12, 0.3, 8], s: 0.7 },
  { p: [-6, 0.5, -14], s: 1.3 },
  { p: [16, 0.35, 4], s: 0.85 },
  { p: [-15, 0.4, 14], s: 1.0 },
  { p: [5, 0.25, 16], s: 0.6 },
  { p: [-18, 0.45, -6], s: 1.15 },
  { p: [20, 0.3, -8], s: 0.75 },
  { p: [-3, 0.35, 22], s: 0.95 },
];

export function Terrain({ quality = "full" }: { quality?: "full" | "lite" }) {
  const groundGeo = React.useMemo(() => {
    const g = new THREE.CircleGeometry(WORLD_BOUNDS + 4, quality === "lite" ? 48 : 80);
    // gentle undulation
    const pos = g.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const h =
        Math.sin(x * 0.18) * 0.12 +
        Math.cos(y * 0.14) * 0.1 +
        Math.sin((x + y) * 0.08) * 0.08;
      pos.setZ(i, h);
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, [quality]);

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        geometry={groundGeo}
      >
        <meshStandardMaterial color="#6b4423" roughness={0.96} metalness={0.02} />
      </mesh>

      {/* worn track ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <ringGeometry args={[5.5, 6.2, 64]} />
        <meshStandardMaterial color="#4a3220" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <ringGeometry args={[11.5, 12.1, 64]} />
        <meshStandardMaterial color="#4a3220" roughness={1} />
      </mesh>

      {/* crater rim suggestion */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[22, 0.05, 14]} receiveShadow>
        <ringGeometry args={[3.2, 4.4, 32]} />
        <meshStandardMaterial color="#5a3a28" roughness={1} />
      </mesh>

      {(quality === "full" ? ROCKS : ROCKS.slice(0, 5)).map((r, i) => (
        <Rock key={i} position={r.p} scale={r.s} />
      ))}

      {/* distant mountain silhouettes (billboard-ish boxes) */}
      {quality === "full"
        ? (
          <>
            <mesh position={[0, 4, -40]}>
              <coneGeometry args={[14, 10, 5]} />
              <meshStandardMaterial color="#3d291c" roughness={1} />
            </mesh>
            <mesh position={[-18, 3.2, -36]}>
              <coneGeometry args={[10, 8, 5]} />
              <meshStandardMaterial color="#4a3224" roughness={1} />
            </mesh>
            <mesh position={[20, 3.5, -38]}>
              <coneGeometry args={[12, 9, 5]} />
              <meshStandardMaterial color="#3a281c" roughness={1} />
            </mesh>
          </>
        )
        : null}
    </group>
  );
}

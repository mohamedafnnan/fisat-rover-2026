"use client";

import * as React from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BUILDINGS, type BuildingDef } from "@/world/data/buildings";
import { useWorldStore } from "@/store/world-store";

function BuildingMesh({ def, quality }: { def: BuildingDef; quality: "full" | "lite" }) {
  const glow = React.useRef<THREE.Mesh>(null);
  const nearby = useWorldStore((s) => s.nearbyBuilding === def.id);
  const [hx, hy, hz] = def.size;
  const [x, , z] = def.position;

  useFrame((_, dt) => {
    if (!glow.current) return;
    const mat = glow.current.material as THREE.MeshStandardMaterial;
    const target = nearby ? 1.4 : 0.35;
    mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, target, 6, dt);
  });

  if (def.id === "plaza") {
    return (
      <group position={[x, 0, z]}>
        {/* podium */}
        <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[2.2, 2.4, 0.3, quality === "lite" ? 16 : 32]} />
          <meshStandardMaterial color="#3f3f46" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.32, 0]} receiveShadow>
          <cylinderGeometry args={[1.6, 1.6, 0.08, quality === "lite" ? 16 : 32]} />
          <meshStandardMaterial
            color={def.accent}
            emissive={def.accent}
            emissiveIntensity={0.35}
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
        {/* display rover silhouette */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[1.1, 0.35, 1.4]} />
          <meshStandardMaterial color="#e5e7eb" metalness={0.3} roughness={0.45} />
        </mesh>
        <Html position={[0, 2.2, 0]} center distanceFactor={18} style={{ pointerEvents: "none" }}>
          <div className="rounded-md border border-white/20 bg-black/55 px-2 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-sm whitespace-nowrap">
            {def.label}
          </div>
        </Html>
      </group>
    );
  }

  const isDome = def.id === "museum";
  const isTower = def.id === "broadcast" || def.id === "comms";

  return (
    <group position={[x, 0, z]}>
      {isDome ? (
        <mesh position={[0, hy * 0.45, 0]} castShadow receiveShadow>
          <sphereGeometry args={[Math.max(hx, hz) * 0.45, quality === "lite" ? 12 : 24, quality === "lite" ? 8 : 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#78716c" metalness={0.2} roughness={0.65} />
        </mesh>
      ) : isTower ? (
        <>
          <mesh position={[0, hy * 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.55, hy, quality === "lite" ? 8 : 12]} />
            <meshStandardMaterial color="#57534e" metalness={0.35} roughness={0.55} />
          </mesh>
          <mesh position={[0, hy + 0.2, 0]} castShadow>
            <boxGeometry args={[1.4, 0.3, 1.4]} />
            <meshStandardMaterial color={def.accent} emissive={def.accent} emissiveIntensity={0.4} />
          </mesh>
        </>
      ) : (
        <mesh position={[0, hy / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[hx, hy, hz]} />
          <meshStandardMaterial color="#57534e" metalness={0.25} roughness={0.7} />
        </mesh>
      )}

      {/* entrance glow pad */}
      <mesh ref={glow} position={[0, 0.05, hz * 0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.1, 24]} />
        <meshStandardMaterial
          color={def.accent}
          emissive={def.accent}
          emissiveIntensity={0.35}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* door */}
      <mesh position={[0, 0.7, hz / 2 + 0.02]}>
        <boxGeometry args={[0.9, 1.3, 0.08]} />
        <meshStandardMaterial color="#1c1917" metalness={0.4} roughness={0.5} />
      </mesh>

      <Html
        position={[0, hy + 0.8, 0]}
        center
        distanceFactor={20}
        style={{ pointerEvents: "none" }}
        zIndexRange={[10, 0]}
      >
        <div
          className={`rounded-md border px-2 py-1 text-[10px] font-semibold tracking-wide whitespace-nowrap backdrop-blur-sm transition-colors ${
            nearby
              ? "border-white/40 bg-black/70 text-white"
              : "border-white/15 bg-black/45 text-white/85"
          }`}
        >
          {def.label}
        </div>
      </Html>
    </group>
  );
}

export function Buildings({ quality = "full" }: { quality?: "full" | "lite" }) {
  return (
    <group>
      {BUILDINGS.map((b) => (
        <BuildingMesh key={b.id} def={b} quality={quality} />
      ))}
    </group>
  );
}

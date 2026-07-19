"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type WorldCanvasProps = {
  quality?: "full" | "lite";
};

function RoverPlaceholder() {
  return (
    <group position={[0, 0.35, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.35, 1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.3} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.7, 0.35, 0.7]} />
        <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.5} />
      </mesh>
      {[
        [-0.7, -0.15, 0.45],
        [0.7, -0.15, 0.45],
        [-0.7, -0.15, -0.45],
        [0.7, -0.15, -0.45],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
          <meshStandardMaterial color="#171717" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Foundation canvas only — full Base Camp scenes land in the world milestone.
 * Physics (Rapier) and GSAP camera systems plug in here later.
 */
export function WorldCanvas({ quality = "full" }: WorldCanvasProps) {
  const reduced = useReducedMotion();
  const dpr: [number, number] = quality === "lite" ? [1, 1.25] : [1, 1.75];

  return (
    <div className="h-dvh w-full bg-neutral-950" role="img" aria-label="Interactive Base Camp preview">
      <Canvas
        dpr={dpr}
        shadows={quality === "full"}
        camera={{ position: [4, 3, 5], fov: 45, near: 0.1, far: 200 }}
        gl={{ antialias: quality === "full", powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0a0a0a");
        }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight
          castShadow={quality === "full"}
          position={[6, 10, 4]}
          intensity={1.2}
          shadow-mapSize-width={quality === "full" ? 1024 : 512}
          shadow-mapSize-height={quality === "full" ? 1024 : 512}
        />
        <RoverPlaceholder />
        <Grid
          args={[30, 30]}
          cellSize={0.5}
          cellThickness={0.6}
          sectionSize={3}
          sectionThickness={1.1}
          sectionColor="#334155"
          cellColor="#1e293b"
          fadeDistance={28}
          infiniteGrid
        />
        {quality === "full" ? <Environment preset="city" /> : null}
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={3}
          maxDistance={12}
          enableDamping
          dampingFactor={0.08}
          autoRotate={!reduced && quality === "full"}
          autoRotateSpeed={0.4}
        />
      </Canvas>
      <p className="sr-only">
        Decorative 3D preview of the FISAT rover on a grid. Use Exit to site for full
        content. Keyboard users should leave this canvas and use the 2D site.
      </p>
    </div>
  );
}

"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Quality = "full" | "lite";

function Terrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
      <circleGeometry args={[18, 64]} />
      <meshStandardMaterial color="#3a2a22" roughness={0.95} metalness={0.05} />
    </mesh>
  );
}

function RoverBody({ quality }: { quality: Quality }) {
  const group = React.useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (!group.current || reduced) return;
    const t = state.clock.elapsedTime;
    // Idle drift — subtle, never dizzy
    group.current.rotation.y = Math.sin(t * 0.25) * 0.12;
    group.current.position.y = Math.sin(t * 0.6) * 0.02;
  });

  const wheelPositions: [number, number, number][] = [
    [-0.55, 0.18, 0.55],
    [0.55, 0.18, 0.55],
    [-0.55, 0.18, 0],
    [0.55, 0.18, 0],
    [-0.55, 0.18, -0.55],
    [0.55, 0.18, -0.55],
  ];

  return (
    <group ref={group} position={[0, 0.05, 0]}>
      {/* rocker beams */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[1.35, 0.08, 1.35]} />
        <meshStandardMaterial color="#c4c8ce" metalness={0.55} roughness={0.35} />
      </mesh>
      {/* body */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.85, 0.32, 1.05]} />
        <meshStandardMaterial color="#e8eaed" metalness={0.25} roughness={0.45} />
      </mesh>
      {/* mast */}
      <mesh position={[0.1, 0.78, -0.15]} castShadow>
        <cylinderGeometry args={[0.035, 0.04, 0.55, quality === "lite" ? 8 : 16]} />
        <meshStandardMaterial color="#9aa0a6" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* mast head / cameras */}
      <mesh position={[0.1, 1.08, -0.1]} castShadow>
        <boxGeometry args={[0.28, 0.14, 0.18]} />
        <meshStandardMaterial color="#1a1d21" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* arm base + boom */}
      <mesh position={[-0.35, 0.55, 0.2]} castShadow>
        <boxGeometry args={[0.16, 0.16, 0.16]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[-0.55, 0.72, 0.35]} rotation={[0.4, 0.2, -0.5]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.7]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.45} roughness={0.4} />
      </mesh>
      {/* science bay accent */}
      <mesh position={[0.28, 0.38, 0.42]} castShadow>
        <boxGeometry args={[0.22, 0.14, 0.18]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.35} roughness={0.4} />
      </mesh>
      {wheelPositions.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.14, quality === "lite" ? 10 : 20]} />
          <meshStandardMaterial color="#1f2937" roughness={0.85} metalness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent({ quality }: { quality: Quality }) {
  const reduced = useReducedMotion();
  const cam = React.useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    if (!cam.current || reduced) return;
    // Scroll-linked-ish idle orbit using pointer + time (page scroll never hijacked)
    const t = state.clock.elapsedTime;
    const px = state.pointer.x * 0.35;
    const py = state.pointer.y * 0.15;
    const radius = 4.2;
    const angle = -0.55 + px * 0.35 + Math.sin(t * 0.15) * 0.08;
    cam.current.position.x = Math.sin(angle) * radius;
    cam.current.position.z = Math.cos(angle) * radius;
    cam.current.position.y = 1.6 + py * 0.4 + Math.sin(t * 0.2) * 0.05;
    cam.current.lookAt(0, 0.45, 0);
  });

  const rover = (
    <RoverBody quality={quality} />
  );

  return (
    <>
      <color attach="background" args={["#140e0c"]} />
      <fog attach="fog" args={["#140e0c", 8, 22]} />
      <PerspectiveCamera ref={cam} makeDefault position={[2.8, 1.7, 3.6]} fov={42} />
      <ambientLight intensity={0.35} />
      <directionalLight
        castShadow={quality === "full"}
        position={[4, 6, 2]}
        intensity={1.35}
        shadow-mapSize-width={quality === "full" ? 1024 : 512}
        shadow-mapSize-height={quality === "full" ? 1024 : 512}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#93c5fd" />
      <Terrain />
      {reduced ? rover : <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.25}>{rover}</Float>}
      {quality === "full" ? (
        <ContactShadows position={[0, 0, 0]} opacity={0.45} scale={12} blur={2.5} far={4} />
      ) : null}
    </>
  );
}

export function HeroScene({ quality = "full" }: { quality?: Quality }) {
  return (
    <Canvas
      aria-hidden
      role="presentation"
      dpr={quality === "lite" ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      shadows={quality === "full"}
      className="h-full w-full touch-none"
      onCreated={({ gl }) => {
        gl.setClearColor("#140e0c");
      }}
    >
      <SceneContent quality={quality} />
    </Canvas>
  );
}

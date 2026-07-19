"use client";

type Props = {
  quality?: "full" | "lite";
  /** Resolved outside the R3F tree (theme context does not cross Canvas). */
  darkMode?: boolean;
};

export function WorldLighting({ quality = "full", darkMode = true }: Props) {
  if (darkMode) {
    return (
      <>
        <color attach="background" args={["#07090f"]} />
        <fog attach="fog" args={["#07090f", 18, quality === "lite" ? 45 : 60]} />
        <ambientLight intensity={0.18} color="#93c5fd" />
        <hemisphereLight args={["#1e3a5f", "#1a0f0a", 0.35]} />
        <directionalLight
          castShadow={quality === "full"}
          position={[6, 10, 4]}
          intensity={0.55}
          color="#c7d2fe"
          shadow-mapSize-width={quality === "full" ? 1024 : 512}
          shadow-mapSize-height={quality === "full" ? 1024 : 512}
          shadow-camera-far={50}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
        />
        <pointLight position={[0, 3, 0]} intensity={0.6} color="#38bdf8" distance={18} />
      </>
    );
  }

  return (
    <>
      <color attach="background" args={["#c4a484"]} />
      <fog attach="fog" args={["#c4a484", 22, quality === "lite" ? 50 : 70]} />
      <ambientLight intensity={0.42} color="#ffd7b0" />
      <hemisphereLight args={["#f0c8a0", "#6b4423", 0.55]} />
      <directionalLight
        castShadow={quality === "full"}
        position={[-8, 14, 6]}
        intensity={1.35}
        color="#ffb070"
        shadow-mapSize-width={quality === "full" ? 1024 : 512}
        shadow-mapSize-height={quality === "full" ? 1024 : 512}
        shadow-camera-far={55}
        shadow-camera-left={-28}
        shadow-camera-right={28}
        shadow-camera-top={28}
        shadow-camera-bottom={-28}
      />
      <directionalLight position={[10, 4, -8]} intensity={0.25} color="#93c5fd" />
    </>
  );
}

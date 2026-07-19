"use client";

import * as React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useWorldStore } from "@/store/world-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Bruno-style chase cam: behind/above rover, speed-reactive FOV,
 * look-ahead, clamped pitch — motion-sickness safe damping.
 */
export function ChaseCamera() {
  const { camera } = useThree();
  const reduced = useReducedMotion();
  const ideal = React.useRef(new THREE.Vector3(0, 4.2, 8));
  const look = React.useRef(new THREE.Vector3());
  const currentLook = React.useRef(new THREE.Vector3(0, 0.5, 0));

  useFrame((_, dt) => {
    const { roverPosition, roverYaw, roverSpeed, cameraMode } = useWorldStore.getState();
    if (cameraMode !== "chase" && cameraMode !== "cinematic") return;

    const speed = Math.abs(roverSpeed);
    const pullBack = reduced ? 0 : THREE.MathUtils.clamp(speed / 10, 0, 1);
    const distance = 6.2 + pullBack * 2.4;
    const height = 3.4 + pullBack * 0.8;
    const lookAhead = reduced ? 0.4 : 1.2 + pullBack * 1.5;

    const behindX = roverPosition[0] - Math.sin(roverYaw) * distance;
    const behindZ = roverPosition[2] - Math.cos(roverYaw) * distance;

    ideal.current.set(behindX, roverPosition[1] + height, behindZ);
    look.current.set(
      roverPosition[0] + Math.sin(roverYaw) * lookAhead,
      roverPosition[1] + 0.55,
      roverPosition[2] + Math.cos(roverYaw) * lookAhead,
    );

    const damp = reduced ? 4 : 3.2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, ideal.current.x, damp, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ideal.current.y, damp, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, ideal.current.z, damp, dt);

    currentLook.current.x = THREE.MathUtils.damp(currentLook.current.x, look.current.x, damp, dt);
    currentLook.current.y = THREE.MathUtils.damp(currentLook.current.y, look.current.y, damp, dt);
    currentLook.current.z = THREE.MathUtils.damp(currentLook.current.z, look.current.z, damp, dt);
    camera.lookAt(currentLook.current);

    if (camera instanceof THREE.PerspectiveCamera && !reduced) {
      const targetFov = 42 + pullBack * 8;
      camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 4, dt);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

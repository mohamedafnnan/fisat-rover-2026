"use client";

import { create } from "zustand";

export type WorldQuality = "full" | "lite";
export type CameraMode = "chase" | "orbit" | "inspect" | "cinematic";

type WorldState = {
  quality: WorldQuality;
  cameraMode: CameraMode;
  audioEnabled: boolean;
  currentZone: string | null;
  setQuality: (quality: WorldQuality) => void;
  setCameraMode: (mode: CameraMode) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setCurrentZone: (zone: string | null) => void;
  reset: () => void;
};

const initial = {
  quality: "full" as WorldQuality,
  cameraMode: "chase" as CameraMode,
  audioEnabled: false,
  currentZone: null as string | null,
};

/** Isolated to /world — never import from core site components. */
export const useWorldStore = create<WorldState>((set) => ({
  ...initial,
  setQuality: (quality) => set({ quality }),
  setCameraMode: (cameraMode) => set({ cameraMode }),
  setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
  setCurrentZone: (currentZone) => set({ currentZone }),
  reset: () => set(initial),
}));

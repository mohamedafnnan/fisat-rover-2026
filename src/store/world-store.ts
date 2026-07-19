"use client";

import { create } from "zustand";
import type { BuildingId } from "@/world/data/buildings";

export type WorldQuality = "full" | "lite";
export type CameraMode = "chase" | "orbit" | "inspect" | "cinematic";

export type InputState = {
  forward: number;
  turn: number;
  brake: boolean;
  interact: boolean;
};

type WorldState = {
  quality: WorldQuality;
  cameraMode: CameraMode;
  audioEnabled: boolean;
  currentZone: BuildingId | null;
  nearbyBuilding: BuildingId | null;
  showMinimap: boolean;
  showHelp: boolean;
  showDestinations: boolean;
  roverPosition: [number, number, number];
  roverYaw: number;
  roverSpeed: number;
  autoDriveTarget: BuildingId | null;
  input: InputState;
  setQuality: (quality: WorldQuality) => void;
  setCameraMode: (mode: CameraMode) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setCurrentZone: (zone: BuildingId | null) => void;
  setNearbyBuilding: (id: BuildingId | null) => void;
  setShowMinimap: (v: boolean) => void;
  setShowHelp: (v: boolean) => void;
  setShowDestinations: (v: boolean) => void;
  setRoverPose: (pos: [number, number, number], yaw: number, speed: number) => void;
  setAutoDriveTarget: (id: BuildingId | null) => void;
  setInput: (partial: Partial<InputState>) => void;
  resetInput: () => void;
  reset: () => void;
};

const emptyInput: InputState = {
  forward: 0,
  turn: 0,
  brake: false,
  interact: false,
};

const initial = {
  quality: "full" as WorldQuality,
  cameraMode: "chase" as CameraMode,
  audioEnabled: false,
  currentZone: null as BuildingId | null,
  nearbyBuilding: null as BuildingId | null,
  showMinimap: true,
  showHelp: false,
  showDestinations: false,
  roverPosition: [0, 0.35, 4] as [number, number, number],
  roverYaw: 0,
  roverSpeed: 0,
  autoDriveTarget: null as BuildingId | null,
  input: { ...emptyInput },
};

/** Isolated to /world — never import from core marketing components. */
export const useWorldStore = create<WorldState>((set) => ({
  ...initial,
  setQuality: (quality) => set({ quality }),
  setCameraMode: (cameraMode) => set({ cameraMode }),
  setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
  setCurrentZone: (currentZone) => set({ currentZone }),
  setNearbyBuilding: (nearbyBuilding) => set({ nearbyBuilding }),
  setShowMinimap: (showMinimap) => set({ showMinimap }),
  setShowHelp: (showHelp) => set({ showHelp }),
  setShowDestinations: (showDestinations) => set({ showDestinations }),
  setRoverPose: (roverPosition, roverYaw, roverSpeed) =>
    set({ roverPosition, roverYaw, roverSpeed }),
  setAutoDriveTarget: (autoDriveTarget) => set({ autoDriveTarget }),
  setInput: (partial) => set((s) => ({ input: { ...s.input, ...partial } })),
  resetInput: () => set({ input: { ...emptyInput } }),
  reset: () => set({ ...initial, input: { ...emptyInput } }),
}));

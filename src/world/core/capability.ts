export type WorldCapability = {
  webgl2: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  lowMemory: boolean;
  canRunFull: boolean;
  canRunLite: boolean;
};

/**
 * Client-only capability probe for the Base Camp world.
 * Never run during SSR.
 */
export function probeWorldCapability(): WorldCapability {
  if (typeof window === "undefined") {
    return {
      webgl2: false,
      reducedMotion: true,
      saveData: true,
      lowMemory: true,
      canRunFull: false,
      canRunLite: false,
    };
  }

  let webgl2 = false;
  try {
    const canvas = document.createElement("canvas");
    webgl2 = Boolean(canvas.getContext("webgl2"));
  } catch {
    webgl2 = false;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const saveData = Boolean(nav.connection?.saveData);
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;

  const canRunLite = webgl2 && !saveData;
  const canRunFull = canRunLite && !reducedMotion && !lowMemory;

  return { webgl2, reducedMotion, saveData, lowMemory, canRunFull, canRunLite };
}

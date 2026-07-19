"use client";

import { useWorldStore } from "@/store/world-store";

/**
 * Desktop keyboard bindings for Base Camp.
 * Attaches to window while the canvas is mounted.
 */
export function attachKeyboardControls() {
  const pressed = new Set<string>();

  const sync = () => {
    let forward = 0;
    let turn = 0;
    if (pressed.has("KeyW") || pressed.has("ArrowUp")) forward += 1;
    if (pressed.has("KeyS") || pressed.has("ArrowDown")) forward -= 1;
    if (pressed.has("KeyA") || pressed.has("ArrowLeft")) turn += 1;
    if (pressed.has("KeyD") || pressed.has("ArrowRight")) turn -= 1;

    useWorldStore.getState().setInput({
      forward,
      turn,
      brake: pressed.has("Space"),
      interact: pressed.has("KeyE") || pressed.has("Enter"),
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    // Don't steal typing from inputs
    const t = e.target as HTMLElement | null;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) {
      return;
    }

    const code = e.code;
    if (
      [
        "KeyW",
        "KeyA",
        "KeyS",
        "KeyD",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Space",
        "KeyE",
        "Enter",
      ].includes(code)
    ) {
      e.preventDefault();
      pressed.add(code);
      sync();
    }

    const store = useWorldStore.getState();
    if (code === "KeyM") {
      e.preventDefault();
      store.setShowMinimap(!store.showMinimap);
    }
    if (code === "KeyH") {
      e.preventDefault();
      store.setShowHelp(!store.showHelp);
    }
    if (code === "KeyC") {
      e.preventDefault();
      store.setCameraMode("chase");
    }
    if (code === "Escape") {
      e.preventDefault();
      store.setShowDestinations(!store.showDestinations);
      store.setShowHelp(false);
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    pressed.delete(e.code);
    sync();
  };

  const onBlur = () => {
    pressed.clear();
    useWorldStore.getState().resetInput();
  };

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", onBlur);

  return () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("blur", onBlur);
    useWorldStore.getState().resetInput();
  };
}

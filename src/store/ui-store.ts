"use client";

import { create } from "zustand";

type UiState = {
  mobileNavOpen: boolean;
  searchOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
};

/** Ephemeral chrome state only — never content. */
export const useUiStore = create<UiState>((set) => ({
  mobileNavOpen: false,
  searchOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
}));

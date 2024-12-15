import { create } from "zustand";

interface CatalogState {
  isActive: boolean;
  updateIsActive: (value: boolean) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  isActive: false,
  updateIsActive: (value) => set({ isActive: value }),
}));

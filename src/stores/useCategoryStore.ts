import { create } from "zustand";

export interface ICategoryStore {
  category: string;

  updateCategory: (modalName: string) => void;
}

export const useCategoryStore = create<ICategoryStore>((set) => ({
  category: "",

  updateCategory: (category: string) => set({ category }),
}));

import { create } from "zustand";

export interface IPagination {
  currentPage: number;

  updateCurrentPage: (currentPage?: number) => void;
}

export const usePaginationAdmin = create<IPagination>((set) => ({
  currentPage: 0,

  updateCurrentPage: (currentPage = 0) => {
    return set({ currentPage });
  },
}));

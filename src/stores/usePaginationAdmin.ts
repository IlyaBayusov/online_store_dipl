import { getProductAdmin } from "@/api";
import { IPagination, IProductInfo } from "@/interfaces";
import { create } from "zustand";

interface IPaginationState {
  products: IProductInfo[];
  pagination: IPagination;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setProducts: (products: IProductInfo[]) => void;
  setPagination: (pagination: IPagination) => void;
  getProducts: (page?: number) => Promise<void>;
}

export const usePaginationAdmin = create<IPaginationState>((set) => ({
  products: [],
  pagination: {
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  },
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setProducts: (products: IProductInfo[]) => set({ products }),
  setPagination: (pagination: IPagination) => set({ pagination }),
  getProducts: async (page = 0) => {
    set({ isLoading: true });
    const data = await getProductAdmin(page);
    if (data) {
      console.log(data);
      set({ isLoading: false });
      set({ products: data.products });
      set({
        pagination: {
          pageSize: data.pageSize,
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          totalItems: data.totalItems,
        },
      });
    }
  },
}));

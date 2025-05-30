import { getProductAdmin } from "@/api";
import { IPagination, IProductInfo } from "@/interfaces";
import { create } from "zustand";

interface IProductsResponse {
  products: IProductInfo[];
  currentItems: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

interface IPaginationState {
  products: IProductInfo[];
  pagination: IPagination;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setProducts: (products: IProductInfo[]) => void;
  setPagination: (pagination: IPagination) => void;
  getProducts: (page?: number) => Promise<IProductsResponse | null>;
}

export const usePaginationAdmin = create<IPaginationState>((set) => ({
  products: [],
  pagination: {
    currentItems: 0,
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  },
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setProducts: (products: IProductInfo[]) => set({ products }),
  setPagination: (pagination: IPagination) => set({ pagination }),
  getProducts: async (page = 0) => {
    try {
      const response = await getProductAdmin(page);

      if (!response) {
        return null;
      }

      set({
        products: response.products || [],
        pagination: {
          currentItems: response.currentItems || 0,
          currentPage: response.currentPage || 0,
          totalPages: response.totalPages || 0,
          totalItems: response.totalItems || 0,
        },
      });

      return response;
    } catch (error) {
      console.error("Error fetching products:", error);
      set({
        products: [],
        pagination: {
          currentItems: 0,
          currentPage: 0,
          totalPages: 0,
          totalItems: 0,
        },
      });
      return null;
    }
  },
}));

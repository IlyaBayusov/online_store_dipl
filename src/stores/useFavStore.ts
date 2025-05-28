import { IProductsCardBody, IPagination } from "@/interfaces";
import { create } from "zustand";

interface IFavStore {
  favProducts: IProductsCardBody[];
  pagination: IPagination | undefined;
  removeFavProduct: (productId: number) => void;
  updateFavData: (
    products: IProductsCardBody[],
    pagination: IPagination
  ) => void;
}

export const useFavStore = create<IFavStore>((set) => ({
  favProducts: [],
  pagination: undefined,

  removeFavProduct: (productId: number) =>
    set((state) => ({
      favProducts: state.favProducts.filter(
        (product) => product.productId !== productId
      ),
      pagination: state.pagination
        ? {
            ...state.pagination,
            totalItems: state.pagination.totalItems - 1,
          }
        : undefined,
    })),

  updateFavData: (products: IProductsCardBody[], pagination: IPagination) =>
    set(() => ({
      favProducts: products,
      pagination: pagination,
    })),
}));

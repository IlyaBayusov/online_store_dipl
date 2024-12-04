import { IProductInCart } from "@/interfaces";
import { create } from "zustand";

export interface IByProductsStore {
  products: IProductInCart[];

  updateProducts: (products: IProductInCart[]) => void;
}

export const useByProductsStore = create<IByProductsStore>((set) => ({
  products: [],

  updateProducts: (products: IProductInCart[]) => set({ products }),
}));

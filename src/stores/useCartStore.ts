import { IProductInfo } from "@/interfaces";
import { create } from "zustand";

export interface ICartStore {
  cart: IProductInfo[];
  sum: number;

  addProduct: (productItem: IProductInfo) => void;
  removeProduct: (productItem: IProductInfo) => void;
  updateProduct: (productItem: IProductInfo) => void;

  plusSum: (amount: number) => void;
  minusSum: (amount: number) => void;
  updateSum: (amount: number) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],
  sum: 0,

  addProduct: (productItem: IProductInfo) =>
    set((state) => {
      const productExists = state.cart.some(
        (item) => item.id === productItem.id
      );

      return {
        cart: productExists ? state.cart : [...state.cart, productItem],
      };
    }),
  removeProduct: (productItem: IProductInfo) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productItem.id),
    })),

  updateProduct: (productItem: IProductInfo) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productItem.id ? productItem : item
      ),
    })),

  plusSum: (amount: number) =>
    set((state) => ({
      sum: state.sum + amount,
    })),

  minusSum: (amount: number) =>
    set((state) => ({
      sum: state.sum - amount,
    })),

  updateSum: (amount: number) =>
    set(() => ({
      sum: amount,
    })),
}));

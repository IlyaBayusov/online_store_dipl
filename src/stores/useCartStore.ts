import { getProductsCart } from "@/api";
import { IProductInCart } from "@/interfaces";
import { create } from "zustand";

export interface ICartStore {
  cart: IProductInCart[];
  sum: number;

  addProduct: (productItem: IProductInCart) => void;
  removeProduct: (productItem: IProductInCart) => void;
  // updateProduct: (productItem: IProductInCart) => void;

  getProductsInCart: () => Promise<void>;

  updateQuantity: (productId: number, quantity: number) => void;

  plusSum: (amount: number) => void;
  minusSum: (amount: number) => void;
  updateSum: (amount: number) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],
  sum: 0,

  getProductsInCart: async () => {
    const products = await getProductsCart();

    set((state) => ({
      cart: products ? [...products] : [...state.cart],
    }));
  },

  addProduct: (productItem: IProductInCart) =>
    set((state) => {
      const productExists = state.cart.some(
        (item) => item.productId === productItem.productId
      );

      return {
        cart: productExists ? state.cart : [...state.cart, productItem],
      };
    }),
  removeProduct: (productItem: IProductInCart) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => item.productId !== productItem.productId
      ),
    })),

  updateProduct: (productItem: IProductInCart) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.productId === productItem.productId ? productItem : item
      ),
    })),

  updateQuantity: (productId: number, quantity: number) =>
    set((state) => ({
      cart: state.cart.map((item: IProductInCart) =>
        item.productId === productId ? { ...item, quantities: quantity } : item
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

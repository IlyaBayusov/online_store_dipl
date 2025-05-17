import { getProductsCart } from "@/api";
import { IPagination, IProductInCart } from "@/interfaces";
import { create } from "zustand";

export interface ICartStore {
  cart: IProductInCart[];
  pagination: IPagination;

  getProductsInCart: () => Promise<void>;

  updateQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],
  pagination: {} as IPagination,

  getProductsInCart: async () => {
    const data = await getProductsCart();
    const products = await data.data;
    const pagination: IPagination = {
      currentPage: data.currentPage,
      pageSize: data.pageSize,
      totalItems: data.totalItems,
      totalPages: data.totalPages,
    };

    set(() => ({ pagination: pagination }));

    set((state) => ({
      cart: products ? [...products] : [...state.cart],
    }));
  },

  updateQuantity: (productId: number, quantity: number) =>
    set((state) => ({
      cart: state.cart.map((item: IProductInCart) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    })),
}));

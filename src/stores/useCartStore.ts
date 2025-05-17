// import { getProductsCart } from "@/api";
// import { IPagination, IProductInCart } from "@/interfaces";
// import { create } from "zustand";

// export interface ICartStore {
//   cart: IProductInCart[];
//   pagination: IPagination;

//   getProductsInCart: () => Promise<void>;

//   updateQuantity: (productId: number, quantity: number) => void;
// }

// export const useCartStore = create<ICartStore>((set) => ({
//   cart: [],
//   pagination: {} as IPagination,

//   getProductsInCart: async () => {
//     const data = await getProductsCart();
//     const products = await data.data;
//     const pagination: IPagination = {
//       currentPage: data.currentPage,
//       pageSize: data.pageSize,
//       totalItems: data.totalItems,
//       totalPages: data.totalPages,
//     };

//     set(() => ({ pagination: pagination }));

//     set((state) => ({
//       cart: products ? [...products] : [...state.cart],
//     }));
//   },

//   updateQuantity: (productId: number, quantity: number) =>
//     set((state) => ({
//       cart: state.cart.map((item: IProductInCart) =>
//         item.productId === productId ? { ...item, quantity } : item
//       ),
//     })),
// }));

import { IPagination, IProductInCart } from "@/interfaces";
import { create } from "zustand";

export interface ICartStore {
  cart: IProductInCart[];
  pagination: IPagination;
  count: number;
  price: number;

  getCount: (count: number) => void;
  getPrice: (price: number) => void;

  updatedDataInCart: (
    products: IProductInCart[],
    pagination: IPagination
  ) => Promise<void>;

  deleteProductInCart: (cartItemId: number) => void;

  updateQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<ICartStore>((set, get) => ({
  cart: [],
  pagination: {} as IPagination,
  count: 0,
  price: 0,

  getCount: (count) => {
    set({ count: count });
  },

  getPrice: (price) => {
    set({ price: price });
  },

  updatedDataInCart: async (products, pagination) => {
    set(() => ({
      cart: products,
    }));
    set({
      pagination: pagination,
    });
    set(() => ({
      count: products.length,
    }));
  },

  deleteProductInCart: (cartItemId) => {
    const { cart } = get();

    const newCart = cart.filter((item) => item.cartItemId !== cartItemId);

    set(() => ({
      cart: newCart,
    }));

    set(() => ({
      count: cart.length,
    }));
  },

  updateQuantity: (productId, quantity) => {
    set((state) => ({
      cart: state.cart.map((item: IProductInCart) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },
}));

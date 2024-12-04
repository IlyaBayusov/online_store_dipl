import { IPostNewProduct } from "@/interfaces";
import { create } from "zustand";

export interface IFormNewProductStore {
  data: IPostNewProduct;
  isValid: boolean;
  error: string;

  updateData: (products: IPostNewProduct) => void;
  updateIsValid: (isValid: boolean) => void;
  updateError: (error: string) => void;
}

export const useFormNewProductStore = create<IFormNewProductStore>((set) => ({
  data: {
    groupId: null,
    name: "",
    categoryName: "",
    color: "",
    description: "",
    price: 0,
    sizes: [],
    quantities: [],
  },
  isValid: false,
  error: "",

  updateData: (data: IPostNewProduct) => set({ data }),
  updateIsValid: (isValid: boolean) => set({ isValid }),
  updateError: (error: string) => set({ error }),
}));

import { IByProductsForm } from "@/interfaces";
import { create } from "zustand";

export interface IFormStore {
  data: IByProductsForm;
  isValid: boolean;
  error: string;

  updateData: (products: IByProductsForm) => void;
  updateIsValid: (isValid: boolean) => void;
  updateError: (error: string) => void;
}

export const useFormStore = create<IFormStore>((set) => ({
  data: {
    userId: 0,
    totalPrice: 0,
    customerName: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    paymentMethod: "",
  },
  isValid: false,
  error: "",

  updateData: (data: IByProductsForm) => set({ data }),
  updateIsValid: (isValid: boolean) => set({ isValid }),
  updateError: (error: string) => set({ error }),
}));

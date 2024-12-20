import { IOrderDetails } from "@/interfaces";
import { create } from "zustand";

export interface IFormStore {
  data: IOrderDetails;
  isValid: boolean;
  error: string;

  updateData: (products: IOrderDetails) => void;
  updateIsValid: (isValid: boolean) => void;
  updateError: (error: string) => void;
}

export const useFormStore = create<IFormStore>((set) => ({
  data: {
    userId: 0,
    totalPrice: 0,

    firstname: "",
    lastname: "",
    email: "",
    phone: "",

    address: "",
    apartment: "",
    floor: "",
    entrance: "",
    comment: "",
    paymentMethod: "CASH",
  },
  isValid: false,
  error: "",

  updateData: (data: IOrderDetails) => set({ data }),
  updateIsValid: (isValid: boolean) => set({ isValid }),
  updateError: (error: string) => set({ error }),
}));

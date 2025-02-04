import { C_mobilePhones } from "@/interfaces/characteristics";
import { create } from "zustand";

export interface ICMobilePhones {
  characteristics: C_mobilePhones;
  isValidChar: boolean;
  isSubmitChar: boolean;

  updateData: (characteristics: C_mobilePhones) => void;
  setIsValidChar: (isValidChar: boolean) => void;
  setIsSubmitChar: (isSubmitChar: boolean) => void;
}

export const useCharacteristicsStore = create<ICMobilePhones>((set) => ({
  characteristics: {} as C_mobilePhones,
  isValidChar: false,
  isSubmitChar: false,

  updateData: (characteristics: C_mobilePhones) => set({ characteristics }),
  setIsValidChar: (isValidChar) => set({ isValidChar }),
  setIsSubmitChar: (isSubmitChar) => set({ isSubmitChar }),
}));

import { C_mobilePhones } from "@/interfaces/characteristics";
import { create } from "zustand";

export interface ICMobilePhones {
  characteristics: C_mobilePhones;

  updateData: (characteristics: C_mobilePhones) => void;
}

export const useCharacteristicsStore = create<ICMobilePhones>((set) => ({
  characteristics: {} as C_mobilePhones,

  updateData: (characteristics: C_mobilePhones) => set({ characteristics }),
}));

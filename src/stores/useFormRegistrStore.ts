import { IFormDataRegistr } from "@/interfaces";
import { create } from "zustand";

interface FormRegistrStore {
  formData: IFormDataRegistr;
  setFormDataRegistr: (value: IFormDataRegistr) => void;
}

export const useFormRegistrStore = create<FormRegistrStore>((set) => ({
  formData: {} as IFormDataRegistr,
  setFormDataRegistr: (value) => set({ formData: value }),
}));

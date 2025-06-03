import { create } from "zustand";

interface ResetPasswordStore {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

export const useResetPasswordStore = create<ResetPasswordStore>((set) => ({
  email: "",
  setEmail: (email: string) => set({ email }),
  clearEmail: () => set({ email: "" }),
}));

import { IGetUserInfoInProfile } from "@/interfaces";
import { create } from "zustand";

export interface IProfileInfoStore {
  newProfileData: IGetUserInfoInProfile;

  setNewProfileData: (data: IGetUserInfoInProfile) => void;
}

export const useProfileInfoStore = create<IProfileInfoStore>((set) => ({
  newProfileData: {} as IGetUserInfoInProfile,

  setNewProfileData: (data) => {
    set((state) => ({ newProfileData: { ...state.newProfileData, ...data } }));
  },
}));

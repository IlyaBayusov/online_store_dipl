import {
  modalNav,
  modalNavCategory,
  modalCartDeleteProduct,
  modalSuccessOrder,
  modalNewProductAdmin,
  modalDeleteEditNewProduct,
} from "@/constans";
import { ISizeAndQuantity } from "@/interfaces";
import { StaticImageData } from "next/image";
import { create } from "zustand";

export interface INextCategoryProps {
  id: number;
  name: string;
  img: StaticImageData;
  urlName: string;
}

export interface ICartDeleteProductProps {
  cartItemId: number;
  isDeleted: boolean;
}

export interface IDeleteEditNewProductProps {
  size: string;
  quantity: string;
  arrSizeAndQuantity: ISizeAndQuantity[];
  nowIndex: number;
  isChanged: boolean;
  isDeleted: boolean;
}

export const defaultDeleteEditNewProductProps =
  (): IDeleteEditNewProductProps => ({
    size: "",
    quantity: "",
    arrSizeAndQuantity: [],
    nowIndex: 0,
    isChanged: false,
    isDeleted: false,
  });

type ModalPropsMap = {
  [modalNav]: null;
  [modalNavCategory]: INextCategoryProps[];
  [modalCartDeleteProduct]: ICartDeleteProductProps;
  [modalSuccessOrder]: null;
  [modalNewProductAdmin]: null;
  [modalDeleteEditNewProduct]: IDeleteEditNewProductProps;
};

export interface IModalStore {
  modals: { [key: string]: boolean };
  modalsProps: {
    [K in keyof ModalPropsMap]?: ModalPropsMap[K];
  } & { [key: string]: unknown };

  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  addModalProps: <K extends keyof ModalPropsMap>(
    modalName: K,
    modProps: ModalPropsMap[K]
  ) => void;
}

export const useModalStore = create<IModalStore>((set) => ({
  modals: {},
  modalsProps: {
    [modalDeleteEditNewProduct]: defaultDeleteEditNewProductProps(),
  },

  openModal: (modalName) =>
    set((state) => ({ modals: { ...state.modals, [modalName]: true } })),

  closeModal: (modalName) =>
    set((state) => ({ modals: { ...state.modals, [modalName]: false } })),

  addModalProps: (modalName, modProps) =>
    set((state) => ({
      modalsProps: { ...state.modalsProps, [modalName]: modProps },
    })),
}));

"use client";

import { api } from "@/axios";
import { modalCartDeleteProduct } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import React from "react";
import { IoClose } from "react-icons/io5";

export default function ModalCartDeleteProduct() {
  const { modals, closeModal, modalsProps, addModalProps } = useModalStore();

  const handleDeleteProduct = async () => {
    try {
      const response = await api.delete(
        `/v1/cart/${modalsProps[modalCartDeleteProduct].cartItemId}`
      );

      addModalProps(modalCartDeleteProduct, {
        ...modalsProps[modalCartDeleteProduct],
        isDeleted: true,
      });

      closeModal(modalCartDeleteProduct);
      console.log("Товар удален из корзины: ", response);
    } catch (error) {
      console.error("Ошибка удаления товара из корзины: ", error);
    }
  };

  return (
    <div
      className={
        `top-0 -0 z-[1000] w-full h-full bg-black bg-opacity-40 transition-all overflow-y-hidden ` +
        (modals[modalCartDeleteProduct] ? "fixed" : "hidden")
      }
      onClick={() => closeModal(modalCartDeleteProduct)}
    >
      <div
        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col bg-white p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={() => closeModal(modalCartDeleteProduct)}>
            <IoClose
              className="text-[#B3B3B3] w-5 h-5 hover:text-greenT transition-all cu"
              viewBox="75 75 350 350"
            />
          </button>
        </div>

        <div className="mt-3 flex justify-center text-center">
          <p className="text-base">Вы хотите удалить товар из корзины?</p>
        </div>

        <div className="mt-3 flex justify-around items-center">
          <button
            className="py-2 px-4 hover:text-greenT transition-all"
            onClick={handleDeleteProduct}
          >
            Да
          </button>
          <button
            className="py-2 px-4 hover:text-greenT transition-all"
            onClick={() => closeModal(modalCartDeleteProduct)}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}

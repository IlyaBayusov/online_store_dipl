"use client";

import { deleteProduct } from "@/api";
import { modalDeleteProductAdmin } from "@/constans";
import { IProductInfo } from "@/interfaces";
import { useModalStore } from "@/stores/useModalStore";
import React from "react";

type Props = {
  product: IProductInfo;
  onSuccess: () => void;
};

export default function ModalDeleteProductAdmin({ product, onSuccess }: Props) {
  const { closeModal } = useModalStore();

  const handleDelete = async () => {
    try {
      const response = await deleteProduct(product.id);
      if (response?.status === 204) {
        onSuccess();
        closeModal(modalDeleteProductAdmin);
      }
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Подтверждение удаления</h2>
        <p className="mb-6">
          Вы действительно хотите удалить товар &quot;{product.name}&quot;?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => closeModal(modalDeleteProductAdmin)}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Отмена
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

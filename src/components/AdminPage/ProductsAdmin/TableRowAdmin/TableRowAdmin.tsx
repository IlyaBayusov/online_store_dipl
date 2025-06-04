"use client";

import { postEnableProductAdmin } from "@/api";
import { modalDeleteProductAdmin, modalEditProductAdmin } from "@/constans";
import { IProductInfo } from "@/interfaces";
import { useModalStore } from "@/stores/useModalStore";
import Image from "next/image";
import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

type Props = {
  product: IProductInfo;
  onDelete: () => void;
};

export default function TableRowAdmin({ product, onDelete }: Props) {
  const [isActive, setIsActive] = useState<boolean>(product.isActive);
  const { openModal, addModalProps } = useModalStore();

  const handleClickIsActive = async (productId: number) => {
    try {
      const newStatus = !isActive;
      const response = await postEnableProductAdmin(productId, newStatus);

      if (response?.status === 200) {
        setIsActive(newStatus);
      }
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  const handleEdit = () => {
    addModalProps(modalEditProductAdmin, product);
    openModal(modalEditProductAdmin);
  };

  const handleDelete = () => {
    addModalProps(modalDeleteProductAdmin, { product, onSuccess: onDelete });
    openModal(modalDeleteProductAdmin);
  };

  return (
    <tr className="border-b border-slate-300 text-sm" key={product.name}>
      <td>
        <div className="ml-1 w-full flex text-start">
          <div className="relative h-[80px] w-[60px] bg-[#F0F0F0] flex justify-center items-center rounded-md">
            <Image
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={product.images[0]}
              alt={product.name}
            />
          </div>
          <div className="pl-1 w-full flex-1 flex flex-col items-start text-wrap">
            <p>{product.name}</p>
          </div>
        </div>
      </td>
      <td>{product.id}</td>
      <td>{product.price}</td>
      <td>{product.quantities}</td>
      <td>
        <div className="flex justify-center items-center gap-2">
          {isActive ? (
            <button
              className="px-2 py-1 rounded-md text-white bg-greenT"
              onClick={() => handleClickIsActive(product.id)}
            >
              <IoCheckmark className="h-5 w-5" />
            </button>
          ) : (
            <button
              className="px-2 py-1 rounded-md text-white bg-red-500"
              onClick={() => handleClickIsActive(product.id)}
            >
              <IoClose className="h-5 w-5" />
            </button>
          )}
        </div>
      </td>
      <td>
        <button className="py-1 px-2" onClick={handleEdit}>
          <CiSettings className="h-6 w-6 p-px" />
        </button>
      </td>
      <td>
        <button
          className="py-1 px-2 text-red-600 hover:text-red-700"
          onClick={handleDelete}
        >
          <FaTrash className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}

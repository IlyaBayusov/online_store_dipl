"use client";

import { modalSuccessOrder } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import { useRouter } from "next/navigation";
import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function ModalSuccessOrder() {
  const { modals, closeModal } = useModalStore();

  const router = useRouter();

  const handleClick = () => {
    closeModal(modalSuccessOrder);
    router.push("/");
  };

  return (
    <div
      className={
        `top-0 -0 z-[1000] w-full h-full bg-black bg-opacity-40 transition-all overflow-y-hidden ` +
        (modals[modalSuccessOrder] ? "fixed" : "hidden")
      }
      onClick={() => closeModal(modalSuccessOrder)}
    >
      <div
        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col bg-[#121212] p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-3 flex flex-col items-center text-center">
          <p className="text-base text-nowrap">Ваш заказ успешно оформлен!</p>

          <IoCheckmarkCircleOutline className="w-20 h-20 text-green-500" />

          <p className="text-sm min-w-52">
            Теперь вы можете следить за статусом заказа во вкладке
            &quot;Заказы&quot;
          </p>
        </div>

        <div className="mt-3 flex justify-around items-center">
          <button
            className="py-2 px-4 text-green-500 border border-green-500 rounded-md"
            onClick={handleClick}
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );
}

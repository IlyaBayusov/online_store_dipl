"use client";

import { modalNewProductAdmin } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import React from "react";
import { IoClose } from "react-icons/io5";
import FormByModalNewProductAdmin from "../Forms/FormByModalNewProductAdmin/FormByModalNewProductAdmin";

export default function ModalNewProductAdmin() {
  const { modals, closeModal } = useModalStore();

  return (
    <div
      className={
        `top-0 -0 z-[1000] w-full h-full bg-white bg-opacity-40 transition-all overflow-y-hidden ` +
        (modals[modalNewProductAdmin] ? "fixed" : "hidden")
      }
      onClick={() => closeModal(modalNewProductAdmin)}
    >
      <div
        className="absolute top-0 left-0 z-10 w-full h-full flex flex-col bg-white p-3 overflow-auto hide-scrollbar-y"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center font-bold">
          <h1 className="text-greenT uppercase">Создание товара</h1>

          <div onClick={() => closeModal(modalNewProductAdmin)}>
            <IoClose className="text-greenT w-5 h-5" viewBox="75 75 350 350" />
          </div>
        </div>

        <FormByModalNewProductAdmin />
      </div>
    </div>
  );
}

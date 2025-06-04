"use client";

import { modalEditProductAdmin } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import React from "react";
import { IoClose } from "react-icons/io5";
import FormByModalEditProductAdmin from "../Forms/FormByModalEditProductAdmin/FormByModalEditProductAdmin";

export default function ModalEditProductAdmin() {
  const { modals, closeModal } = useModalStore();

  return (
    <div
      className={
        `top-0 -0 z-[1000] w-full h-full bg-black bg-opacity-40 transition-all overflow-y-hidden ` +
        (modals[modalEditProductAdmin] ? "fixed" : "hidden")
      }
      onClick={() => closeModal(modalEditProductAdmin)}
    >
      <div
        className="absolute top-0 left-0 z-10 w-full md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:max-w-[600px] md:container md:mx-auto md:rounded-md md:h-auto md:max-h-full h-full flex flex-col bg-white p-3 md:p-5 overflow-auto hide-scrollbar-y"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center font-bold">
          <h1 className="text-greenT uppercase">Редактирование товара</h1>

          <button onClick={() => closeModal(modalEditProductAdmin)}>
            <IoClose className="text-greenT w-5 h-5" viewBox="75 75 350 350" />
          </button>
        </div>

        <FormByModalEditProductAdmin />
      </div>
    </div>
  );
}

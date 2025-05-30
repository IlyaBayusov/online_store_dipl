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
        `top-0 -0 z-[1000] w-full h-full bg-white bg-opacity-40 transition-all overflow-y-hidden ` +
        (modals[modalEditProductAdmin] ? "fixed" : "hidden")
      }
      onClick={() => closeModal(modalEditProductAdmin)}
    >
      <div
        className="absolute top-0 left-0 z-10 w-full h-full flex flex-col bg-white p-3 overflow-auto hide-scrollbar-y"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center font-bold">
          <h1 className="text-greenT uppercase">Редактирование товара</h1>

          <div onClick={() => closeModal(modalEditProductAdmin)}>
            <IoClose className="text-greenT w-5 h-5" viewBox="75 75 350 350" />
          </div>
        </div>

        <FormByModalEditProductAdmin />
      </div>
    </div>
  );
}

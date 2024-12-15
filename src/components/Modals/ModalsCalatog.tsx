import { modalsCatalog } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import React from "react";

export default function ModalsCatalog() {
  const { modals, openModal, closeModal, addModalProps } = useModalStore();

  return (
    <div
      className={
        `absolute top-0 -left-full z-[1000] w-full h-full transition-transform duration-700 overflow-y-hidden ` +
        (modals[modalsCatalog] ? "translate-x-full" : "")
      }
    >
      <div className="container relative top-0 left-0 z-10 h-full">
        <div className="h-full w-full bg-[#121212] p-3"></div>
      </div>
    </div>
  );
}

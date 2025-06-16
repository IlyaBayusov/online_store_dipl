"use client";

import { modalLogout } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import React from "react";

export default function LogOutBtn() {
  const { openModal } = useModalStore();

  const handleClickLogout = () => {
    openModal(modalLogout);
  };

  return (
    <button
      className="mt-3 px-7 py-2 border border-red-600 rounded-md text-red-600 text-sm"
      onClick={handleClickLogout}
    >
      Выйти
    </button>
  );
}

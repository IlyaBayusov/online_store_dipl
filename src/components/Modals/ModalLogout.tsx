"use client";

import { modalLogout } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import { useRouter } from "next/navigation";
import React from "react";
import { IoClose } from "react-icons/io5";

export default function ModalLogout() {
  const { modals, closeModal } = useModalStore();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    closeModal(modalLogout);
    router.push("/auth");
  };

  return (
    <div
      className={
        `top-0 -0 z-[1000] w-full h-full bg-black bg-opacity-40 transition-all overflow-y-hidden ` +
        (modals[modalLogout] ? "fixed" : "hidden")
      }
      onClick={() => closeModal(modalLogout)}
    >
      <div
        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col bg-white p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={() => closeModal(modalLogout)}>
            <IoClose
              className="text-[#B3B3B3] w-5 h-5"
              viewBox="75 75 350 350"
            />
          </button>
        </div>

        <div className="mt-3 flex justify-center text-center">
          <p className="text-base">
            Вы действительно хотите выйти из аккаунта?
          </p>
        </div>

        <div className="mt-3 flex justify-around items-center">
          <button
            className="py-2 px-4 text-sm border border-red-600 rounded-md text-red-600 hover:text-red-700 transition-all"
            onClick={handleLogout}
          >
            Да
          </button>
          <button
            className="py-2 px-4 text-sm border border-gray-600 rounded-md text-gray-600 hover:text-gray-700 transition-all"
            onClick={() => closeModal(modalLogout)}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}

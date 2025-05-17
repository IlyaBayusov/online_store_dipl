"use client";

import { authPage } from "@/constans";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogOutBtn() {
  const router = useRouter();

  const handleClickLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    router.push(authPage);
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

"use client";

import Link from "next/link";
import React from "react";
import {
  IoIosNotifications,
  IoMdArrowBack,
  IoIosOptions,
} from "react-icons/io";
import { FaHouse, FaUsers } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useModalStore } from "@/stores/useModalStore";
import {
  adminMenuPage,
  adminOrdersPage,
  adminProfilesPage,
  mainPage,
  modalNewProductAdmin,
} from "@/constans";

export default function HeaderAdmin() {
  const { openModal } = useModalStore();

  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-between items-center px-3 bg-greenT py-1 w-full">
          <div className="flex items-center gap-3">
            <Link href={mainPage}>
              <FaHouse className="h-4 w-4 text-white" />
            </Link>

            <Link href={adminProfilesPage} className="py-2">
              <FaUsers className="h-5 w-5 text-white" />
            </Link>

            <Link
              href={adminOrdersPage}
              className="text-sm text-white leading-none py-2"
            >
              Заказы
            </Link>
            <Link
              href={adminMenuPage}
              className="text-sm text-white leading-none py-2"
            >
              Товары
            </Link>
          </div>

          <div>
            <IoIosNotifications className="h-5 w-5 text-white" />
          </div>
        </div>

        <div className="flex justify-center items-center px-3 py-2 bg-white w-full border-b">
          {/* <div className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Найти"
              className="border border-gray-300 text-slate-400 text-sm py-1 px-2 rounded-md"
            />
            <button className="py-2">
              <IoSearchSharp className="h-5 w-5 text-green-600" />
            </button>
          </div> */}

          <div className="flex items-center gap-1">
            {/* <button className="py-1 px-2">
              <IoIosOptions className="h-5 w-5 p-px text-green-600" />
            </button> */}

            <button
              className="flex justify-center items-center h-8 w-8 bg-greenT rounded-full"
              onClick={() => openModal(modalNewProductAdmin)}
            >
              <FaPlus className="h-5 w-5 p-px text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

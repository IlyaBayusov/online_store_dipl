import { IPagination } from "@/interfaces";
import { sizePage } from "@/constans";
import React from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

type Props = { pagination: IPagination };

export default function Pagination({ pagination }: Props) {
  return (
    <div className="mt-3 w-full flex justify-center items-center gap-1">
      <button className="px-2 py-1 border rounded-md">
        <MdOutlineKeyboardDoubleArrowLeft className="h-5 w-5 p-px text-gray-400" />
      </button>
      <button className="px-2 py-1 border rounded-md">
        <MdOutlineKeyboardArrowLeft className="h-5 w-5 p-px text-gray-400" />
      </button>

      <p className="text-greenT text-sm">
        {pagination
          ? `${sizePage * pagination.currentPage + 1}-${
              sizePage * pagination.currentPage + sizePage
            } из ${pagination.totalItems}`
          : "Загрузка..."}
      </p>

      <button className="px-2 py-1 border rounded-md">
        <MdOutlineKeyboardArrowRight className="h-5 w-5 p-px text-gray-400" />
      </button>
      <button className="px-2 py-1 border rounded-md">
        <MdOutlineKeyboardDoubleArrowRight className="h-5 w-5 p-px text-gray-400" />
      </button>
    </div>
  );
}

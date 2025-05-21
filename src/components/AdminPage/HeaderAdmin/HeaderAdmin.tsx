"use client";

import Link from "next/link";
import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaHouse, FaUsers } from "react-icons/fa6";
import {
  adminMenuPage,
  adminOrdersPage,
  adminProfilesPage,
  mainPage,
} from "@/constans";

export default function HeaderAdmin() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-between items-center px-3 bg-greenT py-1 w-full">
          <div className="flex items-center gap-3">
            <Link href={mainPage}>
              <FaHouse className="mr-3 h-4 w-4 text-white" />
            </Link>

            <Link href={adminProfilesPage} className="py-2">
              <FaUsers className="h-5 w-5 text-white" />
            </Link>

            {/* <Link
              href={adminOrdersPage}
              className="text-sm text-white leading-none py-2"
            >
              Заказы
            </Link> */}
            <Link
              href={adminMenuPage}
              className="text-sm text-white leading-none py-2"
            >
              Товары
            </Link>
          </div>

          {/* <div>
            <IoIosNotifications className="h-5 w-5 text-white" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

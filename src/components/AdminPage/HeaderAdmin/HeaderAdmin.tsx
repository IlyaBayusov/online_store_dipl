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
    <header className="w-full bg-greenT shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              href={mainPage}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaHouse className="h-4 w-4" />
            </Link>

            <Link
              href={adminProfilesPage}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaUsers className="h-5 w-5" />
            </Link>

            <Link
              href={adminOrdersPage}
              className="text-sm text-white hover:text-gray-200 transition-colors font-medium"
            >
              Заказы
            </Link>

            <Link
              href={adminMenuPage}
              className="text-sm text-white hover:text-gray-200 transition-colors font-medium"
            >
              Товары
            </Link>
          </nav>

          {/* <div className="flex items-center">
            <button 
              type="button" 
              className="text-white hover:text-gray-200 transition-colors"
            >
              <IoIosNotifications className="h-5 w-5" />
            </button>
          </div> */}
        </div>
      </div>
    </header>
  );
}

"use client";

import {
  adminMenuPage,
  adminOrdersPage,
  adminProfilesPage,
  cartPage,
  favPage,
  mainPage,
  ordersPage,
} from "@/constans";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import img_logo from "../../public/main/img_logo.png";
import { CiShoppingBasket, CiHeart, CiShoppingCart } from "react-icons/ci";
import { useCartStore } from "@/stores/useCartStore";
import { getProductsCart } from "@/api";
import { ProfileDropDownMenu } from "./DropDownMenu/ProfileDDM";
import SearchBar from "./Header/SearchBar";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const { cart, getCount, updatedDataInCart } = useCartStore();
  const path = usePathname();
  const noHeaderPages = [adminMenuPage, adminOrdersPage, adminProfilesPage];
  const showHeader = !noHeaderPages.includes(path);

  useEffect(() => {
    getProductsInCart();
  }, []);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("fixed");
    } else {
      document.body.classList.remove("fixed");
    }
  }, [isActive]);

  const getProductsInCart = async () => {
    const data = await getProductsCart();

    if (data) {
      const products = data.data;
      const pagination = {
        currentPage: data.currentPage,
        pageSize: data.pageSize,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      };

      updatedDataInCart(products, pagination);
      getCount(products.length);
    }
  };

  return (
    <>
      {showHeader && (
        <div
          className={
            "container relative px-2.5 pt-2.5" +
            (isActive ? " flex flex-col h-screen" : "")
          }
        >
          <header className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
            <div className="flex justify-between items-center w-full">
              <Link
                href={mainPage}
                className="max-w-[110px] max-h-[42px]"
                onClick={() => setIsActive(false)}
              >
                <Image src={img_logo} alt="logo" priority />
              </Link>

              <div className="flex justify-end items-center gap-5 w-full">
                <div className="hidden md:flex md:justify-end w-full">
                  <SearchBar />
                </div>

                <nav>
                  <ul className="flex items-center gap-3 text-[10px]">
                    <li>
                      <ProfileDropDownMenu />
                    </li>
                    <li onClick={() => setIsActive(false)}>
                      <Link
                        href={ordersPage}
                        className="relative flex gap-1 flex-col items-center"
                      >
                        <div className="relative">
                          <CiShoppingBasket className="h-5 w-5" />
                        </div>
                        <p className="leading-none">Заказы</p>
                      </Link>
                    </li>
                    <li onClick={() => setIsActive(false)}>
                      <Link
                        href={favPage}
                        className="relative flex gap-1 flex-col items-center"
                      >
                        <div className="relative">
                          <CiHeart className="h-5 w-5" />
                        </div>
                        <p className="leading-none">Избранные</p>
                      </Link>
                    </li>
                    <li onClick={() => setIsActive(false)}>
                      <Link
                        href={cartPage}
                        className="relative flex gap-1 flex-col items-center"
                      >
                        <div className="relative">
                          <CiShoppingCart className="h-5 w-5" />
                          {cart.length !== 0 && (
                            <div className="px-1.5 w-auto h-4 flex justify-center items-center absolute -top-3.5 -right-3 z-10 bg-greenT text-white rounded-full">
                              <span className="text-center leading-none">
                                {cart.length}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="leading-none">Корзина</p>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="mt-3 md:hidden w-full">
              <SearchBar />
            </div>
          </header>
        </div>
      )}
    </>
  );
}

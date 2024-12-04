"use client";

import { getProductsCart } from "@/api";
import { mainPage, modalNav } from "@/constans";
import { IProductInCart } from "@/interfaces";
import { useModalStore } from "@/stores/useModalStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { RiShoppingBasketLine } from "react-icons/ri";
import { MdOutlineShoppingBag, MdFavorite } from "react-icons/md";
import { usePathname } from "next/navigation";
import Image from "next/image";
import img_logo from "../../public/main/img_logo.png";
import {
  CiUser,
  CiShoppingBasket,
  CiHeart,
  CiShoppingCart,
} from "react-icons/ci";

import { IoIosSearch } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";

export default function Header() {
  const [products, setProducts] = useState<IProductInCart[]>([]);
  const path = usePathname();
  const noHeaderPages = ["/adminMenu"];

  const showHeader = !noHeaderPages.includes(path);

  useEffect(() => {
    const getProducts = async () => {
      const data: IProductInCart[] | undefined = await getProductsCart();

      if (data) {
        setProducts(data);
      }
    };

    getProducts();
  }, []);

  const { openModal } = useModalStore();

  return (
    <>
      {showHeader && (
        <div className="container px-2.5 pt-2.5">
          <div className="flex justify-between items-end flex-wrap">
            <Link href={mainPage} className="max-w-[110px] max-h-[42px]">
              <Image src={img_logo} alt="logo" className="" />
            </Link>

            <nav>
              <ul className="flex items-center gap-3 text-[10px]">
                <li className="">
                  <Link href="#" className="flex gap-1 flex-col items-center">
                    <div className="relative">
                      <CiUser className="h-5 w-5" />
                      <div className="py-0.5 px-1 absolute -top-1 -right-3.5 z-10 bg-greenT text-white rounded-full">
                        12
                      </div>
                    </div>

                    <p className="leading-none">Войти</p>
                  </Link>
                </li>

                <li className="">
                  <Link
                    href="#"
                    className="relative flex gap-1 flex-col items-center"
                  >
                    <div className="relative">
                      <CiShoppingBasket className="h-5 w-5" />
                      <div className="py-0.5 px-1 absolute -top-1 -right-3.5 z-10 bg-greenT text-white rounded-full">
                        5
                      </div>
                    </div>

                    <p className="leading-none">Заказы</p>
                  </Link>
                </li>

                <li className="">
                  <Link
                    href="#"
                    className="relative flex gap-1 flex-col items-center"
                  >
                    <div className="relative">
                      <CiHeart className="h-5 w-5" />
                      <div className="py-0.5 px-1 absolute -top-1 -right-3.5 z-10 bg-greenT text-white rounded-full">
                        5
                      </div>
                    </div>

                    <p className="leading-none">Избранные</p>
                  </Link>
                </li>

                <li className="">
                  <Link
                    href="#"
                    className="relative flex gap-1 flex-col items-center"
                  >
                    <div className="relative">
                      <CiShoppingCart className="h-5 w-5" />
                      <div className="py-0.5 px-1 absolute -top-1 -right-3.5 z-10 bg-greenT text-white rounded-full">
                        {products.length}
                      </div>
                    </div>

                    <p className="leading-none">Корзина</p>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-3 w-full flex justify-between items-center gap-10 ">
              <div
                className="py-1 px-2  bg-greenT rounded-sm"
                onClick={() => openModal(modalNav)}
              >
                <HiMenuAlt2 className="h-4 w-4 text-white" />
              </div>

              <div className="h-6 flex-grow flex items-center rounded-md">
                <input
                  type="text"
                  placeholder="Я ищу..."
                  className="h-full max-w-96 w-full py-1 px-4 rounded-s-md text-xs border border-greenT"
                />
                <button className="h-full px-1  bg-greenT rounded-e-md">
                  <IoIosSearch className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

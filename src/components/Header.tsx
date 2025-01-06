"use client";

import {
  cartPage,
  categories,
  favPage,
  mainPage,
  ordersPage,
  profilePage,
  roleAdmin,
} from "@/constans";
import Link from "next/link";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import img_logo from "../../public/main/img_logo.png";
import {
  CiUser,
  CiShoppingBasket,
  CiHeart,
  CiShoppingCart,
} from "react-icons/ci";

import { IoIosSearch, IoIosArrowForward } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import { ICatalog } from "@/interfaces";
import { decodeToken } from "@/utils";
import { ProfileDDMNotAuth } from "./DropDownMenu/ProfileDDMNotAuth";
import { useCartStore } from "@/stores/useCartStore";
import ProfileDDMAuth from "./DropDownMenu/ProfileDDMAuth";

export default function Header() {
  const [selectedCategoryNameSecond, setSelectedCategoryNameSecond] =
    useState<string>("");
  const [selectedCategoryNameThird, setSelectedCategoryNameThird] =
    useState<string>("");
  const [selectedCategoryNextSecond, setSelectedCategoryNextSecond] = useState<
    ICatalog[]
  >([]);
  const [selectedCategoryNextThird, setSelectedCategoryNextThird] = useState<
    ICatalog[]
  >([]);

  const [isTranslatedX, setIsTranslatedX] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState<string>("");

  const [isAuth, setIsAuth] = useState(false);

  const { cart } = useCartStore();

  const router = useRouter();

  const path = usePathname();
  const noHeaderPages = ["/adminMenu"];

  const showHeader = !noHeaderPages.includes(path);

  useLayoutEffect(() => {
    const decodedToken = decodeToken();

    if (decodedToken) {
      setRole(decodedToken.roles);
    }
  });

  useEffect(() => {
    if (decodeToken()) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  });

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("fixed");
    } else {
      setIsTranslatedX(" -translate-x-[0]");
      document.body.classList.remove("fixed");
    }
  }, [isActive]);

  const handleClickFirst = (category: ICatalog) => {
    setSelectedCategoryNameSecond(category.name);
    setIsActive(true);

    if (category.next) {
      setSelectedCategoryNextSecond(category.next);
      setIsTranslatedX(" -translate-x-[100vw]");
    }
  };

  const handleClickSecond = (category: ICatalog) => {
    setSelectedCategoryNameThird(category.name);

    if (category.next) {
      setSelectedCategoryNextThird(category.next);
      setIsTranslatedX(" -translate-x-[200vw]");
    } else {
      setIsActive(false);

      router.push(`/${category.urlName}`);

      console.log("переход на сраницу с товаром", category.urlName);
    }
  };

  const handleClickThird = (category: ICatalog) => {
    setIsActive(false);

    router.push(`/${category.urlName}`);

    console.log("переход на сраницу с товаром", category.urlName);
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
          <header className="flex justify-between items-end flex-wrap">
            <Link
              href={mainPage}
              className="max-w-[110px] max-h-[42px]"
              onClick={() => setIsActive(false)}
            >
              <Image src={img_logo} alt="logo" className="" priority />
            </Link>

            <nav>
              <ul className="flex items-center gap-3 text-[10px]">
                <li className="">
                  {role === roleAdmin ? (
                    isAuth ? (
                      <ProfileDDMAuth />
                    ) : (
                      <ProfileDDMNotAuth />
                    )
                  ) : (
                    <Link
                      href={profilePage}
                      className="relative flex gap-1 flex-col items-center"
                    >
                      <div className="relative">
                        <CiUser className="h-5 w-5" />
                      </div>

                      <p className="leading-none">Профиль</p>
                    </Link>
                  )}
                  {}
                </li>

                <li className="" onClick={() => setIsActive(false)}>
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

                <li className="" onClick={() => setIsActive(false)}>
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

                <li className="" onClick={() => setIsActive(false)}>
                  <Link
                    href={cartPage}
                    className="relative flex gap-1 flex-col items-center"
                  >
                    <div className="relative">
                      <CiShoppingCart className="h-5 w-5" />

                      {cart.length !== 0 && (
                        <div className="px-1.5 w-auto h-4 flex justify-center items-center absolute -top-3.5 -right-3 z-10 bg-greenT text-white rounded-full">
                          {cart.length}
                        </div>
                      )}
                    </div>
                    <p className="leading-none">Корзина</p>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-3 w-full flex justify-between items-center gap-10 ">
              <div
                className="py-1 px-2  bg-greenT rounded-sm"
                onClick={() => setIsActive(!isActive)}
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
          </header>

          {isActive && (
            <div className="flex-grow relative -ml-2.5">
              <div
                className={
                  "transition-transform duration-500 absolute top-0 left-0 flex flex-row items-center overflow-hidden h-full w-[400vh]" +
                  isTranslatedX
                }
              >
                <div className="h-full w-screen px-2.5 pt-2.5">
                  <div className="h-full w-full hide-scrollbar-y overflow-y-auto">
                    <p className="text-sm mb-2.5">Каталог</p>

                    {categories.map((category, index) => {
                      return (
                        <button
                          key={index}
                          className="flex justify-between items-center w-full py-1 text-sm"
                          onClick={() => handleClickFirst(category)}
                        >
                          <span>{category.name}</span>

                          <IoIosArrowForward className="h-4 w-4 mr-3" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="h-full w-screen px-2.5 pt-2.5">
                  <div className="h-full w-full hide-scrollbar-y overflow-y-auto">
                    <p className="text-sm mb-2.5">
                      {selectedCategoryNameSecond}
                    </p>

                    {selectedCategoryNextSecond.map((category, index) => {
                      return (
                        <button
                          key={index}
                          className="flex justify-between items-center w-full py-1 text-sm"
                          onClick={() => handleClickSecond(category)}
                        >
                          <span>{category.name}</span>

                          <IoIosArrowForward className="h-4 w-4 mr-3" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="h-full w-screen px-2.5 pt-2.5">
                  <div className="h-full w-full hide-scrollbar-y overflow-y-auto">
                    <p className="text-sm mb-2.5">
                      {selectedCategoryNameThird}
                    </p>

                    {selectedCategoryNextThird.map((category, index) => {
                      return (
                        <button
                          key={index}
                          className="flex justify-between items-center w-full py-1 text-sm"
                          onClick={() => handleClickThird(category)}
                        >
                          <span>{category.name}</span>

                          <IoIosArrowForward className="h-4 w-4 mr-3" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

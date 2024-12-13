"use client";

import { INextCategoryProps, useModalStore } from "@/stores/useModalStore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { categories, modalNav, modalNavCategory } from "@/constans";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { decodeToken } from "@/utils";

export default function ModalNav() {
  const { modals, openModal, closeModal, addModalProps } = useModalStore();
  const { updateCategory } = useCategoryStore();

  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const decodedToken = decodeToken();

    if (decodedToken) {
      setRole(decodedToken.roles);
    }
  }, []);

  const handleModalNav = (
    nextCategory: INextCategoryProps[],
    category: string
  ) => {
    updateCategory(category.toLowerCase());
    addModalProps(modalNavCategory, nextCategory);
    openModal(modalNavCategory);
    closeModal(modalNav);
  };

  return (
    <div
      className={
        `fixed top-0 -left-full z-[1000] w-full h-full transition-transform duration-700 overflow-y-hidden ` +
        (modals[modalNav] ? "translate-x-full" : "")
      }
    >
      <div className="container absolute top-0 left-0 z-10 h-full">
        <div className="flex flex-col h-full w-full bg-[#121212] p-3">
          <div className="flex justify-end">
            <div onClick={() => closeModal(modalNav)}>
              <IoClose
                className="text-[#B3B3B3] w-5 h-5"
                viewBox="75 75 350 350"
              />
            </div>
          </div>

          <div className="flex flex-col mt-3 overflow-y-auto hide-scrollbar-y">
            <input
              type="text"
              placeholder="Поиск"
              className="py-2 px-4 bg-[#3A3A3A] text-white rounded-md"
            />

            <nav className="mt-6">
              <ul className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="mb-3 bg-[#3A3A3A] rounded-md px-2 py-4 uppercase"
                  onClick={() => closeModal(modalNav)}
                >
                  Главная
                </Link>

                {role === "ADMIN" && (
                  <Link
                    href="/adminMenu"
                    className="mb-3 bg-[#3A3A3A] rounded-md px-2 py-4 uppercase"
                    onClick={() => closeModal(modalNav)}
                  >
                    Админ панель
                  </Link>
                )}

                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="bg-[#3A3A3A] rounded-md px-2 py-4 flex justify-between items-center"
                    onClick={() =>
                      category.next
                        ? handleModalNav(category.next, category.name)
                        : null
                    }
                  >
                    <p className="uppercase">{category.name}</p>
                    <Image
                      src={category.img}
                      alt={category.name}
                      className="max-w-10 max-h-10"
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col justify-start uppercase mt-6 gap-3">
              <Link
                href="/cart"
                className="bg-[#3A3A3A] rounded-md px-2 py-4 uppercase"
                onClick={() => closeModal(modalNav)}
              >
                Корзина
              </Link>
              <Link
                href="/orders"
                className="bg-[#3A3A3A] rounded-md px-2 py-4 uppercase"
                onClick={() => closeModal(modalNav)}
              >
                Заказы
              </Link>
            </div>

            <div className="mt-3">
              <Link href="#" className="flex items-center my-3 text-[#B3B3B3]">
                <FaPhoneAlt className="mr-3" />
                <p>+375 (44) 123 11 11</p>
              </Link>
              <Link href="#" className="flex items-center my-3 text-[#B3B3B3]">
                <FaPhoneAlt className="mr-3" />
                <p>+375 (44) 123 11 11</p>
              </Link>
              <Link href="#" className="flex items-center my-3 text-[#B3B3B3]">
                <FaPhoneAlt className="mr-3" />
                <p>+375 (44) 123 11 11</p>
              </Link>
              <Link href="#" className="flex items-center my-3 text-[#B3B3B3]">
                <FaPhoneAlt className="mr-3" />
                <p>+375 (44) 123 11 11</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

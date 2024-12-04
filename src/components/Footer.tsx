"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { FaVk, FaTelegram, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const path = usePathname();
  const noFooterPages = ["/cart", "/cart/buyProducts", "/adminMenu"];

  const showFooter = !noFooterPages.includes(path);

  return (
    <>
      {showFooter && (
        <footer className="bg-black mt-3 py-3 w-full">
          <div className="container px-2">
            <div className="flex justify-center items-center gap-5">
              <a href="#">
                <FaVk />
              </a>
              <a href="#">
                <FaTelegram />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
            </div>

            <div className="text-xs mt-3 text-center">
              © 2023-2024 Online-store. Все права защищены.
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

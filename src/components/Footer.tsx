"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import img_logo from "../../public/main/img_logo.png";
import i_instagram from "../../public/icons/i_instagram.svg";
import i_telegram from "../../public/icons/i_telegram.svg";
import i_viber from "../../public/icons/i_viber.svg";
import Link from "next/link";
import { mainPage } from "@/constans";

export default function Footer() {
  const path = usePathname();
  const noFooterPages = ["/cart", "/cart/buyProducts", "/adminMenu"];

  const showFooter = !noFooterPages.includes(path);

  return (
    <>
      {showFooter && (
        <footer className="bg-[#EEF1F2] py-3 w-full mt-3">
          <div className="container px-2.5">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <Link href={mainPage} className="max-w-[110px] max-h-[42px]">
                  <Image src={img_logo} alt="logo" className="" />
                </Link>

                <p className="text-[#B9B9B9] text-xs mt-2">
                  © 2022 «Texnostore»
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <Image
                    src={i_telegram}
                    alt="telegram"
                    className="h-7 w-7 p-1"
                  />
                  <Image
                    src={i_instagram}
                    alt="instagram"
                    className="h-7 w-7 p-1"
                  />
                  <Image src={i_viber} alt="viber" className="h-7 w-7 p-1" />
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

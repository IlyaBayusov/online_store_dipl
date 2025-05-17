"use client";

import React, { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CiUser } from "react-icons/ci";
import Link from "next/link";
import { decodeToken } from "@/utils";
import {
  adminMenuPage,
  authPage,
  profilePage,
  registrPage,
  roleAdmin,
  roleUser,
} from "@/constans";
import { useRouter } from "next/navigation";

export const ProfileDropDownMenu = () => {
  const [isAuth, setIsAuth] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const decoded = decodeToken();

    if (decoded?.id) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const handleClick = () => {
    const decoded = decodeToken();

    if (decoded?.id && decoded.roles === roleUser)
      router.push(`${profilePage}/${decoded?.id}`);
  };

  const showElems = () => {
    const decoded = decodeToken();

    if (!isAuth) {
      return (
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="relative z-[50] min-w-[220px] rounded-md bg-white border border-greenT text-black"
            sideOffset={5}
          >
            <div className="flex flex-col items-center">
              <Link href={authPage}>
                <DropdownMenu.Item className="group text-sm px-3 pt-1.5">
                  <button className="px-3 py-0.5 rounded-md">Войти</button>
                </DropdownMenu.Item>
              </Link>

              <Link href={registrPage}>
                <DropdownMenu.Item className="group text-sm px-3 py-1.5">
                  <button className="px-3 py-0.5 rounded-md">
                    Зарегистрироваться
                  </button>
                </DropdownMenu.Item>
              </Link>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      );
    }

    if (decoded?.roles === roleAdmin) {
      return (
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="relative z-[50] min-w-[220px] rounded-md bg-white border border-greenT text-black"
            sideOffset={5}
          >
            <div className="flex flex-col items-center">
              <button onClick={handleClick}>
                <DropdownMenu.Item className="group text-sm px-3 pt-1.5">
                  <p className="px-3 py-0.5 rounded-md">Профиль</p>
                </DropdownMenu.Item>
              </button>

              <Link href={adminMenuPage}>
                <DropdownMenu.Item className="group text-sm px-3 py-1.5">
                  <button className="px-3 py-0.5 rounded-md">Админ меню</button>
                </DropdownMenu.Item>
              </Link>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      );
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild onClick={handleClick}>
        <button
          className="relative flex gap-1 flex-col items-center"
          aria-label="Customise options"
        >
          <CiUser className="h-5 w-5" />
          <p className="leading-none">Профиль</p>
        </button>
      </DropdownMenu.Trigger>

      {showElems()}
    </DropdownMenu.Root>
  );
};

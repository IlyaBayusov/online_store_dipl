"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { CiUser } from "react-icons/ci";

export const ProfileDDMNotAuth = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="relative flex gap-1 flex-col items-center"
          aria-label="Customise options"
        >
          <CiUser className="h-5 w-5" />
          <p className="leading-none">Профиль</p>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="relative z-50 min-w-[180px] rounded-md bg-white border border-greenT"
          sideOffset={5}
        >
          <div className="flex flex-col items-center">
            <Link href={"/auth"}>
              <DropdownMenu.Item className="group text-sm px-3 pt-1.5">
                <button className="px-3 py-0.5 rounded-md">Войти</button>
              </DropdownMenu.Item>
            </Link>

            <Link href={"/registr"}>
              <DropdownMenu.Item className="group text-sm px-3 py-1.5">
                <button className="px-3 py-0.5 rounded-md">
                  Зарегистрироваться
                </button>
              </DropdownMenu.Item>
            </Link>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

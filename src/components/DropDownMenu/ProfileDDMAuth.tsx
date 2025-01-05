"use client";

import React, { useLayoutEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { decodeToken } from "@/utils";
import { roleAdmin } from "@/constans";

export default function ProfileDDMAuth() {
  const [role, setRole] = useState<string>("");

  useLayoutEffect(() => {
    const decodedToken = decodeToken();

    if (decodedToken) {
      setRole(decodedToken.roles);
    }
  }, []);

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
            <Link href={"/profile"}>
              <DropdownMenu.Item className="group text-sm px-3 pt-1.5">
                <button className="px-3 py-0.5 rounded-md">Профиль</button>
              </DropdownMenu.Item>
            </Link>

            {role === roleAdmin && (
              <Link href={"/adminMenu"}>
                <DropdownMenu.Item className="group text-sm px-3 py-1.5">
                  <button className="px-3 py-0.5 rounded-md">Админ меню</button>
                </DropdownMenu.Item>
              </Link>
            )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

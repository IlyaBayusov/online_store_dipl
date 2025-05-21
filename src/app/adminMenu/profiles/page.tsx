"use client";

import { getUsersAdmin, putUserRoleAdmin } from "@/api";
import Loader from "@/components/Loader/Loader";
import { roleAdmin, roleUser } from "@/constans";
import { IGetUserAdmin } from "@/interfaces";
import { decodeToken } from "@/utils";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

export default function ProfilesAdmin() {
  const [users, setUsers] = useState<IGetUserAdmin[]>([]);
  const [role, setRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getUsersAdmin();

      if (data) {
        const usersData: IGetUserAdmin[] = data.data;

        const decoded = decodeToken();
        if (decoded?.id) {
          const delteredUsers = usersData.filter(
            (user) => user.id !== decoded.id
          );
          setUsers(delteredUsers);
        } else {
          setUsers([]);
        }
        setIsLoading(false);
      }
    };
    getUsers();
  }, [role]);

  const handleClickIsRole = async (userId: number, userRole: string) => {
    //тестовая логика
    if (userRole === roleAdmin) {
      userRole = roleUser;
    } else {
      userRole = roleAdmin;
    }

    const data = await putUserRoleAdmin(userId, userRole);

    if (data) {
      console.log("изменение роли", data.role);
      setRole(userRole);
      //логика изменения роли в таблице
    }
  };

  const showElems = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (users.length) {
      return (
        <table className="w-[150vw]  text-black uppercase text-xs text-center -mx-3 mt-3">
          <thead>
            <tr className="text-greenT text-[10px]">
              <th>ID</th>
              <th>Имя Фамилия</th>
              <th>Логин</th>
              <th>Email</th>
              <th>Роль</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr className=" border-b border-slate-300 text-sm" key={user.id}>
                <td className="py-1">{user.id}</td>

                <td className="py-1">{`${user.firstName} ${user.lastName}`}</td>
                <td className="py-1">{user.username}</td>
                <td className="py-1">{user.email}</td>
                <td className="py-1h-full">
                  <button onClick={() => handleClickIsRole(user.id, user.role)}>
                    {user.role}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <p className="mt-3 text-sm text-center text-[#B3B3B3] font-semibold mb-3">
        Список пуст
      </p>
    );
  };

  return (
    <div className="flex flex-col w-full px-3 bg-white">
      {/* <div className="flex justify-center items-center gap-1">
        <button className="px-2 py-1 border rounded-md">
          <MdOutlineKeyboardDoubleArrowLeft className="h-5 w-5 p-px text-gray-400" />
        </button>
        <button className="px-2 py-1 border rounded-md">
          <MdOutlineKeyboardArrowLeft className="h-5 w-5 p-px text-gray-400" />
        </button>

        <p className="text-black text-sm">1-10 из 24</p>

        <button className="px-2 py-1 border rounded-md">
          <MdOutlineKeyboardArrowRight className="h-5 w-5 p-px text-gray-400" />
        </button>
        <button className="px-2 py-1 border rounded-md">
          <MdOutlineKeyboardDoubleArrowRight className="h-5 w-5 p-px text-gray-400" />
        </button>
      </div> */}

      {showElems()}
    </div>
  );
}

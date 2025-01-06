"use client";

import { getUsersAdmin, putUserRoleAdmin } from "@/api";
import { roleAdmin, roleUser } from "@/constans";
import { IGetUserAdmin } from "@/interfaces";
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

  useEffect(() => {
    const getUsers = async () => {
      const data = await getUsersAdmin();

      if (data.users) {
        setUsers(data.users);
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

  return (
    <div className="flex flex-col w-full px-3 bg-white">
      <div className="flex justify-center items-center gap-1">
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
      </div>

      {users ? (
        <table className="text-black uppercase text-xs text-center -mx-3 mt-3">
          <thead>
            <tr className="text-black">
              <th>ID</th>
              <th>Имя Фамилия</th>
              <th>Логин</th>
              <th>Email</th>
              <th>Роль</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr className="border-b border-slate-300" key={user.id}>
                <td>{user.id}</td>

                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className="h-full">
                  <button onClick={() => handleClickIsRole(user.id, user.role)}>
                    {user.role}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>isLoading</div>
      )}
    </div>
  );
}

"use client";

import { getUsersAdmin, putUserRoleAdmin } from "@/api";
import Loader from "@/components/Loader/Loader";
import { roleAdmin, roleUser, sizePage } from "@/constans";
import { IGetUserAdmin } from "@/interfaces";
import { decodeToken } from "@/utils";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { IoSearch } from "react-icons/io5";

interface IUsersResponse {
  currentItems: number;
  totalItems: number;
  data: IGetUserAdmin[];
  totalPages: number;
  currentPage: number;
}

export default function ProfilesAdmin() {
  const [users, setUsers] = useState<IGetUserAdmin[]>([]);
  const [role, setRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const response = await getUsersAdmin({
          page: currentPage,
          size: sizePage,
          search: search,
          sort: "id,asc",
        });

        if (response) {
          const usersData: IUsersResponse = response;
          const decoded = decodeToken();

          if (decoded?.id) {
            const filteredUsers = usersData.data.filter(
              (user) => user.id !== decoded.id
            );
            setUsers(filteredUsers);
          } else {
            setUsers([]);
          }

          setTotalPages(usersData.totalPages);
          setTotalItems(usersData.totalItems);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, [currentPage, search, role]);

  const handleClickIsRole = async (userId: number, userRole: string) => {
    const newRole = userRole === roleAdmin ? roleUser : roleAdmin;

    try {
      const data = await putUserRoleAdmin(userId, newRole);
      if (data) {
        setRole(newRole);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const showElems = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (users.length) {
      return (
        <table className="w-[150vw] text-black uppercase text-xs text-center -mx-3 mt-3">
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
              <tr className="border-b border-slate-300 text-sm" key={user.id}>
                <td className="py-1">{user.id}</td>
                <td className="py-1">{`${user.firstName} ${user.lastName}`}</td>
                <td className="py-1">{user.username}</td>
                <td className="py-1">{user.email}</td>
                <td className="py-1">
                  <button
                    onClick={() => handleClickIsRole(user.id, user.role)}
                    className={`px-2 py-1 rounded ${
                      user.role === roleAdmin
                        ? "bg-greenT text-white"
                        : "bg-gray-200"
                    }`}
                  >
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
    <div className="flex flex-col w-full bg-white">
      <div className="w-full flex gap-3 items-center py-1 bg-white border-b px-3">
        <div className="flex-1 flex items-center gap-1">
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Найти"
            className="flex-1 border border-gray-300 text-slate-400 text-sm py-1 px-2 rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-center items-center gap-1 mb-4 py-1 px-3">
        <button
          className="px-2 py-1 border rounded-md disabled:opacity-50"
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 0}
        >
          <MdOutlineKeyboardDoubleArrowLeft className="h-5 w-5 p-px text-gray-400" />
        </button>
        <button
          className="px-2 py-1 border rounded-md disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <MdOutlineKeyboardArrowLeft className="h-5 w-5 p-px text-gray-400" />
        </button>

        <p className="text-black text-sm">
          {`${currentPage * sizePage + 1}-${Math.min(
            (currentPage + 1) * sizePage,
            totalItems
          )} из ${totalItems}`}
        </p>

        <button
          className="px-2 py-1 border rounded-md disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <MdOutlineKeyboardArrowRight className="h-5 w-5 p-px text-gray-400" />
        </button>
        <button
          className="px-2 py-1 border rounded-md disabled:opacity-50"
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <MdOutlineKeyboardDoubleArrowRight className="h-5 w-5 p-px text-gray-400" />
        </button>
      </div>

      <div className="overflow-x-scroll w-full">{showElems()}</div>
    </div>
  );
}

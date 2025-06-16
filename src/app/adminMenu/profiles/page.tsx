"use client";

import { getUsersAdmin, putUserRoleAdmin } from "@/api";
import Loader from "@/components/Loader/Loader";
import { roleAdmin, roleUser, PAGE_SIZE_OPTIONS } from "@/constans";
import { IGetUserAdmin } from "@/interfaces";
import { decodeToken } from "@/utils";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

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
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);

  useEffect(() => {
    const decoded = decodeToken();
    if (decoded?.id) {
      setCurrentUserId(decoded.id);
    }
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const response = await getUsersAdmin({
          page: currentPage,
          size: pageSize,
          search: search,
          sort: "id,asc",
        });

        if (response) {
          const usersData: IUsersResponse = response;
          setUsers(usersData.data);
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
  }, [currentPage, search, role, pageSize]);

  const handleClickIsRole = async (userId: number, userRole: string) => {
    if (userId === currentUserId) {
      return;
    }

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

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setCurrentPage(0);
  };

  const showElems = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (users.length) {
      return (
        <table className="w-[150vw] md:w-full text-black text-xs text-center">
          <thead>
            <tr className="text-greenT text-[10px] uppercase">
              <th>ID</th>
              <th>Имя Фамилия</th>
              <th>Логин</th>
              <th>Email</th>
              <th>Роль</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                className={`border-b border-slate-300 text-sm ${
                  user.id === currentUserId ? "bg-gray-50" : ""
                }`}
                key={user.id}
              >
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
                    } ${
                      user.id === currentUserId
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-90"
                    }`}
                    disabled={user.id === currentUserId}
                    title={
                      user.id === currentUserId
                        ? "Нельзя изменить свою роль"
                        : ""
                    }
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
    <div className="flex flex-col w-full">
      <div className="w-full flex gap-3 justify-between items-center py-1 bg-white border-b px-3">
        <div className="md:container md:mx-auto md:max-w-[500px] flex-1 flex items-center gap-1">
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Найти"
            className="flex-1 border border-gray-300 text-slate-400 text-sm py-1 px-2 rounded-md"
          />
        </div>
      </div>

      <div className="w-full flex justify-center items-center bg-white">
        <select
          value={pageSize}
          onChange={handleSizeChange}
          className="px-2 py-1 border border-gray-300 rounded-md text-sm"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size} на странице
            </option>
          ))}
        </select>
      </div>

      <div className="w-full bg-white flex justify-center">
        <div className="md:container md:mx-auto md:max-w-[500px] flex justify-center items-center gap-1 py-1 px-3 bg-white">
          <button
            className="px-2 py-1 border rounded-md"
            onClick={() => handlePageChange(0)}
            disabled={currentPage === 0}
          >
            <MdOutlineKeyboardDoubleArrowLeft
              className={
                "h-5 w-5 p-px" +
                (currentPage ? " text-greenT" : " text-gray-400")
              }
            />
          </button>
          <button
            className="px-2 py-1 border rounded-md"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <MdOutlineKeyboardArrowLeft
              className={
                "h-5 w-5 p-px" +
                (currentPage ? " text-greenT" : " text-gray-400")
              }
            />
          </button>

          <p className="text-greenT text-sm">
            {`${currentPage * pageSize + 1}-${Math.min(
              (currentPage + 1) * pageSize,
              totalItems
            )} из ${totalItems}`}
          </p>

          <button
            className="px-2 py-1 border rounded-md"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <MdOutlineKeyboardArrowRight
              className={
                "h-5 w-5 p-px" +
                (currentPage >= totalPages - 1
                  ? " text-gray-400"
                  : " text-greenT")
              }
            />
          </button>
          <button
            className="px-2 py-1 border rounded-md"
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <MdOutlineKeyboardDoubleArrowRight
              className={
                "h-5 w-5 p-px" +
                (currentPage >= totalPages - 1
                  ? " text-gray-400"
                  : " text-greenT")
              }
            />
          </button>
        </div>
      </div>

      <div className="flex justify-center overflow-x-auto md:container md:mx-auto md:mt-3 bg-white md:rounded-md">
        {showElems()}
      </div>
    </div>
  );
}

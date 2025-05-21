"use client";

import ProductsAdmin from "@/components/AdminPage/ProductsAdmin/ProductsAdmin";
import Loader from "@/components/Loader/Loader";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoIosOptions } from "react-icons/io";
import { useModalStore } from "@/stores/useModalStore";
import { modalNewProductAdmin } from "@/constans";
import { usePaginationAdmin } from "@/stores/usePaginationAdmin";
import { getSearchAdmin } from "@/api";

export default function AdminMenu() {
  const { openModal } = useModalStore();

  const products = usePaginationAdmin((state) => state.products);
  const setProducts = usePaginationAdmin((state) => state.setProducts);
  const pagination = usePaginationAdmin((state) => state.pagination);
  const setPagination = usePaginationAdmin((state) => state.setPagination);
  const isLoading = usePaginationAdmin((state) => state.isLoading);
  const setIsLoading = usePaginationAdmin((state) => state.setIsLoading);
  const getProducts = usePaginationAdmin((state) => state.getProducts);

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (products.length && pagination) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!inputValue) {
      getProducts();
    }
  }, [inputValue]);

  const handleDoubleLeftClick = () => {
    getProducts();
  };

  const handleLeftClick = () => {
    getProducts(pagination.currentPage - 1);
  };

  const handleDoubleRightClick = () => {
    getProducts(pagination.totalPages - 1);
  };

  const handleRightClick = () => {
    getProducts(pagination.currentPage + 1);
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClickSearch = async () => {
    const response = await getSearchAdmin(inputValue);

    if (response.products) {
      setProducts(response.products);
      setPagination({
        pageSize: response.pageSize,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
      });
    }
  };

  const showElems = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (products.length) {
      return (
        <>
          <div className="flex justify-center items-center gap-1 py-1">
            <button
              className="px-2 py-1 border rounded-md"
              disabled={pagination.currentPage ? false : true}
            >
              <MdOutlineKeyboardDoubleArrowLeft
                className={
                  "h-5 w-5 p-px" +
                  (pagination.currentPage ? " text-greenT" : " text-gray-400")
                }
                onClick={handleDoubleLeftClick}
              />
            </button>
            <button
              className="px-2 py-1 border rounded-md"
              disabled={pagination.currentPage ? false : true}
            >
              <MdOutlineKeyboardArrowLeft
                className={
                  "h-5 w-5 p-px text-gray-400" +
                  (pagination.currentPage ? " text-greenT" : " text-gray-400")
                }
                onClick={handleLeftClick}
              />
            </button>

            <p className="text-greenT text-sm">{`${
              products[products.length - 1].id || 0
            } из ${pagination.totalItems}`}</p>

            <button
              className="px-2 py-1 border rounded-md"
              disabled={
                pagination.currentPage + 1 !== pagination.totalPages
                  ? false
                  : true
              }
            >
              <MdOutlineKeyboardArrowRight
                className={
                  "h-5 w-5 p-px text-gray-400" +
                  (pagination.currentPage + 1 !== pagination.totalPages
                    ? " text-greenT"
                    : " text-gray-400")
                }
                onClick={handleRightClick}
              />
            </button>
            <button
              className="px-2 py-1 border rounded-md"
              disabled={
                pagination.currentPage + 1 !== pagination.totalPages
                  ? false
                  : true
              }
            >
              <MdOutlineKeyboardDoubleArrowRight
                className={
                  "h-5 w-5 p-px text-gray-400" +
                  (pagination.currentPage + 1 !== pagination.totalPages
                    ? " text-greenT"
                    : " text-gray-400")
                }
                onClick={handleDoubleRightClick}
              />
            </button>
          </div>

          <ProductsAdmin products={products} />
        </>
      );
    }

    return (
      <p className="mt-3 text-sm text-center text-[#B3B3B3] font-semibold mb-3">
        Список пуст
      </p>
    );
  };

  return (
    <div className="w-full">
      <div className="w-full flex gap-3 items-center px-3 py-1 bg-white border-b">
        {/* <button className="py-1 px-2">
          <IoIosOptions className="h-5 w-5 p-px text-green-600" />
        </button> */}

        <div className="flex-1 flex items-center gap-1">
          <input
            value={inputValue}
            onChange={handleInputValue}
            type="text"
            placeholder="Найти"
            className="flex-1 border border-gray-300 text-slate-400 text-sm py-1 px-2 rounded-md"
          />
          <button className="py-1 px-1" onClick={handleClickSearch}>
            <IoSearchSharp className="h-5 w-5 text-green-600" />
          </button>
        </div>
      </div>

      <div className="py-1 flex justify-center items-center gap-1 bg-white border-b">
        <button
          className="flex justify-center items-center h-8 w-8 bg-greenT rounded-full"
          onClick={() => openModal(modalNewProductAdmin)}
        >
          <FaPlus className="h-5 w-5 p-px text-white" />
        </button>
      </div>

      {showElems()}
    </div>
  );
}

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
import { FaPlus } from "react-icons/fa6";
import { IoRefresh } from "react-icons/io5";
import { useModalStore } from "@/stores/useModalStore";
import { modalNewProductAdmin } from "@/constans";
import { getProductAdmin, getSearchAdmin } from "@/api";
import { IProductInfo } from "@/interfaces";

export default function AdminMenu() {
  const { openModal } = useModalStore();
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProductInfo[]>([]);
  const [pagination, setPagination] = useState({
    currentItems: 0,
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  });

  const loadProducts = async (page = 0) => {
    setIsLoading(true);
    try {
      const response = await getProductAdmin(page);

      if (response && Array.isArray(response.data)) {
        setProducts(response.data);
        setPagination({
          currentItems: response.currentItems || 0,
          currentPage: response.currentPage || 0,
          totalPages: response.totalPages || 0,
          totalItems: response.totalItems || 0,
        });
      } else {
        console.error("Invalid response format:", response);
        setProducts([]);
      }
    } catch (err) {
      console.error("Error loading products:", err);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputValue || inputValue === "") {
        setIsLoading(true);
        try {
          const response = await getSearchAdmin(inputValue);
          if (response && Array.isArray(response.data)) {
            setProducts(response.data);
            setPagination({
              currentItems: response.currentItems,
              currentPage: response.currentPage,
              totalPages: response.totalPages,
              totalItems: response.totalItems,
            });
          } else {
            setProducts([]);
          }
        } catch (err) {
          console.error("Search error:", err);
          setProducts([]);
        } finally {
          setIsLoading(false);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleDoubleLeftClick = () => loadProducts(0);
  const handleLeftClick = () => loadProducts(pagination.currentPage - 1);
  const handleDoubleRightClick = () => loadProducts(pagination.totalPages - 1);
  const handleRightClick = () => loadProducts(pagination.currentPage + 1);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="w-full flex gap-3 items-center px-3 py-1 bg-white border-b">
        <div className="flex-1 flex items-center gap-1">
          <input
            value={inputValue}
            onChange={handleInputValue}
            type="text"
            placeholder="Найти"
            className="flex-1 border border-gray-300 text-slate-400 text-sm py-1 px-2 rounded-md"
          />
        </div>
      </div>

      <div className="relative py-1 flex justify-center items-center gap-1 bg-white border-b">
        <div className="absolute top-1/2 left-3 z-10 -translate-y-1/2">
          <button
            onClick={() => {
              setInputValue("");
              loadProducts(pagination.currentPage);
            }}
            className="px-2 py-1 rounded-md bg-greenT hover:bg-opacity-90"
          >
            <IoRefresh className="h-5 w-5 text-white" />
          </button>
        </div>

        <button
          className="flex justify-center items-center h-8 w-8 bg-greenT rounded-full hover:bg-opacity-90"
          onClick={() => openModal(modalNewProductAdmin)}
        >
          <FaPlus className="h-5 w-5 p-px text-white" />
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : products.length > 0 ? (
        <>
          <div className="flex justify-center items-center gap-1 py-1">
            <button
              className="px-2 py-1 border rounded-md"
              disabled={!pagination.currentPage}
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
              disabled={!pagination.currentPage}
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
              products[products.length - 1]?.id || 0
            } из ${pagination.totalItems}`}</p>

            <button
              className="px-2 py-1 border rounded-md"
              disabled={pagination.currentPage + 1 === pagination.totalPages}
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
              disabled={pagination.currentPage + 1 === pagination.totalPages}
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
      ) : (
        <p className="mt-3 text-sm text-center text-[#B3B3B3] font-semibold mb-3">
          Список пуст
        </p>
      )}
    </div>
  );
}

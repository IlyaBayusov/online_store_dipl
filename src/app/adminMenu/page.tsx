"use client";

import ProductsAdmin from "@/components/AdminPage/ProductsAdmin/ProductsAdmin";
import Loader from "@/components/Loader/Loader";
import ModalDeleteProductAdmin from "@/components/Modals/ModalDeleteProductAdmin";
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
import {
  modalDeleteProductAdmin,
  modalNewProductAdmin,
  sizePage,
} from "@/constans";
import { getProductAdmin, getSearchAdmin } from "@/api";
import { IProductInfo } from "@/interfaces";
import { IDeleteProductProps } from "@/stores/useModalStore";

export default function AdminMenu() {
  const { openModal, modals, modalsProps } = useModalStore();
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

  const handleDoubleLeftClick = () => loadProducts(0);
  const handleLeftClick = () => loadProducts(pagination.currentPage - 1);
  const handleDoubleRightClick = () => loadProducts(pagination.totalPages - 1);
  const handleRightClick = () => loadProducts(pagination.currentPage + 1);

  let searchTimer: NodeJS.Timeout;

  const handleInputValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (searchTimer) {
      clearTimeout(searchTimer);
    }

    searchTimer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await getSearchAdmin(value);
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
    }, 500);
  };

  return (
    <>
      <div className="w-full">
        <div className="w-full flex gap-3 justify-center items-center px-3 py-1 bg-white border-b rounded-t-md">
          <div className="max-w-[500px] flex-1 flex items-center gap-1">
            <input
              value={inputValue}
              onChange={handleInputValue}
              type="text"
              placeholder="Найти"
              className="flex-1 border border-gray-300 text-slate-400 text-sm py-1 px-2 rounded-md"
            />
          </div>
        </div>

        <div className="w-full py-1 flex justify-center items-center gap-1 bg-white border-b rounded-b-md">
          <div className="relative w-full flex justify-center max-w-[500px]">
            <div className="absolute top-1/2 left-0 z-10 -translate-y-1/2 ml-3 sm:ml-0">
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
        </div>

        {isLoading ? (
          <Loader />
        ) : products.length > 0 ? (
          <>
            <div className="flex justify-center items-center gap-1 py-1 bg-white">
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

              <p className="text-greenT text-sm">
                {`${pagination.currentPage * sizePage + 1}-${Math.min(
                  (pagination.currentPage + 1) * sizePage,
                  pagination.totalItems
                )} из ${pagination.totalItems}`}
              </p>

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

            <ProductsAdmin
              products={products}
              onProductDelete={() => loadProducts(pagination.currentPage)}
            />
          </>
        ) : (
          <div className="w-full flex justify-center items-center py-4">
            <p className="text-gray-500">Товары не найдены</p>
          </div>
        )}
      </div>

      {modals[modalDeleteProductAdmin] && (
        <ModalDeleteProductAdmin
          {...(modalsProps[modalDeleteProductAdmin] as IDeleteProductProps)}
        />
      )}
    </>
  );
}

"use client";

import { getProductAdmin } from "@/api";
import HeaderAdmin from "@/components/AdminPage/HeaderAdmin/HeaderAdmin";
import ProductsAdmin from "@/components/AdminPage/ProductsAdmin/ProductsAdmin";
import { IPagination, IProductInfo } from "@/interfaces";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

export default function AdminMenu() {
  const [products, setProducts] = useState<IProductInfo[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 2,
  } as IPagination);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const data = await getProductAdmin(pagination.currentPage);

    if (data) {
      setProducts(data.products);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.totalPages,
        totalItems: data.totalItems,
      }));
    }
  }

  const handleDoubleLeftClick = () => {
    setPagination((prev) => ({ ...prev, currentPage: 0 }));
    getProducts();
  };

  const handleLeftClick = () => {};

  const handleDoubleRightClick = () => {
    setPagination((prev) => ({ ...prev, currentPage: pagination.totalPages }));
    getProducts();
  };

  const handleRightClick = () => {};

  return (
    <div className="w-full absolute top-0 left-0 z-10">
      <HeaderAdmin />

      <div className="container ">
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
          <button className="px-2 py-1 border rounded-md">
            <MdOutlineKeyboardArrowLeft
              className="h-5 w-5 p-px text-gray-400"
              onClick={handleLeftClick}
            />
          </button>

          <p className="text-greenT text-sm">1-10 из 24</p>

          <button className="px-2 py-1 border rounded-md">
            <MdOutlineKeyboardArrowRight
              className="h-5 w-5 p-px text-gray-400"
              onClick={handleRightClick}
            />
          </button>
          <button className="px-2 py-1 border rounded-md">
            <MdOutlineKeyboardDoubleArrowRight
              className="h-5 w-5 p-px text-gray-400"
              onClick={handleDoubleRightClick}
            />
          </button>
        </div>

        <ProductsAdmin products={products} />
      </div>
    </div>
  );
}

"use client";

import ProductsAdmin from "@/components/AdminPage/ProductsAdmin/ProductsAdmin";
import Loader from "@/components/Loader/Loader";
import React, { useEffect } from "react";
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

export default function AdminMenu() {
  const { openModal } = useModalStore();

  const products = usePaginationAdmin((state) => state.products)
  const pagination = usePaginationAdmin((state) => state.pagination)
  const isLoading = usePaginationAdmin((state) => state.isLoading)
  const getProducts = usePaginationAdmin((state) => state.getProducts)

  // const [isLoading, setIsLoading] = useState(true);
  // const [products, setProducts] = useState<IProductInfo[]>([]);
  // const [pagination, setPagination] = useState<IPagination>({} as IPagination);

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);

  // async function getProducts(page: number = 0) {
  //   const data = await getProductAdmin(page);

  //   if (data) {
  //     console.log(data);
  //     setIsLoading(false);

  //     setProducts(data.products);
  //     setPagination((prev) => ({
  //       ...prev,
  //       currentPage: data.currentPage,
  //       totalPages: data.totalPages,
  //       totalItems: data.totalItems,
  //     }));
  //   }
  // }

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

  return (
    <div className="w-full">
      <div className="w-full flex gap-3 items-center px-3 py-1 bg-white border-b">
        <button className="py-1 px-2">
          <IoIosOptions className="h-5 w-5 p-px text-green-600" />
        </button>

        <div className="flex-1 flex items-center gap-1">
          <input
            type="text"
            placeholder="Найти"
            className="flex-1 border border-gray-300 text-slate-400 text-sm py-1 px-2 rounded-md"
          />
          <button className="py-1 px-1">
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

      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  categoriesList,
  paramsProductsCategoryProducts,
  PAGE_SIZE_OPTIONS,
} from "@/constans";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import axios from "axios";
import { ICategory, IPagination } from "@/interfaces";
import Loader from "@/components/Loader/Loader";
import ProductCardList from "@/components/ProductCard/ProductCardList/ProductCardList";
import { mapToUnifiedProduct } from "@/utils";

type PageSizeType = (typeof PAGE_SIZE_OPTIONS)[number];

const fetchProducts = async (products: string, page: number, size: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products/${products}/category`,
      {
        params: {
          page,
          size,
        },
      }
    );

    console.log(response);

    return response.data;
  } catch (error) {
    console.error("ERROR PRODUCTS", error);
  }
};

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [category, setCategory] = useState<ICategory>();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState<PageSizeType>(PAGE_SIZE_OPTIONS[0]);
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
  });

  const params: Params = useParams();

  const getProducts = async (page: number, size: number) => {
    setIsLoading(true);
    const data = await fetchProducts(params.products, page, size);

    if (data) {
      const products = data.products.map(mapToUnifiedProduct);
      setProductsList(products);
      setPagination({
        currentPage: data.pageInfo.currentPage,
        totalItems: data.pageInfo.totalItems,
        totalPages: data.pageInfo.totalPages,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const categoryRu = categoriesList.find(
      (item) => item.url_name.toLowerCase() === params.products.toLowerCase()
    );
    setCategory(categoryRu);
    getProducts(currentPage, pageSize);
  }, [params.products, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(event.target.value) as PageSizeType;
    if (PAGE_SIZE_OPTIONS.includes(newSize)) {
      setPageSize(newSize);
      setCurrentPage(0); // Сброс на первую страницу при изменении размера
    }
  };

  if (
    !categoriesList
      .map((item) => item.url_name)
      .find((item) => item.toLowerCase() === params.products.toLowerCase())
  ) {
    return (
      <p className="mt-3 text-sm text-center text-[#B3B3B3] font-semibold mb-3">
        Список пуст
      </p>
    );
  }

  const renderPagination = () => {
    const pages = [];
    for (let i = 0; i < pagination.totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? "bg-greenT text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  return (
    <>
      <div className="flex justify-between items-center mt-3 mb-5">
        <h2 className="text-lg font-semibold">{category?.name}</h2>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-end">
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

          <div className="flex justify-center mt-4 mb-4">
            {renderPagination()}
          </div>

          <ProductCardList
            productsCard={productsList}
            params={paramsProductsCategoryProducts}
          />
        </>
      )}
    </>
  );
}

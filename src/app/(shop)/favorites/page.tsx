"use client";

import { getFav } from "@/api";
import Loader from "@/components/Loader/Loader";
import ProductCardList from "@/components/ProductCard/ProductCardList/ProductCardList";
import {
  paramsFavoritsProducts,
  SORT_OPTIONS_FAVS,
  sizePage,
} from "@/constans";
import { useFavStore } from "@/stores/useFavStore";
import React, { useCallback, useEffect, useRef, useState } from "react";

type SortFieldType = (typeof SORT_OPTIONS_FAVS)[number]["value"];

export default function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState<SortFieldType>(
    SORT_OPTIONS_FAVS[0].value
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const { favProducts, pagination, updateFavData } = useFavStore();

  const fetchFavorites = async (
    page: number,
    sort: string,
    isLoadMore = false
  ) => {
    setIsLoading(true);
    try {
      const data = await getFav(page, sizePage, sort);
      if (data) {
        if (isLoadMore) {
          updateFavData([...favProducts, ...data.data], {
            currentPage: data.currentPage,
            totalItems: data.totalItems,
            totalPages: data.totalPages,
          });
        } else {
          updateFavData(data.data, {
            currentPage: data.currentPage,
            totalItems: data.totalItems,
            totalPages: data.totalPages,
          });
        }
      }
    } catch (err) {
      console.error("Ошибка при загрузке избранного:", err);
      if (!isLoadMore) {
        updateFavData([], {
          currentPage: 0,
          totalItems: 0,
          totalPages: 0,
        });
      }
    } finally {
      setIsLoading(false);
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    }
  };

  // Проверяем наличие скролла и при необходимости подгружаем данные
  const checkScrollAndLoadMore = useCallback(() => {
    if (!containerRef.current || isLoading || !pagination) return;

    const { scrollHeight, clientHeight } = containerRef.current;

    // Если контент меньше высоты контейнера и есть ещё страницы
    if (
      scrollHeight <= clientHeight &&
      currentPage < pagination.totalPages - 1
    ) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchFavorites(nextPage, sortField, true);
    }
  }, [currentPage, isLoading, pagination, sortField]);

  // Вызываем проверку после каждой загрузки данных
  useEffect(() => {
    if (!isLoading) {
      checkScrollAndLoadMore();
    }
  }, [isLoading, checkScrollAndLoadMore]);

  useEffect(() => {
    setCurrentPage(0); // Сбрасываем страницу при изменении сортировки
    fetchFavorites(0, sortField);
  }, [sortField]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value as SortFieldType);
  };

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isLoading || !pagination) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (
      scrollHeight - scrollTop <= clientHeight * 1.5 &&
      currentPage < pagination.totalPages - 1
    ) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchFavorites(nextPage, sortField, true);
    }
  }, [currentPage, isLoading, pagination, sortField]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const showContent = () => {
    // Показываем лоадер при первой загрузке
    if (isInitialLoad) {
      return (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      );
    }

    // Показываем сообщение, если список пуст
    if (!isLoading && !favProducts.length) {
      return (
        <p className="text-sm text-center text-[#B3B3B3] font-semibold mb-3">
          Список пуст
        </p>
      );
    }

    return (
      <>
        <ProductCardList
          productsCard={favProducts}
          params={paramsFavoritsProducts}
        />
        {isLoading && (
          <div className="py-4 flex justify-center">
            <Loader />
          </div>
        )}
        {!isLoading &&
          pagination &&
          currentPage < pagination.totalPages - 1 && (
            <p className="text-sm text-center text-gray-500 py-2">
              Прокрутите вниз, чтобы загрузить ещё
            </p>
          )}
      </>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mt-3 mb-5">
        <h2 className="text-lg font-semibold">Избранное</h2>
        <div className="flex gap-4">
          <select
            value={sortField}
            onChange={handleSortChange}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm"
          >
            {SORT_OPTIONS_FAVS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4">{showContent()}</div>
      </div>
    </div>
  );
}

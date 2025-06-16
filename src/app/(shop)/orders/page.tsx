"use client";

import { getOrders } from "@/api";
import OrdersAccordion from "@/components/Accordions/OrdersAccordion/OrdersAccordion";
import Loader from "@/components/Loader/Loader";
import { SORT_OPTIONS_FAVS, sizePage } from "@/constans";
import { IOrderItems, IPagination } from "@/interfaces";
import React, { useCallback, useEffect, useRef, useState } from "react";

type SortFieldType = (typeof SORT_OPTIONS_FAVS)[number]["value"];

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<IOrderItems[]>([]);
  const [pagination, setPagination] = useState<IPagination | undefined>();
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState<SortFieldType>(
    SORT_OPTIONS_FAVS[0].value
  );
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchOrders = async (
    page: number,
    sort: string,
    isLoadMore = false
  ) => {
    setIsLoading(true);
    try {
      // Очищаем заказы при первой загрузке или смене сортировки
      if (!isLoadMore) {
        setOrders([]);
      }

      const data = await getOrders(page, sizePage, sort);
      if (data) {
        setOrders((prev) => (isLoadMore ? [...prev, ...data.data] : data.data));
        setPagination({
          currentPage: data.currentPage,
          totalItems: data.totalItems,
          totalPages: data.totalPages,
        });
        setError(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка при загрузке заказов"
      );
      if (!isLoadMore) {
        setOrders([]);
        setPagination(undefined);
      }
    } finally {
      setIsLoading(false);
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
      fetchOrders(nextPage, sortField, true);
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
    fetchOrders(0, sortField);
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
      fetchOrders(nextPage, sortField, true);
    }
  }, [currentPage, isLoading, pagination, sortField]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const showElems = () => {
    if (isLoading && !orders.length) {
      return (
        <div className="py-4 flex justify-center">
          <Loader />
        </div>
      );
    }

    if (error) {
      return (
        <p className="text-sm text-center text-red-500 font-semibold mb-3">
          {error}
        </p>
      );
    }

    if (!isLoading && !orders.length) {
      return (
        <p className="text-sm text-center text-[#B3B3B3] font-semibold mb-3">
          Список пуст
        </p>
      );
    }

    return (
      <>
        <OrdersAccordion orders={orders} />
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
        <h2 className="text-lg font-semibold">Заказы</h2>
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
        <div className="flex flex-col gap-4">{showElems()}</div>
      </div>
    </div>
  );
}

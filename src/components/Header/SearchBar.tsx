"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchWithFilters } from "../../hooks/useSearchWithFilters";
import { useDebounce } from "../../hooks/useDebounce";
import Link from "next/link";
import Image from "next/image";
import { useClickOutside } from "../../hooks/useClickOutside";
import Loader from "../../components/Loader/Loader";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const prevSearch = useRef(debouncedSearch);

  const {
    products,
    isLoading,
    error,
    pagination,
    updateFilters,
    loadMore,
    fetchProducts,
  } = useSearchWithFilters();

  // Закрываем выпадающий список при клике вне компонента
  useClickOutside(dropdownRef, () => setIsOpen(false));

  // Проверяем наличие скролла и при необходимости подгружаем данные
  const checkScrollAndLoadMore = useCallback(() => {
    if (!resultsRef.current || isLoading || !pagination || !searchTerm) return;

    const { scrollHeight, clientHeight } = resultsRef.current;

    // Если контент меньше высоты контейнера и есть ещё страницы
    if (
      scrollHeight <= clientHeight &&
      pagination.currentPage < pagination.totalPages - 1
    ) {
      loadMore();
    }
  }, [isLoading, pagination, loadMore, searchTerm]);

  // Вызываем проверку после каждой загрузки данных
  useEffect(() => {
    if (!isLoading && searchTerm) {
      checkScrollAndLoadMore();
    }
  }, [isLoading, checkScrollAndLoadMore, searchTerm]);

  // Обновляем поиск только при изменении debounced значения
  useEffect(() => {
    if (debouncedSearch !== prevSearch.current) {
      prevSearch.current = debouncedSearch;
      if (debouncedSearch) {
        const newFilters = { search: debouncedSearch };
        updateFilters(newFilters);
        fetchProducts(0, newFilters);
      } else {
        // Очищаем результаты при пустом поиске
        updateFilters({});
      }
    }
  }, [debouncedSearch, updateFilters, fetchProducts]);

  // Отслеживаем состояние загрузки
  useEffect(() => {
    if (!searchTerm) {
      setIsSearching(false);
    } else {
      setIsSearching(isLoading || debouncedSearch !== searchTerm);
    }
  }, [isLoading, searchTerm, debouncedSearch]);

  // Обработчик прокрутки для бесконечной загрузки
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        loadMore();
      }
    },
    [loadMore]
  );

  const handleProductClick = () => {
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(!!value);
    setIsSearching(!!value);
  };

  const renderContent = () => {
    if (isSearching) {
      return (
        <div className="py-6">
          <Loader />
        </div>
      );
    }

    if (error) {
      return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!products.length && searchTerm) {
      return (
        <div className="p-4 text-center text-gray-500">Ничего не найдено</div>
      );
    }

    if (products.length > 0 && searchTerm && !isSearching) {
      return (
        <>
          {products.map((product) => (
            <Link
              key={product.productId}
              href={`/${product.categoryName}/${product.productId}`}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
              onClick={handleProductClick}
            >
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-sm text-gray-500">{product.price} руб.</p>
              </div>
            </Link>
          ))}

          {pagination.currentPage < pagination.totalPages - 1 && (
            <div className="p-2 text-center text-gray-500 text-sm">
              Прокрутите вниз, чтобы загрузить ещё
            </div>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div className="relative flex-1 max-w-96" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Я ищу..."
        className="h-full w-full py-1 px-4 rounded-md text-xs border border-greenT"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsOpen(!!searchTerm)}
      />

      {isOpen && (searchTerm || isSearching) && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50"
          onScroll={handleScroll}
        >
          {renderContent()}
        </div>
      )}
    </div>
  );
}

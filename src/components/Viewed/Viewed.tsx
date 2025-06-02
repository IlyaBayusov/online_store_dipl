"use client";

import React, { useState, useEffect } from "react";
import { IProductCategory } from "@/interfaces";
import ProductCardItem from "../ProductCard/ProductCardItem/ProductCardItem";
import { paramsViewed } from "@/constans";

type Props = {
  viewed: IProductCategory[];
};

export default function Viewed({ viewed }: Props) {
  // Убираем дубликаты
  const uniqueViewed = viewed.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.productId === item.productId)
  );

  // Состояние для отслеживания количества видимых элементов
  const [visibleItems, setVisibleItems] = useState(2);
  // Состояние для отслеживания текущей позиции
  const [currentPosition, setCurrentPosition] = useState(0);

  // Обновляем количество видимых элементов при изменении размера окна
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width >= 1280) setVisibleItems(6); // xl
      else if (width >= 1024) setVisibleItems(5); // lg
      else if (width >= 768) setVisibleItems(4); // md
      else if (width >= 640) setVisibleItems(3); // sm
      else setVisibleItems(2); // mobile
    };

    // Инициализация
    updateVisibleItems();

    // Добавляем слушатель изменения размера окна
    window.addEventListener("resize", updateVisibleItems);

    // Очистка
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  // Обработчики для кнопок
  const handlePrev = () => {
    setCurrentPosition((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    const maxPosition = Math.max(0, uniqueViewed.length - visibleItems);
    setCurrentPosition((prev) => Math.min(prev + 1, maxPosition));
  };

  // Проверка возможности навигации
  const canScrollPrev = currentPosition > 0;
  const canScrollNext = currentPosition < uniqueViewed.length - visibleItems;

  return (
    <div className="flex flex-col justify-start w-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          Вы просматривали
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={!canScrollPrev}
            className="flex justify-start items-center h-6 w-6 p-1.5 bg-white rounded-full drop-shadow-lg shadow-md disabled:opacity-50"
            type="button"
          >
            <svg className="text-gray-400 -ml-0.5" viewBox="0 0 532 532">
              <path
                fill="currentColor"
                d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={!canScrollNext}
            className="flex justify-end items-center h-6 w-6 p-1.5 bg-white rounded-full drop-shadow-lg shadow-md disabled:opacity-50"
            type="button"
          >
            <svg className="text-gray-400 -mr-0.5" viewBox="0 0 532 532">
              <path
                fill="currentColor"
                d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <div
          className="flex gap-3 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${
              currentPosition * (100 / visibleItems)
            }%)`,
          }}
        >
          {uniqueViewed.map((item) => (
            <div
              key={item.productId}
              className="flex-shrink-0"
              style={{
                width: `calc(${100 / visibleItems}% - ${
                  (visibleItems - 1) * 0.75
                }rem / ${visibleItems})`,
              }}
            >
              <ProductCardItem productCard={item} params={paramsViewed} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

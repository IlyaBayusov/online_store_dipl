"use client";

import { useEffect, useState } from "react";
import { getProductsMainPage } from "@/axios";
import ProductCardList from "@/components/ProductCard/ProductCardList/ProductCardList";
import { paramsPopularProducts, categoriesPages } from "@/constans";
import Brands from "@/components/Brands/Brands";
import Viewed from "@/components/Viewed/Viewed";
import Loader from "@/components/Loader/Loader";
import { mapToUnifiedProduct } from "@/utils";
import { getViewed } from "@/api";
import { IProductCategory } from "@/interfaces";
import CategoryItem from "@/components/Category/CategoryItem/CategoryItem";
import Link from "next/link";

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [viewed, setViewed] = useState<IProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const [productsData, viewedResponse] = await Promise.all([
        getProductsMainPage(),
        getViewed(),
      ]);

      if (productsData) {
        const products = productsData.map(mapToUnifiedProduct);
        setNewArrivals(products);
      }

      if (viewedResponse) {
        setViewed(viewedResponse);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main className="flex-1">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Категории */}
        <section className="py-6 sm:py-8 lg:py-12">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              Категории
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            {categoriesPages.map((category) => (
              <Link
                key={category.id}
                href={`/${category.urlName}`}
                className="block h-full transition-transform hover:scale-[1.02]"
              >
                <CategoryItem name={category.name} img={category.img} />
              </Link>
            ))}
          </div>
        </section>

        {/* Новинки */}
        <section className="py-6 sm:py-8 lg:py-12">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              Новинки
            </h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader />
            </div>
          ) : (
            <ProductCardList
              productsCard={newArrivals}
              params={paramsPopularProducts}
            />
          )}
        </section>

        {/* Бренды */}
        <section className="py-6 sm:py-8 lg:py-12">
          <Brands />
        </section>

        {/* Просмотренные товары */}
        {viewed.length !== 0 && (
          <section className="py-6 sm:py-8 lg:py-12">
            <Viewed viewed={viewed} />
          </section>
        )}
      </div>
    </main>
  );
}

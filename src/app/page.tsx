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

  console.log(newArrivals);

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8">
      {/* слайдер */}

      {/* <CategoryList /> */}

      <div className="mt-8">
        <div className="flex justify-start mb-5">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
            Категории
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
          {categoriesPages.map((category) => (
            <Link
              key={category.id}
              href={`/${category.urlName}`}
              className="block h-full"
            >
              <CategoryItem name={category.name} img={category.img} />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 md:mt-12 lg:mt-16">
        <div className="flex justify-start mb-5">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
            Новинки
          </h2>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <ProductCardList
            productsCard={newArrivals}
            params={paramsPopularProducts}
          />
        )}
      </div>

      <div className="mt-8 md:mt-12 lg:mt-16">
        <Brands />
      </div>

      {viewed.length !== 0 && (
        <div className="mt-8 md:mt-12 lg:mt-16">
          <Viewed viewed={viewed} />
        </div>
      )}
    </div>
  );
}

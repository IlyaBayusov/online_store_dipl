"use client";

import CategoryList from "@/components/Category/CategoryList/CategoryList";
import { useEffect, useState } from "react";
import { getProductsMainPage } from "@/axios";
import ProductCardList from "@/components/ProductCard/ProductCardList/ProductCardList";
import { paramsPopularProducts } from "@/constans";
import Brands from "@/components/Brands/Brands";
import Viewed from "@/components/Viewed/Viewed";
import Loader from "@/components/Loader/Loader";
import { mapToUnifiedProduct } from "@/utils";
import { getViewed } from "@/api";
import { IProductCategory } from "@/interfaces";

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
    <div className="w-full">
      {/* слайдер */}

      <CategoryList />

      <>
        <div className="flex justify-start mt-3 mb-5">
          <h2 className="text-lg font-semibold">Новинки</h2>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <ProductCardList
            productsCard={newArrivals}
            params={paramsPopularProducts}
          />
        )}
      </>

      <Brands />

      {viewed.length !== 0 && <Viewed viewed={viewed} />}
    </div>
  );
}

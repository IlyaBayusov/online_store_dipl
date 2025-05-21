"use client";

import CategoryList from "@/components/Category/CategoryList/CategoryList";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import ProductCardList from "@/components/ProductCard/ProductCardList/ProductCardList";
import { paramsPopularProducts } from "@/constans";
import Brands from "@/components/Brands/Brands";
import Viewed from "@/components/Viewed/Viewed";
import Loader from "@/components/Loader/Loader";
import { mapToUnifiedProduct } from "@/utils";

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await api.get("/v1/products");
        const data = await response.data;

        if (data) {
          const products = data.map(mapToUnifiedProduct);

          setNewArrivals(products);
          setIsLoading(false);

          console.log(newArrivals);
        }
      } catch (error) {
        console.log("главная страница: ", error);
      }
    };

    fetchNewArrivals();
  }, []);

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

      {/* <Viewed /> */}
    </div>
  );
}

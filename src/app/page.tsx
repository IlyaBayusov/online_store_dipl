"use client";

import CategoryList from "@/components/Category/CategoryList/CategoryList";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import ProductCardList from "@/components/ProductCard/ProductCardList/ProductCardList";
import { nameTitlePopularProducts } from "@/constans";
import Brands from "@/components/Brands/Brands";
import Viewed from "@/components/Viewed/Viewed";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await api.get("/v1/products");
        const data = await response.data;

        setNewArrivals(data);
        setIsLoading(false);
        console.log(newArrivals);
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

      {isLoading ? (
        <Loader />
      ) : newArrivals.length ? (
        <ProductCardList
          productsCard={newArrivals}
          nameTitle={nameTitlePopularProducts}
        />
      ) : null}

      <Brands />

      {/* <Viewed /> */}
    </div>
  );
}

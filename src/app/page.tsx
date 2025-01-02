"use client";

import CategoryList from "@/components/Category/CategoryList/CategoryList";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import ProductCardList from "@/components/ProductCard/ProductCardList/ProductCardList";
import { nameTitlePopularProducts, paramsPopularProducts } from "@/constans";
import Brands from "@/components/Brands/Brands";
import Viewed from "@/components/Viewed/Viewed";
import Loader from "@/components/Loader/Loader";
import {
  IFavsGet,
  IOrdersGet,
  IProductCategory,
  IProductsCardBody,
} from "@/interfaces";

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await api.get("/v1/products");
        const data = await response.data;

        const products = data.map(mapToUnifiedProduct);

        setNewArrivals(products);
        setIsLoading(false);

        console.log(newArrivals);
      } catch (error) {
        console.log("главная страница: ", error);
      }
    };

    fetchNewArrivals();
  }, []);

  function mapToUnifiedProduct(
    data: IProductCategory | IOrdersGet | IFavsGet
  ): IProductsCardBody {
    return {
      productId: data.productId,
      categoryName: data.categoryName,
      name:
        (data as IProductCategory).name ||
        (data as IFavsGet | IOrdersGet).productName,
      image: data.image,
      price: (data as IProductCategory | IOrdersGet).price,
    };
  }

  console.log(newArrivals);

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
          params={paramsPopularProducts}
        />
      ) : null}

      <Brands />

      <Viewed />
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { categoriesList, paramsProductsCategoryProducts } from "@/constans";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import axios from "axios";
import { ICategory } from "@/interfaces";
import Loader from "@/components/Loader/Loader";
import ProductCardList from "@/components/ProductCard/ProductCardList/ProductCardList";
import { mapToUnifiedProduct } from "@/utils";

const fetchProducts = async (products: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products/${products}/category`
    );

    const data = await response.data;

    return data;
  } catch (error) {
    console.error("ERROR PRODUCTS", error);
  }
};

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [category, setCategory] = useState<ICategory>();

  const params: Params = useParams();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts(params.products);

      if (data) {
        const products = data.products.map(mapToUnifiedProduct);

        setProductsList(products);
        //добавить пагинацию
        setIsLoading(false);
      }
    };

    const categoryRu = categoriesList.find((item) => {
      //исправить, добавить валидацию через запрос на сервер, вынести в другой useEffect
      if (item.url_name.toLowerCase() === params.products.toLowerCase())
        return item;
    });

    setCategory(categoryRu);

    getProducts();
  }, [params.products]);

  if (
    !categoriesList
      .map((item) => item.url_name)
      .find((item) => item.toLowerCase() === params.products.toLowerCase())
  ) {
    return notFound();
  }

  return (
    <>
      <div className="flex justify-start mt-3 mb-5">
        <h2 className="text-lg font-semibold">{category?.name}</h2>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <ProductCardList
          productsCard={productsList}
          params={paramsProductsCategoryProducts}
        />
      )}
    </>
  );
}

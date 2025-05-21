import ProductInfo from "@/components/ProductInfo/ProductInfo";
import { categoriesList } from "@/constans";
import { IProductInfo } from "@/interfaces/index";
import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";

const fetchProducts = async (productId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products/${productId}`
    );

    if (response.status !== 200) {
      throw {
        status: response.status,
        message: `Ошибка запроса товара с id: ${productId}`,
      };
    }

    const data = await response.data;
    console.log(data);

    return data;
  } catch (error) {
    console.error("Ошибка получения продукта: ", error);

    return { status: 500, message: "Internal Server Error" };
  }
};

export default async function Product({
  params,
}: {
  params: { product: string; products: string };
}) {
  const { product, products } = params;

  const arrProduct: IProductInfo[] = await fetchProducts(product);

  if (!arrProduct)
    return (
      <p className="text-sm text-center text-[#B3B3B3] font-semibold mt-3 mb-3">
        Товар не найден
      </p>
    );

  const productIdInArray = arrProduct
    ?.map((item) => item.id)
    .indexOf(Number(product));

  if (
    !categoriesList
      .map((item) => item.url_name)
      .find((item) => item.toLowerCase() === products.toLowerCase())
  ) {
    return notFound();
  }

  if (arrProduct)
    return (
      <ProductInfo
        productIdInArray={productIdInArray}
        arrProduct={arrProduct}
      />
    );

  return <h1>Loading</h1>;
}

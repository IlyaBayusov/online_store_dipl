"use client";

import { getOrders } from "@/api";
import Loader from "@/components/Loader/Loader";
import ProductCardList from "@/components/ProductCard/ProductCardList/ProductCardList";
import { paramsOrdersProducts } from "@/constans";
import { IOrdersGet, IProductsCardBody } from "@/interfaces";
import { mapToUnifiedProduct } from "@/utils";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<IProductsCardBody[]>([]);

  useEffect(() => {
    const getOrdersList = async () => {
      const data: IOrdersGet[] | undefined = await getOrders();
      if (data) {
        const products = data.map(mapToUnifiedProduct);

        setOrders(products);
        setIsLoading(false);
      }
    };

    getOrdersList();
  }, []);

  return (
    <>
      <div className="flex justify-start mt-3 mb-5">
        <h2 className="text-lg font-semibold">Заказы</h2>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <ProductCardList productsCard={orders} params={paramsOrdersProducts} />
      )}
    </>
  );
}

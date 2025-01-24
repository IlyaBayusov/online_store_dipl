"use client";

import { getOrders } from "@/api";
import OrdersAccordion from "@/components/Accordions/OrdersAccordion/OrdersAccordion";
import Loader from "@/components/Loader/Loader";
import { IOrdersGet } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<IOrdersGet>({} as IOrdersGet);

  useEffect(() => {
    const getOrdersList = async () => {
      const data = await getOrders();
      if (data) {
        setOrders(data);
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
        // <ProductCardList productsCard={orders} params={paramsOrdersProducts} />
        <OrdersAccordion orders={orders} />
      )}
    </>
  );
}

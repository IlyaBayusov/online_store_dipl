"use client";

import { getOrders } from "@/api";
import OrdersAccordion from "@/components/Accordions/OrdersAccordion/OrdersAccordion";
import Loader from "@/components/Loader/Loader";
import { IOrderItems, IPagination } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<IOrderItems[] | undefined>();
  const [pagination, setPagination] = useState<IPagination | undefined>();

  useEffect(() => {
    const getOrdersList = async () => {
      const data = await getOrders();
      if (data) {
        setOrders(data.data);
        setPagination({
          currentPage: data.currentPage,
          pageSize: data.pageSize,
          totalItems: data.totalItems,
          totalPages: data.totalPages,
        });
      }

      setIsLoading(false);
    };

    getOrdersList();
  }, []);

  console.log(orders);

  const showElems = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (orders === undefined || !orders.length) {
      return (
        <p className="text-sm text-center text-[#B3B3B3] font-semibold mb-3">
          Список пуст
        </p>
      );
    }

    return <OrdersAccordion orders={orders} />;
  };

  return (
    <>
      <div className="flex justify-start mt-3 mb-5">
        <h2 className="text-lg font-semibold">Заказы</h2>
      </div>

      {showElems()}
    </>
  );
}

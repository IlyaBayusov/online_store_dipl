"use client";

import { getOrders } from "@/api";
import Loader from "@/components/Loader/Loader";
import OrdersList from "@/components/Orders/OrdersList/OrdersList";
import { IOrdersGet } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<IOrdersGet[]>([]);

  useEffect(() => {
    const getOrdersList = async () => {
      const data: IOrdersGet[] | undefined = await getOrders();
      if (data) {
        setOrders(data);
        setIsLoading(false);
      }
    };

    getOrdersList();
  }, []);

  console.log(orders);

  return isLoading ? <Loader /> : <OrdersList orders={orders} />;
}

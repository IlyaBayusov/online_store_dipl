"use client";

import { getOrders } from "@/api";
import OrdersList from "@/components/Orders/OrdersList/OrdersList";
import { IOrdersGet } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<IOrdersGet[]>([]);

  useEffect(() => {
    const getOrdersList = async () => {
      const data: IOrdersGet[] | undefined = await getOrders();
      if (data) setOrders(data);
    };

    getOrdersList();
  }, []);

  if (!orders) return <div>Loading...</div>;

  return <OrdersList orders={orders} />;
}

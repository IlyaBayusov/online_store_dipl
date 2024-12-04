import { IOrdersGet } from "@/interfaces";
import Link from "next/link";
import React from "react";
import OrdersItem from "../OrdersItem/OrdersItem";

type Props = { orders: IOrdersGet[] };

export default function OrdersList({ orders }: Props) {
  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          Заказы
        </h2>
      </div>
      <div className="my-2 w-full grid grid-cols-2 gap-3">
        {orders.map((order, index) => (
          <Link
            key={index}
            href={`/${order.categoryName.toLowerCase()}/${order.productId}`}
          >
            <OrdersItem order={order} />
          </Link>
        ))}
      </div>
    </div>
  );
}

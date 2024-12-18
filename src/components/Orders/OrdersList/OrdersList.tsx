import { IOrdersGet } from "@/interfaces";
import Link from "next/link";
import React from "react";
import OrdersItem from "../OrdersItem/OrdersItem";

type Props = { orders: IOrdersGet[] };

export default function OrdersList({ orders }: Props) {
  return (
    <>
      <h2 className="text-lg font-semibold text-start mt-3 mb-5">Заказы</h2>

      {orders.length ? (
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
      ) : (
        <p className="text-sm text-center text-[#B3B3B3] font-semibold mt-3 mb-3">
          Список пуст
        </p>
      )}
    </>
  );
}

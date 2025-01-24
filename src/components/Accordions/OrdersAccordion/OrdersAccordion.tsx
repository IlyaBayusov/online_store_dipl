"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { IOrdersGet } from "@/interfaces";
import { getDate, getStatusRu } from "@/utils";

type Props = { orders: IOrdersGet };

export default function OrdersAccordion({ orders }: Props) {
  if (!orders.orderItems.length) {
    return (
      <p className="text-sm text-center text-[#B3B3B3] font-semibold mb-3">
        Список пуст
      </p>
    );
  }

  return (
    <Accordion.Root
      type="single"
      defaultValue="item-1"
      collapsible
      className="w-full"
    >
      {orders.orderItems.map((order, index) => (
        <Accordion.Item
          value={index.toString()}
          key={index}
          className={"w-full p-2.5 rounded-md outline outline-1 outline-greenT"}
        >
          <Accordion.Trigger className="w-full">
            <div className="w-full flex flex-col items-center gap-3 text-sm">
              <div className="w-full flex justify-between items-center font-bold">
                <p>{`Заказ от ${getDate(order.buysIn).day}.${
                  getDate(order.buysIn).month
                }`}</p>
                <p>{`${order.totalPrice} руб.`}</p>
              </div>

              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <p className="text-greenT">{`№${order.orders[0].orderId}`}</p>
                  <div className="px-2 py-px rounded-[4px] bg-greenT text-white">
                    {getStatusRu(order.status)}
                  </div>
                </div>

                <p className="text-xs text-greenT cursor-pointer hover:underline">
                  Подробнее
                </p>
              </div>
            </div>
          </Accordion.Trigger>
          <Accordion.Content className="">
            {order.orders.map((product) => (
              <div key={product.productName} className="text-xs mt-2">
                <p className="w-full">{product.productName}</p>

                <div className="flex justify-between items-center">
                  <p>{`${product.quantity} шт.`}</p>
                  <p>{`${product.price} руб.`}</p>
                </div>
              </div>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { IOrderItems } from "@/interfaces";
import { getDate, getPaymentMethod, getStatusRu } from "@/utils";

type Props = { orders: IOrderItems[] };

export default function OrdersAccordion({ orders }: Props) {
  return (
    <Accordion.Root
      type="single"
      defaultValue="item-1"
      collapsible
      className="w-full"
    >
      {orders.map((order, index) => (
        <Accordion.Item
          value={index.toString()}
          key={index}
          className={"w-full mb-2 p-2.5 rounded-md shadow-lg"}
        >
          <Accordion.Trigger className="w-full">
            <div className="w-full flex flex-col items-center gap-3 text-sm">
              <div className="w-full flex justify-between items-center font-bold">
                <p>{`Заказ от ${getDate(order.buysIn)}`}</p>
                <p>{`${order.totalPrice} руб.`}</p>
              </div>

              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <p className="text-greenT">{`№${order.orders[0].orderId}`}</p>
                  <div
                    style={{ backgroundColor: getStatusRu(order.status).color }}
                    className="px-2 py-px rounded-[4px] text-white text-xs"
                  >
                    {getStatusRu(order.status).value}
                  </div>
                </div>

                <div className="flex flex-row items-center gap-3">
                  <p className="text-xs text-greenT cursor-pointer hover:underline">
                    Подробнее
                  </p>

                  {getPaymentMethod(order.paymentMethod) === "Картой" && (
                    <p className="px-2 py-px rounded-[4px] text-white text-xs bg-greenT">
                      Оплачено
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Accordion.Trigger>
          <Accordion.Content className="">
            {order.orders.map((product) => (
              <div key={product.productName} className="text-xs mt-2">
                <div className="flex justify-between">
                  <p>{product.productName}</p>
                  <p className="h-full text-start align-text-top">
                    {getPaymentMethod(order.paymentMethod)}
                  </p>
                </div>

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

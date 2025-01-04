import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { IOrdersGet } from "@/interfaces";

type Props = { orders: IOrdersGet[] };

export default function OrdersAccordion({ orders }: Props) {
  return (
    <Accordion.Root
      type="single"
      defaultValue="item-1"
      collapsible
      className="w-full"
    >
      <Accordion.Item value="1" className="w-full p-2.5">
        <Accordion.Trigger className="w-full">
          <div className="w-full flex flex-col items-center gap-3 text-sm">
            <div className="w-full flex justify-between items-center font-bold">
              <p>{`Заказ от ${orders}`}</p>
              <p>000 руб.</p>
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-3">
                <p>{`№{orderId}`}</p>
                <div>status</div>
              </div>

              <p className="text-xs text-greenT">Подробнее</p>
            </div>
          </div>
        </Accordion.Trigger>
        <Accordion.Content></Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

// [
//   //массив заказов
//   {
//     //заказ
//     //инфа заказа

//     products: {
//       //инфа товаров
//     },
//   },
// ];

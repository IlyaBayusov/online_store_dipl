import { IOrdersGet } from "@/interfaces";
import { getStatusRu } from "@/utils";
import Image from "next/image";
import React from "react";

type Props = { order: IOrdersGet };

export default function OrdersItem({ order }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative">
        <div className="relative w-full aspect-square flex justify-center items-center rounded-md">
          <Image
            src={order.image}
            alt={order.productName}
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center",
              mixBlendMode: "multiply",
            }}
            sizes="(max-width: 768px) 50vw"
            className="rounded-md"
          />
        </div>

        <div className="absolute bottom-0 right-0 z-10 flex flex-col justify-end">
          <p className="bg-greenT bg-opacity-90 px-2 p-0.5 text-white text-sm rounded-s-md">
            {getStatusRu(order.status)}
          </p>
        </div>
      </div>

      <p className="text-sm text-start">Количество: {order.quantity} шт.</p>
      <p className="text-base font-bold text-start">{`${order.price} РУБ.`}</p>
      <p className="text-sm text-start">{order.productName}</p>
    </div>
  );
}

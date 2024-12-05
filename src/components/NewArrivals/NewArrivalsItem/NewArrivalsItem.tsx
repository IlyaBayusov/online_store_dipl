"use client";

import { IProductCategory } from "@/interfaces";
import Image from "next/image";
import React from "react";

type Props = { arrival: IProductCategory };

export default function NewArrivalsItem({ arrival }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <Image
          src={arrival.image}
          alt={arrival.name}
          height={200}
          width={200}
          className="rounded-md h-auto w-auto"
        />
      </div>

      <p className="text-base font-bold text-start">{`${arrival.price} РУБ.`}</p>
      <p className="text-sm text-start">{arrival.name}</p>
    </div>
  );
}

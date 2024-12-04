import Image from "next/image";
import React from "react";

type Props = { name: string; img: string; price: number };

export default function ProductsItem({ name, img, price }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <Image
          src={img}
          alt={name}
          height={200}
          width={200}
          className="rounded-md"
        />
      </div>

      <p className="text-base font-bold text-start">{`${price} РУБ.`}</p>
      <p className="text-sm text-start">{name}</p>
    </div>
  );
}

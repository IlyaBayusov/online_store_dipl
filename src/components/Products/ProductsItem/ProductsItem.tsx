import Image from "next/image";
import React from "react";

type Props = { name: string; img: string; price: number };

export default function ProductsItem({ name, img, price }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative w-full h-[228px] bg-[#F0F0F0] flex justify-center items-center rounded-md">
        <Image
          src={img}
          alt={name}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-md"
        />
      </div>

      <p className="text-base font-bold text-start">{`${price} РУБ.`}</p>
      <p className="text-sm text-start">{name}</p>
    </div>
  );
}

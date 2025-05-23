import Image from "next/image";
import React from "react";

type Props = { name: string; img: string; price: number };

export default function ProductsItem({ name, img, price }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative w-full aspect-square flex justify-center items-center rounded-md">
        <Image
          src={img}
          alt={name}
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

      <p className="text-base font-bold text-start">{`${price} РУБ.`}</p>
      <p className="text-sm text-start">{name}</p>
    </div>
  );
}

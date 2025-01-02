import { IFavsGet } from "@/interfaces";
import Image from "next/image";
import React from "react";

type Props = {
  fav: IFavsGet;
};

export default function FavItem({ fav }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative w-full aspect-square flex justify-center items-center rounded-md">
        <Image
          src={fav.image}
          alt={fav.productName}
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

      {/* <p className="text-base font-bold text-start">{`${fav.price} РУБ.`}</p> */}
      <p className="text-sm text-start">{fav.productName}</p>
    </div>
  );
}

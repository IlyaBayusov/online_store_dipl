import { IFavsGet } from "@/interfaces";
import Image from "next/image";
import React from "react";

type Props = {
  fav: IFavsGet;
};

export default function FavItem({ fav }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative">
        <Image
          src={fav.image}
          alt={fav.image}
          height={200}
          width={200}
          className="rounded-md"
        />
      </div>

      {/* <p className="text-base font-bold text-start">{`${fav.price} РУБ.`}</p> */}
      <p className="text-sm text-start">{fav.productName}</p>
    </div>
  );
}

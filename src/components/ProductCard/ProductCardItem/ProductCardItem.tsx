import { IProductCategory } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { CiHeart } from "react-icons/ci";
import img_test from "../../../../public/testImg/img_test.png";

type Props = { productCard: IProductCategory };

export default function ProductCardItem({ productCard }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="bg-[#EB8528] px-2 p-0.5 text-sm rounded-md">
          <p className="text-white">Новинки</p>
        </div>

        <CiHeart className="h-5 w-5 text-[#B9B9B9]" />
      </div>

      <div className="mt-3">
        <Image
          // src={productCard.image}
          src={img_test}
          alt={productCard.name}
          className="rounded-md w-full h-auto object-cover"
        />
      </div>

      <div className="mt-3 flex flex-grow  flex-col items-start gap-3">
        <p className="text-base font-bold text-start">{`${productCard.price} РУБ.`}</p>
        <p className="text-sm text-start">{productCard.name}</p>
      </div>

      <button className="bg-greenT px-3 p-1 text-sm text-white rounded-md mt-3">
        Купить
      </button>
    </div>
  );
}

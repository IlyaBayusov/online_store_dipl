"use client";

import React, { useMemo } from "react";
import { Carousel } from "../Carousels/Carousel/Carousel";
import { EmblaOptionsType } from "embla-carousel";
import { IProductCategory } from "@/interfaces";
import ProductCardItem from "../ProductCard/ProductCardItem/ProductCardItem";
import { paramsViewed } from "@/constans";

const OPTIONS: EmblaOptionsType = {};

type Props = {
  viewed: IProductCategory[];
};

export default function Viewed({ viewed }: Props) {
  const groupedSlides = useMemo(() => {
    const result: JSX.Element[] = [];
    const uniqueViewed = viewed.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.productId === item.productId)
    );
    const copyViewed = [...uniqueViewed];

    while (copyViewed.length) {
      const group = copyViewed.splice(0, 3);
      result.push(
        <div
          key={group.map((item) => item.name).join("-")}
          className="embla__slide w-full h-full grid grid-cols-3 grid-rows-1 gap-2"
        >
          {group.map((item) => (
            <ProductCardItem
              key={item.name}
              productCard={item}
              params={paramsViewed}
            />
          ))}
        </div>
      );
    }

    return result;
  }, [viewed]);

  return (
    <div className="flex flex-col justify-start">
      <h2 className="text-lg font-semibold mt-3 mb-5">Вы просматривали</h2>
      <Carousel options={OPTIONS}>{groupedSlides}</Carousel>
    </div>
  );
}

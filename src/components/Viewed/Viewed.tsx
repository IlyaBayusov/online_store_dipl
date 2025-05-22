"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "../Carousels/Carousel/Carousel";
import Link from "next/link";
import img_test from "../../../public/testImg/img_test.png";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import { IProductCategory } from "@/interfaces";
import ProductCardItem from "../ProductCard/ProductCardItem/ProductCardItem";
import { paramsViewed } from "@/constans";

const OPTIONS: EmblaOptionsType = {};

type Props = {
  viewed: IProductCategory[];
};

export default function Viewed({ viewed }: Props) {
  const [length, setLength] = useState<number>(viewed.length);
  const [finishViewed, setFinishViewed] = useState<JSX.Element[]>([]);

  useEffect(() => {
    finishedViewed();
  }, [viewed]);

  const finishedViewed = () => {
    if (!length) {
      return;
    }

    let i: number = 0;
    const copyViewed = viewed;
    while (i < viewed.length) {
      if (!copyViewed.length) {
        return;
      }

      const groupElems = copyViewed.slice(0, 3);
      copyViewed.splice(0, 3);

      for (let i = 0; i < groupElems.length; i++) {
        const divElems = (
          <div>
            {groupElems.map((item) => (
              <ProductCardItem
                key={item.name}
                productCard={item}
                params={paramsViewed}
              />
            ))}
          </div>
        );

        setFinishViewed((prev) => [...prev, divElems]);
      }

      i++;
    }
  };

  console.log(finishViewed);

  return (
    <div className="flex flex-col justify-start">
      <h2 className="text-lg font-semibold mt-3 mb-5">Вы просматривали</h2>
      <Carousel options={OPTIONS}>
        <div className="embla__slide w-full h-full grid grid-cols-3 grid-rows-1 gap-2">
          <Link href={"#"}>
            <Image src={img_test} alt="img_test" className="w-full h-full" />
          </Link>
          <Link href={"#"}>
            <Image src={img_test} alt="img_test" className="w-full h-full" />
          </Link>
          <Link href={"#"}>
            <Image src={img_test} alt="img_test" className="w-full h-full" />
          </Link>
        </div>
        <div className="embla__slide w-full h-full grid grid-cols-3 grid-rows-1 gap-2">
          <Link href={"#"}>
            <Image src={img_test} alt="img_test" className="w-full h-full" />
          </Link>
          <Link href={"#"}>
            <Image src={img_test} alt="img_test" className="w-full h-full" />
          </Link>
          <Link href={"#"}>
            <Image src={img_test} alt="img_test" className="w-full h-full" />
          </Link>
        </div>
        <div className="embla__slide w-full h-full grid grid-cols-3 grid-rows-1 gap-2">
          <Link href={"#"}>
            <Image src={img_test} alt="img_test" className="w-full h-full" />
          </Link>
          <Link href={"#"}>
            <Image src={img_test} alt="img_test" className="w-full h-full" />
          </Link>
          <Link href={"#"}>
            <Image src={img_test} alt="img_test" className="w-full h-full" />
          </Link>
        </div>
      </Carousel>
    </div>
  );
}

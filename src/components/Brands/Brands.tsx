import React from "react";
import { Carousel } from "../Carousels/Carousel/Carousel";
import Image from "next/image";
import img_apple from "../../../public/main/brands/img_apple.png";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = {};

export default function Brands() {
  return (
    <div className="flex flex-col justify-start">
      <h2 className="text-lg font-semibold mt-3 mb-5">Бренды</h2>

      <Carousel options={OPTIONS}>
        <div className="embla__slide w-full h-full grid grid-cols-3 grid-rows-2 gap-2">
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
        </div>
        <div className="embla__slide w-full h-full grid grid-cols-3 grid-rows-2 gap-2">
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
        </div>
        <div className="embla__slide w-full h-full grid grid-cols-3 grid-rows-2 gap-2">
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_apple} alt="apple" className="w-full h-full" />
        </div>
      </Carousel>
    </div>
  );
}

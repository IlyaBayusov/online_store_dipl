import React from "react";
import { Carousel } from "../Carousels/Carousel/Carousel";
import Image from "next/image";
import img_apple from "../../../public/main/brands/img_apple.png";
import img_coffesso from "../../../public/main/brands/img_coffesso.png";
import img_dekraft from "../../../public/main/brands/img_dekraft.png";
import img_dyson from "../../../public/main/brands/img_dyson.png";
import img_hi from "../../../public/main/brands/img_hi.png";
import img_lego from "../../../public/main/brands/img_lego.png";
import img_makita from "../../../public/main/brands/img_makita.png";
import img_nutrilak from "../../../public/main/brands/img_nutrilak.png";
import img_ornelio from "../../../public/main/brands/img_ornelio.png";
import img_richard from "../../../public/main/brands/img_richard.png";
import img_salut from "../../../public/main/brands/img_salut.png";
import img_samsung from "../../../public/main/brands/img_samsung.png";
import img_sber from "../../../public/main/brands/img_sber.png";
import img_whiskas from "../../../public/main/brands/img_whiskas.png";
import img_xiaomi from "../../../public/main/brands/img_xiaomi.png";

import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = {};

export default function Brands() {
  return (
    <div className="flex flex-col justify-start">
      <h2 className="text-lg font-semibold mt-3 mb-5">Бренды</h2>

      <Carousel options={OPTIONS}>
        <div className="embla__slide w-full h-full grid grid-cols-3 grid-rows-2 gap-2">
          <Image src={img_apple} alt="apple" className="w-full h-full" />
          <Image src={img_coffesso} alt="apple" className="w-full h-full" />
          <Image src={img_dekraft} alt="apple" className="w-full h-full" />
          <Image src={img_hi} alt="apple" className="w-full h-full" />
          <Image src={img_dyson} alt="apple" className="w-full h-full" />
          <Image src={img_lego} alt="apple" className="w-full h-full" />
        </div>
        <div className="embla__slide w-full h-full grid grid-cols-3 grid-rows-2 gap-2">
          <Image src={img_makita} alt="apple" className="w-full h-full" />
          <Image src={img_nutrilak} alt="apple" className="w-full h-full" />
          <Image src={img_ornelio} alt="apple" className="w-full h-full" />
          <Image src={img_richard} alt="apple" className="w-full h-full" />
          <Image src={img_salut} alt="apple" className="w-full h-full" />
          <Image src={img_samsung} alt="apple" className="w-full h-full" />
        </div>
        <div className="embla__slide w-full h-full grid grid-cols-3 grid-rows-2 gap-2">
          <Image src={img_sber} alt="apple" className="w-full h-full" />
          <Image src={img_whiskas} alt="apple" className="w-full h-full" />
          <Image src={img_xiaomi} alt="apple" className="w-full h-full" />
        </div>
      </Carousel>
    </div>
  );
}

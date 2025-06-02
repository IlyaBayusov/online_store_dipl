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

const BRANDS = [
  { img: img_apple, alt: "Apple" },
  { img: img_coffesso, alt: "Coffesso" },
  { img: img_dekraft, alt: "Dekraft" },
  { img: img_dyson, alt: "Dyson" },
  { img: img_hi, alt: "Hi" },
  { img: img_lego, alt: "Lego" },
  { img: img_makita, alt: "Makita" },
  { img: img_nutrilak, alt: "Nutrilak" },
  { img: img_ornelio, alt: "Ornelio" },
  { img: img_richard, alt: "Richard" },
  { img: img_salut, alt: "Salut" },
  { img: img_samsung, alt: "Samsung" },
  { img: img_sber, alt: "Sber" },
  { img: img_whiskas, alt: "Whiskas" },
  { img: img_xiaomi, alt: "Xiaomi" },
];

export default function Brands() {
  const brandsInGroups = (count: number) => {
    const result = [];
    const brandsCopy = [...BRANDS];
    while (brandsCopy.length) {
      result.push(brandsCopy.splice(0, count));
    }
    return result;
  };

  return (
    <div className="flex flex-col justify-start">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-5">
        Бренды
      </h2>

      {/* Мобильный слайдер */}
      <div className="md:hidden">
        <Carousel options={OPTIONS}>
          {brandsInGroups(6).map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="embla__slide w-full h-full grid grid-cols-3 grid-rows-2 gap-2"
            >
              {group.map((brand, index) => (
                <div key={index} className="relative aspect-[4/3]">
                  <Image
                    src={brand.img}
                    alt={brand.alt}
                    fill
                    className="object-contain p-2 hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>

      {/* Десктопная сетка */}
      <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
        {BRANDS.map((brand, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Image
              src={brand.img}
              alt={brand.alt}
              fill
              className="object-contain p-3 hover:scale-105 transition-transform"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

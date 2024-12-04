"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import img_clients1 from "../../../public/main/clients/img_clients1.png";
import img_clients2 from "../../../public/main/clients/img_clients2.png";
import img_clients3 from "../../../public/main/clients/img_clients3.png";
import img_clients4 from "../../../public/main/clients/img_clients4.png";
import img_clients5 from "../../../public/main/clients/img_clients5.png";
import img_clients6 from "../../../public/main/clients/img_clients6.png";
import img_clients7 from "../../../public/main/clients/img_clients7.png";

const images = [
  img_clients1,
  img_clients2,
  img_clients3,
  img_clients4,
  img_clients5,
  img_clients6,
  img_clients7,
];

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container gap-3">
          {images.map((item, index) => (
            <div className="embla__slide" key={index}>
              <Image className="rounded-md" src={item} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;

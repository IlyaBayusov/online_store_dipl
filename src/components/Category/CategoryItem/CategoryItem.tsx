import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = { name: string; img: StaticImageData };

export default function CategoryItem({ name, img }: Props) {
  return (
    <div className="h-full w-full flex flex-col items-center gap-3 p-4 rounded-lg shadow-md hover:shadow-lg transition-all bg-white">
      <div className="relative w-full aspect-square">
        <Image
          src={img}
          alt={name}
          fill
          className="object-contain rounded-md p-2"
          style={{ mixBlendMode: "multiply" }}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />
      </div>
      <p className="text-sm md:text-base font-medium text-center line-clamp-2">
        {name}
      </p>
    </div>
  );
}

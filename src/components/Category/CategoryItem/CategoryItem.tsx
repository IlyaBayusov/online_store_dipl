import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = { name: string; img: StaticImageData };

export default function CategoryItem({ name, img }: Props) {
  return (
    <div className="h-full w-full flex flex-col items-center gap-2 p-2 rounded-md shadow-md ">
      <div className="max-w-24">
        <Image
          src={img}
          alt={name}
          className="rounded-md"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      <p className="text-xs text-center">{name}</p>
    </div>
  );
}

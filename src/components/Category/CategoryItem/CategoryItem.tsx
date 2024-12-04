import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = { id: number; name: string; img: StaticImageData };

export default function CategoryItem({ id, name, img }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <Image src={img} alt={name} className="rounded-md" />
      </div>

      <p className="text-sm text-center">{name}</p>
    </div>
  );
}

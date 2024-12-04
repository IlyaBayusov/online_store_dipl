import Link from "next/link";
import React from "react";
import FavItem from "../FavItem/FavItem";
import { IFavsGet } from "@/interfaces";

type Props = {
  favs: IFavsGet[];
};

export default function FavList({ favs }: Props) {
  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          Избранные
        </h2>
      </div>
      <div className="my-2 w-full grid grid-cols-2 gap-3">
        {favs.map((fav, index) => (
          <Link
            key={index}
            href={`/${fav.categoryName.toLowerCase()}/${fav.productId}`}
          >
            <FavItem fav={fav} />
          </Link>
        ))}
      </div>
    </div>
  );
}

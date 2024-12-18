import Link from "next/link";
import React from "react";
import FavItem from "../FavItem/FavItem";
import { IFavsGet } from "@/interfaces";

type Props = {
  favs: IFavsGet[];
};

export default function FavList({ favs }: Props) {
  return (
    <>
      <h2 className="text-lg font-semibold text-start mt-3 mb-5">Избранные</h2>

      {favs.length ? (
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
      ) : (
        <p className="text-sm text-center text-[#B3B3B3] font-semibold mt-3 mb-3">
          Список пуст
        </p>
      )}
    </>
  );
}

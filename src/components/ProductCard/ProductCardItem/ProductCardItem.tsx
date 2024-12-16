"use client";

import { IDecodedToken, IGetFav, IProductCategory } from "@/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { getFav, postFav } from "@/api";
import { decodeToken } from "@/utils";
import { api } from "@/axios";
import Link from "next/link";

type Props = { productCard: IProductCategory };

export default function ProductCardItem({ productCard }: Props) {
  const [isActiveFav, setIsActiveFav] = useState(false);

  useEffect(() => {
    setActiveBtnFav();
  }, []);

  async function setActiveBtnFav() {
    try {
      const data: IGetFav[] | undefined = await getFav();

      if (!data) return;

      for (const item of data) {
        if (item.productId === productCard.productId) {
          setIsActiveFav(true);
          return item.favoriteId;
        }
      }

      return;
    } catch (error) {
      console.error("Ошибка запроса получения избранных", error);
      return;
    }
  }

  const handleClickFav = async () => {
    try {
      const favoriteId = await setActiveBtnFav();

      const decodedToken: IDecodedToken = decodeToken();

      if (isActiveFav && favoriteId) {
        setIsActiveFav(false);
        //удаление из избранных
        await api.delete(`/v1/favorites/${favoriteId}`);
      } else {
        setIsActiveFav(true);
        //добавление в избранные
        await postFav({
          userId: decodedToken.id,
          productId: productCard.productId,
        });
      }
    } catch (error) {
      console.error("Ошибка запроса добавления/удаления в избранных: ", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="bg-[#EB8528] px-2 p-0.5 text-sm rounded-md">
          <p className="text-white">Новинки</p>
        </div>

        <button
          className="flex justify-center items-center gap-1 py-1"
          onClick={handleClickFav}
        >
          {isActiveFav ? (
            <MdFavorite className="h-5 w-5 " />
          ) : (
            <MdFavoriteBorder className="h-5 w-5" />
          )}
        </button>
      </div>

      <Link
        href={`/${productCard.categoryName.toLowerCase()}/${
          productCard.productId
        }`}
        className="flex flex-col h-full"
      >
        <div className="mt-3">
          <Image
            src={productCard.image}
            width={351}
            height={494}
            alt={productCard.name}
            className="rounded-md w-auto h-auto object-cover"
          />
        </div>

        <div className="mt-3 flex flex-grow  flex-col items-start gap-3">
          <p className="text-base font-bold text-start">{`${productCard.price} РУБ.`}</p>
          <p className="text-sm text-start">{productCard.name}</p>
        </div>

        <button className="bg-greenT px-3 p-1 text-sm text-white rounded-md mt-3">
          Купить
        </button>
      </Link>
    </div>
  );
}

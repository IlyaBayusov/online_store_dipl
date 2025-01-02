"use client";

import {
  IDecodedToken,
  IGetFav,
  IProductInCart,
  IProductsCardBody,
  IProductsCardParams,
} from "@/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { getFav, getProductsCart, postFav } from "@/api";
import { decodeToken, getStatusRu } from "@/utils";
import { api } from "@/axios";
import Link from "next/link";
import { RiShoppingBasketLine, RiShoppingBasketFill } from "react-icons/ri";

type Props = { productCard: IProductsCardBody; params: IProductsCardParams };

export default function ProductCardItem({ productCard, params }: Props) {
  const [isActiveFav, setIsActiveFav] = useState(false);
  const [isActiveCart, setIsActiveCart] = useState(false);

  useEffect(() => {
    setActiveBtnFav();
    setActiveBtnCart();
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

  async function setActiveBtnCart() {
    try {
      const data: IProductInCart[] | undefined = await getProductsCart();

      if (!data) return;

      for (const item of data) {
        if (item.productId === productCard.productId) {
          setIsActiveCart(true);
          return item.cartItemId;
        }
      }

      return;
    } catch (error) {
      console.error("Ошибка запроса получения корзины", error);
      return;
    }
  }

  const handleClickCart = async () => {
    try {
      const cartItemId = await setActiveBtnCart();

      const decodedToken: IDecodedToken = decodeToken();

      if (isActiveCart) {
        setIsActiveCart(false);
        //удаление из корзины
        await api.delete(`/v1/cart/${cartItemId}`);
        //удаление из стора
      } else {
        setIsActiveCart(true);
        //добавление в корзину

        console.log({
          userId: decodedToken.id,
          productId: productCard.productId,
          quantity: 1,
        });

        await api.post("/v1/cart", {
          userId: decodedToken.id,
          productId: productCard.productId,
          quantity: 1,
        });
        //добавление в стор
      }
    } catch (error) {
      console.error("Ошибка запроса добавления/удаления в корзину: ", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className={
          "flex items-center" +
          (params.markTitle ? " justify-between" : " justify-end")
        }
      >
        {params.markTitle && (
          <div className="bg-[#EB8528] px-2 p-0.5 text-sm rounded-md">
            <p className="text-white">Новинки</p>
          </div>
        )}

        {params.btnFav && (
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
        )}
      </div>

      <div className="flex flex-col h-full">
        <Link
          href={`/${productCard.categoryName.toLowerCase()}/${
            productCard.productId
          }`}
          className="flex-grow"
        >
          <div className="relative w-full aspect-square flex justify-center items-center rounded-md">
            <Image
              src={productCard.image}
              alt={productCard.name}
              fill
              priority
              sizes="(max-width: 768px) 50vw"
              className="rounded-md object-contain object-center mix-blend-multiply"
            />

            {params.status && (
              <div className="absolute bottom-0 right-0 z-10 flex flex-col justify-end">
                <p className="bg-greenT bg-opacity-90 px-2 p-0.5 text-white text-sm rounded-s-md">
                  {getStatusRu(productCard.status)}
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-grow flex-col items-start gap-3">
            {params.quantity && (
              <p className="text-sm text-start">
                Количество: {productCard.quantity} шт.
              </p>
            )}
            {params.price && (
              <p className="text-base font-bold text-start">{`${productCard.price} РУБ.`}</p>
            )}
            <p className="text-sm text-start">{productCard.name}</p>
          </div>
        </Link>

        {params.btnCart && (
          <button
            className={
              "flex justify-center items-center gap-1 mt-3 py-2 px-4 w-full rounded-md transition-all" +
              (isActiveCart
                ? " bg-white text-greenT outline outline-1 outline-greenT"
                : " bg-greenT text-white")
            }
            onClick={handleClickCart}
          >
            {isActiveCart ? (
              <>
                <p className="text-sm">В корзине</p>
                <RiShoppingBasketFill className="h-5 w-5" />
              </>
            ) : (
              <>
                <p className="text-sm">Купить</p>
                <RiShoppingBasketLine className="h-5 w-5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import {
  IDecodedToken,
  IGetFav,
  IProductInCart,
  IProductInfo,
} from "@/interfaces/index";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { decodeToken, getCategoryRu, getCodeColor } from "@/utils";
import ProductTabs from "../Tabs/ProductTabs";
import { RiShoppingBasketLine, RiShoppingBasketFill } from "react-icons/ri";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { api } from "@/axios";
import { getFav, getProductsCart, postFav } from "@/api";

type Props = {
  arrProduct: IProductInfo[];
  productIdInArray: number;
};

export default function ProductInfo({ arrProduct, productIdInArray }: Props) {
  const [arrProducts, setArrProducts] = useState<IProductInfo[]>(arrProduct);
  const [nowProduct, setNowProduct] = useState<IProductInfo>(
    arrProduct[productIdInArray]
  );
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedSize, setSelectedSize] = useState<number>(
    Number(nowProduct.sizes[0])
  );
  const [selectedColor, setSelectedColor] = useState<string>(nowProduct.color);

  const [isActiveCart, setIsActiveCart] = useState(false);
  const [isActiveFav, setIsActiveFav] = useState(false);

  const [nowCartItem, setNowCartItem] = useState<IProductInCart>();
  const [nowFavItem, setNowFavItem] = useState<IGetFav>();

  const params = useParams();

  useEffect(() => {
    const setActiveBtnCart = async () => {
      try {
        const data: IProductInCart[] | undefined = await getProductsCart();

        if (data) {
          data.map((item) => {
            if (item.productId === nowProduct.id) {
              setIsActiveCart(true);
              setNowCartItem(item);
            }
          });
        }
      } catch (error) {
        console.error("Ошибка запроса получения корзины", error);
      }
    };

    setActiveBtnCart();
  }, [nowProduct]);

  useEffect(() => {
    const setActiveBtnFav = async () => {
      try {
        const data: IGetFav[] | undefined = await getFav();

        if (data) {
          data.map((item) => {
            if (item.productId === nowProduct.id) {
              setIsActiveFav(true);
              setNowFavItem(item);
            }
          });
        }
      } catch (error) {
        console.error("Ошибка запроса получения избранных", error);
      }
    };

    setActiveBtnFav();
  }, [nowProduct]);

  console.log("nowproduct", nowProduct);

  const handleClickCart = async () => {
    try {
      const decodedToken: IDecodedToken = decodeToken();

      if (isActiveCart && nowCartItem) {
        setIsActiveCart(false);
        //удаление из корзины
        await api.delete(`/v1/cart/${nowCartItem.cartItemId}`);
      } else {
        setIsActiveCart(true);
        //добавление в корзину
        const response = await api.post("/v1/cart", {
          userId: decodedToken.id,
          productId: nowProduct.id,
          quantity: 1,
          size: String(selectedSize),
        });
        const data = await response.data;
        setNowCartItem(data);
      }
    } catch (error) {
      console.error("Ошибка запроса добавления/удаления в корзину: ", error);
    }
  };

  const handleClickFav = async () => {
    try {
      const decodedToken: IDecodedToken = decodeToken();

      if (isActiveFav && nowFavItem) {
        setIsActiveFav(false);
        //удаление из избранных
        await api.delete(`/v1/favorites/${nowFavItem.favoriteId}`);
      } else {
        setIsActiveFav(true);
        //добавление в избранные
        await postFav({
          userId: decodedToken.id,
          productId: nowProduct.id,
        });
        console.log({
          userId: decodedToken.id,
          productId: nowProduct.id,
        });
      }
    } catch (error) {
      console.error("Ошибка запроса добавления/удаления в избранных: ", error);
    }
  };

  return (
    <div className="container px-3">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-3">
          {/* 1 блок */}
          <div className="flex flex-col items-center gap-3 mt-3 text-base">
            <div className="flex items-center justify-start gap-1 w-full">
              <Link href="/" className="hover:text-orange-200 transition-all">
                Главная{" "}
              </Link>
              <p>/</p>
              <Link
                href={`/${params.products}`}
                className="hover:text-orange-200 transition-all"
              >
                {getCategoryRu(String(params.products)).name}
              </Link>
              <p>/</p>
              <span className="text-orange-200">{nowProduct.name}</span>
            </div>

            <Image
              src={nowProduct.images[0]}
              width={351}
              height={494}
              alt={nowProduct.name}
              className="rounded-md max-w-[75%]"
            />

            <div className="w-full flex justify-between items-center">
              {nowProduct.images.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  width={351}
                  height={494}
                  alt={nowProduct.name}
                  className="max-w-16 rounded-md"
                />
              ))}
            </div>
          </div>

          {/* 2 блок */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col items-center text-[#FFE4E4] text-center">
              <h1>{nowProduct.name}</h1>
              <p>{`${nowProduct.price} РУБ`}</p>
            </div>

            <div className="flex flex-col items-start mt-3">
              <div className="full">
                <p>Цвет: {selectedColor}</p>
                <div className="flex items-center gap-2 mt-1">
                  {arrProducts.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${params.products}/${item.id}`}
                      className=""
                    >
                      <div
                        style={{
                          background: getCodeColor(item.color.toLowerCase()),
                        }}
                        className={
                          "w-6 h-6 rounded-full " +
                          (item.color == selectedColor
                            ? "border-2 border-white"
                            : "")
                        }
                        onClick={() => setSelectedColor(nowProduct.color)}
                      ></div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-1 w-full">
                <p>
                  Размер:{" "}
                  {Number.isNaN(selectedSize) ? "Стандартный" : selectedSize}
                </p>
                <div className="flex justify-between items-center mt-1 w-full">
                  {nowProduct.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={
                        "py-2 px-5 rounded-md text-base " +
                        (Number(size) == selectedSize
                          ? "bg-[#895D5D] text-white"
                          : "bg-white text-black")
                      }
                      onClick={() => setSelectedSize(Number(size))}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3 блок */}
          <div className="flex justify-between items-center w-full gap-3">
            <button
              className={
                "flex justify-center items-center gap-1 py-2 w-full rounded-md text-white border border-[#895D5D] " +
                (isActiveCart ? "bg-[#895D5D]" : "border border-[#895D5D]")
              }
              onClick={handleClickCart}
            >
              {isActiveCart ? (
                <RiShoppingBasketFill className="h-5 w-5 ml-px" />
              ) : (
                <RiShoppingBasketLine className="h-5 w-5" />
              )}
            </button>
            <button
              className={
                "flex justify-center items-center gap-1 py-2 w-full rounded-md text-white border border-[#895D5D] " +
                (isActiveFav ? "bg-[#895D5D]" : "")
              }
              onClick={handleClickFav}
            >
              {isActiveFav ? (
                <MdFavorite className="h-5 w-5 mr-px" />
              ) : (
                <MdFavoriteBorder className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* 4 блок */}
          <ProductTabs
            category={nowProduct.categoryName}
            description={nowProduct.description}
          />
        </div>
      </div>
    </div>
  );
}

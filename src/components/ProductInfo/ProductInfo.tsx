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
import { getFav, getProductsCart, postFav, postViewed } from "@/api";
import * as Tabs from "@radix-ui/react-tabs";
import { useCartStore } from "@/stores/useCartStore";
import Loader from "../Loader/Loader";

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

  const [selectedColor, setSelectedColor] = useState<string>(nowProduct.color);
  const [selectedImage, setSelectedImage] = useState<string>(
    nowProduct.images[0]
  );

  const [isActiveCart, setIsActiveCart] = useState(false);
  const [isActiveFav, setIsActiveFav] = useState(false);

  const [nowCartItem, setNowCartItem] = useState<IProductInCart>();
  const [nowFavItem, setNowFavItem] = useState<IGetFav>();

  const { updatedDataInCart, deleteProductInCart } = useCartStore();

  const params = useParams();

  useEffect(() => {
    const fetchPostViewed = async () => {
      const response = await postViewed(nowProduct.id);

      if (!response) {
        return;
      }
    };

    fetchPostViewed();

    setActiveBtnCart();
    setActiveBtnFav();
  }, []);

  async function setActiveBtnCart() {
    try {
      const data = await getProductsCart();

      if (!data) return;

      for (const item of data.data) {
        if (item.productId === nowProduct.id) {
          setIsActiveCart(true);
          setNowCartItem(item);
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
        deleteProductInCart(cartItemId);
      } else {
        setIsActiveCart(true);
        //добавление в корзину

        console.log({
          userId: decodedToken.id,
          productId: nowProduct.id,
          quantity: 1,
        });

        await api.post("/v1/cart", {
          userId: decodedToken.id,
          productId: nowProduct.id,
          quantity: 1,
        });
        getProducts();
      }
    } catch (error) {
      console.error("Ошибка запроса добавления/удаления в корзину: ", error);
    }
  };

  async function setActiveBtnFav() {
    try {
      const data = await getFav();

      if (!data) return;

      for (const item of data.data) {
        if (item.productId === nowProduct.id) {
          setIsActiveFav(true);
          setNowFavItem(item);
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
          productId: nowProduct.id,
        });
      }
    } catch (error) {
      console.error("Ошибка запроса добавления/удаления в избранных: ", error);
    }
  };

  const getProducts = async () => {
    const data = await getProductsCart();

    if (data) {
      const products = data.data;
      const pagination = {
        currentPage: data.currentPage,
        pageSize: data.pageSize,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      };

      updatedDataInCart(products, pagination);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center gap-3 w-full">
        {/* 1 блок */}
        <div className="flex flex-col items-center gap-3 mt-3 text-base w-full">
          <div className="flex items-center justify-start gap-x-1 w-full flex-wrap">
            <Link
              href="/"
              className="text-gray-400 hover:text-black transition-all"
            >
              Главная{" "}
            </Link>
            <p>/</p>
            <Link
              href={`/${params.products}`}
              className="text-gray-400 hover:text-black transition-all"
            >
              {getCategoryRu(String(params.products)).name}
            </Link>
            <p>/</p>
          </div>

          <div className="flex flex-col justify-start w-full">
            <h1 className="text-base font-bold">{nowProduct.name}</h1>

            <div className="flex justify-end w-full">
              <button
                className="flex justify-center items-center gap-1 py-1"
                onClick={handleClickFav}
              >
                {isActiveFav ? (
                  <MdFavorite className="h-5 w-5 " />
                ) : (
                  <MdFavoriteBorder className="h-5 w-5" />
                )}
                <p className="text-sm">Избранные</p>
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-square flex justify-center items-center rounded-md">
            <Image
              src={selectedImage}
              alt={nowProduct.name}
              fill
              style={{
                objectFit: "contain",
                objectPosition: "center",
                mixBlendMode: "multiply",
              }}
              className="rounded-md"
            />
          </div>

          <div className="w-full flex justify-between items-center">
            {nowProduct.images.map((item, index) => (
              <Image
                key={index}
                src={item}
                width={351}
                height={494}
                alt={nowProduct.name}
                className="max-w-16 rounded-md"
                onClick={() => setSelectedImage(item)}
              />
            ))}
          </div>
        </div>

        {/* 2 блок */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-start mt-3">
            <div className="full">
              <div>
                <p>
                  <span className="text-[#B9B9B9]">Артикул:</span>{" "}
                  {nowProduct.id}
                </p>

                {/* <p className="text-greenT mt-1">Все характеристики</p> */}
              </div>

              {/* <div className="flex flex-col mt-3">
                <p className="font-bold">Цвет: </p>
                <p className="text-[#B9B9B9] mt-1">{selectedColor}</p>
              </div>
              <div className="flex items-center gap-3 mt-1">
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
                        "w-9 h-12 rounded-md " +
                        (item.color == selectedColor
                          ? "border border-greenT"
                          : "")
                      }
                      onClick={() => setSelectedColor(nowProduct.color)}
                    ></div>
                  </Link>
                ))}
              </div> */}
            </div>

            <div className="flex justify-between items-center w-full bg-white px-3 py-6 gap-3 mt-3 shadow-md drop-shadow-md rounded-md">
              <p className="font-bold text-nowrap">{nowProduct.price} руб.</p>

              <button
                className={
                  "flex justify-center items-center gap-1 py-2 px-4 w-full rounded-md transition-all" +
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
            </div>
          </div>
        </div>

        {/* 3 блок */}
        <div className="w-full">
          <p className="font-semibold text-base">Описание</p>

          <p className="mt-1">{nowProduct.description}</p>
        </div>

        {/* <Tabs.Root
          className="flex flex-col w-full mt-3"
          defaultValue="characteristics"
        >
          <Tabs.List className="flex justify-between items-center gap-3 py-2 px-4 rounded-md bg-white shadow-sm drop-shadow-md">
            <Tabs.Trigger
              className="data-[state=active]:text-greenT rounded-md"
              value="characteristics"
            >
              Характеристики
            </Tabs.Trigger>
            <Tabs.Trigger
              className="data-[state=active]:text-greenT rounded-md"
              value="graphPrice"
            >
              График цен
            </Tabs.Trigger> 
          </Tabs.List>

          <Tabs.Content
            className="mt-3 w-full outline outline-1 outline-[#B3B3B3] rounded-md p-2"
            value="characteristics"
          >
            {nowProduct ? (
              <table className="text-black text-xs text-start w-full">
                <thead>
                  <tr>
                    <th className="text-start" colSpan={2}>
                      Данные о товаре
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-300 border-none">
                    <td className="text-[#B9B9B9]">Артикул производителя</td>
                    <td className="">{nowProduct.id}</td>
                  </tr>
                  <tr className="border-b border-slate-300 border-none">
                    <td className="text-[#B9B9B9]">Код производителя</td>
                    <td className="">12415</td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th className="text-start pt-3" colSpan={2}>
                      Данные о товаре
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-300 border-none">
                    <td className="text-[#B9B9B9]">Артикул производителя</td>
                    <td className="">{nowProduct.id}</td>
                  </tr>
                  <tr className="border-b border-slate-300 border-none">
                    <td className="text-[#B9B9B9]">Код производителя</td>
                    <td className="">12415</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <Loader />
            )}
          </Tabs.Content>

          <Tabs.Content
            className="mt-3 w-full outline outline-1 outline-[#E5E5E5] rounded-md p-2"
            value="graphPrice"
          >
            график цен
          </Tabs.Content>
        </Tabs.Root> */}
      </div>
    </div>
  );
}

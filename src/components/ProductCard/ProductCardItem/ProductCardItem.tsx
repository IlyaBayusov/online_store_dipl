"use client";

import {
  IDecodedToken,
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
import CartBtn from "@/components/Buttons/CartBtn/CartBtn";
import { useCartStore } from "@/stores/useCartStore";
import { useFavStore } from "@/stores/useFavStore";

type Props = { productCard: IProductsCardBody; params: IProductsCardParams };

export default React.memo(
  function ProductCardItem({ productCard, params }: Props) {
    const [isActiveFav, setIsActiveFav] = useState(false);
    const [isActiveCart, setIsActiveCart] = useState(false);

    const [showedFav, setShowedFav] = useState<boolean>(true);

    const { deleteProductInCart, updatedDataInCart } = useCartStore();
    const { removeFavProduct } = useFavStore();

    useEffect(() => {
      setActiveBtnFav();
      setActiveBtnCart();

      getProducts();
    }, []);

    useEffect(() => {
      const decoded = decodeToken();

      if (!decoded?.id) {
        setShowedFav(false);
      } else {
        setShowedFav(true);
      }
    }, []);

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

    async function setActiveBtnFav() {
      const data = await getFav();

      if (!data) return;

      for (const item of data.data) {
        if (item.productId === productCard.productId) {
          setIsActiveFav(true);
          return item.favoriteId;
        }
      }

      return;
    }

    const handleClickFav = async () => {
      const favoriteId = await setActiveBtnFav();
      const decodedToken = decodeToken();
      if (!decodedToken) return;

      if (isActiveFav && favoriteId) {
        setIsActiveFav(false);
        //удаление из избранных
        await api.delete(`/v1/favorites/${favoriteId}`);
        removeFavProduct(productCard.productId);
      } else {
        setIsActiveFav(true);
        //добавление в избранные
        await postFav({
          userId: decodedToken.id,
          productId: productCard.productId,
        });
      }
    };

    async function setActiveBtnCart() {
      const data = await getProductsCart();

      if (!data) return;

      for (const item of data.data) {
        if (item.productId === productCard.productId) {
          setIsActiveCart(true);
          return item.cartItemId;
        }
      }

      return;
    }

    const handleClickCart = async () => {
      const cartItemId = await setActiveBtnCart();

      const decodedToken: IDecodedToken = decodeToken();

      if (isActiveCart) {
        setIsActiveCart(false);
        //удаление из корзины
        await api.delete(`/v1/cart/${cartItemId}`);
        //удаление из стора
        deleteProductInCart(cartItemId);
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
        getProducts();
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

          {showedFav && params.btnFav && (
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

            <div className="mt-3 flex flex-grow flex-col items-start gap-1">
              {productCard?.brand && (
                <p className="text-sm text-start">{productCard.brand}</p>
              )}
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
            <CartBtn
              isActiveCart={isActiveCart}
              handleClickCallBack={handleClickCart}
            />
          )}
        </div>
      </div>
    );
  },

  (prevProps: Props, nextProps: Props) => {
    if (
      prevProps.productCard !== nextProps.productCard ||
      prevProps.params !== nextProps.params
    ) {
      return false;
    } else {
      return true;
    }
  }
);

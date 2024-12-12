"use client";

import { putProductCart } from "@/api";
import { modalCartDeleteProduct } from "@/constans";
import { IProductInCart } from "@/interfaces";
import { useCartStore } from "@/stores/useCartStore";
import { useModalStore } from "@/stores/useModalStore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

type Props = { product: IProductInCart };

export default function CartItem({ product }: Props) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [isDisabledPlus, setIsDisabledPlus] = useState(false);
  const [isDisabledMinus, setIsDisabledMinus] = useState(false);

  const { plusSum, minusSum } = useCartStore();
  const { openModal, addModalProps } = useModalStore();

  useEffect(() => {
    const updateQuantity = async () => {
      await putProductCart(product, quantity);
    };

    updateQuantity();
  }, [product, quantity]);

  useEffect(() => {
    if (quantity <= 1) {
      setIsDisabledMinus(true);
    } else {
      setIsDisabledMinus(false);
    }

    if (quantity >= 99) {
      setIsDisabledPlus(true);
    } else {
      setIsDisabledPlus(false);
    }
  }, [quantity]);

  const handleClickMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      minusSum(product.price);
    }
  };

  const handleClickPlus = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
      plusSum(product.price);
    }
  };

  const handleOpenModal = () => {
    addModalProps(modalCartDeleteProduct, {
      cartItemId: product.cartItemId,
      isDeleted: false,
    });

    openModal(modalCartDeleteProduct);
  };

  return (
    <div
      key={product.productId}
      className="flex flex-col justify-center items-center w-full p-3 mb-3 rounded-md outline outline-1 outline-[#B3B3B3]"
    >
      <div className="flex justify-between w-full mb-2">
        <div className="flex justify-start gap-3 w-full">
          <Link
            href={`/${product.categoryName.toLowerCase()}/${product.productId}`}
            className="max-w-20"
          >
            <Image
              width={350}
              height={500}
              src={product.image}
              alt={product.productName}
              className="rounded-md"
            />
          </Link>

          <div className="flex flex-col justify-start">
            <Link
              href={`/${product.categoryName.toLowerCase()}/${
                product.productId
              }`}
            >
              <h2 className="text-base leading-5">{product.productName}</h2>
            </Link>

            <div className="text-sm text-start mt-1">
              <p>Артикул: {product.productId}</p>
            </div>
          </div>
        </div>

        <button className="w-4 h-4">
          <RiDeleteBin6Line
            className="w-4 h-4 mt-0.5 hover:text-greenT transition-all"
            onClick={handleOpenModal}
          />
        </button>
      </div>

      <div className="flex justify-between items-center w-full border-t border-[#B3B3B3] pt-2">
        <p className="text-base font-bold">{`${product.price} руб.`}</p>

        <div className="flex justify-start items-center">
          <button
            disabled={isDisabledMinus}
            className={
              "w-6 h-6 flex justify-center items-center border rounded-sm transition-all" +
              (isDisabledMinus ? " border-[#B3B3B3]" : " border-greenT ")
            }
            onClick={handleClickMinus}
          >
            <FaMinus
              className={
                "w-4 h-4 transition-all" +
                (isDisabledMinus ? " text-[#B3B3B3]" : "  text-greenT")
              }
            />
          </button>
          <div className="flex justify-center items-center w-6 h-6 px-0.5">
            <p className="text-base text-center">{quantity}</p>
          </div>
          <button
            disabled={isDisabledPlus}
            className={
              "w-6 h-6 flex justify-center items-center border rounded-sm transition-all" +
              (isDisabledPlus ? " border-[#B3B3B3]" : " border-greenT ")
            }
            onClick={handleClickPlus}
          >
            <FaPlus
              className={
                "w-4 h-4 transition-all" +
                (isDisabledPlus ? " text-[#B3B3B3]" : "  text-greenT")
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

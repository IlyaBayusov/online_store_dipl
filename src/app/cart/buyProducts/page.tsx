"use client";

import { getProductsCart, postByProducts } from "@/api";
import FormByProducts from "@/components/Forms/FormByProducts/FormByProducts";
import { modalSuccessOrder } from "@/constans";
import { IOrderPost, IProductInCart } from "@/interfaces";
import { useFormStore } from "@/stores/useFormStore";
import { useModalStore } from "@/stores/useModalStore";
import { decodeToken } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function BuyProducts() {
  const [productsCart, setProductsCart] = useState<
    IProductInCart[] | undefined
  >();
  const [sumPrice, setSumPrice] = useState(0);
  const [error, setError] = useState("");

  const { data, isValid } = useFormStore();

  const { openModal } = useModalStore();

  useEffect(() => {
    const getData = async () => {
      const data = await getProductsCart();

      if (data) {
        setProductsCart(data);

        const sum = data.reduce((sum, item) => sum + item.price, 0);
        setSumPrice(sum);
      }
    };

    getData();
  }, []);

  const handleSubmit = async () => {
    if (!isValid) {
      setError("Некоторые поля заполнены неверно");
      return;
    }
    if (productsCart === undefined) {
      setError(
        "Ошибка отправки данных, в пост запросе пустой объект orderItemRequest"
      );
      return;
    }

    setError("");

    // const decoded = decodeToken();

    // const newOrder: IOrderPost = {
    //   orderDetailsRequest: {
    //     ...data,
    //     totalPrice: sumPrice,
    //     userId: decoded.id,
    //   },
    //   orderItemRequest: productsCart,
    // };

    // console.log("Ответ ушел, новый заказ: ", newOrder);

    // const response = await postByProducts(newOrder);

    // if (response?.status !== 201) {
    //   setError("Ошибка оформления заказа");
    // } else {
    //   openModal(modalSuccessOrder);
    // }
  };

  return (
    <>
      <div className="container px-3">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="mt-3 w-full bg-black rounded-t-2xl rounded-b-md">
            <h1 className="py-2 px-3 text-xl uppercase">Оформление заказа</h1>
          </div>

          <div className="mt-3 p-3 w-full bg-black mb-3 rounded-md">
            <p className="text-[#B3B3B3] uppercase text-sm">Доставка</p>

            <div className="flex flex-col mt-3">
              <p className="text-sm text-white">4-6 ноября</p>

              <p className="text-sm text-green-500">Доставка 0 руб.</p>
            </div>

            <div className="mt-3 flex gap-2">
              {productsCart?.map((item) => (
                <div key={item.cartItemId} className="max-w-16">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    width={350}
                    height={500}
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-black rounded-md w-full mb-[4.5rem]">
            <p className="text-[#B3B3B3] uppercase text-sm">
              Заполнение данных
            </p>

            <FormByProducts />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-10 w-full px-2 bg-black pt-2 pb-3 rounded-t-2xl">
        {error && <p className="text-red-700">{error}</p>}

        <button
          className="flex justify-between items-center px-3 py-2 text-base w-full bg-orange-600 rounded-xl"
          onClick={handleSubmit}
        >
          <p>Заказать</p>

          <p>{`${productsCart?.length} шт., ${sumPrice} руб.`}</p>
        </button>
      </div>
    </>
  );
}

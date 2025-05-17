"use client";

import {
  IOrderDetails,
  IOrderPost,
  IPagination,
  IProductInCart,
} from "@/interfaces";
import React, { useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { decodeToken } from "@/utils";
import { getProductsCart, postByProducts } from "@/api";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";
import { useForm } from "react-hook-form";
import { authPage } from "@/constans";

export default React.memo(function FormByCart() {
  const [products, setProducts] = useState<IProductInCart[]>([]);

  const [sum, setSum] = useState<number>(0);

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setValue,
  } = useForm<IOrderDetails>({ mode: "onBlur" });

  const { cart, updatedDataInCart } = useCartStore();

  const [errorSubmit, setErrorSubmit] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const getProductsInCart = async () => {
      if (cart) {
        const data = await getProductsCart();
        if (data) {
          setProducts(data);
        }
      }
    };

    getProductsInCart();
  }, []);

  useEffect(() => {
    const totalSum = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setSum(totalSum);
  }, [cart]);

  const onSubmit = async (formData: IOrderDetails) => {
    if (!isValid) {
      setErrorSubmit("Не все поля заполнены, либо заполнены неверно");
      return;
    }

    setErrorSubmit("");

    const decoded = decodeToken();
    if (!decoded || !decoded.id) {
      setErrorSubmit("Произошла ошибка, попробуйте позже");
      router.push(authPage);
      return;
    }

    const newOrder: IOrderPost = {
      orderDetailsRequest: {
        ...formData,
        userId: decoded.id,
      },
      orderItemRequest: cart ? cart : products,
    };

    console.log(newOrder);

    const response = await postByProducts(newOrder);

    if (response) {
      router.push(`/orders`);
      updatedDataInCart([], {} as IPagination);
    }
  };

  return (
    <>
      <h1 className="text-lg font-semibold mt-3 mb-3">Адрес доставки</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-sm flex flex-col gap-3 mb-3"
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Адрес"
            className="px-2 py-1 w-full rounded-md text-black border border-[#B3B3B3]"
            {...register("address", {
              required: true,
              maxLength: 80,
            })}
          />
          {
            <span className="absolute top-1/2 right-2 -translate-y-[3px] z-10 leading-none text-red-600 text-xs">
              {errors?.address && "*"}
            </span>
          }
        </div>

        <div className="grid grid-cols-3 grid-rows-1 gap-2">
          <div className="flex flex-col">
            <label htmlFor="description">
              Кв./Офис
              {
                <span className="text-red-600 text-xs">
                  {errors?.apartment && "*"}
                </span>
              }
            </label>
            <input
              type="text"
              placeholder="Кв./Офис"
              className="px-2 py-1 w-full rounded-md text-black border border-[#B3B3B3]"
              {...register("apartment", {
                required: true,
                maxLength: 80,
              })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description">
              Этаж
              {
                <span className="text-red-600 text-xs">
                  {errors?.floor && "*"}
                </span>
              }
            </label>
            <input
              type="number"
              placeholder="Этаж"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              {...register("floor", {
                required: true,
                max: 100,
              })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">
              Подъезд
              {
                <span className="text-red-600 text-xs">
                  {errors?.entrance && "*"}
                </span>
              }
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Подъезд"
                className="px-2 py-1 w-full rounded-md text-black border border-[#B3B3B3]"
                {...register("entrance", {
                  required: true,
                  maxLength: 10,
                })}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-start gap-1">
            <label htmlFor="description">
              Комментарий
              {
                <span className="text-red-600 text-xs">
                  {errors?.comment && "*"}
                </span>
              }
            </label>
          </div>
          <textarea
            id="largeText"
            rows={5}
            cols={50}
            placeholder="Комментарий"
            className="p-2 rounded-md text-black border border-[#B3B3B3]"
            {...register("comment", {
              required: false,
              maxLength: 250,
            })}
          ></textarea>
        </div>

        <div>
          <h1 className="text-lg font-semibold mt-3 mb-3">Получатель</h1>

          <div className="grid grid-cols-1 grid-rows-4 gap-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Имя"
                className="px-2 py-1 w-full rounded-md text-black border border-[#B3B3B3]"
                {...register("firstName", {
                  required: true,
                  maxLength: 50,
                })}
              />
              {
                <span className="absolute top-1/2 right-2 -translate-y-[3px] z-10 leading-none text-red-600 text-xs">
                  {errors?.firstName && "*"}
                </span>
              }
            </div>

            <div className="relative w-full">
              <input
                type="text"
                placeholder="Фамилия"
                className="px-2 py-1 w-full rounded-md text-black border border-[#B3B3B3]"
                {...register("lastName", {
                  required: true,
                  maxLength: 50,
                })}
              />
              {
                <span className="absolute top-1/2 right-2 -translate-y-[3px] z-10 leading-none text-red-600 text-xs">
                  {errors?.lastName && "*"}
                </span>
              }
            </div>

            <div className="relative w-full">
              <input
                type="text"
                placeholder="Email"
                className="px-2 py-1 w-full rounded-md text-black border border-[#B3B3B3]"
                {...register("email", {
                  required: true,
                  minLength: 4,
                  maxLength: 50,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
              {
                <span className="absolute top-1/2 right-2 -translate-y-[3px] z-10 leading-none text-red-600 text-xs">
                  {errors?.email && "*"}
                </span>
              }
            </div>

            <div className="relative w-full">
              <input
                type="text"
                placeholder="Телефон"
                className="px-2 py-1 w-full rounded-md text-black border border-[#B3B3B3]"
                {...register("phone", {
                  required: true,
                  maxLength: 14,
                  pattern: /^(?:\+375|375)[0-9]{9}$|^8[0-9]{10}$/,
                })}
              />
              {
                <span className="absolute top-1/2 right-2 -translate-y-[3px] z-10 leading-none text-red-600 text-xs">
                  {errors?.phone && "*"}
                </span>
              }
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-lg font-semibold mt-3 mb-3">Способ оплаты</h1>
        </div>

        <RadioGroup.Root
          className="flex flex-col gap-2.5"
          defaultValue="CASH"
          onValueChange={(value) => {
            setValue("paymentMethod", value, { shouldValidate: true });
          }}
        >
          <div className="flex items-center">
            <RadioGroup.Item
              value="CASH"
              id="cash"
              className="size-5 cursor-default rounded-full border border-[#B3B3B3] focus:border-greenT bg-white outline-none data-[state=checked]:border-greenT"
            >
              <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-[10px] after:rounded-full after:bg-greenT" />
            </RadioGroup.Item>
            <label className="pl-2 cursor-pointer text-sm" htmlFor="cash">
              Наличными
            </label>
          </div>

          <div className="flex items-center">
            <RadioGroup.Item
              value="CARD"
              id="card"
              className="size-5 cursor-default rounded-full border border-[#B3B3B3] focus:border-greenT bg-white outline-none data-[state=checked]:border-greenT"
            >
              <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-[10px] after:rounded-full after:bg-greenT" />
            </RadioGroup.Item>
            <label className="pl-2 cursor-pointer text-sm" htmlFor="card">
              Банковской картой
            </label>
          </div>
        </RadioGroup.Root>

        <input
          type="hidden"
          {...register("paymentMethod", { required: true })}
        />

        {errorSubmit && (
          <span className="text-red-600 text-base">{errorSubmit}</span>
        )}

        <div className="p-3 outline outline-1 outline-[#B3B3B3] rounded-md">
          <h1 className="text-lg font-semibold mb-1">Ваш заказ</h1>

          <div className="flex justify-between items-center">
            <p>{`Товары(${cart.length})`}</p>
            <p className="font-semibold">{`${sum} руб.`}</p>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <p className="font-semibold">Итого</p>
            <p className="font-semibold">{`${sum} руб.`}</p>
          </div>
        </div>

        <button
          type="submit"
          className="mt-3 px-4 py-2 rounded-md bg-greenT text-white text-sm"
        >
          Оформить заказ
        </button>
      </form>
    </>
  );
});

"use client";

import { IUseInput, useInput } from "@/hooks/useInput";
import { IOrderDetails, IOrderPost, IProductInCart } from "@/interfaces";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { decodeToken } from "@/utils";
import { getProductsCart, postByProducts } from "@/api";
import { useRouter } from "next/navigation";

export default function FormByCart() {
  const [products, setProducts] = useState<IProductInCart[]>([]);

  const [formData, setFormData] = useState<IOrderDetails>({
    userId: 0,
    totalPrice: 100,

    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    address: "",
    apartment: "",
    floor: "",
    entrance: "",
    comment: "",
    paymentMethod: "CASH",
  });

  const address = useInput("", { empty: true });
  const apartment = useInput("", { empty: true });
  const floor = useInput("", { empty: true });
  const entrance = useInput("", { empty: true });
  const comment = useInput("", { empty: true });

  const firstName = useInput("", { empty: true });
  const lastName = useInput("", { empty: true });
  const email = useInput("", { empty: true });
  const phone = useInput("", { empty: true });

  const [selectedPayment, setSelectedPayment] = useState<string>("CASH");

  const [errorSubmit, setErrorSubmit] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const getProductsInCart = async () => {
      const data = await getProductsCart();
      if (data) {
        setProducts(data);
      }
    };

    getProductsInCart();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   setErrorSubmit("Не все поля заполнены, либо заполнены неверно");
    //   return;
    // }

    setErrorSubmit("");

    const decoded = decodeToken();
    if (!decoded || !decoded.id) {
      setErrorSubmit("Произошла ошибка, попробуйте позже");
      return;
    }

    const newOrder: IOrderPost = {
      orderDetailsRequest: {
        ...formData,
        userId: decoded.id,
      },
      orderItemRequest: products,
    };

    console.log(newOrder);

    const response = await postByProducts(newOrder);
    console.log("запрос, отправка заказа", response);

    if (response) {
      router.push(`/orders`);
    }
  };

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // const valid = validateForm();
    // if (valid) updateIsValid(true);
  };

  // доделать
  const errorsValidation = (inputName: IUseInput) => {
    if (!inputName.inputValid) {
      <span className="text-red-600 text-base">*</span>;
    }

    if (inputName.dirty && (inputName.empty || inputName.minLength)) {
      return <span className="text-red-600 text-base">*</span>;
    }
    if (inputName.dirty && inputName.maxLength) {
      return <span className="text-red-600 text-base">*</span>;
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!address.inputValid) {
      isValid = false;
    }
    if (!apartment.inputValid) {
      isValid = false;
    }
    if (!floor.inputValid) {
      isValid = false;
    }
    if (!entrance.inputValid) {
      isValid = false;
    }
    if (!comment.inputValid) {
      isValid = false;
    }

    if (!firstName.inputValid) {
      isValid = false;
    }
    if (!lastName.inputValid) {
      isValid = false;
    }
    if (!email.inputValid) {
      isValid = false;
    }
    if (!phone.inputValid) {
      isValid = false;
    }

    return isValid;
  };

  const handlePaymentChange = (value: string) => {
    setSelectedPayment(value);
  };

  return (
    <>
      <h1 className="text-lg font-semibold mt-3 mb-3">Адрес доставки</h1>

      <form
        onSubmit={handleSubmit}
        className="text-sm flex flex-col gap-3 mb-3"
      >
        <input
          type="text"
          placeholder="Адрес"
          name="address"
          className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
          value={formData.address}
          onChange={(e) => {
            address.onChange(e);
            handleChange(e);
          }}
          onBlur={() => address.onBlur()}
        />

        <div className="grid grid-cols-3 grid-rows-1 gap-2">
          <div className="flex flex-col">
            <label htmlFor="description">Кв./Офис</label>
            <input
              type="text"
              placeholder="Кв./Офис"
              name="apartment"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.apartment}
              onChange={(e) => {
                apartment.onChange(e);
                handleChange(e);
              }}
              onBlur={() => apartment.onBlur()}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description">Этаж</label>
            <input
              type="text"
              placeholder="Квартира"
              name="floor"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.floor}
              onChange={(e) => {
                floor.onChange(e);
                handleChange(e);
              }}
              onBlur={() => floor.onBlur()}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Подъезд</label>
            <input
              type="text"
              placeholder="Подъезд"
              name="entrance"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.entrance}
              onChange={(e) => {
                entrance.onChange(e);
                handleChange(e);
              }}
              onBlur={() => entrance.onBlur()}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-start gap-1">
            <label htmlFor="description">Комментарий</label>
            {errorsValidation(comment)}
          </div>
          <textarea
            id="largeText"
            name="comment"
            rows={5}
            cols={50}
            placeholder="Комментарий"
            className="p-2 rounded-md text-black border border-[#B3B3B3]"
            value={formData.comment}
            onChange={(e) => {
              comment.onChange(e);
              handleChange(e);
            }}
            onBlur={() => comment.onBlur()}
          ></textarea>
        </div>

        <div>
          <h1 className="text-lg font-semibold mt-3 mb-3">Получатель</h1>

          <div className="grid grid-cols-1 grid-rows-4 gap-2">
            <input
              type="text"
              placeholder="Имя"
              name="firstName"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.firstName}
              onChange={(e) => {
                firstName.onChange(e);
                handleChange(e);
              }}
              onBlur={() => firstName.onBlur()}
            />

            <input
              type="text"
              placeholder="Фамилия"
              name="lastName"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.lastName}
              onChange={(e) => {
                lastName.onChange(e);
                handleChange(e);
              }}
              onBlur={() => lastName.onBlur()}
            />

            <input
              type="text"
              placeholder="Email"
              name="email"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.email}
              onChange={(e) => {
                email.onChange(e);
                handleChange(e);
              }}
              onBlur={() => email.onBlur()}
            />

            <input
              type="text"
              placeholder="Телефон"
              name="phone"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.phone}
              onChange={(e) => {
                phone.onChange(e);
                handleChange(e);
              }}
              onBlur={() => phone.onBlur()}
            />
          </div>
        </div>

        <div>
          <h1 className="text-lg font-semibold mt-3 mb-3">Способ оплаты</h1>
        </div>

        <RadioGroup.Root
          className="flex flex-col gap-2.5"
          value={selectedPayment}
          onValueChange={handlePaymentChange}
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

        {errorSubmit && (
          <span className="text-red-600 text-base">{errorSubmit}</span>
        )}

        <button
          type="submit"
          className="mt-3 px-4 py-2 rounded-md bg-greenT text-white text-sm"
        >
          Оформить заказ
        </button>
      </form>
    </>
  );
}

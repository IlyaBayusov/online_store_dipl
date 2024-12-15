"use client";

import { postProductAdmin } from "@/api";
import { modalDeleteEditNewProduct } from "@/constans";
import { IUseInput, useInput } from "@/hooks/useInput";
import { IPostNewProduct } from "@/interfaces";
import { useFormNewProductStore } from "@/stores/useFormNewProduct";
import { useModalStore } from "@/stores/useModalStore";
import React, { ChangeEvent, FormEvent, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

export default function FormByCart() {
  const { data, updateData } = useFormNewProductStore();
  const { openModal } = useModalStore();

  const [formData, setFormData] = useState<IPostNewProduct>(data);

  const name = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const color = useInput("123", { empty: true, minLength: 2, maxLength: 50 });
  const description = useInput("", {
    empty: true,
    minLength: 50,
    maxLength: 300,
  });
  const categoryName = useInput("", {
    empty: true,
    minLength: 2,
    maxLength: 50,
  });
  const price = useInput("", { empty: true, minLength: 1, maxLength: 5 });

  const quantity = useInput("", { empty: true, minLength: 1, maxLength: 5 });

  const [selectedPayment, setSelectedPayment] = useState<string>("CASH");

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [errorSubmit, setErrorSubmit] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorSubmit("Не все поля заполнены, либо заполнены неверно");
      return;
    }

    setErrorSubmit("");

    const fData = new FormData();

    setFormData((prev) => {
      const newFormData = {
        ...prev,

        quantities: Number(quantity.value),
        characteristics: JSON.stringify({ age: "12", text: "text" }),
      };

      return newFormData;
    });

    fData.append("product", JSON.stringify(formData));

    selectedFiles.forEach((file) => {
      fData.append("files", file);
    });

    console.log(formData);
    console.log(fData.getAll("files"));

    const response = await postProductAdmin(fData); //response для обработки ошибки "товар с таким именем уже существует" и прочее

    console.log(response);
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

    updateData(formData);

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

    if (!name.inputValid) {
      isValid = false;
    }
    if (!color.inputValid) {
      isValid = false;
    }
    if (!description.inputValid) {
      isValid = false;
    }
    if (!categoryName.inputValid) {
      isValid = false;
    }
    if (!price.inputValid) {
      isValid = false;
    }
    if (!selectedFiles.length) {
      isValid = false;
    }

    if (!selectedFiles || selectedFiles.length === 0) {
      console.log("Выберите файлы");
      return;
    }

    return isValid;
  };

  const handleOpenModalDeleteEdit = () => {
    openModal(modalDeleteEditNewProduct);
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
          name="name"
          className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
          value={formData.name}
          onChange={(e) => {
            name.onChange(e);
            handleChange(e);
          }}
          onBlur={() => name.onBlur()}
        />

        <div className="grid grid-cols-3 grid-rows-1 gap-2">
          <div className="flex flex-col">
            <label htmlFor="description">Дом</label>
            <input
              type="text"
              placeholder="Дом"
              name="name"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.name}
              onChange={(e) => {
                name.onChange(e);
                handleChange(e);
              }}
              onBlur={() => name.onBlur()}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description">Квартира</label>
            <input
              type="text"
              placeholder="Квартира"
              name="name"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.name}
              onChange={(e) => {
                name.onChange(e);
                handleChange(e);
              }}
              onBlur={() => name.onBlur()}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Подъезд</label>
            <input
              type="text"
              placeholder="Подъезд"
              name="name"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.name}
              onChange={(e) => {
                name.onChange(e);
                handleChange(e);
              }}
              onBlur={() => name.onBlur()}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-start gap-1">
            <label htmlFor="description">Комментарий</label>
            {errorsValidation(description)}
          </div>
          <textarea
            id="largeText"
            name="description"
            rows={5}
            cols={50}
            placeholder="Комментарий"
            className="p-2 rounded-md text-black border border-[#B3B3B3]"
            value={formData.description}
            onChange={(e) => {
              description.onChange(e);
              handleChange(e);
            }}
            onBlur={() => description.onBlur()}
          ></textarea>
        </div>

        <div>
          <h1 className="text-lg font-semibold mt-3 mb-3">Получатель</h1>

          <div className="grid grid-cols-1 grid-rows-4 gap-2">
            <input
              type="text"
              placeholder="Дом"
              name="name"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.name}
              onChange={(e) => {
                name.onChange(e);
                handleChange(e);
              }}
              onBlur={() => name.onBlur()}
            />

            <input
              type="text"
              placeholder="Квартира"
              name="name"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.name}
              onChange={(e) => {
                name.onChange(e);
                handleChange(e);
              }}
              onBlur={() => name.onBlur()}
            />

            <input
              type="text"
              placeholder="Подъезд"
              name="name"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.name}
              onChange={(e) => {
                name.onChange(e);
                handleChange(e);
              }}
              onBlur={() => name.onBlur()}
            />

            <input
              type="text"
              placeholder="Подъезд"
              name="name"
              className="px-2 py-1 rounded-md text-black border border-[#B3B3B3]"
              value={formData.name}
              onChange={(e) => {
                name.onChange(e);
                handleChange(e);
              }}
              onBlur={() => name.onBlur()}
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

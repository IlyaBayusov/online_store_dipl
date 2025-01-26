"use client";

import { postProductAdmin } from "@/api";
import {
  colors,
  modalDeleteEditNewProduct,
  modalNewProductAdmin,
  selectCategoryies,
} from "@/constans";
import { IUseInput, useInput } from "@/hooks/useInput";
import { IPostFormDataNewProduct, IPostNewProduct } from "@/interfaces";
import { useFormNewProductStore } from "@/stores/useFormNewProduct";
import { useModalStore } from "@/stores/useModalStore";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

export default function FormByModalNewProductAdmin() {
  const { data, updateData } = useFormNewProductStore();
  const { openModal, closeModal } = useModalStore();

  const [formData, setFormData] = useState<IPostNewProduct>(data);

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setValue,
  } = useForm<IPostFormDataNewProduct>({ mode: "onBlur" });

  const name = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const color = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const description = useInput("", {
    empty: true,
    minLength: 2,
    maxLength: 300,
  });
  const categoryName = useInput("", {
    empty: true,
    minLength: 2,
    maxLength: 50,
  });
  const price = useInput("", { empty: true, minLength: 1, maxLength: 5 });

  const quantity = useInput("", { empty: true, minLength: 1, maxLength: 5 });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [errorSubmit, setErrorSubmit] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const onSubmit = async () => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorSubmit("Не все поля заполнены, либо заполнены неверно");
      return;
    }

    setErrorSubmit("");

    const fData = new FormData();

    const newFormData = {
      ...formData,
      quantities: Number(quantity.value),
      characteristics: JSON.stringify({ age: "12", text: "text" }),
    };
    setFormData(newFormData);

    fData.append("product", JSON.stringify(newFormData));

    selectedFiles.forEach((file) => {
      fData.append("files", file);
    });

    console.log(formData);
    console.log(fData.getAll("files"));

    const response = await postProductAdmin(fData); //response для обработки ошибки "товар с таким именем уже существует" и прочее

    console.log(response);

    if (response) {
      closeModal(modalNewProductAdmin);
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

    updateData(formData);

    // const valid = validateForm();
    // if (valid) updateIsValid(true);
  };

  // доделать
  const errorsValidation = (inputName: IUseInput) => {
    if (!inputName.inputValid) {
      <span className="text-red-600 text-base">*</span>; // привести к этому виду
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

  return (
    <div className="mt-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-sm flex flex-col gap-3"
      >
        <div className="flex flex-col">
          <div className="flex items-start gap-1">
            <label htmlFor="name" className="relative">
              Название
              {
                <span className="absolute top-0.5 -right-2 z-10 leading-none text-red-600 text-xs">
                  {errors?.product?.name && "*"}
                </span>
              }
            </label>
          </div>

          <input
            type="text"
            placeholder="Название"
            className="px-2 py-1 rounded-md text-black border border-greenT leading-none"
            {...register("product.name", {
              required: true,
              minLength: 6,
              maxLength: 80,
            })}
          />
        </div>

        <div className="w-full columns-2">
          <div className="flex flex-col">
            <div className="flex items-start gap-1">
              <label htmlFor="price" className="relative">
                Цена
                {
                  <span className="absolute top-0.5 -right-2 z-10 leading-none text-red-600 text-xs">
                    {errors?.product?.price && "*"}
                  </span>
                }
              </label>
            </div>
            <input
              id="price"
              type="number"
              placeholder="Цена"
              maxLength={5}
              className="px-2 py-1 rounded-md text-black border border-greenT leading-none"
              {...register("product.price", {
                required: true,
                min: 1,
                max: 20000,
              })}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-start gap-1">
              <label htmlFor="quantity" className="relative">
                Количество
                {
                  <span className="absolute top-0.5 -right-2 z-10 leading-none text-red-600 text-xs">
                    {errors?.product?.quantities && "*"}
                  </span>
                }
              </label>
            </div>

            <input
              id="quantity"
              type="number"
              placeholder="Количество"
              maxLength={5}
              className="px-2 py-1 rounded-md text-black border border-greenT leading-none"
              {...register("product.quantities", {
                required: true,
                min: 1,
                max: 10000,
              })}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-start gap-1">
            <label htmlFor="categoryName" className="relative">
              Категория
              {
                <span className="absolute top-0.5 -right-2 z-10 leading-none text-red-600 text-xs">
                  {errors?.product?.categoryName && "*"}
                </span>
              }
            </label>
          </div>

          <div className="flex items-center gap-3">
            <select
              id="categoryName"
              className="px-2 py-1 rounded-md text-black border border-greenT leading-none"
              {...register("product.categoryName", {
                required: true,
              })}
            >
              <option value="">Выбрать</option>

              {selectCategoryies.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-start gap-1">
            <label htmlFor="color" className="relative">
              Цвет
              {
                <span className="absolute top-0.5 -right-2 z-10 leading-none text-red-600 text-xs">
                  {errors?.product?.color && "*"}
                </span>
              }
            </label>
          </div>

          <div className="flex items-center gap-1">
            <select
              id="color"
              className="px-2 py-1 rounded-md text-black border border-greenT leading-none max-h-10 overflow-auto"
              {...register("product.color", {
                required: true,
              })}
            >
              <option value="">Выбрать</option>

              {colors.map((item) => (
                <option key={item.value} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <div
              className="h-6 w-6 rounded-full border-2 border-white"
              style={{
                backgroundColor: color.value,
              }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-start gap-1">
            <label htmlFor="files" className="relative">
              Фото
              {
                <span className="absolute top-0.5 -right-2 z-10 leading-none text-red-600 text-xs">
                  {errors?.product?.color && (errors?.files?.message || "*")}
                </span>
              }
            </label>
          </div>

          <input
            id="files"
            type="file"
            multiple
            {...register("files", {
              required: true,
              validate: {
                minFiles: (value) => value.length >= 1 || "Минимум 1 файл",
                maxFiles: (value) => value.length <= 5 || "Максимум 5 файлов",
              },
            })}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-start gap-1">
            <label htmlFor="description" className="relative">
              Описание
              {
                <span className="absolute top-0.5 -right-2 z-10 leading-none text-red-600 text-xs">
                  {errors?.product?.description && "*"}
                </span>
              }
            </label>
          </div>
          <textarea
            id="largeText"
            rows={5}
            cols={50}
            placeholder="Описание"
            className="p-2 rounded-md text-black border border-greenT"
            {...register("product.description", {
              required: true,
              minLength: 200,
              maxLength: 1500,
            })}
          ></textarea>
        </div>

        <div className="flex justify-center items-center w-full">
          <button
            type="submit"
            className="mt-3 px-3 py-2 rounded-md bg-greenT text-sm text-white"
          >
            Создать
          </button>
        </div>
      </form>
    </div>
  );
}

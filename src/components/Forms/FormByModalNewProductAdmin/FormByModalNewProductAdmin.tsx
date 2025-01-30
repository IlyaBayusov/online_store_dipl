"use client";

import { postProductAdmin } from "@/api";
import {
  amountImagesInAdmin,
  colors,
  modalDeleteEditNewProduct,
  modalNewProductAdmin,
  selectCategoryies,
} from "@/constans";
import { IPostFormDataNewProduct, IPostNewProduct } from "@/interfaces";
import { useFormNewProductStore } from "@/stores/useFormNewProduct";
import { useModalStore } from "@/stores/useModalStore";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";

interface ISelectedFiles {
  file: File;
  preview: string;
}

export default function FormByModalNewProductAdmin() {
  const { data, updateData } = useFormNewProductStore();
  const { openModal, closeModal } = useModalStore();

  const [formData, setFormData] = useState<IPostNewProduct>(data);

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<IPostFormDataNewProduct>({ mode: "onBlur" });

  const [selectedFiles, setSelectedFiles] = useState<ISelectedFiles[]>([]);

  const [errorFiles, setErrorFiles] = useState<string>("");
  const [errorSubmit, setErrorSubmit] = useState<string>("");

  const onSubmit = async () => {
    if (!isValid) {
      setErrorSubmit("Не все поля заполнены, либо заполнены неверно");
      return;
    }

    setErrorSubmit("");

    const fData = new FormData();

    const newFormData = {
      ...formData,
      quantities: Number(formData.quantities),
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

  // const handleOpenModalDeleteEdit = () => {
  //   openModal(modalDeleteEditNewProduct);
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorFiles("");

    if (selectedFiles.length > amountImagesInAdmin) {
      setErrorFiles("Можно загрузить до 5 изображений");
      return;
    }

    const newFiles = Array.from(e.target.files || []);

    if (newFiles.length > amountImagesInAdmin) {
      setErrorFiles("Можно загрузить до 5 изображений");
    }

    const validFiles = newFiles
      .slice(0, 5)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

    if (validFiles.length < newFiles.length) {
      setErrorFiles(
        "Некоторые файлы были отклонены, так как они не являются изображениями"
      );
    }

    setSelectedFiles((prevFiles) => {
      if (prevFiles.length + validFiles.length > amountImagesInAdmin) {
        setErrorFiles("Можно загрузить до 5 изображений");
        const getValidFiles = validFiles.slice(
          0,
          amountImagesInAdmin - prevFiles.length
        );
        return [...prevFiles, ...getValidFiles];
      }

      return [...prevFiles, ...validFiles];
    });
  };

  // const { onChange, onBlur, name, ref } = register("files", {
  //   required: true,
  //   validate: {
  //     minFiles: (value) => value.length >= 1 || "Минимум 1 файл",
  //     maxFiles: (value) => value.length <= 5 || "Максимум 5 файлов",
  //   },
  // });

  console.log(selectedFiles);

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

        <div className="w-full">
          <div
            className={`grid gap-4 ${
              selectedFiles.length > 0
                ? "grid-cols-[repeat(auto-fit,minmax(150px,1fr))]"
                : "grid-cols-1"
            }`}
          >
            {selectedFiles.map(({ file, preview }, index) => (
              <div
                key={index}
                className="relative bg-white rounded-md flex items-center justify-center h-32 w-full aspect-square outline outline-1 outline-gray-300"
              >
                <Image
                  src={preview}
                  alt={file.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 50vw"
                  className="rounded-md object-contain object-center mix-blend-multiply"
                />
              </div>
            ))}

            <label
              htmlFor="files"
              className={
                `bg-gray-300 rounded-md flex items-center justify-center px-1 cursor-pointer 
          ${selectedFiles.length === 1 ? "col-span-1 w-full h-40" : "h-32"}` +
                (selectedFiles.length >= amountImagesInAdmin ? " hidden" : "")
              }
            >
              {selectedFiles.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <FaCamera className="h-5 w-5" />
                  <p>Добавить</p>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <FaCamera className="h-5 w-5" />
                  <p className="font-bold">Добавить фотографии</p>
                  <p className="text-center">
                    Форматы JPEG, JPG, PNG, HEIC до 20 мб каждый
                  </p>
                </div>
              )}

              <input
                id="files"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <span className="text-red-600 text-xs">{errorFiles}</span>
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

            {/* <div
              className="h-6 w-6 rounded-full border-2 border-white"
              style={{
                backgroundColor: color.value,
              }}
            ></div> */}
          </div>
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

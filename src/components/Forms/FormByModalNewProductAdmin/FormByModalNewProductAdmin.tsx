"use client";

import { getCategories, postProductAdmin } from "@/api";
import { amountImagesInAdmin, modalNewProductAdmin, colors } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BsPinAngleFill } from "react-icons/bs";
import GetCompCategory from "@/components/Characteristics/GetCompCategory";
import { ICategories, IPostFormDataNewProduct } from "@/interfaces";
import { useCharacteristicsStore } from "@/stores/useCharacteristicsStore";
import { C_mobilePhones } from "@/interfaces/characteristics";
import { usePaginationAdmin } from "@/stores/usePaginationAdmin";

interface ISelectedFiles {
  file: File;
  preview: string;
}

export default function FormByModalNewProductAdmin() {
  const { closeModal } = useModalStore();
  const { characteristics, setIsSubmitChar, updateData } =
    useCharacteristicsStore();
  const getProducts = usePaginationAdmin((state) => state.getProducts);

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    watch,
    reset,
  } = useForm<IPostFormDataNewProduct>({ mode: "onBlur" });

  const [selectedFiles, setSelectedFiles] = useState<ISelectedFiles[]>([]);

  const [errorFiles, setErrorFiles] = useState<string>("");
  const [errorSubmit, setErrorSubmit] = useState<string>("");

  const [categories, setCategories] = useState<ICategories[]>([]);

  useLayoutEffect(() => {
    const getCat = async () => {
      const data = await getCategories();

      if (data) {
        setCategories(data.data);
      }
    };

    getCat();
  }, []);

  const categoryName = watch("product.categoryName");

  const onSubmit = async (data: IPostFormDataNewProduct) => {
    if (!isValid) {
      setErrorSubmit("Не все поля заполнены, либо заполнены неверно");
      return;
    }

    if (categoryName && !characteristics.producer) {
      setIsSubmitChar(true);
      setErrorSubmit("Укажите производителя в характеристиках товара");
      return;
    }

    setErrorSubmit("");

    const fData = new FormData();

    // Преобразуем характеристики в правильный формат JSON
    const characteristicsJson =
      Object.keys(characteristics).length > 0
        ? JSON.stringify({
            pushButtonPhone: characteristics.pushButtonPhone || false,
            producer: characteristics.producer || "",
            OS: characteristics.OS || "",
            diagonal: characteristics.diagonal || "",
            memory: characteristics.memory || "",
            ram: characteristics.ram || "",
            twoSimCards: characteristics.twoSimCards || false,
            nfc: characteristics.nfc || false,
            fingerprintScanner: characteristics.fingerprintScanner || false,
            memoryСard: characteristics.memoryСard || false,
            wirelessСharging: characteristics.wirelessСharging || false,
          })
        : "";

    const newFormData = {
      ...data.product,
      quantities: Number(data.product.quantities),
      characteristics: characteristicsJson,
      brand: characteristics.producer || "",
    };

    console.log(newFormData);

    fData.append("product", JSON.stringify(newFormData));

    selectedFiles.forEach((file) => {
      fData.append("files", file.file);
    });

    try {
      console.log(fData);

      const response = await postProductAdmin(fData);

      if ("message" in response) {
        setErrorSubmit(response.message);
        return;
      }

      getProducts();
      reset();
      setSelectedFiles([]);
      updateData({} as C_mobilePhones);
      closeModal(modalNewProductAdmin);
    } catch (error) {
      console.error("Ошибка при создании товара:", error);
      setErrorSubmit("Произошла ошибка при создании товара");
    }
  };

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
      .filter(
        (file) =>
          !selectedFiles.some(
            (selectedFile) => selectedFile.file.name === file.name
          )
      )
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

    if (validFiles.length < newFiles.length) {
      setErrorFiles(
        "Некоторые файлы были отклонены, так как они не являются изображениями и дублируются"
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

  const handleSetMainImage = (
    { file, preview }: ISelectedFiles,
    indexToSetMain: number
  ) => {
    setErrorFiles("");
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter(
        (_, index) => index !== indexToSetMain
      );
      return [{ file, preview }, ...updatedFiles];
    });
  };

  const handleDeleteImage = (indexToRemove: number) => {
    setErrorFiles("");
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleClickSubmit = () => {
    if (categoryName && !characteristics.producer) {
      setIsSubmitChar(true);
      return;
    }

    if (!isValid) {
      return;
    }
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
              maxLength: 120,
            })}
          />
        </div>

        <div className="w-full">
          <div
            className={
              "w-full flex justify-end mb-1" +
              (selectedFiles.length != 0 ? "" : " hidden")
            }
          >
            <p className="px-2 py-px bg-greenT text-white rounded-md text-xs">{`Загружено ${selectedFiles.length} из ${amountImagesInAdmin}`}</p>
          </div>

          <div
            className={`relative grid gap-4 ${
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

                {index != 0 ? (
                  <button
                    className="absolute top-1 left-1 z-10 p-1 rounded-full bg-black bg-opacity-30"
                    onClick={() => handleSetMainImage({ file, preview }, index)}
                  >
                    <BsPinAngleFill className="text-white w-[14px] h-[14px]" />
                  </button>
                ) : (
                  <div className="absolute top-1 left-1 z-10 flex items-center gap-1 bg-greenT px-1 py-px rounded-md">
                    <BsPinAngleFill className="text-white w-2 h-2" />
                    <p className="text-xs text-white">Главная</p>
                  </div>
                )}

                <button
                  className="absolute top-1 right-1 z-10 p-1 rounded-full bg-black bg-opacity-30"
                  onClick={() => handleDeleteImage(index)}
                >
                  <IoClose
                    className="text-white w-[14px] h-[14px]"
                    viewBox="75 75 350 350"
                  />
                </button>
              </div>
            ))}

            <label
              htmlFor="files"
              className={
                `bg-gray-300 rounded-md flex items-center justify-center px-1 cursor-pointer 
          ${selectedFiles.length === 0 ? "col-span-1 w-full h-40" : "h-32"}` +
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
                min: 0,
                max: 10000,
              })}
            />
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
              minLength: 10,
              maxLength: 2500,
            })}
          ></textarea>
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
              className="h-6 w-6 rounded-full border-2 border-white outline outline-1 outline-gray-300"
              style={{
                backgroundColor:
                  colors.find((item) => item.name === watch("product.color"))
                    ?.value || "#cccccc",
              }}
            ></div>
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

              {categories.map((category) => (
                <option key={category.name} value={category.urlName}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {categoryName && <GetCompCategory category={categoryName} />}

        <div className="relative flex justify-center items-center w-full">
          <span className="absolute -top-[7px] left-0 z-10 text-red-600 text-xs">
            {errorSubmit}
          </span>

          <button
            type="submit"
            onClick={handleClickSubmit}
            className="mt-3 px-5 py-2 rounded-md bg-greenT text-sm text-white"
          >
            Создать
          </button>
        </div>
      </form>
    </div>
  );
}

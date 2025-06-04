"use client";

import { getCategories } from "@/api";
import { modalEditProductAdmin } from "@/constans";
import { useModalStore } from "@/stores/useModalStore";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import GetCompCategory from "@/components/Characteristics/GetCompCategory";
import { ICategories, IProductInfo } from "@/interfaces";
import { useCharacteristicsStore } from "@/stores/useCharacteristicsStore";
import { C_mobilePhones } from "@/interfaces/characteristics";
import { api } from "@/axios";
import { AxiosError } from "axios";
import Loader from "@/components/Loader/Loader";

interface IEditProductFormData {
  product: {
    name: string;
    categoryName: string;
    description: string;
    price: number;
    quantities: number;
    brand: string;
  };
}

export default function FormByModalEditProductAdmin() {
  const { closeModal, modalsProps } = useModalStore();
  const { characteristics, isValidChar, setIsSubmitChar, updateData } =
    useCharacteristicsStore();

  const [errorSubmit, setErrorSubmit] = useState<string>("");
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [parsedCharacteristics, setParsedCharacteristics] = useState<
    C_mobilePhones | undefined
  >();

  const product = modalsProps[modalEditProductAdmin] as IProductInfo;

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    watch,
    reset,
  } = useForm<IEditProductFormData>({
    mode: "onBlur",
    defaultValues: {
      product: {
        name: product?.name || "",
        categoryName: product?.categoryName || "",
        description: product?.description || "",
        price: product?.price || 0,
        quantities: product?.quantities || 0,
        brand: product?.brand || "",
      },
    },
  });

  const categoryName = watch("product.categoryName");

  useEffect(() => {
    if (!product) return;

    const initialize = async () => {
      setIsLoading(true);
      try {
        const categoriesData = await getCategories();
        if (categoriesData) {
          setCategories(categoriesData.data);
        }

        // Парсим характеристики из JSON
        if (product.characteristics) {
          try {
            const parsed = JSON.parse(product.characteristics);
            setParsedCharacteristics(parsed);
            // Обновляем характеристики в сторе
            updateData(parsed);
          } catch (e) {
            console.error("Error parsing characteristics:", e);
            setParsedCharacteristics(undefined);
          }
        }

        // ВАЖНО: обновляем значения формы
        reset({
          product: {
            name: product.name || "",
            categoryName: product.categoryName || "",
            description: product.description || "",
            price: product.price || 0,
            quantities: product.quantities || 0,
            brand: product.brand || "", // Используем бренд из основных данных продукта
          },
        });
      } catch (error) {
        console.error("Error initializing form:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [product, updateData, reset]);

  // Если product не определен или данные загружаются, показываем загрузку
  if (!product || isLoading) {
    return (
      <div className="mt-3 text-center text-gray-500">Загрузка данных...</div>
    );
  }

  const onSubmit = async (data: IEditProductFormData) => {
    if (!isValid) {
      setErrorSubmit("Не все поля заполнены, либо заполнены неверно");
      return;
    }

    if (!isValidChar && categoryName) {
      setIsSubmitChar(true);
      setErrorSubmit("Заполните характеристики товара");
      return;
    }

    setErrorSubmit("");
    setIsLoading(true);

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
        : product.characteristics || ""; // Используем существующие характеристики, если новых нет

    const requestBody = {
      groupId: product.groupId,
      name: data.product.name,
      brand: data.product.brand, // Используем бренд из формы
      categoryName: data.product.categoryName,
      color: product.color,
      description: data.product.description,
      price: data.product.price,
      characteristics: characteristicsJson,
      quantities: data.product.quantities,
      images: product.images,
    };

    try {
      console.log(requestBody);

      const response = await api.put(`/v1/products/${product.id}`, requestBody);

      if (response.data) {
        reset();
        updateData({} as C_mobilePhones);
        closeModal(modalEditProductAdmin);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setErrorSubmit(
        axiosError.response?.data?.message || "Ошибка при обновлении товара"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mt-3">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="text-sm flex flex-col gap-3"
      >
        <div className="flex flex-col">
          <div className="flex items-start gap-1">
            <label htmlFor="name" className="relative">
              Название
              {errors?.product?.name && (
                <span className="absolute top-0.5 -right-2 z-10 leading-none text-red-600 text-xs">
                  *
                </span>
              )}
            </label>
          </div>

          <input
            type="text"
            placeholder="Название"
            className="px-2 py-1 w-full rounded-md text-black border border-[#B3B3B3]"
            {...register("product.name", {
              required: true,
              minLength: 6,
              maxLength: 120,
            })}
          />
        </div>

        {/* <div className="flex flex-col">
          <div className="flex items-start gap-1">
            <label htmlFor="brand" className="relative">
              Бренд
              {errors?.product?.brand && (
                <span className="absolute top-0.5 -right-2 z-10 leading-none text-red-600 text-xs">
                  *
                </span>
              )}
            </label>
          </div>

          <input
            type="text"
            placeholder="Бренд"
            className="px-2 py-1 w-full rounded-md text-black border border-[#B3B3B3]"
            {...register("product.brand", {
              required: true,
              maxLength: 50,
            })}
          />
        </div> */}

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

        {categoryName && (
          <GetCompCategory
            category={categoryName}
            initialValues={parsedCharacteristics}
          />
        )}

        <div className="relative flex justify-center items-center w-full">
          <span className="absolute -top-[7px] left-0 z-10 text-red-600 text-xs">
            {errorSubmit}
          </span>

          <button
            type="submit"
            className="mt-3 px-5 py-2 rounded-md bg-greenT text-sm text-white"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}

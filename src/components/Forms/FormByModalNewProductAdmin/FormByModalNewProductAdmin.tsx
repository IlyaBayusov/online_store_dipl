"use client";

import { postProductAdmin } from "@/api";
import {
  colors,
  modalDeleteEditNewProduct,
  selectCategoryies,
} from "@/constans";
import { IUseInput, useInput } from "@/hooks/useInput";
import { IPostNewProduct } from "@/interfaces";
import { useFormNewProductStore } from "@/stores/useFormNewProduct";
import { useModalStore } from "@/stores/useModalStore";
import React, { ChangeEvent, FormEvent, useState } from "react";

export default function FormByModalNewProductAdmin() {
  const { data, updateData } = useFormNewProductStore();
  const { openModal } = useModalStore();

  const [formData, setFormData] = useState<IPostNewProduct>(data);

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

  const handleSubmit = async (e: FormEvent) => {
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
      <form onSubmit={handleSubmit} className="text-base flex flex-col gap-3">
        <div className="flex flex-col">
          <div className="flex items-start gap-1">
            <label htmlFor="name">Название</label>
            {errorsValidation(name)}
          </div>

          <input
            type="text"
            placeholder="Название"
            name="name"
            className="px-2 py-1 rounded-md text-black"
            value={formData.name}
            onChange={(e) => {
              name.onChange(e);
              handleChange(e);
            }}
            onBlur={() => name.onBlur()}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-start gap-1">
            <label htmlFor="description">Описание</label>
            {errorsValidation(description)}
          </div>
          <textarea
            id="largeText"
            name="description"
            rows={5}
            cols={50}
            placeholder="Описание"
            className="p-2 rounded-md text-black"
            value={formData.description}
            onChange={(e) => {
              description.onChange(e);
              handleChange(e);
            }}
            onBlur={() => description.onBlur()}
          ></textarea>
        </div>

        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-start gap-1">
              <label htmlFor="price">Цена</label>
              {errorsValidation(price)}
            </div>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="Цена"
              maxLength={4}
              className="px-2 py-1 rounded-md max-w-20 text-black"
              value={formData.price}
              onChange={(e) => {
                price.onChange(e);
                handleChange(e);
              }}
              onBlur={() => price.onBlur()}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-start gap-1">
              <label htmlFor="color">Цвет</label>
              {errorsValidation(color)}
            </div>

            <div className="flex items-center gap-1">
              <select
                id="color"
                className="rounded-md text-black px-2 py-[3px] text-base max-h-10 overflow-auto"
                name="color"
                value={formData.color}
                onChange={(e) => {
                  color.onChange(e);
                  handleChange(e);
                }}
                onBlur={() => color.onBlur()}
              >
                <option value="">Выбрать</option>

                {colors.map((item) => (
                  <option key={item.value} value={item.value}>
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

          <div className="flex flex-col">
            <div className="flex items-start gap-1">
              <label htmlFor="category">Категория</label>
              {errorsValidation(categoryName)}
            </div>

            <div className="flex items-center gap-3">
              <select
                id="category"
                className="rounded-md text-black px-2 py-[3px] text-base"
                name="categoryName"
                value={formData.categoryName}
                onChange={(e) => {
                  categoryName.onChange(e);
                  handleChange(e);
                }}
                onBlur={() => categoryName.onBlur()}
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
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start gap-3">
            <div className="flex flex-col w-1/2">
              <div className="flex items-start gap-1">
                <label htmlFor="quantity">Количество</label>
                {errorsValidation(quantity)}
              </div>

              <input
                id="quantity"
                type="number"
                name="quantities"
                placeholder="Количество"
                maxLength={4}
                className="px-2 py-1 rounded-md text-black"
                value={quantity.value}
                onChange={(e) => {
                  quantity.onChange(e);
                }}
                onBlur={() => quantity.onBlur()}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-start gap-1">
            <label htmlFor="files">Фото</label>
            {(!selectedFiles || selectedFiles.length === 0) && (
              <span className="text-red-600 text-base">Выберите фото</span>
            )}
          </div>

          <input
            id="files"
            name="files"
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {errorSubmit && (
          <span className="text-red-600 text-base">{errorSubmit}</span>
        )}

        <button
          type="submit"
          className="mt-3 px-3 py-1 rounded-md bg-green-400 text-sm"
        >
          Создать товар
        </button>
      </form>
    </div>
  );
}

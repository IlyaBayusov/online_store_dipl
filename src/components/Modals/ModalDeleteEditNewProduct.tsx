"use client";

import { modalDeleteEditNewProduct, selectSiziesCloth } from "@/constans";
import { useInput } from "@/hooks/useInput";
import {
  defaultDeleteEditNewProductProps,
  useModalStore,
} from "@/stores/useModalStore";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalDeleteEditNewProduct() {
  const { modals, closeModal, modalsProps, addModalProps } = useModalStore();

  const size = useInput("", {
    empty: true,
  });
  const quantity = useInput("", {
    empty: true,
    minLength: 1,
    maxLength: 5,
  });

  const [errorSizeAndQuantity, setErrorSizeAndQuantity] = useState("");

  useEffect(() => {
    size.setValueExternally(modalsProps[modalDeleteEditNewProduct]?.size || "");
    quantity.setValueExternally(
      modalsProps[modalDeleteEditNewProduct]?.quantity || ""
    );
  }, [
    modalsProps[modalDeleteEditNewProduct]?.size,
    modalsProps[modalDeleteEditNewProduct]?.quantity,
  ]);

  const handleEditSizeAndQuantity = () => {
    const isDuplicate = modalsProps[
      modalDeleteEditNewProduct
    ]?.arrSizeAndQuantity.some((item) => item.size === size.value);

    if (
      modalsProps[modalDeleteEditNewProduct]!.arrSizeAndQuantity[
        modalsProps[modalDeleteEditNewProduct]!.nowIndex
      ].size !== size.value &&
      isDuplicate
    ) {
      setErrorSizeAndQuantity("Такой размер уже существует");
      return;
    } else {
      setErrorSizeAndQuantity("");

      const props =
        modalsProps[modalDeleteEditNewProduct] ??
        defaultDeleteEditNewProductProps();
      addModalProps(modalDeleteEditNewProduct, {
        ...props,
        size: size.value,
        quantity: quantity.value,
        isChanged: true,
      });
    }
  };

  const handleDeleteSizeQuantity = async () => {
    const props =
      modalsProps[modalDeleteEditNewProduct] ??
      defaultDeleteEditNewProductProps();
    addModalProps(modalDeleteEditNewProduct, {
      ...props,
      arrSizeAndQuantity: [
        ...props.arrSizeAndQuantity.slice(0, props.nowIndex),
        ...props.arrSizeAndQuantity.slice(props.nowIndex + 1),
      ],
      isDeleted: true,
    });

    closeModal(modalDeleteEditNewProduct);
  };

  return (
    <div
      className={
        `top-0 -0 z-[1000] w-full h-full bg-black bg-opacity-40 transition-all overflow-y-hidden ` +
        (modals[modalDeleteEditNewProduct] ? "fixed" : "hidden")
      }
      onClick={() => closeModal(modalDeleteEditNewProduct)}
    >
      <div
        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col bg-[#121212] p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-[#B3B3B3] uppercase">Подтвердить изменение?</h1>

          <div onClick={() => closeModal(modalDeleteEditNewProduct)}>
            <IoClose
              className="text-[#B3B3B3] w-5 h-5"
              viewBox="75 75 350 350"
            />
          </div>
        </div>

        <div className="flex justify-between items-start gap-3 h-14 text-base">
          <div className="flex flex-col w-1/2 h-full">
            <label htmlFor="sizes">Размер</label>

            <select
              id="sizes"
              className="rounded-md text-black px-2 text-base h-full"
              name="sizes"
              value={size.value}
              onChange={(e) => {
                size.onChange(e);
              }}
              onBlur={() => size.onBlur()}
            >
              <option value="">Выбрать</option>

              {selectSiziesCloth.map((size) => (
                <option key={size.name} value={size.name}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="quantity">Количество</label>
            <input
              id="quantity"
              type="number"
              name="quantities"
              placeholder="Размер"
              maxLength={4}
              className="px-2 py-1 rounded-md text-black h-full"
              value={quantity.value}
              onChange={(e) => {
                quantity.onChange(e);
              }}
              onBlur={() => quantity.onBlur()}
            />
          </div>
        </div>

        {errorSizeAndQuantity && (
          <p className="text-red-500 text-sm">{errorSizeAndQuantity}</p>
        )}

        <div className="mt-3 flex justify-around items-center text-base">
          <button
            className="py-2 px-4 text-[#B3B3B3] w-full"
            onClick={handleEditSizeAndQuantity}
          >
            Да
          </button>
          <button
            className="py-2 px-4 text-[#B3B3B3] w-full"
            onClick={() => closeModal(modalDeleteEditNewProduct)}
          >
            Нет
          </button>
        </div>

        <button
          className="mt-3 py-2 px-4 text-base text-red-500 border border-red-500 rounded-md uppercase"
          onClick={handleDeleteSizeQuantity}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

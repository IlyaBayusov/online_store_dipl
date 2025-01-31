"use client";

import SwitchBtn from "@/components/Switch/SwitchBtn";
import {
  diagonalListMobile,
  memoryListMobile,
  OSListMobile,
  producerListMobile,
  ramListMobile,
} from "@/constans/characteristics";
import { C_mobilePhones } from "@/interfaces/characteristics";
import React from "react";
import { useForm } from "react-hook-form";
import * as Switch from "@radix-ui/react-switch";

export default function CMobilePhones() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<C_mobilePhones>({ mode: "onBlur" });

  const onSubmit = (data: C_mobilePhones) => {
    console.log("Форма отправлена:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label
        htmlFor="pushButtonPhone"
        className="flex justify-between items-center"
      >
        Кнопочный телефон
        <Switch.Root
          id="pushButtonPhone"
          {...register("pushButtonPhone")}
          className="relative h-[25px] w-[42px] cursor-default rounded-full outline-none bg-gray-300"
        >
          <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
      </label>

      <label htmlFor="producer" className="flex justify-between items-center">
        Производитель
        <select
          id="producer"
          {...register("producer", { required: "Выберите производителя" })}
          className="px-2 py-1 max-w-fit rounded-md text-black border border-greenT w-full"
        >
          <option value="">Выбрать</option>

          {producerListMobile.map((itemProducer) => (
            <option key={itemProducer} value={itemProducer}>
              {itemProducer}
            </option>
          ))}
        </select>
      </label>

      {errors.producer && (
        <p className="text-red-500 text-sm">{errors.producer.message}</p>
      )}

      <fieldset>
        <legend className="">Операционная система</legend>

        <div className="flex flex-wrap gap-x-2 gap-y-2">
          {OSListMobile.map((os) => (
            <label key={os} className="flex items-center gap-2">
              <input
                type="radio"
                {...register("OS")}
                value={os}
                className="hidden"
              />

              <button
                className={
                  "px-2.5 py-1 text-nowrap font-bold text-gray-500 outline outline-1 outline-gray-300 rounded-full"
                }
              >
                {os}
              </button>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="">Диагональ экрана</legend>

        <div className="flex flex-wrap gap-x-2 gap-y-2">
          {diagonalListMobile.map((diag) => (
            <label key={diag} className="flex items-center gap-2">
              <input
                type="radio"
                {...register("diagonal")}
                value={diag}
                className="hidden"
              />

              <button
                className={
                  "px-2.5 py-1 text-nowrap font-bold text-gray-500 outline outline-1 outline-gray-300 rounded-full"
                }
              >
                {diag}
              </button>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="">Память</legend>

        <div className="flex flex-wrap gap-x-2 gap-y-2">
          {memoryListMobile.map((itemMemory) => (
            <label key={itemMemory} className="flex items-center gap-2">
              <input
                type="radio"
                {...register("memory")}
                value={itemMemory}
                className="hidden"
              />

              <button
                className={
                  "px-2.5 py-1 text-nowrap font-bold text-gray-500 outline outline-1 outline-gray-300 rounded-full"
                }
              >
                {itemMemory}
              </button>
            </label>
          ))}
        </div>
      </fieldset>

      <label htmlFor="ram" className="flex justify-between items-center">
        Оперативная память
        <select
          id="ram"
          {...register("ram")}
          className="px-2 py-1 max-w-fit rounded-md text-black border border-greenT w-full"
        >
          <option value="">Выбрать</option>

          {ramListMobile.map((itemRam) => (
            <option key={itemRam} value={itemRam}>
              {itemRam}
            </option>
          ))}
        </select>
      </label>

      <div className="w-full h-[0.2px] bg-gray-300"></div>

      <label
        htmlFor="twoSimCards"
        className="flex justify-between items-center"
      >
        Поддержка 2-х симкарт
        <Switch.Root
          id="twoSimCards"
          {...register("twoSimCards")}
          className="relative h-[25px] w-[42px] cursor-default rounded-full outline-none bg-gray-300"
        >
          <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
      </label>

      <div className="w-full h-[0.2px] bg-gray-300"></div>

      <label htmlFor="nfc" className="flex justify-between items-center">
        Поддержка NFC
        <Switch.Root
          id="nfc"
          {...register("nfc")}
          className="relative h-[25px] w-[42px] cursor-default rounded-full outline-none bg-gray-300"
        >
          <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
      </label>

      <div className="w-full h-[0.2px] bg-gray-300"></div>

      <label
        htmlFor="fingerprintScanner"
        className="flex justify-between items-center"
      >
        Сканер отпечатка пальца
        <Switch.Root
          id="fingerprintScanner"
          {...register("fingerprintScanner")}
          className="relative h-[25px] w-[42px] cursor-default rounded-full outline-none bg-gray-300"
        >
          <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
      </label>

      <div className="w-full h-[0.2px] bg-gray-300"></div>

      <label htmlFor="memoryСard" className="flex justify-between items-center">
        Слот для карты памяти
        <Switch.Root
          id="memoryСard"
          {...register("memoryСard")}
          className="relative h-[25px] w-[42px] cursor-default rounded-full outline-none bg-gray-300"
        >
          <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
      </label>

      <div className="w-full h-[0.2px] bg-gray-300"></div>

      <label
        htmlFor="wirelessСharging"
        className="flex justify-between items-center"
      >
        Функция беспроводной зарядки
        <Switch.Root
          id="wirelessСharging"
          {...register("wirelessСharging")}
          className="relative h-[25px] w-[42px] cursor-default rounded-full outline-none bg-gray-300"
        >
          <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
      </label>
    </form>
  );
}

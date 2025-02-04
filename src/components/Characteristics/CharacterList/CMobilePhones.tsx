"use client";

import {
  diagonalListMobile,
  memoryListMobile,
  OSListMobile,
  producerListMobile,
  ramListMobile,
} from "@/constans/characteristics";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Switch from "@radix-ui/react-switch";
import { C_mobilePhones } from "@/interfaces/characteristics";
import { useCharacteristicsStore } from "@/stores/useCharacteristicsStore";

export default function CMobilePhones() {
  const {
    control,
    formState: { errors, isValid },
    register,
    watch,
    trigger,
  } = useForm<C_mobilePhones>({ mode: "onBlur" });

  const { isSubmitChar, updateData, setIsValidChar, setIsSubmitChar } =
    useCharacteristicsStore();
  const prevValues = useRef<C_mobilePhones>({} as C_mobilePhones);

  const currentValues = watch();
  useEffect(() => {
    if (JSON.stringify(currentValues) !== JSON.stringify(prevValues.current)) {
      updateData(currentValues);
      setIsValidChar(isValid);
      prevValues.current = currentValues;
    }
  }, [currentValues, updateData, isValid]);

  useEffect(() => {
    if (isSubmitChar) {
      console.log("submit");

      trigger("producer");
      setIsSubmitChar(false);
    }
  }, [isSubmitChar]);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="pushButtonPhone"
        className="flex justify-between items-center"
      >
        Кнопочный телефон
        <Controller
          control={control}
          name="pushButtonPhone"
          render={({ field }) => (
            <Switch.Root
              checked={field.value || false}
              onCheckedChange={field.onChange}
              className="relative h-[25px] w-[42px] cursor-default rounded-full outline-none bg-gray-300"
            >
              <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          )}
        />
      </label>

      <label htmlFor="producer" className="flex justify-between items-center">
        <div className="relative">
          Производитель
          {
            <span className="absolute top-0.5 -right-2 z-10 leading-none text-red-600 text-xs">
              {errors?.producer && "*"}
            </span>
          }
        </div>

        <select
          id="producer"
          {...register("producer", {
            required: "Выберите производителя",
          })}
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

      <fieldset>
        <legend className="mb-1">Операционная система</legend>

        <div className="flex flex-wrap gap-x-2 gap-y-2">
          {OSListMobile.map((os) => (
            <Controller
              control={control}
              name="OS"
              key={os}
              render={({ field }) => (
                <button
                  type="button"
                  onClick={() => field.onChange(os)}
                  className={
                    "px-2.5 py-1 text-nowrap font-bold transition-all text-gray-500 outline outline-1 outline-gray-300 rounded-full" +
                    (field.value === os
                      ? " text-greenT outline outline-1 outline-greenT"
                      : "")
                  }
                >
                  {os}
                </button>
              )}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1">Диагональ экрана</legend>

        <div className="flex flex-wrap gap-x-2 gap-y-2">
          {diagonalListMobile.map((diag) => (
            <Controller
              control={control}
              name="diagonal"
              key={diag}
              render={({ field }) => (
                <button
                  type="button"
                  onClick={() => field.onChange(diag)}
                  className={
                    "px-2.5 py-1 text-nowrap font-bold transition-all text-gray-500 outline outline-1 outline-gray-300 rounded-full" +
                    (field.value === diag
                      ? " text-greenT outline outline-1 outline-greenT"
                      : "")
                  }
                >
                  {diag}
                </button>
              )}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1">Память</legend>

        <div className="flex flex-wrap gap-x-2 gap-y-2">
          {memoryListMobile.map((itemMemory) => (
            <Controller
              control={control}
              name="memory"
              key={itemMemory}
              render={({ field }) => (
                <button
                  type="button"
                  onClick={() => field.onChange(itemMemory)}
                  className={
                    "px-2.5 py-1 text-nowrap font-bold transition-all text-gray-500 outline outline-1 outline-gray-300 rounded-full" +
                    (field.value === itemMemory
                      ? " text-greenT outline outline-1 outline-greenT"
                      : "")
                  }
                >
                  {itemMemory}
                </button>
              )}
            />
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
        <Controller
          control={control}
          name="twoSimCards"
          render={({ field }) => (
            <Switch.Root
              checked={field.value || false}
              onCheckedChange={field.onChange}
              className="relative h-[25px] w-[42px] cursor-default rounded-full outline-none bg-gray-300"
            >
              <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          )}
        />
      </label>

      <div className="w-full h-[0.2px] bg-gray-300"></div>

      <label htmlFor="nfc" className="flex justify-between items-center">
        Поддержка NFC
        <Controller
          control={control}
          name="nfc"
          render={({ field }) => (
            <Switch.Root
              checked={field.value || false}
              onCheckedChange={field.onChange}
              className="relative h-[25px] w-[42px] cursor-default rounded-full outline-none bg-gray-300"
            >
              <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          )}
        />
      </label>

      <div className="w-full h-[0.2px] bg-gray-300"></div>

      <label
        htmlFor="fingerprintScanner"
        className="flex justify-between items-center"
      >
        Сканер отпечатка пальца
        <Controller
          control={control}
          name="fingerprintScanner"
          render={({ field }) => (
            <Switch.Root
              checked={field.value || false}
              onCheckedChange={field.onChange}
              className="relative h-[25px] w-[42px] cursor-default rounded-full outline-none bg-gray-300"
            >
              <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          )}
        />
      </label>

      <div className="w-full h-[0.2px] bg-gray-300"></div>

      <label htmlFor="memoryСard" className="flex justify-between items-center">
        Слот для карты памяти
        <Controller
          control={control}
          name="memoryСard"
          render={({ field }) => (
            <Switch.Root
              checked={field.value || false}
              onCheckedChange={field.onChange}
              className="relative h-[25px] w-[42px] cursor-default rounded-full outline-none bg-gray-300"
            >
              <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          )}
        />
      </label>

      <div className="w-full h-[0.2px] bg-gray-300"></div>

      <label
        htmlFor="wirelessСharging"
        className="flex justify-between items-center"
      >
        Функция беспроводной зарядки
        <Controller
          control={control}
          name="wirelessСharging"
          render={({ field }) => (
            <Switch.Root
              checked={field.value || false}
              onCheckedChange={field.onChange}
              className="relative h-[25px] w-[42px] cursor-default rounded-full outline-none bg-gray-300"
            >
              <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          )}
        />
      </label>
    </div>
  );
}

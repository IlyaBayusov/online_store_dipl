"use client";

import { producerListMobile } from "@/constans/characteristics";
import { C_mobilePhones } from "@/interfaces/characteristics";
import React from "react";
import { useForm } from "react-hook-form";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <div className="flex gap-4">
          {["Android", "iOS", "HarmonyOS"].map((os) => (
            <label key={os} className="flex items-center gap-2">
              <input
                type="radio"
                {...register("OS", { required: "Выберите ОС" })}
                value={os}
                className="hidden"
              />

              <button
                className={
                  "px-3 py-1 font-bold text-gray-500 outline outline-1 outline-gray-300 rounded-full"
                }
              >
                {os}
              </button>
            </label>
          ))}
        </div>
      </fieldset>
    </form>
  );
}

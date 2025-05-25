"use client";

import { IFormByAuthFPReset } from "@/interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = { setSubmit: () => void; setIsSubmitActiveEmail: () => void };

export default function FormByAuthFPReset({
  setSubmit,
  setIsSubmitActiveEmail,
}: Props) {
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    clearErrors,
    watch,
  } = useForm<IFormByAuthFPReset>({ mode: "onBlur" });

  const newPassword = watch("newPassword");
  const secondPassword = watch("secondPassword");

  const handlePrev = () => {
    reset();
    clearErrors();

    setSubmit();
    setIsSubmitActiveEmail();
  };

  const onSubmit = async (formData: IFormByAuthFPReset) => {
    if (!isValid) {
      setError("Некоторые поля заполнены неверно.");
      return;
    }

    setError("");

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/api/v1/verification",
    //     { email: formData.email, code }
    //   );
    //   const data = await response.data;
    // } catch (error) {
    //   console.log("Ошибка отправки запроса с кодом", error);
    // }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="mb-1 text-lg font-bold uppercase text-center mt-3">
        Новый пароль
      </h1>
      {error && <p className="text-red-600 text-xs">{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5 items-center text-black"
      >
        <div className="ralative flex flex-col justify-center text-base items-center w-full">
          <input
            type="password"
            placeholder="Новый пароль"
            {...register("newPassword", {
              required: "Поле обязательное",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
            })}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 bg-transparent border border-gray-300"
          />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs mt-1">
            {errors?.newPassword
              ? errors?.newPassword?.message || "Ошибка!"
              : " "}
          </span>
        </div>

        <div className="ralative flex flex-col justify-center text-base items-center w-full">
          <input
            type="password"
            placeholder="Повторите пароль"
            {...register("secondPassword", {
              required: "Поле обязательное",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
              validate: (value) =>
                value === newPassword || "Пароли не совпадают",
            })}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 bg-transparent border border-gray-300"
          />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs mt-1">
            {errors?.secondPassword
              ? errors?.secondPassword?.message || "Ошибка!"
              : " "}
          </span>
        </div>

        <button
          className="bg-greenT text-white py-2 px-6 rounded-md mt-3"
          type="submit"
        >
          Подтвердить
        </button>
      </form>

      <button className="text-greenT text-base mt-1" onClick={handlePrev}>
        Назад
      </button>
    </div>
  );
}

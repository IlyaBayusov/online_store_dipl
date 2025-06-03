"use client";

import { IFormByAuthFPReset } from "@/interfaces";
import axios from "axios";
import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useResetPasswordStore } from "@/stores/useResetPasswordStore";

type Props = { setSubmit: () => void; setIsSubmitActiveEmail: () => void };

export default function FormByAuthFPReset({
  setSubmit,
  setIsSubmitActiveEmail,
}: Props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { email, clearEmail } = useResetPasswordStore();

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    clearErrors,
    getValues,
  } = useForm<IFormByAuthFPReset>({ mode: "onBlur" });

  const handlePrev = useCallback(() => {
    reset();
    clearErrors();
    clearEmail();
    setSubmit();
    setIsSubmitActiveEmail();
  }, [clearEmail, clearErrors, reset, setSubmit, setIsSubmitActiveEmail]);

  const onSubmit = async (formData: IFormByAuthFPReset) => {
    if (!isValid) {
      setError("Некоторые поля заполнены неверно.");
      return;
    }

    if (!email) {
      setError(
        "Email не найден. Пожалуйста, начните процесс сброса пароля заново."
      );
      return;
    }

    const { newPassword, secondPassword } = getValues();
    if (newPassword !== secondPassword) {
      setError("Пароли не совпадают.");
      return;
    }

    setError("");

    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/users/change/password",
        {
          email: email,
          newPassword: formData.newPassword,
        }
      );

      if (response.status === 204) {
        clearEmail();
        reset();
        clearErrors();
        setSuccess("Пароль успешно изменен.");

        const timer = setTimeout(() => {
          handlePrev();
          setSuccess("");
        }, 2000);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.log("Ошибка при смене пароля", error);
      handlePrev();
      setError(
        "Произошла ошибка при смене пароля. Пожалуйста, попробуйте позже."
      );
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="mb-1 text-lg font-bold uppercase text-center mt-3">
        Новый пароль
      </h1>
      {error && <p className="text-red-600 text-xs">{error}</p>}
      {success && <p className="text-green-600 text-xs">{success}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5 items-center text-black"
      >
        <div className="relative flex flex-col justify-center text-base items-center w-full">
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
            className="py-2 px-6 rounded-md mt-1 w-full max-w-64 bg-transparent outline outline-1 outline-gray-300"
          />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs mt-1">
            {errors?.newPassword
              ? errors?.newPassword?.message || "Ошибка!"
              : " "}
          </span>
        </div>

        <div className="relative flex flex-col justify-center text-base items-center w-full">
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
              validate: (value) => {
                const { newPassword } = getValues();
                return value === newPassword || "Пароли не совпадают";
              },
            })}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-64 bg-transparent outline outline-1 outline-gray-300"
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

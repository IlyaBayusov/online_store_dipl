"use client";

import { IFormByAuth } from "@/interfaces";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Auth() {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    watch,
  } = useForm<IFormByAuth>({ mode: "onBlur" });

  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (formData: IFormByAuth) => {
    if (!isValid) {
      setError("Некоторые поля заполнены неверно.");
      return;
    }

    setError("");

    console.log(formData);

    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );

      if (response.status !== 200) {
        const data = await response.data;
        setError(data.message || "Ошибка авторизации");
      } else {
        const data = await response.data;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        console.log("Авторизация прошла успешно", data);
      }

      router.push("/");
    } catch (error) {
      const axiosError = error as AxiosError;

      console.error("Ошибка при авторизации", error);

      if (axiosError.response?.status === 404) {
        setError("Такого логина не существует");
      } else if (axiosError.response && axiosError.response.status === 500) {
        setError("Ошибка валидации");
      } else {
        setError("Ошибка при авторизации");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-lg font-bold uppercase text-center mt-3">
        Авторизация
      </h1>
      {error && <p className="text-red-600 text-xs">{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-5 w-full mt-1 text-black"
      >
        <div className="relative flex flex-col justify-center text-base items-center w-full max-w-64">
          <input
            type="text"
            placeholder="Логин"
            {...register("username", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 3,
                message: "Минимум 3 символа",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
            })}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 bg-transparent border border-gray-300"
          />
          {
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs mt-1">
              {errors?.username && (errors?.username?.message || "Ошибка!")}
            </span>
          }
        </div>

        <div className="relative flex flex-col justify-center text-base items-center w-full max-w-64">
          <input
            type="password"
            placeholder="Пароль"
            {...register("password", {
              required: "Поле обязательно для заполнения",
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
          {
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs mt-1">
              {errors?.password && (errors?.password?.message || "Ошибка!")}
            </span>
          }
        </div>

        <Link href={"/forgotPass"} className="text-greenT text-base">
          Забыли пароль?
        </Link>

        <button
          className="bg-greenT text-white py-2 px-6 rounded-md"
          type="submit"
        >
          Войти
        </button>
      </form>

      <Link href={"/registr"} className="text-greenT text-base mt-1">
        Зарегистрироваться
      </Link>
    </div>
  );
}

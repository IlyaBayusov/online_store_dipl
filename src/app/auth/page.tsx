"use client";

import { IUseInput, useInput } from "@/hooks/useInput";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface IParams {
  minLength: number;
  maxLength: number;
}

export default function Auth() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const username = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const password = useInput("", { empty: true, minLength: 4, maxLength: 50 });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const errorsValidation = (inputName: IUseInput, params: IParams) => {
    if (inputName.dirty && (inputName.empty || inputName.minLength)) {
      return (
        <span className="text-red-600 text-xs">
          Мин.{" "}
          {params.minLength !== 2
            ? `${params.minLength} символа`
            : `${params.minLength} символов`}
        </span>
      );
    }
    if (inputName.dirty && inputName.maxLength) {
      return (
        <span className="text-red-600 text-xs">
          Макс. {params.maxLength} символов
        </span>
      );
    }

    return <span className="text-red-600 text-xs mb-4"></span>;
  };

  const validateForm = () => {
    let isValid = true;

    if (!username.inputValid) {
      isValid = false;
    }
    if (!password.inputValid) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
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
      {error && <p className="text-red-700">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center mt-1 text-black"
      >
        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <input
            type="text"
            placeholder="Логин"
            name="username"
            value={formData.username}
            onChange={(e) => {
              username.onChange(e);
              handleChange(e);
            }}
            onBlur={() => username.onBlur()}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 bg-transparent border border-[#EAEAEA]"
          />
          {errorsValidation(username, { minLength: 2, maxLength: 50 })}
        </div>

        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={(e) => {
              password.onChange(e);
              handleChange(e);
            }}
            onBlur={() => password.onBlur()}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 bg-transparent border border-[#EAEAEA]"
          />
          {errorsValidation(password, { minLength: 6, maxLength: 50 })}
        </div>

        <Link href={"/forgotPass"} className="text-greenT text-base">
          Забыли пароль?
        </Link>

        <button
          className="bg-greenT text-white py-2 px-6 rounded-md mt-3"
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

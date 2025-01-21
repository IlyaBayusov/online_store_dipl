"use client";

import { mainPage } from "@/constans";
import { IUseInput, useInput } from "@/hooks/useInput";
import { useFormRegistrStore } from "@/stores/useFormRegistrStore";
import axios, { AxiosError, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

interface IParams {
  minLength: number;
  maxLength: number;
}

type Props = {
  isSubmit: boolean;
  setSubmit: () => void;
};

export default function FormByRegistrCode({ isSubmit, setSubmit }: Props) {
  const [error, setError] = useState("");

  const code = useInput("", { empty: true, minLength: 2, maxLength: 16 });

  const router = useRouter();

  const { formData } = useFormRegistrStore();

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

    if (!code.inputValid) {
      isValid = false;
    }

    return isValid;
  };

  const decodeToken = (accessToken: string) => {
    try {
      const decoded = jwtDecode(accessToken);
      console.log("Decoded token:", decoded);
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSubmit || !formData) {
      setSubmit();
      return;
    }

    if (!validateForm()) {
      setError("Поле заполнено неверно.");
      return;
    }

    setError("");

    console.log({ email: formData.email, code: code.value });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/verification",
        { email: formData.email, code }
      );
      const data = await response.data;

      switch (data.message) {
        case "SUCCESS":
          postRegistr();
          break;
        case "EXPIRED":
          //истек
          break;
        case "INVALID":
          return;
      }
    } catch (error) {
      console.log("Ошибка отправки запроса с кодом", error);
    }
  };

  const postRegistr = async () => {
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/api/auth/registration",
        formData
      );

      const data = await response.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      decodeToken(data.accessToken);
      console.log("Регистрация прошла успешно", data);

      router.push(mainPage);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Ошибка при регистрации", error);
      if (axiosError.response && axiosError.response.status === 500) {
        setError("Ошибка валидации");
      } else {
        setError("Ошибка при регистрации");
      }
      setSubmit();
    }
  };

  const handlePrev = () => {
    code.setValueExternally("");
    setSubmit();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-72">
      <h1 className="text-lg font-bold uppercase text-center mt-3">
        Подтверждение почты
      </h1>
      {error && <p className="text-red-700">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center text-black"
      >
        <div className="flex flex-col justify-center text-base items-center w-full">
          <input
            type="number"
            placeholder="Код"
            name="code"
            value={code.value}
            onChange={(e) => code.onChange(e)}
            onBlur={() => code.onBlur()}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 bg-transparent border border-[#EAEAEA]"
          />
          {errorsValidation(code, { minLength: 2, maxLength: 50 })}
        </div>

        <button
          className="bg-greenT text-white py-2 px-6 rounded-md mt-3"
          type="submit"
        >
          Отправить
        </button>
      </form>

      <button className="text-greenT text-base mt-1" onClick={handlePrev}>
        Назад
      </button>
    </div>
  );
}

"use client";

import { IUseInput, useInput } from "@/hooks/useInput";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface IParams {
  minLength: number;
  maxLength: number;
}

type Props = {
  isSubmit: boolean;
  setSubmit: () => void;
};

export default function FormByRegistrCode({ isSubmit, setSubmit }: Props) {
  const [formData, setFormData] = useState({
    code: "",
  });

  const code = useInput("", { empty: true, minLength: 2, maxLength: 50 });

  const [error, setError] = useState("");
  const router = useRouter();

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;

    if (!code.inputValid) {
      isValid = false;
    }

    return isValid;
  };

  console.warn("код ошибка", error);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSubmit) {
      setSubmit();
      return;
    }

    if (!validateForm()) {
      setError("Поле заполнено неверно.");
      return;
    }

    setError("");

    console.log(formData);

    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/api/auth/registration",
        formData
      );

      const data = await response.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      console.log("Почта подтверждена", data);

      router.push("/");
    } catch (error) {
      const axiosError = error as AxiosError;

      console.error("Ошибка при подтверждении", error);
      if (axiosError.response && axiosError.response.status === 500) {
        setError("Ошибка валидации");
      } else {
        setError("Ошибка при подтверждении");
      }
    }
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
            onChange={(e) => {
              code.onChange(e);
              handleChange(e);
            }}
            onBlur={() => code.onBlur()}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 bg-transparent border border-[#EAEAEA]"
          />
          {isSubmit && errorsValidation(code, { minLength: 2, maxLength: 50 })}
        </div>

        <button
          className="bg-greenT text-white py-2 px-6 rounded-md mt-3"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>

      <button className="text-greenT text-base mt-1" onClick={setSubmit}>
        Назад
      </button>
    </div>
  );
}

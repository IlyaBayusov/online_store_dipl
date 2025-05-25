"use client";

import { IFormByAuthForgotPass } from "@/interfaces";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = { setSubmit: () => void; setIsSubmitActiveEmail: () => void };

export default function FormByAuthForgotPass({
  setSubmit,
  setIsSubmitActiveEmail,
}: Props) {
  const [errorForm, setErrorForm] = useState("");
  const [isActiveEmail, setIsActiveEmail] = useState<boolean>(false);

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm<IFormByAuthForgotPass>({ mode: "onBlur" });

  const email = watch("email");

  const handlePrev = () => {
    setIsActiveEmail(false);

    reset();
    setSubmit();
  };

  const onSubmit = async (formData: IFormByAuthForgotPass) => {
    if (!formData.email) {
      setSubmit();
      return;
    }

    if (!isValid) {
      setErrorForm("Некоторые поля заполнены неверно.");
      return;
    }

    setErrorForm("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/verification",
        { email: formData.email, code: formData.code }
      );
      const data = await response.data;

      switch (data.message) {
        case "SUCCESS":
          setIsSubmitActiveEmail();
          clearErrors();
          reset();
          break;
        case "EXPIRED":
          setErrorForm("Код истек.");
          break;
        case "INVALID":
          setErrorForm("Код не валидный.");
          return;
      }
    } catch (error) {
      console.log("Ошибка отправки запроса с кодом", error);
    }
  };

  const handleClickSendCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/email",
        {
          field: email,
        }
      );
      const data: { message: string; code: number } = await response.data;
      console.log(data);

      if (data.code === 200) {
        setError("email", {
          type: "manual",
          message: "Такой email не зарегистрирован",
        });
      } else {
        sendCode();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status !== 409) {
          setErrorForm(`Ошибка отправки. Код: ${error.response?.status}`);
        } else {
          sendCode();
        }
      } else {
        console.log("Ошибка проверки email", error);
        setErrorForm("Ошибка проверки email.");
      }
    }
  };

  const sendCode = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/verification?email=${email}`
      );

      if (response) {
        setIsActiveEmail(true);

        return;
      }
    } catch (error) {
      console.log("Ошибка отправки запроса на подтверждение кода", error);
      return;
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="mb-1 text-lg font-bold uppercase text-center mt-3">
        Восстановление пароля
      </h1>
      {errorForm && <p className="text-red-600 text-xs">{errorForm}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5 items-center text-black"
      >
        {isActiveEmail || (
          <div className="relative flex flex-col justify-center text-base items-center w-full">
            <input
              type="email"
              placeholder="Почта"
              {...register("email", {
                required: "Поле обязательное",
                minLength: {
                  value: 4,
                  message: "Минимум 4 символа",
                },
                maxLength: {
                  value: 50,
                  message: "Максимум 50 символов",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Некорректный email",
                },
              })}
              className="py-2 px-6 rounded-md mt-1 w-full max-w-72 bg-transparent border border-gray-300"
            />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs mt-1">
              {errors?.email ? errors?.email?.message || "Ошибка!" : " "}
            </span>
          </div>
        )}

        {isActiveEmail && (
          <div className="ralative flex flex-col justify-center text-base items-center w-full">
            <input
              type="number"
              placeholder="Код"
              {...register("code", {
                required: "Поле обязательное",
                minLength: {
                  value: 6,
                  message: "Введите 6-значный код",
                },
                maxLength: {
                  value: 6,
                  message: "Введите 6-значный код",
                },
              })}
              className="py-2 px-6 rounded-md mt-1 w-full max-w-72 bg-transparent border border-gray-300"
            />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 text-nowrap text-red-600 text-xs mt-1">
              {errors?.code ? errors?.code?.message || "Ошибка!" : " "}
            </span>
          </div>
        )}

        {!isActiveEmail ? (
          <button
            className="bg-greenT text-white py-2 px-6 rounded-md mt-3"
            type="button"
            onClick={handleClickSendCode}
          >
            Отправить код
          </button>
        ) : (
          <button
            className="bg-greenT text-white py-2 px-6 rounded-md mt-3"
            type="submit"
          >
            Подтвердить
          </button>
        )}
      </form>

      <button className="text-greenT text-base mt-1" onClick={handlePrev}>
        Назад
      </button>
    </div>
  );
}

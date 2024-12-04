"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IUseInput, useInput } from "@/hooks/useInput";

//
// ------------------------------------ форму сделать в отдельном компоненте
// ------------------------------------ сделать динамический вывод в errorsValidation
//

interface IParams {
  minLength: number;
  maxLength: number;
}

export default function Registr() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const firstname = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const lastname = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const username = useInput("", { empty: true, minLength: 2, maxLength: 50 });
  const email = useInput("", { empty: true, minLength: 4, maxLength: 50 });
  const password = useInput("", { empty: true, minLength: 6, maxLength: 50 });
  const secondPassword = useInput("", {
    empty: true,
    minLength: 6,
    maxLength: 50,
  });

  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessageEmailValid, setErrorMessageEmailValid] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsername = async () => {
      setErrorMessageUsername("");

      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.post(
          "http://localhost:8080/api/v1/users/username",
          {
            field: username.value,
          }
        );
      } catch (error) {
        setErrorMessageUsername("Такой логин уже сушествует");
        console.log("Ошибка проверки username", error);
      }
    };

    fetchUsername();
  }, [username.value]);

  useEffect(() => {
    setErrorMessageEmail("");

    const fetchEmail = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.post(
          "http://localhost:8080/api/v1/users/email",
          {
            field: email.value,
          }
        );
      } catch (error) {
        setErrorMessageEmail("Такой email уже сушествует");

        console.log("Ошибка проверки email", error);
      }
    };

    fetchEmail();
    validaionEmail();
  }, [email.value]);

  useEffect(() => {
    setErrorMessagePassword("");

    if (password.value !== secondPassword.value && secondPassword.value) {
      setErrorMessagePassword("Пароли не совпадают");
    }
  }, [password, secondPassword]);

  const validaionEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setErrorMessageEmailValid("");
    if (email.value) {
      const emailIsValid = emailRegex.test(email.value);

      setErrorMessageEmailValid(emailIsValid ? "" : "Некорректный email");
    }
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
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const validateForm = () => {
    let isValid = true;

    if (!firstname.inputValid) {
      isValid = false;
    }
    if (!lastname.inputValid) {
      isValid = false;
    }
    if (!username.inputValid || errorMessageUsername) {
      isValid = false;
    }
    if (!email.inputValid || errorMessageEmailValid || errorMessageEmail) {
      isValid = false;
    }
    if (!password.inputValid || errorMessagePassword) {
      isValid = false;
    }
    if (!secondPassword.inputValid) {
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
        "http://localhost:8080/api/auth/registration",
        formData
      );

      const data = await response.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      decodeToken(data.accessToken);
      console.log("Регистрация прошла успешно", data);

      router.push("/");
    } catch (error) {
      const axiosError = error as AxiosError;

      console.error("Ошибка при регистрации", error);
      if (axiosError.response && axiosError.response.status === 500) {
        setError("Ошибка валидации");
      } else {
        setError("Ошибка при регистрации");
      }
    }
  };

  return (
    <div className="container px-3 flex flex-col justify-center items-center">
      <h1 className="text-lg uppercase text-center mt-3">Регистрация</h1>
      {error && <p className="text-red-700">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center mt-1 text-black"
      >
        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Имя
          </label>
          <input
            type="text"
            placeholder="Имя"
            name="firstName"
            value={firstname.value}
            onChange={(e) => {
              firstname.onChange(e);
              handleChange(e);
            }}
            onBlur={() => firstname.onBlur()}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {errorsValidation(firstname, { minLength: 2, maxLength: 50 })}
        </div>

        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Фамилия
          </label>
          <input
            type="text"
            placeholder="Фамилия"
            name="lastName"
            value={lastname.value}
            onChange={(e) => {
              lastname.onChange(e);
              handleChange(e);
            }}
            onBlur={() => lastname.onBlur()}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {errorsValidation(lastname, { minLength: 2, maxLength: 50 })}
        </div>

        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Логин
          </label>
          <input
            type="text"
            placeholder="Логин"
            name="username"
            value={username.value}
            onChange={(e) => {
              username.onChange(e);
              handleChange(e);
            }}
            onBlur={() => username.onBlur()}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {errorMessageUsername && (
            <span className="text-red-600 text-xs">{errorMessageUsername}</span>
          )}
          {errorsValidation(username, { minLength: 2, maxLength: 50 })}
        </div>

        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email.value}
            onChange={(e) => {
              email.onChange(e);
              handleChange(e);
            }}
            onBlur={() => email.onBlur()}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {errorMessageEmailValid && (
            <span className="text-red-600 text-xs">
              {errorMessageEmailValid}
            </span>
          )}
          {errorMessageEmail && (
            <span className="text-red-600 text-xs">{errorMessageEmail}</span>
          )}
          {errorsValidation(email, { minLength: 4, maxLength: 50 })}
        </div>

        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Пароль
          </label>
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={password.value}
            onChange={(e) => {
              password.onChange(e);
              handleChange(e);
            }}
            onBlur={() => password.onBlur()}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {errorsValidation(password, { minLength: 6, maxLength: 50 })}
        </div>

        <div className="flex flex-col justify-center text-base items-center w-full max-w-64">
          <label
            htmlFor=""
            className="text-start mt-2 text-white flex justify-start w-full"
          >
            Повторить пароль
          </label>
          <input
            type="password"
            placeholder="Повторить пароль"
            name="secondPassword"
            value={secondPassword.value}
            onChange={(e) => secondPassword.onChange(e)}
            onBlur={() => secondPassword.onBlur()}
            className="py-2 px-6 rounded-md mt-1 w-full max-w-72 text-white bg-transparent border border-[#6F00FF]"
          />
          {errorMessagePassword && (
            <span className="text-red-600 text-xs">{errorMessagePassword}</span>
          )}
          {errorsValidation(secondPassword, { minLength: 6, maxLength: 50 })}
        </div>

        <button className="bg-white py-2 px-5 rounded-md mt-3" type="submit">
          Зарегистрироваться
        </button>
      </form>

      <Link href={"/auth"} className="text-gray-400 text-base mt-1">
        Войти в аккаунт
      </Link>
    </div>
  );
}

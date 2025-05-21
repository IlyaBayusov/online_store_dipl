"use client";

import { getSendCodeOnEmail, putUserPassInProfile } from "@/axios";

import { IFormNewPassInProfile, IGetUserInfoInProfile } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputInForm from "../ProfilePage/InputInForm";
import EditBtnInForm from "../ProfilePage/EditBtnInForm";

type Props = { profileData: IGetUserInfoInProfile };

export default function FormNewPassProfile({ profileData }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormNewPassInProfile>({ mode: "onSubmit" });

  const newPassword = watch("newPassword");
  const secondNewPassword = watch("secondNewPassword");

  const [isActivePass, setIsActivePass] = useState<boolean>(false);
  const [isActiveCodeBlock, setIsActiveCodeBlock] = useState<boolean>(false);

  const [messSendCode, setMessSendCode] = useState<string>("");
  const [errorMessageSendCode, setErrorMessageSendCode] = useState<string>("");

  const [errorMessSecondNewPass, setErrorMessSecondNewPass] =
    useState<string>("");

  const [errorMessageForm, setErrorMessageForm] = useState<string>("");

  const [messChangePass, setMessChangePass] = useState<string>("");

  const [isTimer, setIsTimer] = useState<boolean>(false);

  useEffect(() => {
    if (newPassword !== secondNewPassword) {
      setErrorMessSecondNewPass("Пароли не совпадают");
    } else {
      setErrorMessSecondNewPass("");
    }
  }, [newPassword, secondNewPassword]);

  const onGetCode = async () => {
    setIsActiveCodeBlock(true);

    const responseSendCode = await getSendCodeOnEmail(profileData.email);

    if (responseSendCode?.status === 200) {
      setMessSendCode("Код отправлен");
      if (!isTimer) {
        setIsTimer(true);
        setTimeout(() => setIsTimer(false), 1000 * 30);
      }
    } else {
      setErrorMessageSendCode(
        "Ошибка отправки. Отключите VPN и попробуйте снова"
      );
      setIsActiveCodeBlock(false);
    }
  };

  const onSubmit = async (data: IFormNewPassInProfile) => {
    if (!isValid) {
      setErrorMessageForm("Не все поля заполнены верно");
      return;
    }

    console.log(data.newPassword);

    const response = await putUserPassInProfile({
      password: data.newPassword,
    });

    if (response?.status === 200) {
      setIsActivePass(false);
      setMessChangePass("Пароль изменен");
    } else {
      setErrorMessageForm("Ошибка отправки. Отключите VPN и попробуйте снова");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-3 flex flex-col justify-start items-center gap-3 "
    >
      <label htmlFor="newPassword" className="relative w-full">
        <p>{isActivePass ? "Новый пароль" : "Пароль"}</p>

        <div className="w-full flex justify-between items-center">
          <div className="w-full flex justify-between items-center max-w-60">
            <InputInForm
              disabled={!isActivePass}
              id="newPassword"
              type="password"
              placeholder="********"
              {...register("newPassword", {
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
            />

            <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-green-500 text-xs">
              {messChangePass}
            </span>
          </div>

          {isActivePass || (
            <EditBtnInForm onClick={() => setIsActivePass(true)}>
              Изменить
            </EditBtnInForm>
          )}
        </div>
        <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-red-600 text-xs">
          {errors.newPassword?.message}
        </span>
      </label>

      {isActivePass && (
        <>
          <label htmlFor="secondNewPassword" className="relative w-full">
            <p>Подтвердите пароль</p>

            <div className="w-full flex justify-between items-center">
              <div className="w-full flex justify-between items-center max-w-60">
                <InputInForm
                  disabled={!isActivePass}
                  id="secondNewPassword"
                  type="password"
                  placeholder="********"
                  {...register("secondNewPassword", {
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
                />
              </div>
            </div>
            <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-red-600 text-xs">
              {errors.secondNewPassword?.message || errorMessSecondNewPass}
            </span>
          </label>

          <label htmlFor="email" className="relative w-full mb-1">
            <p>Код подтверждения</p>

            <div className="w-full flex justify-between items-center">
              <div className="w-full flex justify-between items-center max-w-60">
                <InputInForm
                  disabled={!isActiveCodeBlock}
                  id="code"
                  type="number"
                  placeholder="Введите код"
                  {...register("code", {
                    required: "Поле обязательно для заполнения",
                    minLength: {
                      value: 6,
                      message: "Минимум 6 символов",
                    },
                    maxLength: {
                      value: 6,
                      message: "Максимум 6 символов",
                    },
                  })}
                />
              </div>

              <EditBtnInForm
                disabled={isTimer}
                onClick={onGetCode}
                className={
                  "relative py-1.5 text-nowrap text-sm  " +
                  (isTimer ? "text-gray-500" : "text-greenT")
                }
              >
                Отправить код
              </EditBtnInForm>
            </div>

            {errorMessageSendCode ? (
              <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-red-600 text-xs">
                {errorMessageSendCode}
              </span>
            ) : (
              <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-green-500 text-xs">
                {messSendCode}
              </span>
            )}
          </label>

          <EditBtnInForm type="submit">
            <span className="pt-3 absolute -top-4 left-1/2 z-10 -translate-x-1/2 text-nowrap text-red-600 text-xs">
              {errorMessageForm}
            </span>

            <span>Готово</span>
          </EditBtnInForm>
        </>
      )}
    </form>
  );
}

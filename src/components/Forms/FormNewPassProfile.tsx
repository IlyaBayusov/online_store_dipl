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
    clearErrors,
    reset,
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

  const handleExist = () => {
    setIsActivePass(false);
    setIsActiveCodeBlock(false);

    setMessSendCode("");
    setErrorMessageSendCode("");

    setErrorMessSecondNewPass("");
    setErrorMessageForm("");

    setMessChangePass("");

    clearErrors();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-3 flex flex-col justify-start items-center gap-3 "
    >
      <label htmlFor="newPassword" className="relative w-full">
        <div className="w-full flex justify-start items-center gap-3">
          <p>{isActivePass ? "Новый пароль" : "Пароль"}</p>

          {messChangePass ? (
            <span className="-mb-0.5 text-nowrap text-green-500 text-xs">
              {messChangePass}
            </span>
          ) : (
            <span className="-mb-0.5 text-nowrap text-red-600 text-xs">
              {errors.newPassword?.message}
            </span>
          )}
        </div>

        <div className="w-full flex justify-between items-center gap-5">
          <div className="w-full flex justify-between items-center max-w-60">
            <InputInForm
              disabled={!isActivePass}
              id="newPassword"
              type="password"
              placeholder="********"
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
            />
          </div>

          {!isActivePass && (
            <EditBtnInForm onClick={() => setIsActivePass(true)}>
              Изменить
            </EditBtnInForm>
          )}
        </div>
      </label>

      {isActivePass && (
        <>
          <label htmlFor="secondNewPassword" className="relative w-full">
            <div className="w-full flex justify-start items-center gap-3">
              <p>Подтвердите пароль</p>

              <span className="-mb-0.5 text-nowrap text-red-600 text-xs">
                {errors.secondNewPassword?.message || errorMessSecondNewPass}
              </span>
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="w-full flex justify-between items-center max-w-60">
                <InputInForm
                  disabled={!isActivePass}
                  id="secondNewPassword"
                  type="password"
                  placeholder="********"
                  {...register("secondNewPassword", {
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
                />
              </div>
            </div>
          </label>

          <label htmlFor="email" className="relative w-full mb-1">
            <div className="w-full flex justify-start items-center gap-3">
              <p>Код подтверждения</p>

              {errorMessageSendCode ? (
                <span className="-mb-0.5 text-nowrap text-red-600 text-xs">
                  {errorMessageSendCode}
                </span>
              ) : (
                <span className="-mb-0.5 text-nowrap text-green-500 text-xs">
                  {messSendCode}
                </span>
              )}
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="w-full flex justify-between items-center max-w-60">
                <InputInForm
                  disabled={!isActiveCodeBlock}
                  id="code"
                  type="number"
                  placeholder="Введите код"
                  {...register("code", {
                    required: "Поле обязательное",
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

                {isActivePass && (
                  <div className="absolute -bottom-6 left-0 z-10">
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
                )}
              </div>
            </div>
          </label>

          <div className="w-full flex justify-center pt-1 text-nowrap text-red-600 text-xs">
            {errorMessageForm}
          </div>

          <div className="w-full flex justify-center items-center gap-5">
            <EditBtnInForm
              type="submit"
              className="relative px-4 py-1.5 text-greenT border border-greenT rounded-md text-nowrap text-sm"
            >
              Готово
            </EditBtnInForm>
            <EditBtnInForm
              className="relative px-4 py-1.5 text-red-600 border border-red-600 rounded-md text-nowrap text-sm"
              onClick={handleExist}
            >
              Отмена
            </EditBtnInForm>
          </div>
        </>
      )}
    </form>
  );
}

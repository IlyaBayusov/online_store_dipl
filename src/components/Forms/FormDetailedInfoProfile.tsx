"use client";

import { putUserInfoInProfile } from "@/api";
import { IFormDataProfileUserInfo, IGetUserInfoInProfile } from "@/interfaces";
import { useProfileInfoStore } from "@/stores/useProfileInfoStore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputInForm from "../ProfilePage/InputInForm";
import EditBtnInForm from "../ProfilePage/EditBtnInForm";

type Props = { profileData: IGetUserInfoInProfile };

export default function FormDetailedInfoProfile({ profileData }: Props) {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<IFormDataProfileUserInfo>({
    mode: "onSubmit",
    defaultValues: {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      username: profileData.username,
    },
  });

  const [isActive, setIsActive] = useState(false);
  const [errorMess, setErrorMess] = useState<string>("");

  const [errorMessForm, setErrorMessForm] = useState<string>("");

  const newProfileData = useProfileInfoStore((state) => state.newProfileData);
  const setNewProfileData = useProfileInfoStore(
    (state) => state.setNewProfileData
  );

  const onSubmit = async (data: IFormDataProfileUserInfo) => {
    if (!isValid) {
      setErrorMess("Не все поля заполнены верно");
      return;
    }

    const newData = await putUserInfoInProfile(data);

    if (newData) {
      setNewProfileData(newData);
      setIsActive(false);
    } else {
      setErrorMessForm("Ошибка отправки. Отключите VPN и попробуйте снова");
    }
  };

  const handleClickChange = () => {
    setIsActive(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full flex flex-col items-center gap-3 text-base"
      >
        <div className="w-full flex flex-nowrap justify-center items-center">
          <label htmlFor="firstName" className="relative w-full max-w-72">
            <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 text-nowrap text-red-600 text-xs">
              {errorMess}
            </span>

            <p className="flex justify-start">Имя</p>

            <InputInForm
              disabled={!isActive}
              {...register("firstName", {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
                maxLength: {
                  value: 30,
                  message: "Максимум 30 символов",
                },
              })}
              placeholder={newProfileData.firstName || profileData.firstName}
            />
            <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-red-600 text-xs">
              {errors?.firstName && (errors?.firstName?.message || "Ошибка!")}
            </span>
          </label>
        </div>

        <div className="w-full flex flex-nowrap justify-center items-center">
          <label htmlFor="lastName" className="relative w-full max-w-72">
            <p>Фамилия</p>

            <InputInForm
              disabled={!isActive}
              {...register("lastName", {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
                maxLength: {
                  value: 30,
                  message: "Максимум 30 символов",
                },
              })}
              placeholder={newProfileData.lastName || profileData.lastName}
            />
            <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-red-600 text-xs">
              {errors?.lastName && (errors?.lastName?.message || "Ошибка!")}
            </span>
          </label>
        </div>

        <div className="mb-1 w-full flex flex-nowrap justify-center items-center">
          <label htmlFor="username" className="relative w-full max-w-72">
            <p>Логин</p>

            <InputInForm
              disabled={!isActive}
              {...register("username", {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
                maxLength: {
                  value: 30,
                  message: "Максимум 30 символов",
                },
              })}
              placeholder={newProfileData.username || profileData.username}
            />
            <span className="absolute -bottom-4 left-0 z-10 text-nowrap text-red-600 text-xs">
              {errors?.username && (errors?.username?.message || "Ошибка!")}
            </span>
          </label>
        </div>

        {isActive && (
          <EditBtnInForm type="submit">
            <span className="pt-3 absolute -top-4 left-1/2 z-10 -translate-x-1/2 text-nowrap text-red-600 text-xs">
              {errorMessForm}
            </span>

            <span>Готово</span>
          </EditBtnInForm>
        )}
      </form>

      {isActive || (
        <div className="pt-3 w-full flex justify-center">
          <EditBtnInForm type="button" onClick={handleClickChange}>
            Изменить
          </EditBtnInForm>
        </div>
      )}
    </>
  );
}

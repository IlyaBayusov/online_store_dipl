"use client";

import { putUserEmailInProfile } from "@/api";
import { getSendCodeOnEmail } from "@/axios";
import { IGetUserInfoInProfile } from "@/interfaces";
import { useProfileInfoStore } from "@/stores/useProfileInfoStore";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import InputInForm from "../ProfilePage/InputInForm";
import EditBtnInForm from "../ProfilePage/EditBtnInForm";

type Props = { profileData: IGetUserInfoInProfile };

export default function FormNewEmailProfile({ profileData }: Props) {
  const newProfileData = useProfileInfoStore((state) => state.newProfileData);
  const setNewProfileData = useProfileInfoStore(
    (state) => state.setNewProfileData
  );

  const [isActiveEmail, setIsActiveEmail] = useState<boolean>(false);

  const [isActiveCodeBlock, setIsActiveCodeBlock] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [sendCodeEmail, setSendCodeEmail] = useState<string>("");
  const [errorMessageEmailCode, setErrorMessageEmailCode] =
    useState<string>("");

  const [isTimer, setIsTimer] = useState<boolean>(false);

  const fetchEmail = async () => {
    setErrorMessageEmail("");

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/email",
        {
          field: email,
        }
      );
      const data: { code: number; message: string } = await response.data;

      if (data.code === 200) {
        const responseSendEmail = await getSendCodeOnEmail(email);

        if (responseSendEmail?.status !== 200) {
          setSendCodeEmail("");
          setErrorMessageEmail(
            "Ошибка отправки. Отключите VPN и попробуйте снова"
          );
        } else {
          setSendCodeEmail("Код отправлен");
          setIsActiveCodeBlock(true);
          setErrorMessageEmail("");
        }
      }
    } catch (error) {
      const err = error as AxiosError;

      if (err.status === 409) {
        setErrorMessageEmail("Такой email уже сушествует");
      } else {
        console.error("Ошибка проверки email", error);
      }
    }
  };

  const onSendEmail = async () => {
    if (!email.length) {
      setErrorMessageEmail("Введите почту");
      return;
    }

    if (!isTimer) {
      await fetchEmail();
      setIsTimer(true);
      setTimeout(() => setIsTimer(false), 1000 * 30);
    }
  };

  const onSendEmailCode = async () => {
    if (!code.length) {
      setErrorMessageEmailCode("Введите код");
      return;
    }

    const response = await axios.post(
      "http://localhost:8080/api/v1/verification",
      { email, code }
    );

    const data: { code: number; message: string } = await response.data;

    switch (data.message) {
      case "SUCCESS":
        const response = await putUserEmailInProfile({
          newEmail: email,
          code,
        });
        if (response?.status === 204) {
          setSendCodeEmail("Почта изменена");
          setIsActiveCodeBlock(false);
          setErrorMessageEmail("");

          setNewProfileData({ ...newProfileData, email });

          setIsActiveEmail(false);
          return;
        }
        break;
      case "EXPIRED":
        setErrorMessageEmailCode("Код истек, отправьте код на почту");
        break;
      case "INVALID":
        setErrorMessageEmailCode("Неверный код, проверьте его");
        break;
    }
  };

  const handleExist = () => {
    setIsActiveEmail(false);
    setIsActiveCodeBlock(false);

    setCode("");
    setEmail("");

    setErrorMessageEmail("");
    setErrorMessageEmailCode("");

    setSendCodeEmail("");
  };

  return (
    <div className="flex flex-col justify-start items-center gap-3">
      <label htmlFor="email" className="relative w-full">
        <div className="w-full flex justify-start items-center gap-3">
          <p>Почта</p>

          {!errorMessageEmail ? (
            <span className="-mb-0.5 text-nowrap text-green-500 text-xs">
              {sendCodeEmail}
            </span>
          ) : (
            <span className="-mb-0.5 text-nowrap text-red-600 text-xs">
              {errorMessageEmail}
            </span>
          )}
        </div>

        <div className="w-full flex justify-between items-center gap-5">
          <div className="w-full flex justify-between items-center max-w-60">
            <InputInForm
              disabled={!isActiveEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder={profileData.email}
            />
          </div>

          {isActiveEmail ? (
            <div className="absolute -bottom-6 left-0 z-10">
              <EditBtnInForm
                disabled={isTimer}
                onClick={onSendEmail}
                className={
                  "relative py-1.5 text-nowrap text-sm " +
                  (isTimer ? "text-gray-500" : "text-greenT")
                }
              >
                Отправить код
              </EditBtnInForm>
            </div>
          ) : (
            <EditBtnInForm
              onClick={() => {
                setIsActiveEmail(true);
              }}
            >
              Изменить
            </EditBtnInForm>
          )}
        </div>
      </label>

      {isActiveCodeBlock && (
        <label htmlFor="code" className="relative w-full">
          <div className="w-full flex justify-start items-center gap-3">
            <p>Код подтверждения</p>

            <span className="-mb-0.5 text-nowrap text-red-600 text-xs">
              {errorMessageEmailCode}
            </span>
          </div>

          <div className="w-full flex justify-between items-center">
            <div className="w-full flex justify-between items-center max-w-60">
              <InputInForm
                disabled={!isActiveCodeBlock}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                id="code"
                type="number"
                placeholder="Введите код"
              />
            </div>
          </div>
        </label>
      )}

      {isActiveEmail && (
        <div className="w-full mt-3 flex justify-center items-center gap-5">
          <EditBtnInForm
            className="relative px-4 py-1.5 text-greenT border border-greenT rounded-md text-nowrap text-sm"
            onClick={onSendEmailCode}
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
      )}
    </div>
  );
}

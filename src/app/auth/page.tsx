"use client";

import FormByAuth from "@/components/Forms/FormByAuth";
import FormByAuthForgotPass from "@/components/Forms/FormByAuthForgotPass";
import FormByAuthFPReset from "@/components/Forms/FormByAuthFPReset";
import { useState } from "react";

export default function Auth() {
  const [isSubmitInAuth, setIsSubmitonAuth] = useState<boolean>(false);
  const [isSubmitActiveEmail, setIsSubmitActiveEmail] =
    useState<boolean>(false);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-72 overflow-hidden">
        <div
          className={
            "flex flex-row flex-nowrap items-start w-[300%]  transition-transform duration-500" +
            (isSubmitInAuth
              ? isSubmitActiveEmail
                ? " -translate-x-2/3"
                : " -translate-x-1/3"
              : "")
          }
        >
          <div className="w-1/3">
            <FormByAuth setSubmit={() => setIsSubmitonAuth((prev) => !prev)} />
          </div>

          <div className="w-1/3">
            <FormByAuthForgotPass
              setSubmit={() => setIsSubmitonAuth((prev) => !prev)}
              setIsSubmitActiveEmail={() =>
                setIsSubmitActiveEmail((prev) => !prev)
              }
            />
          </div>

          <div className="w-1/3">
            <FormByAuthFPReset
              setSubmit={() => setIsSubmitonAuth((prev) => !prev)}
              setIsSubmitActiveEmail={() =>
                setIsSubmitActiveEmail((prev) => !prev)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

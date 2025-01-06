"use client";

import FormByRegistr from "@/components/Forms/FormByRegistr/FormByRegistr";
import FormByRegistrCode from "@/components/Forms/FormByRegistrCode/FormByRegistrCode";
import { useState } from "react";

export default function Registr() {
  const [isSubmitInRegistr, setIsSubmitonRegistr] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-72 overflow-hidden">
        <div
          className={
            "flex flex-row flex-nowrap items-start w-[576px] transition-transform duration-500" +
            (isSubmitInRegistr ? " -translate-x-72" : "")
          }
        >
          <FormByRegistr
            setSubmit={() => setIsSubmitonRegistr((prev) => !prev)}
          />
          <FormByRegistrCode
            isSubmit={isSubmitInRegistr}
            setSubmit={() => setIsSubmitonRegistr((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
}

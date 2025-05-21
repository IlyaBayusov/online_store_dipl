"use client";

import React from "react";

type Props = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function EditBtnInForm({
  children,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className="relative text-greenT py-1.5 text-nowrap text-sm"
      {...rest}
    >
      {children}
    </button>
  );
}

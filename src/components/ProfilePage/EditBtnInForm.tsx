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
      className="relative text-white py-1.5 text-nowrap text-base"
      {...rest}
    >
      {children}
    </button>
  );
}

"use client";

import { categoryComp } from "@/constans";
import { C_mobilePhones } from "@/interfaces/characteristics";
import React from "react";

type Props = {
  category: string;
  initialValues?: C_mobilePhones;
};

export default function GetCompCategory({ category, initialValues }: Props) {
  const SelectedComp = categoryComp[category];

  if (!SelectedComp) {
    return null;
  }

  return <SelectedComp initialValues={initialValues} />;
}

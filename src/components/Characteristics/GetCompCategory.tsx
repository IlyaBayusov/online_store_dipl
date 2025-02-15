"use client";

import { categoryComp } from "@/constans";
import React from "react";

type Props = {
  category: string;
};

export default function GetCompCategory({ category }: Props) {
  const SelectedComp = categoryComp[category] || <div></div>;

  return <SelectedComp />;
}

"use client";

import React from "react";
import CMobilePhones from "../Characteristics/CharacterList/CMobilePhones";

type Props = {
  category: string;
};

export default function GetCompCategory({ category }: Props) {
  const categoryComp: Record<string, React.ElementType> = {
    mobile_phones: CMobilePhones,
  };

  const SelectedComp = categoryComp[category] || <div></div>;

  return <SelectedComp />;
}

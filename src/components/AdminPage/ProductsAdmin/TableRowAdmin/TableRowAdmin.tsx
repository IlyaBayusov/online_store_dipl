"use client";

import { postEnableProductAdmin } from "@/api";
import { IProductInfo } from "@/interfaces";
import Image from "next/image";
import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";

type Props = { product: IProductInfo };

export default function TableRowAdmin({ product }: Props) {
  const [isActive, setIsActive] = useState<boolean>(product.isActive);

  const handleClickIsActive = async (productId: number) => {
    const data = await postEnableProductAdmin(productId, !isActive);

    console.log(data);

    if (data) {
      setIsActive((prev) => !prev);
    }
  };
  console.log(product.isActive);

  console.log(`${product.id}, ${isActive}`);

  return (
    <tr className="border-b border-slate-300" key={product.name}>
      <td>
        <div className="ml-1 w-full flex text-start">
          <div className="relative h-[80px] w-[60px] bg-[#F0F0F0] flex justify-center items-center rounded-md">
            <Image
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={product.images[0]}
              alt={product.name}
            />
          </div>
          <div className="pl-1 w-full flex flex-col items-start max-w-32 text-wrap">
            <p>{product.name}</p>
          </div>
        </div>
      </td>
      <td>{product.id}</td>
      <td>{product.price}</td>
      <td>{product.quantities}</td>
      <td>
        <button onClick={() => handleClickIsActive(product.id)}>
          {isActive ? "Вкл." : "Выкл."}
        </button>
      </td>
      <td className="h-full">
        <div className="flex justify-center items-center ">
          <button className="py-1 px-2">
            <CiSettings className="h-6 w-6 p-px" />
          </button>
        </div>
      </td>
    </tr>
  );
}

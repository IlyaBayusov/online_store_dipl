"use client";

import { IProductInfo } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { CiSettings } from "react-icons/ci";
import Loader from "@/components/Loader/Loader";

type Props = {
  products: IProductInfo[];
};

export default function ProductsAdmin({ products }: Props) {
  return (
    <div className="flex flex-col w-full bg-white">
      {products ? (
        <div className="overflow-x-scroll w-full">
          <table className="w-[170vw] table-fixed text-black uppercase text-xs text-center mt-3">
            <thead>
              <tr className="text-greenT text-[10px]">
                <th className="w-2/5">Название</th>
                <th className="">Артикул</th>
                <th className="">Цена</th>
                <th className="">Кол-во</th>
                <th className="">Статус</th>
                <th className="">Изменить</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
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
                      <div className="w-full flex flex-col items-start max-w-32 text-wrap">
                        <p>{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>{product.id}</td>
                  <td>{product.price}</td>
                  <td>{product.quantities}</td>
                  <td>Вкл.</td>
                  <td className="h-full">
                    <div className="flex justify-center items-center ">
                      <button className="py-1 px-2">
                        <CiSettings className="h-6 w-6 p-px" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

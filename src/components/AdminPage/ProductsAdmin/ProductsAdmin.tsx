"use client";

import { IProductInfo } from "@/interfaces";
import React from "react";
import Loader from "@/components/Loader/Loader";
import TableRowAdmin from "./TableRowAdmin/TableRowAdmin";

type Props = {
  products: IProductInfo[];
};

const ProductsAdmin = React.memo(function ProductsAdmin({ products }: Props) {
  return (
    <div className="flex flex-col w-full bg-white">
      {products ? (
        <div className="overflow-x-scroll w-full">
          <table className="w-[170vw] table-fixed text-black text-xs text-center mt-3">
            <thead>
              <tr className="text-greenT text-[10px] uppercase">
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
                <TableRowAdmin key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
});

export default ProductsAdmin;

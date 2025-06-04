"use client";

import { IProductInfo } from "@/interfaces";
import React from "react";
import Loader from "@/components/Loader/Loader";
import TableRowAdmin from "./TableRowAdmin/TableRowAdmin";

type Props = {
  products: IProductInfo[];
  onProductDelete: () => void;
};

const ProductsAdmin = React.memo(function ProductsAdmin({
  products,
  onProductDelete,
}: Props) {
  return (
    <div className="md:container md:mx-auto md:mt-3 flex flex-col w-full bg-white rounded-md">
      {products ? (
        <div className="overflow-x-auto w-full">
          <table className="w-[170vw] md:w-full table-fixed text-black text-xs text-center">
            <thead>
              <tr className="text-greenT text-[10px] uppercase">
                <th className="w-2/5">Название</th>
                <th className="">Артикул</th>
                <th className="">Цена</th>
                <th className="">Кол-во</th>
                <th className="">Статус</th>
                <th className="">Изменить</th>
                <th className="">Удалить</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <TableRowAdmin
                  key={product.id}
                  product={product}
                  onDelete={onProductDelete}
                />
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

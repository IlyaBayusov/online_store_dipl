import { IProductsCardBody, IProductsCardParams } from "@/interfaces";
import React from "react";
import ProductCardItem from "../ProductCardItem/ProductCardItem";

type Props = {
  productsCard: IProductsCardBody[];
  params: IProductsCardParams;
};

export default function ProductCardList({ productsCard, params }: Props) {
  return (
    <>
      {productsCard.length ? (
        <div className="my-2 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {productsCard.map((product) => (
            <div key={product.productId} className="h-full">
              <ProductCardItem productCard={product} params={params} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-center text-[#B3B3B3] font-semibold mt-3 mb-3">
          Список пуст
        </p>
      )}
    </>
  );
}

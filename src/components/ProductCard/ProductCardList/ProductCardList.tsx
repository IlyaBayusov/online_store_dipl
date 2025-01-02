import { IProductsCardBody, IProductsCardParams } from "@/interfaces";
import React from "react";
import ProductCardItem from "../ProductCardItem/ProductCardItem";

type Props = {
  productsCard: IProductsCardBody[];
  nameTitle: string;
  params: IProductsCardParams;
};

export default function ProductCardList({
  productsCard,
  nameTitle,
  params,
}: Props) {
  return (
    <>
      <div className="flex justify-start mt-3 mb-5">
        <h2 className="text-lg font-semibold">{nameTitle}</h2>
      </div>
      <div className="my-2 w-full grid grid-cols-2 gap-3">
        {productsCard &&
          productsCard.map((product) => (
            <div key={product.productId} className="h-full">
              <ProductCardItem productCard={product} params={params} />
            </div>
          ))}
      </div>
    </>
  );
}

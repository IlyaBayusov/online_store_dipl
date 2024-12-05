import { IProductCategory } from "@/interfaces";
import Link from "next/link";
import React from "react";
import ProductCardItem from "../ProductCardItem/ProductCardItem";

type Props = { productsCard: IProductCategory[]; nameTitle: string };

export default function ProductCardList({ productsCard, nameTitle }: Props) {
  return (
    <>
      <div className="flex justify-start mt-3 mb-5">
        <h2 className="text-lg font-semibold">{nameTitle}</h2>
      </div>
      <div className="my-2 w-full grid grid-cols-2 gap-3 auto-rows-fr">
        {productsCard &&
          productsCard.map((product) => (
            <Link
              key={product.productId}
              href={`/${product.categoryName}/${product.productId}`}
              className="flex w-full"
            >
              <ProductCardItem productCard={product} />
            </Link>
          ))}
      </div>
    </>
  );
}

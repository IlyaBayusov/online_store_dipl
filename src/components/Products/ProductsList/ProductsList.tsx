"use client";

import Link from "next/link";
import React from "react";
import ProductsItem from "../ProductsItem/ProductsItem";
import { ICategory, IProductCategory } from "@/interfaces/index";

type Props = { category: ICategory; products: IProductCategory[] };

export default function ProductsList({ category, products }: Props) {
  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          {category.name}
        </h2>
      </div>
      <div className="my-2 w-full grid grid-cols-2 gap-3">
        {products.map((product) => (
          <Link
            key={product.productId}
            href={`/${category.url_name}/${product.productId}`}
          >
            <ProductsItem
              name={product.name}
              img={product.image}
              price={product.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

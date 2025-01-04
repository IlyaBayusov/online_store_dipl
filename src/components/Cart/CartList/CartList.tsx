"use client";

import { IProductInCart } from "@/interfaces";
import React, { useEffect } from "react";
import CartItem from "../CartItem/CartItem";
// import { useCartStore } from "@/stores/useCartStore";

type Props = { products: IProductInCart[] };

export default React.memo(function CartList({ products }: Props) {
  // const { updateSum } = useCartStore();

  // useEffect(() => {
  //   const totalSum = products.reduce((acc, product) => acc + product.price, 0);
  //   updateSum(totalSum);
  // }, [updateSum, products]);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-3">
      {products.map((product, index) => (
        <CartItem key={index} product={product} />
      ))}
    </div>
  );
});

import { IProductInCart } from "@/interfaces";
import React from "react";
import CartItem from "../CartItem/CartItem";

type Props = { products: IProductInCart[] };

export default React.memo(function CartList({ products }: Props) {
  return (
    <div className="mt-3 flex flex-col justify-between w-full gap-3">
      {products.map((product, index) => (
        <CartItem key={index} product={product} />
      ))}
    </div>
  );
});

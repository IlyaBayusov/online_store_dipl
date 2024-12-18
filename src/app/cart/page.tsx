"use client";

import { getProductsCart } from "@/api";
import CartList from "@/components/Cart/CartList/CartList";
import FormByCart from "@/components/Forms/FormByCart/FormByCart";
import { modalCartDeleteProduct } from "@/constans";
import { IProductInCart } from "@/interfaces";
import { useModalStore } from "@/stores/useModalStore";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [products, setProducts] = useState<IProductInCart[]>([]);
  const { modalsProps } = useModalStore();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (modalsProps[modalCartDeleteProduct]?.isDeleted) {
      getProducts();
    }
  }, [modalsProps]);

  const getProducts = async () => {
    const data: IProductInCart[] | undefined = await getProductsCart();

    if (data) {
      setProducts(data);
    }
  };

  console.log(products);

  if (!products) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col justify-start">
      {products.length === 0 ? (
        <>
          <h2 className="text-lg font-semibold text-start mt-3 mb-5">
            Корзина
          </h2>

          <p className="text-sm text-center text-[#B3B3B3] font-semibold mb-3">
            Корзина пуста
          </p>
        </>
      ) : (
        <>
          <h1 className="text-lg font-semibold mt-3 mb-3">
            Оформление товаров
          </h1>

          <CartList products={products} />

          <FormByCart />
        </>
      )}
    </div>
  );
}

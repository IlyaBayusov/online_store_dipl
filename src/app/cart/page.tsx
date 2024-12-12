"use client";

import { getProductsCart } from "@/api";
import CartList from "@/components/Cart/CartList/CartList";
import FormByCart from "@/components/Forms/FormByCart/FormByCart";
import { modalCartDeleteProduct } from "@/constans";
import { IProductInCart } from "@/interfaces";
import { useCartStore } from "@/stores/useCartStore";
import { useModalStore } from "@/stores/useModalStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [products, setProducts] = useState<IProductInCart[]>([]);
  const { sum } = useCartStore();
  const { modalsProps } = useModalStore();

  const router = useRouter();

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

  return (
    <div className="container px-2.5">
      <div className="flex flex-col justify-start">
        <h1 className="text-lg font-semibold mt-3 mb-3">Оформление товаров</h1>

        {!products ? <h1>Loading...</h1> : <CartList products={products} />}

        <FormByCart />
      </div>
    </div>
  );
}

"use client";

import { getProductsCart } from "@/api";
import CartList from "@/components/Cart/CartList/CartList";
import FormByCart from "@/components/Forms/FormByCart/FormByCart";
import Loader from "@/components/Loader/Loader";
import { modalCartDeleteProduct } from "@/constans";
import { IPagination, IProductInCart } from "@/interfaces";
import { useCartStore } from "@/stores/useCartStore";
import { useModalStore } from "@/stores/useModalStore";
import React, { useEffect, useState } from "react";

export default React.memo(function Cart() {
  const [products, setProducts] = useState<IProductInCart[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { modalsProps } = useModalStore();
  const { updatedDataInCart, getCount } = useCartStore();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (modalsProps[modalCartDeleteProduct]?.isDeleted) {
      getProducts();
    }
  }, [modalsProps]);

  const getProducts = async () => {
    const data = await getProductsCart();

    if (data) {
      const products = data.data;
      const pagination = {
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      };

      setProducts(products);
      setPagination(pagination);

      updatedDataInCart(products, pagination);

      getCount(products.length);
    }
    setIsLoading(false);
  };

  const showElems = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (products.length !== 0 && products !== undefined) {
      return (
        <div className="lg:grid lg:grid-cols-[1fr,400px] lg:gap-8">
          <div className="lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
            <CartList products={products} />
          </div>
          <div className="mt-6 lg:mt-0 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
            <FormByCart />
          </div>
        </div>
      );
    }

    return (
      <p className="text-sm text-center text-[#B3B3B3] font-semibold mb-3">
        Корзина пуста
      </p>
    );
  };

  return (
    <div className="flex flex-col justify-start">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-start mt-3 mb-5">
        Корзина
      </h2>

      {showElems()}
    </div>
  );
});

"use client";

import { getProductAdmin } from "@/api";
import HeaderAdmin from "@/components/AdminPage/HeaderAdmin/HeaderAdmin";
import ProductsAdmin from "@/components/AdminPage/ProductsAdmin/ProductsAdmin";
import { useModalStore } from "@/stores/useModalStore";
import React, { useEffect, useState } from "react";

export default function AdminMenu() {
  const [products, setProducts] = useState([]);
  const { modals } = useModalStore();

  useEffect(() => {
    const getProducts = async () => {
      const data = await getProductAdmin();

      if (data) {
        setProducts(data);
        console.log(data);
      }
    };
    getProducts();
  }, [modals]);

  return (
    <div className="w-full absolute top-0 left-0 z-10">
      <HeaderAdmin />

      <div className="container ">
        {products && <ProductsAdmin products={products} />}
      </div>
    </div>
  );
}

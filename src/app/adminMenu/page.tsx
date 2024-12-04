"use client";

import { getProductAdmin } from "@/api";
import HeaderAdmin from "@/components/AdminPage/HeaderAdmin/HeaderAdmin";
import ProductsAdmin from "@/components/AdminPage/ProductsAdmin/ProductsAdmin";
import React, { useEffect, useState } from "react";

export default function AdminMenu() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getProductAdmin();

      if (data) {
        setProducts(data);
        console.log(data);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <HeaderAdmin />

      <div className="container ">
        {products && <ProductsAdmin products={products} />}
      </div>
    </>
  );
}

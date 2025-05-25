"use client";

import { getFav } from "@/api";
import Loader from "@/components/Loader/Loader";
import ProductCardList from "@/components/ProductCard/ProductCardList/ProductCardList";
import { paramsFavoritsProducts } from "@/constans";
import { IProductsCardBody } from "@/interfaces";
// import { mapToUnifiedProduct } from "@/utils";
import React, { useEffect, useState } from "react";

export default function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [favs, setFavs] = useState<IProductsCardBody[]>([]);

  useEffect(() => {
    const getFavsList = async () => {
      const data = await getFav();

      if (data) {
        const products = data.data; //const products = data.map(mapToUnifiedProduct);

        setFavs(products);
      }
      setIsLoading(false);
    };

    getFavsList();
  }, []);

  return (
    <>
      <div className="flex justify-start mt-3 mb-5">
        <h2 className="text-lg font-semibold">Избранные</h2>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <ProductCardList productsCard={favs} params={paramsFavoritsProducts} />
      )}
    </>
  );
}

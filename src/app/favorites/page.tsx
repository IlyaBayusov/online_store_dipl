"use client";

import { getFav } from "@/api";
import FavList from "@/components/Fav/FavList/FavList";
import Loader from "@/components/Loader/Loader";
import { IFavsGet } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [favs, setFavs] = useState<IFavsGet[]>([]);

  useEffect(() => {
    const getFavsList = async () => {
      const data: IFavsGet[] | undefined = await getFav();

      if (data !== undefined) {
        setFavs(data);
        setIsLoading(false);
      }
    };

    getFavsList();
  }, []);

  return isLoading ? <Loader /> : <FavList favs={favs} />;
}

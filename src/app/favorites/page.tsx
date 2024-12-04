"use client";

import { getFav } from "@/api";
import FavList from "@/components/Fav/FavList/FavList";
import { IFavsGet } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function Favorites() {
  const [favs, setFavs] = useState<IFavsGet[]>([]);

  useEffect(() => {
    const getFavsList = async () => {
      const data: IFavsGet[] | undefined = await getFav();

      if (data !== undefined) setFavs(data);
    };

    getFavsList();
  }, []);

  return <FavList favs={favs} />;
}

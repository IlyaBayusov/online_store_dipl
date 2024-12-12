"use client";

import { categories } from "@/constans";
import React from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import Link from "next/link";

export default function CategoryList() {
  //
  // ------------------- сделать табы
  //

  return (
    <div className="container px-2.5 pt-2.5">
      <div className="my-3 w-full grid grid-cols-2 grid-rows-2 gap-3">
        {categories.map((category) => (
          <Link key={category.id} href={category.urlName}>
            <CategoryItem name={category.name} img={category.img} />
          </Link>
        ))}
      </div>
    </div>
  );
}

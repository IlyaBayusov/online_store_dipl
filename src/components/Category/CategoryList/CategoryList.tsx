"use client";

import { categories, categoriesPages } from "@/constans";
import React from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import Link from "next/link";
import { useCategoryStore } from "@/stores/useCategoryStore";

export default function CategoryList() {
  const { updateCategory } = useCategoryStore();

  //
  // ------------------- сделать табы
  //

  return (
    <div className="container px-3">
      <div className="my-3 w-full grid grid-cols-2 grid-rows-2 gap-3">
        {categories.map((category) =>
          category.next?.map((subCategory) => (
            <Link
              key={subCategory.id}
              href={subCategory.urlName}
              onClick={() => updateCategory(category.name.toLowerCase())}
            >
              <CategoryItem
                id={subCategory.id}
                name={subCategory.name}
                img={subCategory.img}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

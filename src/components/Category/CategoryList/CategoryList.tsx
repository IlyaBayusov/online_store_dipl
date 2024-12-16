"use client";

import { categories } from "@/constans";
import React, { useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import Link from "next/link";
import { ICatalog } from "@/interfaces";
import { useRouter } from "next/navigation";

export default function CategoryList() {
  const [selectedCategoryNextSecond, setSelectedCategoryNextSecond] = useState<
    ICatalog[]
  >([]);
  const [selectedCategoryNextThird, setSelectedCategoryNextThird] = useState<
    ICatalog[]
  >([]);

  const [isTranslatedX, setIsTranslatedX] = useState<string>("");

  const router = useRouter();

  const handleClickFirst = (category: ICatalog) => {
    if (category.next) {
      setSelectedCategoryNextSecond(category.next);
      setIsTranslatedX(" -translate-x-[100vw]");
    }
  };

  const handleClickSecond = (category: ICatalog) => {
    if (category.next) {
      setSelectedCategoryNextThird(category.next);
      setIsTranslatedX(" -translate-x-[200vw]");
    }
  };

  const handleClickThird = (category: ICatalog) => {
    router.push(`/${category.urlName}`);
  };

  return (
    <>
      <div className="-ml-2.5">
        <div
          className={
            "flex flex-row items-center transition-transform duration-500 overflow-hidden w-[400vh]" +
            isTranslatedX
          }
        >
          <div className="my-3 px-2.5 w-screen grid grid-cols-2 grid-rows-2 gap-3">
            {categories.map((category, index) => {
              return (
                <button key={index} onClick={() => handleClickFirst(category)}>
                  <CategoryItem name={category.name} img={category.img} />
                </button>
              );
            })}
          </div>

          <div className="my-3 px-2.5 w-screen grid grid-cols-2 grid-rows-2 gap-3">
            {selectedCategoryNextSecond.map((category, index) => {
              return (
                <button key={index} onClick={() => handleClickSecond(category)}>
                  <CategoryItem name={category.name} img={category.img} />
                </button>
              );
            })}
          </div>

          <div className="my-3 px-2.5 w-screen grid grid-cols-2 grid-rows-2 gap-3">
            {selectedCategoryNextThird.map((category, index) => {
              return (
                <Link
                  href={category.urlName}
                  key={index}
                  onClick={() => handleClickThird(category)}
                >
                  <CategoryItem name={category.name} img={category.img} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* <div className="my-3 w-full grid grid-cols-2 grid-rows-2 gap-3">
        {categories.map((category) => (
          // <Link key={category.id} href={category.urlName}>
          <CategoryItem
            key={category.id}
            name={category.name}
            img={category.img}
          />
          // </Link>
        ))}

        <div className="h-full w-screen px-2.5 pt-2.5">
          <div className="my-3 w-full grid grid-cols-2 grid-rows-2 gap-3">
            {categories.map((category) => {
              return (
                <Link key={category.id} href={category.urlName}>
                  <CategoryItem
                    key={category.id}
                    name={category.name}
                    img={category.img}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="h-full w-screen px-2.5 pt-2.5">
          <div className="h-full w-full hide-scrollbar-y overflow-y-auto">
            {categories.map((category) => {
              return (
                <Link key={category.id} href={category.urlName}>
                  <CategoryItem
                    key={category.id}
                    name={category.name}
                    img={category.img}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div> */}
    </>
  );
}

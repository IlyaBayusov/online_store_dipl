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

  const [isPrev, setIsPrev] = useState<boolean>(false);
  const [num, setNum] = useState<number>(0);

  const [isTranslatedX, setIsTranslatedX] = useState<string>("");

  const router = useRouter();

  const handleClickFirst = (category: ICatalog) => {
    if (category.next) {
      setSelectedCategoryNextSecond(category.next);
      setIsTranslatedX(" -translate-x-[100vw]");
      setIsPrev(true);
      setNum(2);
    }
  };

  const handleClickSecond = (category: ICatalog) => {
    if (category.next) {
      setSelectedCategoryNextThird(category.next);
      setIsTranslatedX(" -translate-x-[200vw]");
      setIsPrev(true);
      setNum(3);
    }
  };

  const handleClickThird = (category: ICatalog) => {
    router.push(`/${category.urlName}`);
    setIsPrev(true);
  };

  const handleClickPrev = () => {
    if (num === 2) {
      setIsTranslatedX(" -translate-x-[0vw]");
      setIsPrev(false);
      setNum(1);
    } else if (num === 3) {
      setIsTranslatedX(" -translate-x-[100vw]");
      setIsPrev(true);
      setNum(2);
    } else {
      setIsPrev(false);
    }
  };

  return (
    <>
      <div className="relative mt-3 w-full flex justify-end">
        <button
          className={
            "absolute top-0 right-0 z-50 px-3 py-0.5 text-xs text-greenT border border-greenT rounded-md" +
            (isPrev
              ? " opacity-100 pointer-events-auto"
              : " opacity-0 pointer-events-none")
          }
          onClick={handleClickPrev}
        >
          Назад
        </button>
      </div>

      <div className="-ml-2.5">
        <div
          className={
            "flex flex-row items-center transition-transform duration-500 overflow-hidden w-[400vh]" +
            isTranslatedX
          }
        >
          <div className="my-3 px-2.5 w-screen grid grid-cols-2 grid-rows-1 gap-3">
            {categories.map((category, index) => {
              return (
                <button key={index} onClick={() => handleClickFirst(category)}>
                  <CategoryItem name={category.name} img={category.img} />
                </button>
              );
            })}
          </div>

          <div className="my-3 px-2.5 w-screen grid grid-cols-2 grid-rows-1 gap-3">
            {selectedCategoryNextSecond.map((category, index) => {
              return (
                <button key={index} onClick={() => handleClickSecond(category)}>
                  <CategoryItem name={category.name} img={category.img} />
                </button>
              );
            })}
          </div>

          <div className="my-3 px-2.5 w-screen grid grid-cols-2 grid-rows-1 gap-3">
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

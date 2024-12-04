import Link from "next/link";
import React from "react";
import NewArrivalsItem from "../NewArrivalsItem/NewArrivalsItem";
import { IProductCategory } from "@/interfaces";

type Props = { newArrivals: IProductCategory[] };

export default function NewArrivalsList({ newArrivals }: Props) {
  return (
    <div className="container px-3">
      <div className="flex justify-center mt-3 mb-5">
        <h2 id="subTitleLine" className="relative uppercase font-medium">
          Новые поступления
        </h2>
      </div>
      <div className="my-2 w-full grid grid-cols-2 gap-3">
        {newArrivals &&
          newArrivals.map((arrival) => (
            <Link
              key={arrival.productId}
              href={`/${arrival.categoryName}/${arrival.productId}`}
            >
              <NewArrivalsItem arrival={arrival} />
            </Link>
          ))}
      </div>
    </div>
  );
}

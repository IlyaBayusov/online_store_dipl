import React from "react";

type Props = {};

export default function Nav({}: Props) {
  return (
    <div className="w-full py-2 bg-[#0F0F0F]">
      <div className="container px-2">
        <nav className="flex justify-center items-center">
          <ul className="flex justify-between items-center w-full text-sm">
            <li className="">New</li>
            <li className="">Clothes</li>
            <li className="">Shoes</li>
            <li className="">Sale</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

"use client";

import { useCartStore } from "@/stores/useCartStore";
import React, { useEffect } from "react";
import { RiShoppingBasketLine, RiShoppingBasketFill } from "react-icons/ri";

type Props = {
  isActiveCart: boolean;
  handleClickCallBack: () => Promise<void>;
};

export default React.memo(
  function CartBtn({ isActiveCart, handleClickCallBack }: Props) {
    const { getProductsInCart } = useCartStore();

    useEffect(() => {
      getProductsInCart();
    }, [isActiveCart]);

    return (
      <button
        className={
          "flex justify-center items-center gap-1 mt-3 py-2 px-4 w-full rounded-md transition-all" +
          (isActiveCart
            ? " bg-white text-greenT outline outline-1 outline-greenT"
            : " bg-greenT text-white")
        }
        onClick={handleClickCallBack}
      >
        {isActiveCart ? (
          <>
            <p className="text-sm">В корзине</p>
            <RiShoppingBasketFill className="h-5 w-5" />
          </>
        ) : (
          <>
            <p className="text-sm">Купить</p>
            <RiShoppingBasketLine className="h-5 w-5" />
          </>
        )}
      </button>
    );
  },

  (prevProps, nextProps) => {
    if (prevProps.isActiveCart !== nextProps.isActiveCart) {
      return false;
    } else {
      return true;
    }
  }
);

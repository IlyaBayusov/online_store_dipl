import { IProductInCart } from "@/interfaces";

const UNAVAILABLE_PRODUCTS_KEY = "unavailable_products";

export const saveUnavailableProducts = (products: IProductInCart[]) => {
  localStorage.setItem(UNAVAILABLE_PRODUCTS_KEY, JSON.stringify(products));
};

export const getUnavailableProducts = (): IProductInCart[] => {
  const products = localStorage.getItem(UNAVAILABLE_PRODUCTS_KEY);
  return products ? JSON.parse(products) : [];
};

export const clearUnavailableProducts = () => {
  localStorage.removeItem(UNAVAILABLE_PRODUCTS_KEY);
};

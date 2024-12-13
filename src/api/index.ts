import { api } from "@/axios";
import {
  IGetFav,
  IOrderPost,
  IOrdersGet,
  IPostFav,
  IProductInCart,
} from "@/interfaces";
import { decodeToken } from "@/utils";

export const getProductsCart = async () => {
  try {
    const decodedToken = decodeToken();

    if (!decodedToken) {
      console.log("Токен не найден или недействителен");
      return;
    }

    const response = await api.get(`/v1/cart/${decodedToken.id}`);
    const data: IProductInCart[] = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения товаров из корзины: ", error);
  }
};

export const postByProducts = async (order: IOrderPost) => {
  try {
    const response = await api.post(`/v1/orders`, order);

    return response;
  } catch (error) {
    console.error("Ошибка оформления заказа: ", error);
  }
};

export const putProductCart = async (
  product: IProductInCart,
  updateQuantity: number
) => {
  try {
    const response = await api.put(`/v1/cart/${product.cartItemId}`, {
      ...product,
      quantity: updateQuantity,
    });

    return response;
  } catch (error) {
    console.error("Ошибка изменения кол-ва товара в корзине: ", error);
  }
};

export const getOrders = async () => {
  try {
    const decodedToken = decodeToken();

    if (!decodedToken) {
      console.log("Токен не найден или недействителен");
      return;
    }

    const response = await api.get(`/v1/orders/${decodedToken.id}`);
    const data: IOrdersGet[] = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения товаров из корзины: ", error);
  }
};

export const postFav = async (fav: IPostFav) => {
  try {
    const response = await api.post(`/v1/favorites`, fav);

    return response;
  } catch (error) {
    console.error("Ошибка добавления в избранные: ", error);
  }
};

export const getFav = async () => {
  try {
    const decodedToken = decodeToken();

    if (!decodedToken) {
      console.log("Токен не найден или недействителен");
      return;
    }

    const response = await api.get(`/v1/favorites/${decodedToken.id}`);
    const data: IGetFav[] = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения избранных: ", error);
  }
};

export const postProductAdmin = async (product: FormData) => {
  try {
    const response = await api.post(`/v1/products`, product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error("Ошибка добавления товара в админке: ", error);
  }
};

export const getProductAdmin = async () => {
  try {
    const response = await api.get(`/v1/products/admin`);
    const data = await response.data.products;

    return data;
  } catch (error) {
    console.error("Ошибка получения товара в админке: ", error);
  }
};

export const postCount = async (productId: number) => {
  try {
    const response = await api.post(`/v1/products/count`, { productId });
    const data: { productCount: number } = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения количества товара: ", error);
  }
};

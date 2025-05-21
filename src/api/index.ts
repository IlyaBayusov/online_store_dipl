import { api } from "@/axios";
import { sizePaginationProductsInAdmin } from "@/constans";
import {
  IFormDataProfileUserInfo,
  IOrderPost,
  IPostFav,
  IProductInCart,
} from "@/interfaces";
import { decodeToken } from "@/utils";
import axios from "axios";

export const getProductsCart = async () => {
  try {
    const decodedToken = decodeToken();

    if (!decodedToken) {
      console.log("Токен не найден или недействителен");
      return;
    }

    const response = await api.get(`/v1/cart/${decodedToken.id}`);
    const data = await response.data;

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

    return response.data;
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
    const data = await response.data;

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
    const data = await response.data;

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
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 409) {
        return { message: "Товар с таким названием уже существует" };
      }

      return { message: "Ошибка при добавлении товара" };
    }

    console.error("Ошибка добавления товара в админке: ", error);
    return { message: "Неизвестная ошибка" };
  }
};

export const getProductAdmin = async (page: number) => {
  try {
    const response = await api.get(
      `/v1/products/admin?size=${sizePaginationProductsInAdmin}&page=${page}`
    );
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения товара в админке: ", error);
  }
};

export const postCount = async (productId: number) => {
  try {
    const response = await api.post(`/v1/products/count`, { productId });
    const data: { productCount: number } = await response.data;
    console.log(data);

    return data;
  } catch (error) {
    console.error("Ошибка получения количества товара: ", error);
  }
};

export const postEnableProductAdmin = async (
  productId: number,
  enable: boolean
) => {
  try {
    const response = await api.post(`/v1/products/enable/${productId}`, {
      enable: String(enable).toUpperCase(),
    });

    return response;
  } catch (error) {
    console.error("Ошибка вкл./выкл. товара: ", error);
  }
};

export const getUsersAdmin = async () => {
  try {
    const response = await api.get(`/v1/users`);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения пользователей в админке: ", error);
  }
};

export const putUserRoleAdmin = async (userId: number, role: string) => {
  try {
    const response = await api.put(`/v1/users/role/${userId}`, {
      role,
    });
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка изменения роли пользователя: ", error);
  }
};

export const getOrdersAdmin = async () => {
  try {
    const response = await api.get(`/v1/orders?size=10`);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения товаров из корзины: ", error);
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get(`/v1/categories`);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения категорий: ", error);
  }
};

export const getSearchAdmin = async (search: string) => {
  try {
    const response = await api.get(
      `/v1/products/admin?search=${search}&size=${sizePaginationProductsInAdmin}`
    );
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения поиска: ", error);
  }
};

export const getUserInfoInProfile = async (userId: number) => {
  try {
    if (userId) {
      const response = await api.get(`/v1/users/${userId}`);
      const data = await response.data;

      return data;
    }

    throw "Неверный id";
  } catch (error) {
    if (typeof error === "string") {
      console.error(error);
    } else if (error instanceof Error) {
      console.error("Ошибка получения инфо о юзере по айди в профиле: ", error);
    } else {
      console.error("Неизвестная ошибка");
    }
  }
};

export const putUserInfoInProfile = async (data: IFormDataProfileUserInfo) => {
  try {
    if (!decodeToken()?.id) {
      throw "Не найден id";
    }

    const response = await api.put(`/v1/users/${decodeToken()?.id}`, data);
    const dataP = await response.data;

    return dataP;
  } catch (error) {
    if (typeof error === "string") {
      console.error(error);
    } else if (error instanceof Error) {
      console.error("Ошибка изменения инфо о юзере по айди в профиле: ", error);
    } else {
      console.error("Неизвестная ошибка");
    }
  }
};

export const putUserEmailInProfile = async (data: {
  newEmail: string;
  code: string;
}) => {
  try {
    if (!decodeToken()?.id) {
      throw "Не найден id";
    }

    const response = await api.put(
      `/v1/users/email/${decodeToken()?.id}`,
      data
    );

    return response;
  } catch (error) {
    if (typeof error === "string") {
      console.error(error);
    } else if (error instanceof Error) {
      console.error("Ошибка изменения почты юзера по айди в профиле: ", error);
    } else {
      console.error("Неизвестная ошибка");
    }
  }
};

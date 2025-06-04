import { api } from "@/axios";
import { sizePage, sizePaginationProductsInAdmin } from "@/constans";
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

export const getOrders = async (page = 0, size = 10, sortField = "id,desc") => {
  try {
    const decodedToken = decodeToken();

    if (!decodedToken) {
      console.log("Токен не найден или недействителен");
      return;
    }

    const response = await api.get(
      `/v1/orders/${decodedToken.id}?page=${page}&size=${size}&sortField=${sortField}`
    );
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения заказов: ", error);
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

export const getFav = async (page = 0, size = sizePage, sort = "id,desc") => {
  try {
    const decodedToken = decodeToken();

    if (!decodedToken) {
      console.log("Токен не найден или недействителен");
      return;
    }

    const response = await api.get(
      `/v1/favorites/${decodedToken.id}?page=${page}&size=${size}&sort=${sort}`
    );
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения избранных: ", error);
    throw error;
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
      `/v1/products/admin?size=${sizePage}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка получения товара в админке: ", error);
    return null;
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
    console.error("ERROR ENABLE PRODUCT", error);
  }
};

export const getUsersAdmin = async (params?: {
  page?: number;
  size?: number;
  search?: string;
  sort?: string;
}) => {
  try {
    const response = await api.get(`/v1/users`, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? sizePage,
        search: params?.search ?? "",
        sort: params?.sort ?? "id,asc",
      },
    });
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения пользователей в админке: ", error);
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

export const getOrdersAdmin = async (params?: {
  page?: number;
  size?: number;
  sort?: string;
}) => {
  try {
    const response = await api.get(`/v1/orders`, {
      params: {
        page: params?.page ?? 0,
        size: params?.size ?? sizePage,
        sort: params?.sort ?? "id,desc",
      },
    });
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения заказов в админке: ", error);
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
      `/v1/products/admin?search=${search}&size=${sizePage}`
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

export const getViewed = async () => {
  try {
    const decodedToken = decodeToken();

    if (!decodedToken?.id) {
      console.log("Токен не найден или недействителен");
      return;
    }

    const response = await api.get(`/v1/viewed/${decodedToken.id}`);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Ошибка получения просмотренных товаров: ", error);
  }
};

export const putOrderStatus = async (orderId: number, status: string) => {
  try {
    const response = await api.put(`/v1/orders/status/${orderId}`, {
      status: status.toUpperCase(),
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка изменения статуса заказа:", error);
    throw error;
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const response = await api.delete(`/v1/products/${productId}`);
    return response;
  } catch (error) {
    console.error("Ошибка удаления товара:", error);
    throw error;
  }
};

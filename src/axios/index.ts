import { IPutUserPassInProfile } from "@/interfaces";
import { decodeToken } from "@/utils";
import axios from "axios";

// Типизация для refreshSubscribers
type RefreshSubscriber = (accessToken: string) => void;

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: RefreshSubscriber[] = []; // Явно указываем тип

const subscribeTokenRefresh = (callback: RefreshSubscriber) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response ? error.response.status : null;

    console.log("статус:", statusCode, "ошибка: ", error);

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) {
            console.log("Refresh token не найден, перенаправляем на /auth");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.replace("/auth");
            return Promise.reject(new Error("No refresh token"));
          }

          const response = await api.post("/auth/refresh", { refreshToken });

          console.log("Ответ от обновления токена: ", response.data);

          const data = response.data;

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          onRefreshed(data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.log("ТЕСТ 2");

          console.error("Ошибка при обновлении токена:", refreshError);

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          console.log("Ошибка при обновлении токена, перенаправляем на /auth");
          window.location.replace("/auth");
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve) => {
          subscribeTokenRefresh((accessToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(api(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

export const getSendCodeOnEmail = async (email: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/verification?email=${email}`
    );

    return response;
  } catch (error) {
    console.log("Ошибка отправки запроса на подтверждение кода", error);
  }
};

export const putUserPassInProfile = async (
  newPassData: IPutUserPassInProfile
) => {
  try {
    const decoded = decodeToken();

    if (!decoded?.id) {
      throw "Не найден id";
    }

    const response = await axios.put(
      `http://localhost:8080/api/v1/users/${decoded.id}/password`,
      newPassData
    );

    return response;
  } catch (error) {
    if (typeof error === "string") {
      console.error(error);
    } else if (error instanceof Error) {
      console.error(
        "Ошибка изменения пароля юзера по почте в профиле: ",
        error
      );
    } else {
      console.error("Неизвестная ошибка");
    }
  }
};

export const getProductsMainPage = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/products");
    const data = await response.data;

    return data;
  } catch (error) {
    console.log("Ошибка отправки запроса получения продуктов, главная", error);
  }
};

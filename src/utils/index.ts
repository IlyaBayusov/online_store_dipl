import { categoriesList } from "@/constans";
import {
  IDecodedToken,
  IFavsGet,
  IOrdersGet,
  IProductCategory,
  IProductsCardBody,
} from "@/interfaces";
import { jwtDecode } from "jwt-decode";
import { notFound } from "next/navigation";

export const decodeToken = (): IDecodedToken | null => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("accessToken");

  if (!token) {
    return null;
  }

  try {
    const decoded: IDecodedToken = jwtDecode(token);

    if (!decoded) {
      return null;
    }

    return decoded;
  } catch (error) {
    window.location.href = "http://localhost:3000/auth";
    console.log("Ошибка декодирования токена: ", error);

    return null;
  }
};

export function getCodeColor(color: string) {
  switch (color.toLowerCase()) {
    case "белый":
      return "#f0f0f0";
    case "черный":
      return "#333333";
    case "коричневый":
      return "#a0522d";
    case "бежевый":
      return "#e0d4b0";
    case "серый":
      return "#a9a9a9";
    case "темно-синий":
      return "#191970";
    case "зеленый":
      return "#6b8e23";
    case "синий":
      return "#4682b4";
    case "голубой":
      return "#87cefa";
    case "бордовый":
      return "#800020";
    case "черно-серый":
      return "#555555";
    default:
      return "#cccccc";
  }
}

export function getStatusRu(status: string) {
  switch (status.toLowerCase()) {
    case "created":
      return { value: "Создан", color: "#eab308" };
    case "en_route":
      return { value: "В пути", color: "#f97316" };
    case "completed":
      return { value: "Доставлен", color: "#2cb708" };
    case "canceled":
      return { value: "Отменён", color: "#dc2626" };
    default:
      return { value: "В обработке", color: "#6b7280" };
  }
}

export function getPaymentMethod(method: string) {
  switch (method.toLowerCase()) {
    case "cash":
      return "Наличными курьеру";

    case "card":
      return "Картой";

    default:
      break;
  }
}

export function getCategoryRu(category: string) {
  const categoryRu = categoriesList.find((item) => {
    if (item.url_name.toLocaleLowerCase() === category.toLowerCase())
      return item;
  });

  if (!categoryRu) return notFound();

  return categoryRu;
}

export function getDate(utcDate: string) {
  const date = new Date(utcDate);

  return `${String(date.getDate()).padStart(2, "0")}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${date.getFullYear()}`;
}

export function mapToUnifiedProduct(
  data: IProductCategory | IOrdersGet | IFavsGet
): IProductsCardBody {
  return {
    productId: data.productId,
    categoryName: data.categoryName,
    name:
      (data as IProductCategory).name ||
      (data as IFavsGet | IOrdersGet).productName,
    image: data.image,
    price: (data as IProductCategory | IOrdersGet).price,
    quantity: (data as IOrdersGet).quantity,
    status: (data as IOrdersGet).status || "",
  };
}

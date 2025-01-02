import { StaticImageData } from "next/image";

export interface ICatalog {
  id: number;
  name: string;
  urlName: string;
  img: StaticImageData;
  next?: ICatalog[];
}

export interface IProductCategory {
  productId: number;
  categoryName: string;
  name: string;
  image: string;
  price: number;
}

export interface IProductInfo {
  categoryName: string;
  groupId: number;
  id: number;
  name: string;
  color: string;
  isActive: boolean;
  description: string;
  price: number;
  quantities: number;
  images: string[];
  characteristics: string;
}

export interface IDecodedToken {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roles: string;
  sub: string;
  exp: number;
}

export interface IProductInCart {
  cartItemId: number;
  categoryName: string;
  productId: number;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  characteristics: string;
}

export interface IOrderDetails {
  userId: number;
  totalPrice: number;
  address: string;
  apartment: string;
  floor: string;
  entrance: string;
  comment: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  paymentMethod: string;
}

export interface IOrderPost {
  orderDetailsRequest: IOrderDetails;
  orderItemRequest: IProductInCart[];
}

export interface IOrdersGet {
  productId: number;
  categoryName: string;
  productName: string;
  image: string;
  price: number;
  characteristics: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  status: string;
}

export interface IFavsGet {
  favoriteId: number;
  productId: number;
  categoryName: string;
  productName: string;
  image: string;
}

export interface ICategory {
  id: number;
  name: string;
  url_name: string;
}

export interface IPostFav {
  userId: number;
  productId: number;
}

export interface IGetFav {
  favoriteId: number;
  productId: number;
  categoryName: string;
  productName: string;
  image: string;
}

export interface IProductCharacteristics {
  [key: string]: string;
}

export interface IPostNewProduct {
  categoryName: string;
  groupId: null;
  name: string;
  color: string;
  description: string;
  price: number;
  characteristics: string;
  quantities: number;
}

export interface IPagination {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IProductsCardParams {
  page: string;
  btnCart: boolean;
  btnFav: boolean;
  markTitle: boolean;
  status: boolean;
  quantity: boolean;

  // grid_cols: number;
  // grid_rows: number;
}

export interface IProductsCardBody {
  productId: number;
  categoryName: string;
  name: string;
  image: string;
  price?: number;
  cartItemId?: number;
  favoriteId?: number;
  orderId?: number;
  quantity?: number;
}

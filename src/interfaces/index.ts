import { StaticImageData } from "next/image";
// import { C_mobilePhones } from "./characteristics";

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
  orderItems: IOrderItems[];
  pagination: IPagination;
}

export interface IProductsInOrder {
  orderId: number;
  productId: number;
  categoryName: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IOrderItems {
  orders: IProductsInOrder[];

  totalPrice: number;
  status: string;
  paymentMethod: string;
  buysIn: string;
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

export interface IPostFormDataNewProduct {
  product: IPostNewProduct;
  // files: File[];
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
  pageSize: number;
}

export interface IProductsCardParams {
  page: string;
  btnCart: boolean;
  btnFav: boolean;
  markTitle: boolean;
  status: boolean;
  quantity: boolean;
  price: boolean;

  // grid_cols: number;
  // grid_rows: number;
}

export interface IProductsCardBody {
  productId: number;
  categoryName: string;
  name: string;
  image: string;
  brand?: string;
  price?: number;
  cartItemId?: number;
  favoriteId?: number;
  orderId?: number;
  quantity?: number;
  status?: string;
}

export interface IGetUserAdmin {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
}

export interface IFormDataRegistr {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  secondPassword: string;
}

export interface IFormByAuth {
  username: string;
  password: string;
}

export interface IFormByAuthForgotPass {
  email: string;
  code: string;
}

export interface IFormByAuthFPReset {
  newPassword: string;
  secondPassword: string;
}

export interface ICategories {
  id: number;
  name: string;
  urlName: string;
}

export interface IGetUserInfoInProfile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface IFormDataProfileUserInfo {
  firstName: string;
  lastName: string;
  username: string;
}

export interface IFormNewPassInProfile {
  newPassword: string;
  secondNewPassword: string;
  code: string;
}

export interface IPutUserPassInProfile {
  password: string;
}

export interface IGetUserInfoInProfile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

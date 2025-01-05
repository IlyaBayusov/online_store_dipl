import img_shoes from "../../public/main/category/img_shoes.png";
import img_categoryBig from "../../public/main/category/img_categoryBig.png";
import img_household from "../../public/main/category/img_household.png";
import img_books from "../../public/main/category/img_books.png";
import img_eat from "../../public/main/category/img_eat.png";
import img_test_shoes1 from "../../public/testImg/img_test_shoes1.png";
import { ICatalog, IProductsCardParams } from "@/interfaces";

export const mainPage = "/";
export const cartPage = "/cart";
export const favPage = "/favorites";
export const ordersPage = "/orders";
export const profilePage = "/profile";
export const categoryListPages = "products";

export const modalsCatalog = "modalsCatalog";
export const modalNav = "modalNav";
export const modalNavCategory = "modalNavCategory";
export const modalCartDeleteProduct = "modalCartDeleteProduct";
export const modalSuccessOrder = "modalSuccessOrder";
export const modalNewProductAdmin = "modalNewProductAdmin";
export const modalDeleteEditNewProduct = "modalDeleteEditNewProduct";

export const sizeProducts = 2;

export const nameTitlePopularProducts = "Новинки";
export const nameTitleFavoritsProducts = "Избранные";

export const messageCount = "Нет на складе";

export const paramsPopularProducts = {
  page: mainPage,
  btnCart: true,
  btnFav: true,
  markTitle: true,
  status: false,
  quantity: false,
  price: true,
} as IProductsCardParams;

export const paramsFavoritsProducts = {
  page: favPage,
  btnCart: true,
  btnFav: true,
  markTitle: false,
  status: false,
  quantity: false,
  price: false,
} as IProductsCardParams;

export const paramsOrdersProducts = {
  page: ordersPage,
  btnCart: true,
  btnFav: false,
  markTitle: false,
  status: true,
  quantity: true,
  price: true,
} as IProductsCardParams;

export const paramsProductsCategoryProducts = {
  page: categoryListPages,
  btnCart: true,
  btnFav: true,
  markTitle: false,
  status: false,
  quantity: false,
  price: true,
} as IProductsCardParams;

export const categoriesPages = [
  {
    id: 1,
    name: "Мобильные телефоны",
    urlName: "mobile_phones",
    img: img_shoes,
    path: "/mobile_phones",
  },
];

export const categories: ICatalog[] = [
  {
    id: 1,
    name: "Электроника",
    urlName: "electronics",
    img: img_categoryBig,
    next: [
      {
        id: 1,
        name: "Мобильные телефоны и аксессуары",
        urlName: "mobiles_acc",
        img: img_categoryBig,
        next: [
          {
            id: 1,
            name: "Мобильные телефоны",
            urlName: "mobile_phones",
            img: img_categoryBig,
          },
          {
            id: 2,
            name: "Кнопочные телефоны",
            urlName: "feature_phones",
            img: img_categoryBig,
          },
          {
            id: 1,
            name: "Наушники",
            urlName: "headphones",
            img: img_categoryBig,
          },
          {
            id: 2,
            name: "Фитнес браслеты",
            urlName: "fitness_bracelets",
            img: img_categoryBig,
          },
        ],
      },
      {
        id: 2,
        name: "Телевидение и видео",
        urlName: "tv_video",
        img: img_categoryBig,
      },
      {
        id: 1,
        name: "Планшеты, электронные книги",
        urlName: "tablets_e-readers",
        img: img_categoryBig,
      },
      {
        id: 2,
        name: "Наушники и аудиотехника",
        urlName: "headphones_audio-equipmen",
        img: img_categoryBig,
      },
    ],
  },
  {
    id: 2,
    name: "Бытовая техника",
    urlName: "household",
    img: img_household,
    next: [
      {
        id: 1,
        name: "Холодильники",
        urlName: "holod",
        img: img_household,
      },
      {
        id: 2,
        name: "Плиты",
        urlName: "pliti",
        img: img_household,
      },
    ],
  },
  {
    id: 3,
    name: "Книги, хобби, канцелярия",
    urlName: "books",
    img: img_books,
    next: [
      {
        id: 1,
        name: "Художественная литература",
        urlName: "hudojlit",
        img: img_books,
      },
      {
        id: 2,
        name: "Научная литература",
        urlName: "nauchlit",
        img: img_books,
      },
    ],
  },
  {
    id: 4,
    name: "Продукты питания",
    urlName: "eat",
    img: img_eat,
    next: [
      {
        id: 1,
        name: "Кофе",
        urlName: "coffee",
        img: img_eat,
      },
      {
        id: 2,
        name: "Молоко",
        urlName: "milk",
        img: img_eat,
      },
    ],
  },
];

export const categoriesList = [
  { id: 1, name: "Мобильные телефоны", url_name: "mobile_phones" },
  { id: 2, name: "Холодильники", url_name: "holod" },
  { id: 3, name: "Художественная литература", url_name: "hudojlit" },
  { id: 4, name: "Чипсы", url_name: "chipsi" },
  { id: 5, name: "Кофе", url_name: "coffee" },
];

export const newArrivals = [
  {
    id: 1,
    name: "TYROLEAN SNEAKERS",
    img: img_test_shoes1,
    price: "59 руб",
  },
  {
    id: 2,
    name: "TYROLEAN SNEAKERS",
    img: img_test_shoes1,
    price: "59 руб",
  },
  {
    id: 3,
    name: "TYROLEAN SNEAKERS",
    img: img_test_shoes1,
    price: "59 руб",
  },
  {
    id: 4,
    name: "TYROLEAN SNEAKERS",
    img: img_test_shoes1,
    price: "59 руб",
  },
  {
    id: 5,
    name: "TYROLEAN SNEAKERS",
    img: img_test_shoes1,
    price: "59 руб",
  },
  {
    id: 6,
    name: "TYROLEAN SNEAKERS",
    img: img_test_shoes1,
    price: "59 руб",
  },
];

export const colors = [
  { name: "Белый", value: "#f0f0f0" },
  { name: "Черный", value: "#333333" },
  { name: "Коричневый", value: "#a0522d" },
  { name: "Бежевый", value: "#e0d4b0" },
  { name: "Серый", value: "#a9a9a9" },
  { name: "Темно-синий", value: "#191970" },
  { name: "Зеленый", value: "#6b8e23" },
  { name: "Синий", value: "#4682b4" },
  { name: "Голубой", value: "#87cefa" },
  { name: "Бордовый", value: "#800020" },
  { name: "Черно-серый", value: "#555555" },
];

// export const selectCategoryies = [
//   { name: "Мобильные телефоны", value: "mobile_phones" },
// ];

export const selectCategoryies = [
  { name: "Мобильные телефоны", value: "mobile_phones" },
  { name: "Холодильники", value: "holod" },
  { name: "Художественная литература", value: "hudojlit" },
  { name: "Кофе", value: "coffee" },
];

export const selectSiziesCloth = [
  { name: "44" },
  { name: "46" },
  { name: "48" },
  { name: "50" },
  { name: "52" },
  { name: "54" },
  { name: "56" },
  { name: "58" },
  { name: "60" },
  { name: "62" },
  { name: "64" },
];

export const selectSiziesShoes = [
  { name: "39" },
  { name: "40" },
  { name: "41" },
  { name: "42" },
  { name: "43" },
  { name: "44" },
  { name: "45" },
  { name: "46" },
];

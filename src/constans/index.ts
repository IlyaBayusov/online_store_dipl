import img_shoes from "../../public/main/category/img_shoes.png";
import img_categoryBig from "../../public/main/category/img_categoryBig.png";
import img_household from "../../public/main/category/img_household.png";
import img_books from "../../public/main/category/img_books.png";
import img_eat from "../../public/main/category/img_eat.png";
import img_test_shoes1 from "../../public/testImg/img_test_shoes1.png";

export const mainPage = "/";
export const cartPage = "/cart";
export const favPage = "/favorites";
export const ordersPage = "/orders";
export const profilePage = "/profile";

export const modalNav = "modalNav";
export const modalNavCategory = "modalNavCategory";
export const modalCartDeleteProduct = "modalCartDeleteProduct";
export const modalSuccessOrder = "modalSuccessOrder";
export const modalNewProductAdmin = "modalNewProductAdmin";
export const modalDeleteEditNewProduct = "modalDeleteEditNewProduct";

export const nameTitlePopularProducts = "Популярные товары";

// Chelsea - id - 1
// Sneakers - id - 2
// Pants - id - 3
// Shirts - id -4
// Ties - id - 5
// Belts - id - 6

export const categoriesPages = [
  {
    id: 1,
    name: "Брюки",
    urlName: "trousers",
    img: img_shoes,
    path: "/trousers",
  },
  {
    id: 2,
    name: "Рубашки",
    urlName: "shirts",
    img: img_shoes,
    path: "/shirts",
  },
  {
    id: 3,
    name: "Кеды",
    urlName: "sneakers",
    img: img_shoes,
    path: "/sneakers",
  },
  {
    id: 4,
    name: "Челси",
    urlName: "chelsea",
    img: img_shoes,
    path: "/chelsea",
  },
  {
    id: 5,
    name: "Галстуки",
    urlName: "ties",
    img: img_shoes,
    path: "/ties",
  },
  {
    id: 6,
    name: "Ремни",
    urlName: "belts",
    img: img_shoes,
    path: "/belts",
  },
];

export const categories = [
  {
    id: 1,
    name: "Электроника",
    urlName: "electronics",
    img: img_categoryBig,
    next: [
      {
        id: 1,
        name: "Мобильные телефоны и планшеты",
        urlName: "mobiles",
        img: img_shoes,
      },
      {
        id: 2,
        name: "Рубашки",
        urlName: "shirts",
        img: img_shoes,
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
        name: "Брюки",
        urlName: "trousers",
        img: img_shoes,
      },
      {
        id: 2,
        name: "Рубашки",
        urlName: "shirts",
        img: img_shoes,
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
        name: "Кеды",
        urlName: "sneakers",
        img: img_shoes,
      },
      {
        id: 2,
        name: "Челси",
        urlName: "chelsea",
        img: img_shoes,
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
        name: "Галстуки",
        urlName: "ties",
        img: img_shoes,
      },
      {
        id: 2,
        name: "Ремни",
        urlName: "belts",
        img: img_shoes,
      },
    ],
  },
];

export const categoriesList = [
  { id: 1, name: "Электроника", url_name: "electronics" },
  { id: 2, name: "Бытовая техника", url_name: "household" },
  { id: 3, name: "Книги, хобби, канцелярия", url_name: "books" },
  { id: 4, name: "Продукты питания", url_name: "eat" },
  { id: 5, name: "Галстуки", url_name: "ties" },
  { id: 6, name: "Ремни", url_name: "belts" },
  { id: 7, name: "Рубашки", url_name: "shirts" },
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

export const selectCategoryies = [
  { name: "Челси", value: "Chelsea" },
  { name: "Кеды", value: "Sneakers" },
  { name: "Брюки", value: "Trousers" },
  { name: "Рубашки", value: "Shirts" },
  { name: "Галстуки", value: "Ties" },
  { name: "Ремни", value: "Belts" },
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

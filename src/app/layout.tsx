"use client";

// import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Roboto } from "next/font/google";
import Footer from "@/components/Footer";
import ModalNav from "@/components/Modals/ModalNav";
import ModalNavCategory from "@/components/Modals/ModalNavCategory";
import ModalCartDeleteProduct from "@/components/Modals/ModalCartDeleteProduct";
import ModalSuccessOrder from "@/components/Modals/ModalSuccessOrder";
import ModalNewProductAdmin from "@/components/Modals/ModalNewProductAdmin";
import ModalDeleteEditNewProduct from "@/components/Modals/ModalDeleteEditNewProduct";
import { useCartStore } from "@/stores/useCartStore";
import { useEffect } from "react";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "Главная",
//   description: "Главная страница",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { cart, getProductsInCart } = useCartStore();

  useEffect(() => {
    const fetchCartData = async () => {
      return await getProductsInCart();
    };

    console.warn("получение товара корзины из useCartStore", cart);

    fetchCartData();
  }, []);

  return (
    <html lang="ru" className={roboto.className + " hide-scrollbar-y"}>
      <body className="">
        <div className="wrapper flex flex-col">
          <Header />
          {/* <Nav /> */}

          <main className="flex-grow">
            <div className="container px-2.5 relative">{children}</div>
          </main>

          <ModalNav />
          <ModalNavCategory />
          <ModalCartDeleteProduct />
          <ModalSuccessOrder />
          <ModalNewProductAdmin />
          <ModalDeleteEditNewProduct />

          <Footer />
        </div>
      </body>
    </html>
  );
}

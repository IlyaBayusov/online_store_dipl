import type { Metadata } from "next";
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

// const oswald = Oswald({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600", "700"],
//   display: "swap", // Оптимизация отображения шрифта
// });

const roboto = Roboto({
  weight: ["400", "500", "700"], // Указываем нужные толщины шрифта
  subsets: ["latin"], // Указываем поддерживаемые наборы символов
  display: "swap",
});

export const metadata: Metadata = {
  title: "Главная",
  description: "Главная страница",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={roboto.className}>
      <body>
        <div className="wrapper flex flex-col">
          <Header />
          {/* <Nav /> */}

          <main className="flex-grow">{children}</main>

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

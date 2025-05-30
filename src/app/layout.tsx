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
import ModalEditProductAdmin from "@/components/Modals/ModalEditProductAdmin";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
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
    <html lang="ru" className={roboto.className + " hide-scrollbar-y"}>
      <body className="">
        <div className="wrapper max-w-[100vw] flex flex-col hide-scrollbar-y">
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
          <ModalEditProductAdmin />

          <Footer />
        </div>
      </body>
    </html>
  );
}

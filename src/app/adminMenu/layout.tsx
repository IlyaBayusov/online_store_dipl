import React from "react";
import HeaderAdmin from "@/components/AdminPage/HeaderAdmin/HeaderAdmin";

export default function AdminMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute top-0 left-0 z-[100] w-full h-full">
      <HeaderAdmin />

      <div className="container hide-scrollbar-y">{children}</div>
    </div>
  );
}

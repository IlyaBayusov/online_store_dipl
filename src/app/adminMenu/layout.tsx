import React from "react";
import HeaderAdmin from "@/components/AdminPage/HeaderAdmin/HeaderAdmin";

export default function AdminMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <HeaderAdmin />

      <div className="w-full mx-auto">{children}</div>
    </div>
  );
}

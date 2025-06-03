import ShopContent from "@/components/Layouts/ShopContent";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ShopContent>{children}</ShopContent>;
}

export default function ShopContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container px-2.5 relative">{children}</div>;
}

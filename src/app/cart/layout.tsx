import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart | Fake Store",
  description: "View your cart items",
};

interface CartLayoutProps {
  children: React.ReactNode;
}

export default function CartLayout({ children }: CartLayoutProps) {
  return <>{children}</>;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evästekäytäntö | Cookie Policy",
  description: "Eqilo Oy evästekäytäntö / Cookie Policy.",
};

export default function CookieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
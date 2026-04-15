import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tietosuojaseloste | Privacy Policy",
  description: "Eqilo Oy tietosuojaseloste / Privacy Policy.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
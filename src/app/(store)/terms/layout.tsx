import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Käyttöehdot",
  description: "Eqilo Oy:n käyttöehdot, palautuskäytännöt ja tilausohjeet.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
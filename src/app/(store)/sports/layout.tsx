import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urheilulajit | Sports",
  description: "FDS Timing ajanottoratkaisut eri urheilulajeihin (Ratsastus, Agility ym.).",
};

export default function SportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
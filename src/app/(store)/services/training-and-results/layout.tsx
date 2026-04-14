import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Koulutus- ja Tulospalvelu",
  description: "Varmista kilpailujesi onnistuminen Eqilon ammattilaistason tulospalvelun ja ajanottokoulutuksen avulla.",
};

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
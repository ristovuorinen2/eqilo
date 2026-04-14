import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palvelut ja Konsultointi",
  description: "Eqilo tarjoaa ammattilaistason ajanoton konsultointia, laitteistojen asennusta, tulospalvelua sekä Equipe APP -ohjelmistotukea.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
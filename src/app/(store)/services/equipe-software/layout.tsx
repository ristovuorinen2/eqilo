import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipe Software & APP",
  description: "Olemme virallinen Equipe-kumppani Suomessa. Tarjoamme tukea, integraatiota ja koulutusta Equipe APP ja Equipe Online -tulospalveluohjelmistoille.",
};

export default function EquipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
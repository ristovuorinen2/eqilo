import { Metadata } from "next";
import sportsData from "@/data/sports.json";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const sport = sportsData.find(s => s.slug === slug);

  if (!sport) {
    return { title: 'Not Found' };
  }

  return {
    title: `${sport.title_en} | Eqilo`,
    description: `FDS Timing solutions for ${sport.title_en}.`,
  };
}

export default function SportCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
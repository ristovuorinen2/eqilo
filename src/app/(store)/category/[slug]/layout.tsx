import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eqilo.fi';

  return {
    title: `${title} | Eqilo.fi`,
    description: `Tutustu Eqilon ammattilaistason ${title} -laitteisiin ja -ratkaisuihin. FDS Timing edustus Suomessa.`,
    alternates: {
      canonical: `${baseUrl}/category/${slug}`,
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
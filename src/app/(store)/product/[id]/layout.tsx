import { Metadata, ResolvingMetadata } from 'next';
import { Product } from "@/lib/types/firestore";
import { AIProductSchema } from "@/components/seo/AIProductSchema";
import { getProductServer } from "@/lib/actions/products-server";

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  
  const product = await getProductServer(id);
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eqilo.fi';
  const canonicalUrl = `${baseUrl}/product/${id}`;

  return {
    title: product.name,
    description: product.description.substring(0, 160),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 160),
      images: product.image_urls && product.image_urls.length > 0 
        ? [product.image_urls[0], ...previousImages]
        : previousImages,
    },
  };
}

export default async function ProductLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const product = await getProductServer(id);
  
  if (!product) {
    return <>{children}</>;
  }

  return (
    <>
      <AIProductSchema product={product} />
      {children}
    </>
  );
}

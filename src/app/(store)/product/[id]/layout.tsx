import { Metadata, ResolvingMetadata } from 'next';
import { adminDb } from "@/lib/firebase/admin";
import { Product } from "@/lib/types/firestore";

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  
  const doc = await adminDb.collection("products").doc(id).get();
  
  if (!doc.exists) {
    return {
      title: "Product Not Found",
    };
  }

  const product = doc.data() as Product;
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.name,
    description: product.description.substring(0, 160),
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
  const doc = await adminDb.collection("products").doc(id).get();
  
  if (!doc.exists) {
    return <>{children}</>;
  }

  const product = doc.data() as Product;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image_urls || [],
    description: product.description,
    sku: product.sku,
    category: product.category_id,
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'EUR',
      availability: product.is_active && product.inventory_count > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      url: `https://eqilo.fi/product/${id}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {children}
    </>
  );
}

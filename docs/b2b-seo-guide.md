# Eqilo.fi B2B SEO, Localization, and Performance Guide

As a specialized B2B e-commerce store selling highly technical sports timing equipment, the technical SEO and performance requirements extend beyond standard B2C implementations. This guide outlines the exact Next.js App Router implementations used to resolve server-side i18n leaks, optimize Google Cloud Storage images, inject B2B technical structured data, and manage multi-language SEO via `hreflang` tags.

## 1. Fixing Server-Side i18n Leaks

**The Issue:** When using internationalization libraries, fetching translations on the client-side or failing to await translation dictionaries on the server can result in raw keys (e.g., `shop.in_stock`) bleeding into the initial HTML payload. Search engines index these raw keys instead of the localized text.

**The Solution:** Use Server Components (`app/[locale]/page.tsx`) to securely await and resolve the dictionary *before* rendering the HTML. This guarantees search engines only see the final, localized strings.

```tsx
// app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // 1. Await the translations on the server.
  // This guarantees the dictionary is loaded before any HTML is sent to the client.
  let t;
  try {
    t = await getTranslations({ locale, namespace: 'home' });
  } catch (error) {
    notFound(); // Securely handle unsupported locales
  }

  return (
    <main>
      {/* 2. Render actual localized text. Search engines will see "Modernit ajanottoratkaisut" instead of "home.hero.title" */}
      <h1 className="text-4xl font-extrabold">{t('hero.title')}</h1>
      <p className="text-lg">{t('hero.subtitle')}</p>
    </main>
  );
}
```

## 2. Google Cloud Image Optimization (`next.config.ts`)

**The Issue:** Product images hosted on external buckets (like Google Cloud Storage) bypass Next.js image optimization unless explicitly configured. Serving raw, uncompressed 5MB images destroys mobile PageSpeed and Core Web Vitals (LCP).

**The Solution:** Configure `remotePatterns` in `next.config.ts` to allow the Next.js `<Image />` component to securely fetch, resize, cache, and convert these external assets to modern formats like AVIF and WebP.

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable modern, highly compressed image formats (AVIF is ~20% smaller than WebP)
    formats: ['image/avif', 'image/webp'],
    
    // Explicitly allowlist your Google Cloud Storage bucket
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        // Restrict to your specific bucket and media path to prevent abuse
        pathname: "/eqilo-store-media/**", 
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      }
    ],
    
    // Cache optimized images at the Edge for 1 year to maximize TTFB on repeat visits
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  }
};

export default nextConfig;
```

## 3. B2B Technical Structured Data (JSON-LD)

**The Issue:** Standard Product schema is too simple for technical B2B hardware. Search engines need to understand specific technical parameters (voltage, compatibility) and explicitly know whether the listed price includes B2B VAT or not.

**The Solution:** Utilize the `additionalProperty` array in Schema.org to map key-value technical specifications, and use `priceSpecification` with `valueAddedTaxIncluded` to clarify VAT handling.

```tsx
// components/seo/B2BProductSchema.tsx
import React from 'react';
import { Product } from '@/lib/types/firestore';

export function B2BProductSchema({ product, locale }: { product: Product, locale: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eqilo.fi';
  const productUrl = `${baseUrl}/${locale}/product/${product.id}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_urls?.[0],
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'FDS Timing', // Specific technical brand
    },
    
    // B2B Focus: Deep Technical Specifications
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Weight',
        value: product.weight,
        unitCode: 'KGM' // Standardized unit code for Kilograms
      },
      // Add dynamic specs if available in your database
      {
        '@type': 'PropertyValue',
        name: 'Connectivity',
        value: 'Wireless (Radio/Bluetooth)'
      }
    ],

    offers: {
      '@type': 'Offer',
      url: productUrl,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inventory_count > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      
      // B2B Focus: Explicit VAT Pricing
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: product.price,
        priceCurrency: 'EUR',
        // Crucial for European B2B/B2C distinction: Clarify if 25.5% VAT is included
        valueAddedTaxIncluded: true, 
      }
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  );
}
```

## 4. Multi-Language SEO (`hreflang` tags)

**The Issue:** When targeting both local (Finland) and global (English) markets, search engines can confuse localized versions of the same product page as duplicate content, or serve the wrong language in regional search results.

**The Solution:** Use the Next.js `generateMetadata` API to dynamically output `alternates.languages` (hreflang tags). This creates a bidirectional link between the language variants, explicitly telling Google: "Show the `/fi/` URL to Finnish searchers, and the `/en/` URL to everyone else."

```tsx
// app/[locale]/product/[id]/layout.tsx
import { Metadata } from 'next';
import { getProduct } from '@/lib/api';

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const product = await getProduct(id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eqilo.fi';

  // Construct the absolute canonical URL for the current locale
  const canonicalUrl = `${baseUrl}/${locale}/product/${id}`;

  return {
    title: `${product.name} | Eqilo.fi`,
    description: product.description.substring(0, 160),
    alternates: {
      // 1. Set the canonical to the current locale's specific path
      canonical: canonicalUrl,
      
      // 2. Define the hreflang map for international SEO
      languages: {
        // Map Finnish users explicitly to the FI path
        'fi-FI': `${baseUrl}/fi/product/${id}`,
        
        // Map Swedish users explicitly to the SE path
        'sv-FI': `${baseUrl}/se/product/${id}`,
        'sv-SE': `${baseUrl}/se/product/${id}`,
        
        // 'x-default' is the global fallback for any user whose language isn't explicitly listed above (e.g., US, UK, Germany)
        'x-default': `${baseUrl}/en/product/${id}`,
      },
    },
  };
}
```

By injecting these `hreflang` maps directly into the `<head>` via the Server Component metadata API, you ensure that Google perfectly routes organic traffic to the highest-converting language version of your technical storefront.

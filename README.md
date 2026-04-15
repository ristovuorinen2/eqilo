# Eqilo.fi Webstore

Modern timekeeping devices from Swiss manufacturer FDS Timing, designed for Finnish agility and equestrian clubs.

![Status: Complete](https://img.shields.io/badge/Status-100%25%20Complete-success)

## Overview
This repository contains the Next.js App Router frontend and backend for the Eqilo.fi e-commerce platform. It is built to be fast, accessible, fully localized (FI, SE, EN), and conversion-optimized.

### Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack) with React 19.2 & TypeScript 6
- **Styling:** Tailwind CSS 4 & Shadcn UI (Radix Primitives)
- **Database & Auth:** Firebase (Firestore & Firebase Auth via Magic Links/SMS)
- **Payments:** Stripe Checkout (Apple Pay, Google Pay, MobilePay, B2B invoicing)
- **Transactional Emails & Receipts:** Resend & pdfmake (v0.3+, Node/Edge compatible)
- **AI Content & Localization:** Google Gemini 2.5 Flash & 3.1 Pro (Automated Product Translation, SEO generation, Video mapping)
- **Deployment:** Firebase App Hosting (Google Cloud Run + Edge CDN)

## Getting Started

First, ensure your environment variables are configured in `.env.local` (Stripe, Firebase, Resend, Gemini API). Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture & Features
- **Fully Localized & Responsive:** Custom `LanguageProvider` dynamically managing FI, EN, and SE states. Injects proper HTML `lang` attributes on the fly to support native CSS `hyphens-auto` for complex languages, preventing layout overflows on mobile devices.
- **Deep Web Scraper:** Custom Node.js scripts ingest the FDS Timing XML Sitemap, extract and **locally host** all product imagery, and fetch **PDF Manuals and YouTube Tutorials**. We use **Gemini 2.5 Flash** for highly accurate mapping of downloads and videos to our local database, and **Gemini 3.1 Pro** for professional HTML-formatted technical translations of PDF specifications.
- **Comprehensive Technical SEO:** 
  - Dynamic Next.js Metadata with strict **Canonical URLs** to prevent duplicate content indexing.
  - Native **JSON-LD (Product)** Schema markup injected via Server Components for rich snippets in Google.
  - Dynamic `sitemap.xml` paired with a strict `robots.txt` actively disallowing spider traps (e.g., parameterized `/shop` filter views, carts).
  - Dynamic **Open Graph Images** (`next/og`) generated at the Edge for engaging social media cards.
- **B2B Technical SEO & Localization:** Deep structured data (JSON-LD) with `additionalProperty` for technical specs and VAT-inclusive `priceSpecification`. Bidirectional `hreflang` routing maps for FI/EN/SE markets, and Server-Side dictionary resolution to prevent i18n key leaks. See `docs/b2b-seo-guide.md` for implementation details.
- **Frictionless Auth:** Automatic anonymous sign-in ensures every visitor has a persistent session from their first second. Permanent accounts are secured via passwordless **Firebase Magic Links** and Phone SMS verification.
- **Admin Panel:** Full CRUD management for products and categories, including inventory tracking and VAT-compliant order management.
- **Financial Compliance:** Prices are managed inclusive of 25.5% VAT. The UI features an interactive Net/Gross toggle component. The system automatically calculates tax shares for display, checkout, and dynamically generated PDF receipts ("Kuitti") available in the customer's order history portal.

See `docs/eqilo-architecture.md` for the full technical specifications, data models, and business logic.

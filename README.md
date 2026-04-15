# Eqilo.fi Webstore

Modern timekeeping devices from Swiss manufacturer FDS Timing, designed for Finnish agility and equestrian clubs.

![Status: Complete](https://img.shields.io/badge/Status-100%25%20Complete-success)

## Overview
This repository contains the Next.js App Router frontend and backend for the Eqilo.fi e-commerce platform. It is built to be fast, accessible, fully localized (FI, SE, EN), and conversion-optimized.

### Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS & Shadcn UI (Radix Primitives)
- **Database & Auth:** Firebase (Firestore & Firebase Auth via Magic Links/SMS)
- **Payments:** Stripe Checkout (Apple Pay, Google Pay, MobilePay, B2B invoicing)
- **Transactional Emails & Receipts:** Resend & pdfmake (Finnish VAT compliant)
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
- **Fully Localized:** Custom `LanguageProvider` managing FI, EN, and SE states across the UI and database seamlessly.
- **Deep Web Scraper:** Custom Node.js scripts ingest the FDS Timing XML Sitemap, extract and **locally host** all product imagery, and fetch **PDF Manuals and YouTube Tutorials**. We use **Gemini 2.5 Flash** for highly accurate mapping of downloads and videos to our local database, and **Gemini 3.1 Pro** for professional HTML-formatted technical translations of PDF specifications.
- **Advanced SEO:** Dynamically generated Next.js Metadata on all pages, structured semantic HTML, and massive 700+ word localized SEO blocks explicitly detailing Eqilo's expertise in Agility and Equestrian sports.
- **Frictionless Auth:** Automatic anonymous sign-in ensures every visitor has a persistent session from their first second. Permanent accounts are secured via passwordless **Firebase Magic Links** and Phone SMS verification.
- **Admin Panel:** Full CRUD management for products and categories, including inventory tracking and VAT-compliant order management.
- **Financial Compliance:** Prices are managed inclusive of 25.5% VAT. The system automatically calculates net amounts and tax shares for display, checkout, and dynamically generated PDF receipts ("Kuitti") available in the customer's order history portal.

See `docs/eqilo-architecture.md` for the full technical specifications, data models, and business logic.

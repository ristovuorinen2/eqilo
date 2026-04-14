# Eqilo.fi Webstore

Modern timekeeping devices from Swiss manufacturer FDS Timing, designed for Finnish agility and equestrian clubs.

![Status: Complete](https://img.shields.io/badge/Status-100%25%20Complete-success)

## Overview
This repository contains the Next.js App Router frontend and backend for the Eqilo.fi e-commerce platform. It is built to be fast, accessible, fully localized (FI, SE, EN), and conversion-optimized.

### Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS & Shadcn UI (Radix Primitives)
- **Database & Auth:** Firebase (Firestore & Firebase Auth via Email/SMS)
- **Payments:** Stripe Checkout (Apple Pay, Google Pay, MobilePay, B2B invoicing)
- **Transactional Emails:** Resend
- **AI Localization:** Google Gemini 3.1 Pro (Automated Product Translation)
- **Deployment:** Firebase App Hosting (Google Cloud Run + Edge CDN)

## Getting Started

First, ensure your environment variables are configured in `.env.local` (Stripe, Firebase, Resend, Gemini API). Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture & Features
- **Fully Localized:** Custom `LanguageProvider` managing FI, EN, and SE states across the UI and database seamlessly.
- **Deep Web Scraper:** A custom Node.js script that ingests the FDS Timing XML Sitemap, extracts and **locally hosts** all product imagery and technical documentation in Firebase Storage, and uses **Gemini 3.1 Pro** for professional HTML-formatted technical translations.
- **Anonymous Auth:** Automatic anonymous sign-in ensures every visitor has a persistent session and cart from their first second on the site.
- **Admin Panel:** Full CRUD management for products and categories, including inventory tracking and VAT-compliant order management.
- **Financial Compliance:** Detailed tax breakdown by VAT rate stored in orders and displayed in customer receipts.

See `docs/eqilo-architecture.md` for the full technical specifications, data models, and business logic.

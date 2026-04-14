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
- **Deep Web Scraper:** A custom Node.js script (`src/lib/actions/scraper.ts`) that ingests the FDS Timing XML Sitemap, extracts high-res product imagery, specifications, box contents, and downloads, and uses **Gemini 3.1 Pro** to translate descriptions dynamically into Finnish and Swedish.
- **Admin Panel:** Native protected `/admin` route for uploading the original `Price List 2026 V3.0.xlsx` to seed the database, managing live customer carts, and viewing CRM data.
- **Persistent Carts:** Users' shopping carts are synced from `localStorage` directly to a Firestore collection, allowing cross-device shopping and admin recovery.

See `docs/eqilo-architecture.md` for the full technical specifications, data models, and business logic.

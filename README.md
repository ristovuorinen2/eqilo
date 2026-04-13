# Eqilo.fi Webstore

Modern timekeeping devices from Swiss manufacturer FDS Timing, designed for Finnish agility and equestrian clubs.

## Overview
This repository contains the Next.js App Router frontend and backend for the Eqilo.fi e-commerce platform. It is built to be fast, accessible, and conversion-optimized.

### Tech Stack
- **Framework:** Next.js 14/15 App Router
- **Styling:** Tailwind CSS & Shadcn UI (Radix Primitives)
- **Database & Auth:** Firebase (Firestore & Firebase Auth)
- **Payments:** Stripe Checkout (including MobilePay)
- **Invoicing:** Holvi.fi API Integration
- **Transactional Emails:** Resend
- **Deployment:** Google Cloud Run (Docker)

## Getting Started

First, run the development server:

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

## Admin & Product Import
To initialize the catalog, navigate to the `/admin/products` route and upload the `Price List 2026 V3.0.xlsx` file. This will automatically populate the Firestore `products` collection with the necessary categories, pricing, and default inventory.

## Architecture
See `docs/eqilo-architecture.md` for the full technical specifications, data models, and business logic.

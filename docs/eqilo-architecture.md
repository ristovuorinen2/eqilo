# Eqilo.fi Ecommerce Architecture Plan

## Background & Motivation
Eqilo is launching its Finnish branch (eqilo.fi) with a new ecommerce site. The initial product catalog will be imported from `Price List 2026 V3.0.xlsx`. The platform requires a Customer Portal for shoppers and an Admin Panel for operations, integrating modern technologies for a seamless, scalable experience.

## Company Information
- **Company Name:** Eqilo Oy
- **Business ID:** 3530342-3
- **Postal Address:** Hakkapeliitantie 4, 08350 LOHJA
- **Phone:** +358 50 5633097

## Scope & Impact
- **Customer Portal:** Product discovery, persistent carts saved to user accounts, mandatory account creation during the first order, Stripe checkout, and a dedicated **E-store Terms & Conditions** page which users must explicitly accept before completing a purchase.
- **Admin Panel:** Product management (importing from Excel, plus a fully-featured Product Manager/Editor to modify descriptions, prices, and status), order/inventory management, comprehensive Sales Dashboard, Cart management (ability to view, edit, override prices, and generate shareable public cart links), and a built-in CRM to manage customers and their orders.
- **Infrastructure & Deployment:** Hosted on Google Cloud Platform (GCP). The Next.js application will be containerized using a secure Docker image and deployed to **Google Cloud Run** for scalable, serverless execution. Firebase services (Firestore, Auth via email or phone number) will be used for the backend data layer.
- **Integrations:** Stripe (Payments), Holvi.fi (Invoicing), WhatsApp (Helpdesk), Google Analytics 4 / Plausible (Analytics).
- **Aesthetics:** Blue and white branding to match the Eqilo logo (`docs/eqilologo.jpeg`).
- **Internationalization (i18n):** Support for Finnish (FI - Default), English (EN), and Swedish (SE).
- **WhatsApp Helpdesk:** Integrated customer support via WhatsApp, configurable from the Admin Panel.
- **B2B Features & VAT Validation:** Support for a `b2b_customer` role, allowing business users to input a valid Finnish Business ID (Y-tunnus) for VAT handling and specialized invoicing.

## Proposed Solution

### Shipping & Pricing Rules
- **Shipping Costs:** A flat rate of **20 €** is applied to all orders below 200 €. Orders totaling **200 € or more** automatically qualify for **free shipping**. This logic will be enforced during the Stripe checkout session creation.
- **Localized Payments:** Through the Stripe Payment Element, the checkout will natively support **Apple Pay**, **Google Pay**, and **MobilePay** (highly preferred in Finland), alongside traditional credit cards and B2B invoice options.

### Architecture Diagram
```mermaid
graph TD
    Client[Customer/Admin Browser] -->|Next.js App Router| Frontend[Next.js Frontend]
    Frontend -->|Next.js Server Actions| Backend[Backend Logic]
    Frontend -->|Webhooks| API[API Route Handlers]
    
    Backend -->|Auth| FirebaseAuth[Firebase Authentication]
    Backend -->|Data| Firestore[Firestore Database]
    
    Backend -->|Payments| Stripe[Stripe API]
    Backend -->|Invoicing| Holvi[Holvi API]
    Backend -->|Product Import| Admin[Admin Uploads Excel]
    
    Frontend -.->|WhatsApp Link/QR| WhatsAppApp[WhatsApp Application]
    Stripe -->|Webhooks| API
    API --> Backend
```

### Data Model (Firestore)

**1. `customers` Collection**
- `id` (String) - Firebase UID
- `email` (String) - Optional if signed up via phone
- `phone_number` (String) - Optional if signed up via email; required by couriers
- `role` (String) - 'admin' | 'customer' | 'b2b_customer'
- `business_id` (String) - Y-tunnus, required for 'b2b_customer'
- `stripe_customer_id` (String)
- `shipping_address` (Object) - { line1, line2, city, postal_code, country }
- `billing_address` (Object) - { line1, line2, city, postal_code, country }
- `crm_notes` (String) - Admin-only internal notes for CRM

**2. `products` Collection**
- `id` (String)
- `name` (String)
- `description` (String)
- `price` (Number)
- `tax_rate` (Number) - e.g., 25.5 for Finnish general goods
- `sku` (String)
- `excel_ref_id` (String) - Original ID from Price List Excel
- `inventory_count` (Number)
- `is_active` (Boolean) - Allows drafting or hiding products
- `weight` (Number) - Essential for shipping calculation
- `dimensions` (Object) - { length, width, height }
- `image_urls` (Array of Strings)

**3. `orders` Collection**
- `id` (String)
- `user_id` (String)
- `items` (Array of Objects) - { product_id, quantity, price }
- `subtotal` (Number) - Pre-tax amount
- `tax_total` (Number) - Total VAT amount, required for Holvi invoicing
- `total_amount` (Number) - Final amount including tax
- `shipping_address` (Object) - Snapshot at the time of order
- `status` (String) - 'pending' | 'paid' | 'shipped'
- `tracking_number` (String)
- `courier` (String)
- `stripe_payment_intent` (String)
- `holvi_invoice_id` (String)
- `created_at` (Timestamp)

**4. `carts` Collection**
- `id` (String)
- `user_id` (String) - Optional (if assigned to a specific customer)
- `items` (Array of Objects) - { product_id, quantity, custom_price_override }
- `is_public_link` (Boolean) - Allows admins to share this cart via a public URL
- `abandoned_recovery_sent` (Boolean) - Tracks if an automated recovery message was sent
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

**5. `settings` Collection**
- `id` (String) - Document ID (e.g., 'global')
- `whatsapp_helpdesk_number` (String) - Configurable international phone number for the WhatsApp helpdesk link.

### API Endpoints & Server Actions (Next.js App Router)
Following modern Next.js App Router best practices, data mutations and form submissions will be handled via **Server Actions** rather than traditional API Route Handlers. Route Handlers will be reserved exclusively for external webhooks.

- **Server Actions (Internal Mutations):**
  - `createCheckoutSession(cart)` - Initializes Stripe Checkout session securely on the server.
  - `generateInvoice(orderId)` - Communicates with Holvi.fi API to generate an invoice.
  - `importProducts(file)` - Parses uploaded `Price List 2026 V3.0.xlsx` and updates the product catalog in Firestore.
  - `updateSettings(data)` - Updates global site settings (e.g., WhatsApp helpdesk number).

- **Route Handlers (External Webhooks):**
  - `POST /api/webhooks/stripe` - Handles Stripe payment success, updates order status, securely triggers the Holvi invoice generation, and uses **Resend** to send a branded order confirmation to the customer and a notification email to the admin (`johannes@hyrsky.fi`).

### Consulting & Services (The Human Element)
To build trust and provide comprehensive solutions, the platform will feature dedicated, SEO-optimized content pages highlighting the store's human side. 
- **Store Owner & Expert:** Johannes Hyrsky. He provides personalized consulting, product installation, and technical support.
- **Service Pages:** The site will include specific landing pages detailing these service offerings, built using information provided in external documents:
  - **Training and Results Service:** Detailing operations managed in the field (reference: `Results service.pdf`).
  - **Equipe Results Software:** Presenting solutions to manage equestrian shows (reference: `Equipe presentation.pdf`).

### Store UX & Frontend Components
Based on modern ecommerce best practices, the Customer Portal will be built utilizing **Shadcn UI**. This approach provides fully accessible, customizable React components directly in the codebase.

- **Component Library:** `shadcn/ui`, built strictly on top of **Radix UI primitives**. This ensures that all interactive components (like dialogs, dropdowns, and sheets) are fully accessible, unstyled by default, and provide robust behavioral foundations for the Next.js application.
- **Forms & Layouts:** Utilization of Shadcn's new responsive `Field`, `FieldGroup`, and `FieldSet` components to build robust, mobile-first checkout flows and user profile management screens that automatically switch between vertical and horizontal layouts based on container width.
- **Visual Design:**
  - **Conversion-Optimized Main Page:** The storefront's landing page MUST be aggressively optimized for sales. This includes prominent hero banners, clear "Call to Action" (CTA) buttons, and curated product carousels designed to immediately funnel users into the shopping experience.
  - **Clean & Minimalist:** High contrast layouts emphasizing product imagery.
  - **Clear Shipping Information:** Every product detail page and cart view MUST prominently display that the standard shipping time is **1-2 weeks**.
  - **Omnichannel Responsiveness (Desktop & Mobile):** While adopting a mobile-first approach (touch-friendly targets, bottom-sheet navigations), the UX MUST also provide a premium, expansive layout for Desktop users. The site is not *just* mobile; it requires high-resolution grid systems and advanced hover interactions suited for larger screens.
  - **Color Palette Alignment:** The Eqilo Primary Blue (`#0055A4`) will be injected directly into the Tailwind configuration as the primary brand color, ensuring all Shadcn buttons, active states, and accents automatically align with the corporate identity without manual overrides.
  - **Shopping Cart:** A slide-out responsive cart drawer (utilizing Shadcn `Sheet`) for frictionless review of items before proceeding to the Stripe checkout page.
- **References & Trust Signals:** The storefront will prominently feature a 'References' or 'Trusted By' section incorporating logos/icons and linking to key partners and supported events, specifically including:
  - **AWC 2026** (https://awc2026.fi/)
  - **Equipe** (https://equipe.com/)
  - **FDS Timing** (https://fdstiming.com/)

### Advanced SEO, Analytics & Google Merchant Center
- **Dynamic SEO:** Leverage Next.js Server-Side Rendering (SSR) for all product and **category pages** to ensure immediate indexing by Google. Category pages will include comprehensive SEO text fields to maximize search ranking for broad keywords. Automatically generate `sitemap.xml`. Include the Google Site Verification meta tag `<meta name="google-site-verification" content="LZj3B0ok1VW0eB_zpPPod5uAOugP2PkjrTrlLPS_Zac" />` in the root layout.
- **Google Merchant Center:** A Next.js Route Handler (`GET /api/feed/google-merchant.xml`) will dynamically output an XML RSS 2.0 feed of all active products. This feed seamlessly links the site catalog to Google Merchant Center (https://merchants.google.com), enabling products to appear in Google Shopping tabs and dynamic search ads automatically.
- **Social Sharing:** Implement dynamic Open Graph (OG) image generation so products look professional and engaging when shared on platforms like WhatsApp, Facebook, or LinkedIn.
- **Conversion Tracking:** Integrate Google Analytics 4 (GA4) or Plausible to monitor the full ecommerce funnel (Product View -> Add to Cart -> Initiate Checkout -> Purchase) to optimize conversion rates.

### Abandoned Cart Recovery
- A background process will identify `carts` in Firestore that have been inactive for over 24 hours.
- If the associated `user_id` has opted into communications, the system will trigger an automated recovery email or WhatsApp message (if applicable) and flag `abandoned_recovery_sent: true`.

### WhatsApp Helpdesk Integration Flow
- **Storefront Component:** A fixed floating chat bubble in the bottom right corner of the storefront.
- **Design:** Stylized with the Eqilo primary blue. Includes a white WhatsApp icon, an "Always Online" green dot indicator, and clear contrast. When clicked or hovered (on desktop), it presents a `wa.me/<helpdesk_number>` link or a dynamically generated QR code (using a library like `@lglab/react-qr-code` for deep customization like embedding the Eqilo logo).
- **Interaction:**
  - **Mobile:** Tapping the button directly opens the WhatsApp app with a pre-filled greeting message.
  - **Desktop:** Clicking redirects to WhatsApp Web, or scanning the displayed QR code with a phone opens the app.
- **Admin Configuration:** The Admin Panel includes a "Settings" tab where admins can update the `whatsapp_helpdesk_number`. This setting is stored in the `settings` Firestore collection and fetched globally to populate the `wa.me` links.

## Alternatives Considered
- **Firebase Cloud Functions vs Next.js Server Actions:** We chose Next.js Server Actions over isolated Firebase Cloud Functions. This modern App Router paradigm colocates frontend UI and backend mutations within a single monorepo, significantly simplifying deployment, reducing boilerplate, and seamlessly sharing TypeScript types between the client and server.

## Implementation Plan
1. **Phase 1: Setup & Data Modeling** - Initialize Next.js project, Firebase config, and Tailwind CSS branding. Setup Firestore schemas (including `settings`).
2. **Phase 2: Admin & Catalog Import** - Build the Excel import logic (using a library like `xlsx`) to populate the `products` collection from `Price List 2026 V3.0.xlsx`. This import process will be executed **just once** to initialize the Firestore database. Create Admin views for product management, uploading, and configuring the WhatsApp Helpdesk number. Include a one-time script/process to scrape product descriptions from `https://fdstiming.com/shop/` and translate them into Finnish (FI) and Swedish (SE) to populate the initial catalog.
3. **Phase 3: Customer Portal** - Develop product listing, detail pages, cart state management, and the global floating WhatsApp Helpdesk component.
4. **Phase 4: Checkout & Invoicing** - Integrate Stripe Checkout with localized payments (MobilePay). Setup webhook listeners. Integrate Holvi API for automated invoices and **Resend** for automated branded order confirmation emails upon payment confirmation.
5. **Phase 5: Marketing & Optimization** - Implement OG image generation, GA4 tracking, and the abandoned cart recovery background job.

## Verification & Testing
- Unit tests for Server Actions (Stripe session creation, Holvi invoice generation mock).
- E2E tests for the checkout flow (Customer -> Cart -> Stripe Test Mode -> Order Success).
- Manual verification of product import from the Excel price list.
- Verification of the WhatsApp link on mobile and QR code scannability on desktop.

## Migration & Rollback
- Since this is a greenfield project, initial migration involves one-time importing from `Price List 2026 V3.0.xlsx`.
- Rollback strategies involve utilizing Firestore point-in-time recovery and Google Cloud Run's traffic management to immediately revert to a previous secure Docker image revision in case of critical bugs.revert to a previous secure Docker image revision in case of critical bugs.recovery and Google Cloud Run's traffic management to immediately revert to a previous secure Docker image revision in case of critical bugs.secure Docker image revision in case of critical bugs.recovery and Google Cloud Run's traffic management to immediately revert to a previous secure Docker image revision in case of critical bugs.
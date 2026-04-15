# Claude / AI Agent System Prompt for Eqilo.fi

## About the Project
Eqilo.fi is a specialized B2B and B2C e-commerce storefront targeting Finnish agility and equestrian clubs. We sell highly technical timekeeping devices from the Swiss manufacturer FDS Timing.

This project enforces strict, "enterprise-grade" standards for Web Performance (LCP, INP, CLS), Search Engine Optimization (Technical SEO and GEO), Accessibility (a11y), and Security.

## Tech Stack
- **Framework:** Next.js 16 (App Router) with React 19.2 and TypeScript 6.
- **Styling:** Tailwind CSS 4 & Shadcn UI (Radix Primitives).
- **Database / Auth:** Firebase (Firestore & Auth).
- **Payments:** Stripe Checkout (including Agentic Commerce Protocol / ACP checkout handlers).
- **Deployment:** Firebase App Hosting (Google Cloud Run + Edge CDN).

## Architecture & Code Standards
When working in this repository, you **MUST** adhere to the following architectural decisions:

1. **Aggressive Data Caching:** 
   We wrap `adminDb.collection()` fetches in Next.js's `unstable_cache` (see `src/lib/actions/products-server.ts`) to achieve single-digit millisecond TTFB. NEVER introduce raw Firestore fetches into Server Components without caching unless you have explicitly verified the performance hit is required (e.g., dynamic user cart).
2. **Core Web Vitals First:**
   - **LCP:** Use `next/image` with `priority` and `fetchPriority="high"` for hero/primary product images. Remote images are served from `storage.googleapis.com` and `firebasestorage.googleapis.com` and optimized to `AVIF/WebP` via `next.config.ts`.
   - **INP:** Heavy state updates (like Add to Cart) MUST be wrapped in React 18/19 `useTransition` to prevent main-thread blocking. Heavy components (e.g., Stripe, QR code generators) MUST be dynamically imported via `next/dynamic`.
   - **CLS:** Ensure `next/font` utilizes `display: 'swap'`. Ensure dynamic elements have explicit height placeholders.
3. **Resiliency:**
   - Every route MUST implement granular `error.tsx` files to gracefully catch isolated fetch failures without bringing down the global layout.
4. **Security & Accessibility:**
   - The site uses strict CSP, HSTS, and X-Frame-Options headers defined in `next.config.ts`.
   - `eslint-plugin-jsx-a11y` is active. Ensure all interactive components have proper ARIA labels and focus management.
5. **Technical SEO & AI/GEO Optimization:**
   - **Structured Data:** Use deeply nested JSON-LD `@graph` structures. Do NOT use basic Product schemas. Refer to `src/components/seo/AIProductSchema.tsx` for B2B/FAQ injections.
   - **Canonical URLs & Hreflang:** Dynamic pages MUST implement strict `canonical` URLs and `alternates.languages` (for `fi-FI`, `sv-FI`, and `x-default`) within the `generateMetadata` API to prevent duplicate content indexing.
   - **Semantic HTML:** Use strict HTML5 chunking (`<article>`, `<section>`, `<dl>`) to ensure LLM vector embedders can perfectly parse our technical specifications.
   - **Spider Traps:** Keep `robots.ts` actively disallowing `/cart/`, `/checkout/`, and filtered queries (e.g., `/*?*category=`), while explicitly allowing AI crawlers (`GPTBot`, `ClaudeBot`, etc.).

## Commit & Work Flow
- Make surgical, targeted edits. Do not rewrite files unnecessarily.
- Verify fixes locally using `npm run build` or `npm run lint`.
- Add tests or fallback handling when making critical state changes.

*See `docs/eqilo-architecture.md` and `docs/b2b-seo-guide.md` for further business logic and technical specifications.*
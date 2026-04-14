import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/cart-provider";
import { AuthProvider } from "@/components/auth-provider";
import { LanguageProvider } from "@/components/language-provider";
import { GoogleTagManager } from '@next/third-parties/google';
import { WhatsAppHelpdesk } from "@/components/WhatsAppHelpdesk";
import { CookieBanner } from "@/components/cookie-banner";
import { cookies } from "next/headers";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Eqilo.fi',
    default: 'Eqilo.fi - Modern Timekeeping Solutions',
  },
  description: "Eqilo provides modern timekeeping devices from Swiss manufacturer FDS Timing, targeting agility and equestrian clubs in Finland.",
  keywords: ["FDS Timing", "timekeeping", "agility", "equestrian", "Eqilo", "Finland"],
  openGraph: {
    title: 'Eqilo.fi - Modern Timekeeping Solutions',
    description: 'Modern timekeeping devices from Swiss manufacturer FDS Timing, targeting agility and equestrian clubs in Finland.',
    url: 'https://eqilo.fi',
    siteName: 'Eqilo.fi',
    locale: 'fi_FI',
    type: 'website',
  },
  verification: {
    google: "LZj3B0ok1VW0eB_zpPPod5uAOugP2PkjrTrlLPS_Zac",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const consentCookie = cookieStore.get("eqilo_cookie_consent");
  const hasConsentedToTracking = consentCookie?.value === "accepted";

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Eqilo Oy',
    url: 'https://eqilo.fi',
    logo: 'https://eqilo.fi/eqilologo.jpeg',
    description: 'Modern timekeeping devices from Swiss manufacturer FDS Timing.',
    telephone: '+358 50 5633097',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hakkapeliitantie 4',
      addressLocality: 'LOHJA',
      postalCode: '08350',
      addressCountry: 'FI'
    }
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {hasConsentedToTracking && <GoogleTagManager gtmId="G-ZRVTGT7VXH" />}
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <LanguageProvider>
              <AuthProvider>
                <CartProvider>
                  {children}
                  <WhatsAppHelpdesk />
                  <CookieBanner />
                </CartProvider>
              </AuthProvider>
            </LanguageProvider>
          </NuqsAdapter>
          <Toaster position="bottom-right" theme="light" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

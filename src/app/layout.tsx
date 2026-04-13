import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/cart-provider";
import { AuthProvider } from "@/components/auth-provider";
import { LanguageProvider } from "@/components/language-provider";
import { GoogleTagManager } from '@next/third-parties/google';
import { WhatsAppHelpdesk } from "@/components/WhatsAppHelpdesk";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eqilo.fi - Modern Timekeeping Solutions",
  description: "Eqilo provides modern timekeeping devices from Swiss manufacturer FDS Timing, targeting agility and equestrian clubs in Finland.",
  verification: {
    google: "LZj3B0ok1VW0eB_zpPPod5uAOugP2PkjrTrlLPS_Zac",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId="G-ZRVTGT7VXH" />
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <AuthProvider>
              <CartProvider>
                {children}
                <WhatsAppHelpdesk />
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

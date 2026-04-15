'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Home, ShoppingBag, MessageCircleQuestion } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const { t } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?category=all&q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      {/* Visual Indicator */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
        <div className="relative bg-background border-4 border-muted p-8 rounded-full shadow-sm">
          <span className="text-6xl md:text-8xl font-black text-primary/80 tracking-tighter">404</span>
        </div>
      </div>

      {/* Main Copy */}
      <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
        {t('error.not_found_title') || 'Page Not Found'}
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl max-w-[600px] mx-auto mb-10 leading-relaxed">
        {t('error.not_found_desc') || "The equipment or page you're looking for might have been moved, removed, or is temporarily unavailable."}
      </p>

      {/* Recovery Search */}
      <form onSubmit={handleSearch} className="flex w-full max-w-md items-center space-x-2 mb-12">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder={t('nav.search') || "Search products..."} 
            className="w-full pl-10 h-12 rounded-xl border-border/50 bg-muted/30 focus-visible:bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" className="h-12 px-6 rounded-xl font-bold tracking-wide shadow-sm hover:shadow-md transition-all">
          {t('nav.search') || "Search"}
        </Button>
      </form>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
        <Link href="/shop" className="w-full sm:w-auto">
          <Button size="lg" className="w-full h-14 rounded-xl font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all">
            <ShoppingBag className="w-5 h-5 mr-2" />
            {t('nav.products') || 'Browse Products'}
          </Button>
        </Link>
        
        <Link href="/" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full h-14 rounded-xl font-bold uppercase tracking-wider border-border/50 hover:bg-muted/50 transition-colors">
            <Home className="w-5 h-5 mr-2" />
            {t('nav.home') || 'Homepage'}
          </Button>
        </Link>
      </div>

      {/* Helpdesk Fallback */}
      <div className="mt-16 pt-8 border-t border-border/50 w-full max-w-md flex flex-col items-center">
        <p className="text-sm text-muted-foreground font-medium mb-4">
          {t('error.need_help') || 'Need technical assistance finding a specific FDS Timing system?'}
        </p>
        <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 font-bold rounded-lg" onClick={() => {
            // Trigger the WhatsApp helpdesk by simulating a click on its floating button
            const whatsappBtn = document.querySelector('button[aria-label="Open WhatsApp Helpdesk"]') as HTMLButtonElement;
            if (whatsappBtn) whatsappBtn.click();
          }}>
          <MessageCircleQuestion className="w-4 h-4 mr-2" />
          {t('whatsapp.ask_johannes') || 'Ask Johannes for Help'}
        </Button>
      </div>
    </main>
  );
}

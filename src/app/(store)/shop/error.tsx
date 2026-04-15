'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    console.error('Shop Route Error:', error);
  }, [error]);

  return (
    <div className="container py-20 flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="bg-destructive/10 p-6 rounded-full mb-6">
        <AlertCircle className="w-12 h-12 text-destructive" />
      </div>
      <h2 className="text-3xl font-black tracking-tight mb-4 text-foreground">
        {t('error.title') || 'Something went wrong!'}
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        {t('error.description') || 'We encountered an error loading the shop catalog. Please refresh the page or try again.'}
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button onClick={() => reset()} size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider">
          {t('error.try_again') || 'Try Again'}
        </Button>
      </div>
    </div>
  );
}

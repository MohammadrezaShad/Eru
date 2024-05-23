'use client';

import React from 'react';
import { QueryClientProvider, ThemeProvider } from '@/providers';

type MainProvidersProps = {
  children: React.ReactNode;
};

export default function MainProviders({ children }: MainProvidersProps) {
  return (
    <ThemeProvider>
      <QueryClientProvider>{children}</QueryClientProvider>;
    </ThemeProvider>
  );
}

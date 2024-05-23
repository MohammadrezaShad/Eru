'use client';

import React from 'react';
import { QueryClientProvider } from '@/providers';

type MainProvidersProps = {
  children: React.ReactNode;
};

export default function MainProviders({ children }: MainProvidersProps) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}

import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import { Providers } from '@/providers';

import '@/assets/styles/globals.css';

const vazirmatn = Vazirmatn({
  weight: ['300', '400', '600'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'app',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={vazirmatn.className}>
        <Providers>
          <main>
            <div className="root">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}

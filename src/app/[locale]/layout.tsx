import { Inter } from 'next/font/google';
import '~/styles/globals.css';

import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import SessionWrapper from '@/components/providers/SessionWrapper';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

import ThemeToggle from '@/components/UI/atoms/theme-toggle';

import { routing } from '@/src/i18n/routing';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Tools',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <body
        className={`${inter.className} overflow-hidden `}
        suppressHydrationWarning={true}
      >
        <SessionWrapper>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>
              {children}
              <ThemeToggle />
            </ThemeProvider>
          </NextIntlClientProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}

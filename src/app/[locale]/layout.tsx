import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import SessionWrapper from '@/components/providers/SessionWrapper';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import ThemeToggle from '@/components/UI/atoms/theme-toggle';
import LanguageSelector from '@/components/UI/organisms/languaje-selector';
import { routing } from '@/src/i18n/routing';

import '~/styles/globals.css';

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

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <body className={`${inter.className} overflow-hidden `}>
        <SessionWrapper>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>
              {children}
              <ThemeToggle />
              <LanguageSelector locale={locale} />
            </ThemeProvider>
          </NextIntlClientProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}

import { NextIntlClientProvider } from 'next-intl';
import { cn, ConfirmMountPoint } from '@alpha-3/utils';
import { Inter as FontSans } from 'next/font/google';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Toaster } from '@alpha-3/ui';

import { routing } from '../../i18n/routing';
import AppProvider from '../../providers/app';

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_APP_NAME as string,
    template: `%s :: ${process.env.NEXT_PUBLIC_APP_NAME}`,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const inter = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} className={cn(inter.variable, 'antialiased')}>
      <body className="h-full" suppressHydrationWarning={true}>
        <NextIntlClientProvider>
          <ConfirmMountPoint />

          <AppProvider>
            <>{children}</>
          </AppProvider>

          <Toaster position="top-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

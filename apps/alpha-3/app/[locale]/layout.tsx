import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Inter as FontSans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { cn } from '@alpha-3/utils';

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

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} className={cn(inter.variable, 'antialiased')}>
      <body className="h-full" suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            <>{children}</>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

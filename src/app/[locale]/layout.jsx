import ClientProviders from '@/components/ClientProviders/ClientProviders';
import { I18nProvider } from '@/i18n/context';
import { getDictionary } from '@/i18n/getDictionary';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.common.brand,
    description: dict.common.tagline,
    openGraph: {
      title: dict.common.brand,
      description: dict.common.tagline,
      images: ['/og.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.common.brand,
      description: dict.common.tagline,
      images: ['/og.jpg'],
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <I18nProvider dict={dict} locale={locale}>
      <ClientProviders>{children}</ClientProviders>
    </I18nProvider>
  );
}

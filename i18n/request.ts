import {getRequestConfig} from 'next-intl/server';

const LOCALES = ['en', 'es'] as const;
type Locale = (typeof LOCALES)[number];

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export default getRequestConfig(async ({locale}) => {
  const resolvedLocale: Locale = isLocale(locale) ? locale : 'en';

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default
  };
});

import { createTranslator } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

export async function getTranslator(locale: string) {
  const messages = await import(`../../messages/${locale}.json`).then(
    (module) => module.default,
  );
  return createTranslator({ locale, messages });
}

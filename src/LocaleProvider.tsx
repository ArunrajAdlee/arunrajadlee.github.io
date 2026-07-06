import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from './i18n/config';
import { MESSAGES } from './i18n/messages';
import { LocaleContext } from './locale-context';

const STORAGE_KEY = 'locale';

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && isLocale(stored)) return stored;
  // Fall back to the browser's preferred language, defaulting to English.
  const preferred = window.navigator.language.slice(0, 2).toLowerCase();
  return isLocale(preferred) ? preferred : DEFAULT_LOCALE;
}

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    // Keep the document language in sync for accessibility and SEO.
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggle: () =>
        setLocale((current) => {
          const index = LOCALES.indexOf(current);
          return LOCALES[(index + 1) % LOCALES.length];
        }),
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>
      <IntlProvider
        locale={locale}
        defaultLocale={DEFAULT_LOCALE}
        messages={MESSAGES[locale]}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}

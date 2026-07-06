import { createContext, useContext } from 'react';
import { DEFAULT_LOCALE, type Locale } from './i18n/config';

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  toggle: () => {},
});

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}

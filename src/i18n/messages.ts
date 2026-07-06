import type { Locale } from './config';
import en from './lang/en.json';
import fr from './lang/fr.json';

/**
 * Chrome (UI) strings per locale. Résumé content lives in typed objects
 * (resume.en.ts / resume.fr.ts) and is selected via useResume instead.
 */
export type MessageKey = keyof typeof en;
export type Messages = Record<MessageKey, string>;

export const MESSAGES: Record<Locale, Messages> = {
  en,
  fr,
};
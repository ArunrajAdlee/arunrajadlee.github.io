import { useLocale } from '../locale-context';
import type { Resume } from '../types';
import resumeEn from './resume.en';
import resumeFr from './resume.fr';

const RESUMES: Record<string, Resume> = {
  en: resumeEn,
  fr: resumeFr,
};

/** Returns the résumé content for the active locale. */
export default function useResume(): Resume {
  const { locale } = useLocale();
  return RESUMES[locale];
}

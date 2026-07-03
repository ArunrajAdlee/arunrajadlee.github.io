import { alpha, type Theme } from '@mui/material/styles';
import type { CSSObject } from '@mui/material/styles';

/**
 * Shared surface style for the content cards used across sections.
 * A function of the theme so the accent glow and overlays adapt to the
 * active color mode.
 */
export const cardSx = (theme: Theme): CSSObject => {
  const isDark = theme.palette.mode === 'dark';
  const accent = theme.palette.primary.main;
  return {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    backgroundImage: isDark
      ? 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0) 42%)'
      : 'linear-gradient(180deg, rgba(15,23,42,0.03), rgba(15,23,42,0) 42%)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: theme.spacing(3),
    boxShadow: isDark
      ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 2px rgba(0,0,0,0.45)'
      : 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(15,23,42,0.06)',
    transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
    padding: theme.spacing(2.5),
    [theme.breakpoints.up('md')]: { padding: theme.spacing(3) },
    '&:hover': {
      borderColor: accent,
      transform: 'translateY(-2px)',
      boxShadow: isDark
        ? `inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 32px ${alpha(accent, 0.14)}`
        : `inset 0 1px 0 rgba(255,255,255,0.6), 0 12px 32px ${alpha(accent, 0.18)}`,
    },
  };
};

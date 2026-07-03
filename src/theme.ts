import { createTheme, alpha, type PaletteMode } from '@mui/material/styles';

export type ColorMode = PaletteMode;

// Accent per mode: dark keeps the Houston Rockets red, light uses electric blue.
const ACCENTS: Record<ColorMode, string> = {
  dark: '#CE1141', // Rockets red
  light: '#0A66FF', // electric blue
};

// Surface color
export const SURFACE: Record<ColorMode, string> = {
  dark: '#0c0c0f',
  light: '#f6f8fb',
};

export function createAppTheme(mode: ColorMode) {
  const accent = ACCENTS[mode];
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: { main: accent },
      secondary: { main: isDark ? '#C4CED4' : '#64748b' },
      background: {
        default: SURFACE[mode],
        paper: isDark ? '#16161b' : '#ffffff',
      },
      text: {
        primary: isDark ? '#f2f2f3' : '#12131a',
        secondary: isDark ? '#a1a1aa' : '#586072',
      },
      divider: isDark ? 'rgba(212, 212, 216, 0.14)' : 'rgba(15, 23, 42, 0.12)',
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily:
        '"Inter", "Segoe UI", system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.03em' },
      h2: { fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontWeight: 700, letterSpacing: '-0.02em' },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth' },
          body: {
            backgroundColor: SURFACE[mode],
            // subtle ambient glow tinted with the mode's accent
            backgroundImage:
              `radial-gradient(60rem 60rem at 70% -10%, ${alpha(accent, isDark ? 0.16 : 0.1)}, transparent 60%),` +
              `radial-gradient(50rem 50rem at -10% 10%, ${alpha(accent, isDark ? 0.08 : 0.06)}, transparent 55%)`,
            backgroundAttachment: 'fixed',
          },
          '::selection': {
            background: alpha(accent, 0.35),
          },
          '@media (prefers-reduced-motion: reduce)': {
            html: { scrollBehavior: 'auto' },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  });
}

export default createAppTheme('dark');

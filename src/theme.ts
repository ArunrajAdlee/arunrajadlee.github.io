import { createTheme } from '@mui/material/styles';

const ACCENT = '#64ffda';
const ACCENT_2 = '#7c5cff';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: ACCENT },
    secondary: { main: ACCENT_2 },
    background: {
      default: '#0a0e17',
      paper: '#111725',
    },
    text: {
      primary: '#e6edf3',
      secondary: '#9aa7b8',
    },
    divider: 'rgba(148, 163, 184, 0.16)',
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
          backgroundColor: '#0a0e17',
          // subtle ambient glow
          backgroundImage:
            'radial-gradient(60rem 60rem at 70% -10%, rgba(124,92,255,0.12), transparent 60%),' +
            'radial-gradient(50rem 50rem at -10% 10%, rgba(100,255,218,0.10), transparent 55%)',
          backgroundAttachment: 'fixed',
        },
        '::selection': {
          background: 'rgba(100,255,218,0.30)',
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

export default theme;

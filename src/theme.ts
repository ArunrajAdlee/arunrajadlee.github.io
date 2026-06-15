import { createTheme } from '@mui/material/styles';

// Houston Rockets palette: red primary, silver secondary, near-black surfaces.
const ACCENT = '#CE1141'; // Rockets red
const ACCENT_2 = '#C4CED4'; // Rockets silver

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: ACCENT },
    secondary: { main: ACCENT_2 },
    background: {
      default: '#0c0c0f',
      paper: '#16161b',
    },
    text: {
      primary: '#f2f2f3',
      secondary: '#a1a1aa',
    },
    divider: 'rgba(212, 212, 216, 0.14)',
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
          backgroundColor: '#0c0c0f',
          // subtle ambient glow
          backgroundImage:
            'radial-gradient(60rem 60rem at 70% -10%, rgba(206,17,65,0.16), transparent 60%),' +
            'radial-gradient(50rem 50rem at -10% 10%, rgba(206,17,65,0.08), transparent 55%)',
          backgroundAttachment: 'fixed',
        },
        '::selection': {
          background: 'rgba(206,17,65,0.35)',
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

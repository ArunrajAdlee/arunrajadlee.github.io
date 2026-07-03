import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme, SURFACE, type ColorMode } from './theme';
import { ColorModeContext } from './color-mode';

const STORAGE_KEY = 'color-mode';

function getInitialMode(): ColorMode {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  // Fall back to the OS preference, defaulting to the brand's dark theme.
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

export default function ThemeModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mode, setMode] = useState<ColorMode>(getInitialMode);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
    // Keep the browser chrome (address bar / color-scheme) in sync.
    document.documentElement.style.colorScheme = mode;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', SURFACE[mode]);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggle: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

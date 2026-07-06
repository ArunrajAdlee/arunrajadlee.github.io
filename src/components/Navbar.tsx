import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DownloadIcon from '@mui/icons-material/Download';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { FormattedMessage, useIntl } from 'react-intl';
import useResume from '../data/useResume';
import { useColorMode } from '../color-mode';
import { useLocale } from '../locale-context';
import { LOCALE_LABELS } from '../i18n/config';

const NAV_LINKS = [
  { id: 'nav.about', href: '#about' },
  { id: 'nav.skills', href: '#skills' },
  { id: 'nav.experience', href: '#experience' },
  { id: 'nav.github', href: '#github' },
  { id: 'nav.education', href: '#education' },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { mode, toggle } = useColorMode();
  const { locale, toggle: toggleLocale } = useLocale();
  const { formatMessage } = useIntl();
  const resume = useResume();
  const nextLocale = locale === 'en' ? 'fr' : 'en';
  const elevated = useScrollTrigger({
    disableHysteresis: true,
    threshold: 16,
  });

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        bgcolor: elevated
          ? (theme) => alpha(theme.palette.background.default, 0.78)
          : 'transparent',
        backdropFilter: elevated ? 'blur(12px)' : 'none',
        borderBottom: elevated ? '1px solid' : '1px solid transparent',
        borderColor: 'divider',
        transition: 'background-color 0.3s, border-color 0.3s',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Link
            href='#hero'
            underline='none'
            sx={{
              display: 'flex',
              fontWeight: 800,
              fontSize: '1.05rem',
              color: 'text.primary',
              letterSpacing: '-0.02em',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box>
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt=''
                width={32}
                style={{ marginTop: '6px' }}
              ></img>
            </Box>
            AAA
            <Box component='span' sx={{ color: 'primary.main' }}>
              .
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {NAV_LINKS.map((l) => (
              <Button
                key={l.href}
                href={l.href}
                color='inherit'
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                <FormattedMessage id={l.id} />
              </Button>
            ))}
            <Button
              href={resume.profile.resumeUrl}
              target='_blank'
              rel='noopener'
              variant='outlined'
              color='primary'
              startIcon={<DownloadIcon />}
              sx={{ ml: 1 }}
            >
              <FormattedMessage id='nav.resume' />
            </Button>
          </Box>

          <Button
            color='inherit'
            onClick={toggleLocale}
            startIcon={<TranslateIcon />}
            aria-label={formatMessage(
              { id: 'nav.switchLanguage' },
              { label: LOCALE_LABELS[nextLocale] },
            )}
            sx={{
              minWidth: 0,
              color: 'text.secondary',
              fontWeight: 700,
              '&:hover': { color: 'text.primary' },
            }}
          >
            {locale.toUpperCase()}
          </Button>

          <IconButton
            color='inherit'
            onClick={toggle}
            aria-label={formatMessage(
              { id: 'nav.switchTheme' },
              { mode: mode === 'dark' ? 'light' : 'dark' },
            )}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
            }}
          >
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <IconButton
            edge='end'
            color='inherit'
            aria-label={formatMessage({ id: 'nav.openMenu' })}
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{ width: 240 }}
          role='presentation'
          onClick={() => setOpen(false)}
        >
          <List>
            {NAV_LINKS.map((l) => (
              <ListItem key={l.href} disablePadding>
                <ListItemButton component='a' href={l.href}>
                  <ListItemText primary={formatMessage({ id: l.id })} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                component='a'
                href={resume.profile.resumeUrl}
                target='_blank'
                rel='noopener'
              >
                <ListItemText primary={formatMessage({ id: 'nav.resume' })} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

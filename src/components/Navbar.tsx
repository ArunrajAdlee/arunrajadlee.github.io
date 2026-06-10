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
import { useState } from 'react';
import resume from '../data/resume';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const elevated = useScrollTrigger({
    disableHysteresis: true,
    threshold: 16,
  });

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        bgcolor: elevated ? 'rgba(10,14,23,0.78)' : 'transparent',
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
                src='/favicon.png'
                width={32}
                style={{ marginTop: '6px' }}
              ></img>
            </Box>
            AA
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
                {l.label}
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
              Résumé
            </Button>
          </Box>

          <IconButton
            edge='end'
            color='inherit'
            aria-label='Open navigation menu'
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
                  <ListItemText primary={l.label} />
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
                <ListItemText primary='Résumé' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

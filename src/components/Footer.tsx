import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/PhoneOutlined';
import resume from '../data/resume';

export default function Footer() {
  const { profile } = resume;
  const year = new Date().getFullYear();

  return (
    <Box
      component='footer'
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 6,
        textAlign: 'center',
      }}
    >
      <Container maxWidth='md'>
        <Typography variant='h5' sx={{ mb: 1 }}>
          Let&apos;s build something.
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
          Open to new opportunities — reach out any time.
        </Typography>

        <Stack
          direction='row'
          spacing={1}
          sx={{ justifyContent: 'center', mb: 3 }}
        >
          <IconButton
            aria-label='Email Anton'
            href={`mailto:${profile.email}`}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            aria-label="Anton's LinkedIn profile"
            href={profile.linkedin}
            target='_blank'
            rel='noopener'
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            aria-label="Anton's GitHub profile"
            href={profile.github}
            target='_blank'
            rel='noopener'
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            aria-label='Call Anton'
            href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <PhoneIcon />
          </IconButton>
        </Stack>

        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          © {year} {profile.name} · Built with React, TypeScript & MUI
        </Typography>
      </Container>
    </Box>
  );
}

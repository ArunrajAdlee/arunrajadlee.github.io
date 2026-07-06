import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/PhoneOutlined';
import { FormattedMessage, useIntl } from 'react-intl';
import useResume from '../data/useResume';

export default function Footer() {
  const { formatMessage } = useIntl();
  const { profile } = useResume();
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
          <FormattedMessage id='footer.heading' />
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
          <FormattedMessage id='footer.subheading' />
        </Typography>

        <Stack
          direction='row'
          spacing={1}
          sx={{ justifyContent: 'center', mb: 3 }}
        >
          <IconButton
            aria-label={formatMessage({ id: 'footer.emailAria' })}
            href={`mailto:${profile.email}`}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            aria-label={formatMessage({ id: 'footer.linkedinAria' })}
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
            aria-label={formatMessage({ id: 'footer.githubAria' })}
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
            aria-label={formatMessage({ id: 'footer.callAria' })}
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
          <FormattedMessage
            id='footer.builtWith'
            values={{ year, name: profile.name }}
          />
        </Typography>
      </Container>
    </Box>
  );
}

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import DownloadIcon from '@mui/icons-material/Download';
import { motion, useReducedMotion } from 'framer-motion';
import resume from '../data/resume';

const MotionBox = motion(Box);

export default function Hero() {
  const reduce = useReducedMotion();
  const { profile } = resume;

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Box
      id='hero'
      component='header'
      sx={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth='md'>
        <MotionBox
          initial={reduce ? false : 'hidden'}
          animate='show'
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
        >
          <MotionBox variants={item} transition={{ duration: 0.5 }}>
            <Typography
              variant='overline'
              sx={{ color: 'primary.main', letterSpacing: '0.22em' }}
            >
              {profile.location}
            </Typography>
          </MotionBox>

          <MotionBox variants={item} transition={{ duration: 0.5 }}>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '2.75rem', sm: '4rem', md: '5rem' },
                mt: 1,
              }}
            >
              {profile.name}
            </Typography>
          </MotionBox>

          <MotionBox variants={item} transition={{ duration: 0.5 }}>
            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: '1.5rem', md: '2.25rem' },
                color: 'text.secondary',
                mt: 1,
              }}
            >
              {profile.title}
            </Typography>
          </MotionBox>

          <MotionBox variants={item} transition={{ duration: 0.5 }}>
            <Typography
              sx={{
                mt: 3,
                maxWidth: 620,
                fontSize: { xs: '1.05rem', md: '1.2rem' },
                color: 'text.secondary',
                lineHeight: 1.7,
              }}
            >
              {profile.tagline}
            </Typography>
          </MotionBox>

          <MotionBox variants={item} transition={{ duration: 0.5 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                size='large'
                variant='contained'
                color='primary'
                startIcon={<EmailIcon />}
                href={`mailto:${profile.email}`}
              >
                Get in touch
              </Button>
              <Button
                size='large'
                variant='outlined'
                color='inherit'
                startIcon={<LinkedInIcon />}
                href={profile.linkedin}
                target='_blank'
                rel='noopener'
              >
                LinkedIn
              </Button>
              <Button
                size='large'
                variant='outlined'
                color='inherit'
                startIcon={<GitHubIcon />}
                href={profile.github}
                target='_blank'
                rel='noopener'
              >
                GitHub
              </Button>
              <Button
                size='large'
                variant='text'
                color='inherit'
                startIcon={<DownloadIcon />}
                href={profile.resumeUrl}
                target='_blank'
                rel='noopener'
              >
                Download résumé
              </Button>
            </Stack>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}

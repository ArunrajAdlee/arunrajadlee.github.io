import { Box, Stack, Typography } from '@mui/material';
import Section from './Section';
import resume from '../data/resume';

const BLURBS = [
  {
    emojis: ['🚀'],
    label: 'Full-Stack, Root to Branch',
    index: 0,
    align: 'flex-start',
  },
  {
    emojis: ['🤝'],
    label: 'Wired for Collaboration',
    index: 1,
    align: 'flex-start',
  },
  {
    emojis: ['🎮', '🐶', '🏀'],
    label: 'Off the Clock',
    index: 2,
    align: 'center',
  },
];

export default function About() {
  return (
    <Section id='about' eyebrow='01 — Introduction' title='About'>
      <Stack spacing={3} sx={{ maxWidth: 800 }}>
        {BLURBS.map(({ emojis, label, index, align }) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              gap: { xs: 2, md: 3 },
              alignItems: align,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: { xs: 2.5, md: 3 },
              transition: 'border-color 0.25s',
              '&:hover': { borderColor: 'primary.main' },
            }}
          >
            <Stack
              direction='column'
              alignItems='center'
              spacing={3}
              sx={{ flexShrink: 0 }}
            >
              {emojis.map((emoji) => (
                <Typography
                  key={emoji}
                  component='span'
                  sx={{
                    fontSize: { xs: '1.75rem', md: '2rem' },
                    lineHeight: 1,
                  }}
                  role='img'
                  aria-label={emoji}
                >
                  {emoji}
                </Typography>
              ))}
            </Stack>
            <Box>
              <Typography
                variant='overline'
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  display: 'block',
                  mb: 0.75,
                }}
              >
                {label}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.97rem', md: '1.05rem' },
                  color: 'text.secondary',
                  lineHeight: 1.8,
                }}
              >
                {resume.about[index]}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Section>
  );
}

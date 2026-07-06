import { Box, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import Section from './Section';
import useResume from '../data/useResume';
import { cardSx } from '../styles/card';

const BLURBS = [
  {
    emojis: ['🚀'],
    labelId: 'about.blurb1',
    index: 0,
    align: 'flex-start',
  },
  {
    emojis: ['🤝'],
    labelId: 'about.blurb2',
    index: 1,
    align: 'flex-start',
  },
  {
    emojis: ['🎮', '🐶', '🏀'],
    labelId: 'about.blurb3',
    index: 2,
    align: 'center',
  },
] as const;

export default function About() {
  const { formatMessage } = useIntl();
  const resume = useResume();
  return (
    <Section
      id='about'
      eyebrow={formatMessage({ id: 'section.about.eyebrow' })}
      title={formatMessage({ id: 'section.about.title' })}
    >
      <Stack spacing={3} sx={{ maxWidth: 800 }}>
        {BLURBS.map(({ emojis, labelId, index, align }) => (
          <Box
            key={index}
            sx={(theme) => ({
              ...cardSx(theme),
              display: 'flex',
              gap: { xs: 2, md: 3 },
              alignItems: align,
            })}
          >
            <Stack
              direction='column'
              spacing={3}
              sx={{ flexShrink: 0, alignItems: 'center' }}
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
                {formatMessage({ id: labelId })}
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

import { Typography } from '@mui/material';
import Section from './Section';
import resume from '../data/resume';

export default function About() {
  return (
    <Section id='about' eyebrow='01 — Introduction' title='About'>
      <Typography
        sx={{
          fontSize: { xs: '1.05rem', md: '1.2rem' },
          color: 'text.secondary',
          lineHeight: 1.85,
          maxWidth: 760,
        }}
      >
        {resume.summary}
      </Typography>
    </Section>
  );
}

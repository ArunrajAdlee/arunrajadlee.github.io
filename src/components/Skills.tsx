import { Box, Chip, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import Section from './Section';
import SkillGraph from './SkillGraph';
import useSkillListMode from '../hooks/useSkillListMode';
import useResume from '../data/useResume';

export default function Skills() {
  const { formatMessage } = useIntl();
  const resume = useResume();
  const listMode = useSkillListMode();
  return (
    <Section
      id='skills'
      maxWidth={listMode ? 'md' : 'lg'}
      eyebrow={formatMessage({ id: 'section.skills.eyebrow' })}
      title={formatMessage({ id: 'section.skills.title' })}
    >
      <SkillGraph />

      <Box sx={{ mt: 5 }}>
        <Typography
          variant='overline'
          sx={{ color: 'text.secondary', letterSpacing: '0.14em' }}
        >
          {formatMessage({ id: 'skills.languages' })}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {resume.languages.map((language) => (
            <Chip
              key={language}
              label={language}
              variant='outlined'
              sx={{
                borderColor: 'divider',
                bgcolor: 'background.paper',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                },
                transition: 'color 0.2s, border-color 0.2s',
              }}
            />
          ))}
        </Box>
      </Box>
    </Section>
  );
}

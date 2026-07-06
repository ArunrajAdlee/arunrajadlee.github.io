import { Box, Chip, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import Section from './Section';
import useResume from '../data/useResume';

export default function Skills() {
  const { formatMessage } = useIntl();
  const resume = useResume();
  return (
    <Section
      id='skills'
      eyebrow={formatMessage({ id: 'section.skills.eyebrow' })}
      title={formatMessage({ id: 'section.skills.title' })}
    >
      <Stack spacing={4}>
        {resume.skills.map((group) => (
          <Box key={group.label}>
            <Typography variant='h6' sx={{ color: 'text.primary', mb: 1.5 }}>
              {group.label}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {group.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
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
        ))}
      </Stack>
    </Section>
  );
}

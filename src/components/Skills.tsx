import { Box, Chip, Stack, Typography } from '@mui/material';
import Section from './Section';
import resume from '../data/resume';

export default function Skills() {
  return (
    <Section id='skills' eyebrow='02 — Toolbox' title='Skills'>
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

import { Box, Stack, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import Section from './Section';
import resume from '../data/resume';

export default function Education() {
  return (
    <Section id='education' eyebrow='04 — Background' title='Education'>
      <Stack spacing={2.5}>
        {resume.education.map((ed) => (
          <Box
            key={ed.institution}
            sx={{
              display: 'flex',
              gap: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: { xs: 2.5, md: 3 },
            }}
          >
            <SchoolIcon sx={{ color: 'primary.main', mt: 0.5 }} />
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Typography variant='h6' component='h3'>
                  {ed.institution}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {ed.period}
                </Typography>
              </Box>
              <Typography sx={{ color: 'primary.main', mb: 1 }}>
                {ed.credential}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {ed.location} · {ed.details.join(' · ')}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Section>
  );
}

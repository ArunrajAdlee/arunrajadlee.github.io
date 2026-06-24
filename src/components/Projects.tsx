import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import Section from './Section';
import resume from '../data/resume';
import { cardSx } from '../styles/card';

export default function Projects() {
  return (
    <Section id='projects' eyebrow="04 — Things I've built" title='Projects'>
      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        }}
      >
        {resume.projects.map((project) => (
          <Box
            key={project.name}
            sx={{
              ...cardSx,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                mb: 1,
              }}
            >
              <Typography variant='h6' component='h3'>
                {project.name}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Tooltip title='View source on GitHub'>
                  <IconButton
                    component='a'
                    href={project.github}
                    target='_blank'
                    rel='noopener'
                    size='small'
                    aria-label={`${project.name} source on GitHub`}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    <GitHubIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
                {project.demo && (
                  <Tooltip title='Open live demo'>
                    <IconButton
                      component='a'
                      href={project.demo}
                      target='_blank'
                      rel='noopener'
                      size='small'
                      aria-label={`${project.name} live demo`}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      <LaunchIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>

            <Typography
              sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2, flex: 1 }}
            >
              {project.description}
            </Typography>

            <Stack direction='row' sx={{ flexWrap: 'wrap', gap: 1 }}>
              {project.tech.map((tech) => (
                <Chip
                  key={tech}
                  size='small'
                  label={tech}
                  variant='outlined'
                  sx={{ borderColor: 'divider', color: 'text.secondary' }}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Box>
    </Section>
  );
}

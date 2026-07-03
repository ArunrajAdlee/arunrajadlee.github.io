import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRightAlt';
import { alpha } from '@mui/material/styles';
import type { Experience } from '../types';
import { cardSx } from '../styles/card';

export default function ExperienceItem({ role }: { role: Experience }) {
  return (
    <Box sx={cardSx}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: 1,
          mb: 0.5,
        }}
      >
        <Typography variant='h6' component='h3'>
          {role.title}
        </Typography>
        <Typography sx={{ color: 'primary.main', fontWeight: 600 }}>
          · {role.company}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        <Chip
          size='small'
          label={`${role.start} – ${role.end}`}
          sx={(theme) => ({
            bgcolor: alpha(theme.palette.primary.main, 0.15),
            color: 'primary.main',
          })}
        />
        <Chip
          size='small'
          variant='outlined'
          label={role.location}
          sx={{ borderColor: 'divider', color: 'text.secondary' }}
        />
      </Box>

      <List dense disablePadding>
        {role.bullets.map((bullet, i) => (
          <ListItem
            key={i}
            disableGutters
            alignItems='flex-start'
            sx={{ py: 0.5 }}
          >
            <ListItemIcon
              sx={{ minWidth: 28, mt: '2px', color: 'primary.main' }}
            >
              <ArrowRightIcon fontSize='small' />
            </ListItemIcon>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              {bullet}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

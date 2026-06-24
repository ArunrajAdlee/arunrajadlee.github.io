import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Shared surface style for the content cards used across sections
 */
export const cardSx = {
  position: 'relative',
  bgcolor: 'background.paper',
  backgroundImage:
    'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0) 42%)',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 3,
  p: { xs: 2.5, md: 3 },
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 2px rgba(0,0,0,0.45)',
  transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
  '&:hover': {
    borderColor: 'primary.main',
    transform: 'translateY(-2px)',
    boxShadow:
      'inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 32px rgba(206,17,65,0.14)',
  },
} satisfies SxProps<Theme>;

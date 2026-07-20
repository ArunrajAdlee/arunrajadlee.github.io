import { useMediaQuery, useTheme } from '@mui/material';
import { useReducedMotion } from 'framer-motion';

/**
 * Whether the Skills section falls back to the static list instead of the force
 * graph.
 * On small screens or for prefers-reduced-motion users, it displays the static list
 */
export default function useSkillListMode(): boolean {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return isSmall || Boolean(reduce);
}

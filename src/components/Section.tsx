import { Box, Container, Typography } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

/**
 * Shared section wrapper: anchor id, consistent padding, an optional heading,
 * and a Framer Motion reveal that respects prefers-reduced-motion.
 */
export default function Section({
  id,
  title,
  eyebrow,
  children,
  maxWidth = 'md',
}: SectionProps) {
  const reduce = useReducedMotion();

  return (
    <Box
      component='section'
      id={id}
      sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: '72px' }}
    >
      <Container maxWidth={maxWidth}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {(eyebrow || title) && (
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
              {eyebrow && (
                <Typography
                  variant='overline'
                  sx={{ color: 'primary.main', letterSpacing: '0.18em' }}
                >
                  {eyebrow}
                </Typography>
              )}
              {title && (
                <Typography variant='h3' component='h2' sx={{ mt: 0.5 }}>
                  {title}
                </Typography>
              )}
            </Box>
          )}
          {children}
        </motion.div>
      </Container>
    </Box>
  );
}

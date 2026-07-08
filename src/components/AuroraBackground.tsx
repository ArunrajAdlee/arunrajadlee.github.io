import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion, useReducedMotion } from 'framer-motion';

const MotionBox = motion(Box);

type Blob = {
  /** radial-gradient blob diameter */
  size: string;
  /** resting position, as CSS inset values */
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  /** accent opacity at the blob core */
  opacity: number;
  /** hue nudge (deg) so blobs read as related-but-distinct tints */
  hue: number;
  /** drift keyframes (px) and loop duration (s) */
  x: number[];
  y: number[];
  scale: number[];
  duration: number;
};

const BLOBS: Blob[] = [
  {
    size: '46rem',
    top: '-12rem',
    right: '-8rem',
    opacity: 0.5,
    hue: 0,
    x: [0, -320, 160, 0],
    y: [0, 220, -140, 0],
    scale: [1, 1.25, 0.85, 1],
    duration: 18,
  },
  {
    size: '38rem',
    top: '30%',
    left: '-10rem',
    opacity: 0.4,
    hue: -18,
    x: [0, 300, -180, 0],
    y: [0, -260, 180, 0],
    scale: [1, 1.2, 0.9, 1],
    duration: 22,
  },
  {
    size: '34rem',
    bottom: '-10rem',
    left: '35%',
    opacity: 0.35,
    hue: 22,
    x: [0, -260, 240, 0],
    y: [0, 200, -160, 0],
    scale: [1, 0.85, 1.2, 1],
    duration: 26,
  },
];

/**
 * Slow-drifting, blurred accent-colored orbs painted behind all page content.
 */
export default function AuroraBackground() {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const accent = theme.palette.primary.main;
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
        // 'screen' lifts color on the dark surface; 'multiply' keeps the light
        // theme from washing out to a muddy grey.
        '& > *': { mixBlendMode: isDark ? 'screen' : 'multiply' },
      }}
    >
      {BLOBS.map((blob, i) => (
        <MotionBox
          key={i}
          sx={{
            position: 'absolute',
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            filter: `blur(60px) hue-rotate(${blob.hue}deg)`,
            background: `radial-gradient(circle at center, ${alpha(
              accent,
              blob.opacity * (isDark ? 1 : 0.7),
            )} 0%, transparent 70%)`,
            willChange: 'transform',
          }}
          animate={
            reduce ? undefined : { x: blob.x, y: blob.y, scale: blob.scale }
          }
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}
    </Box>
  );
}

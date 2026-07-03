import { Box, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion, useReducedMotion } from 'framer-motion';
import resume from '../data/resume';
import useGitHubContributions, {
  type ContributionDay,
} from '../hooks/useGitHubContributions';

const MotionBox = motion(Box);

const CELL = 11; // px square size
const GAP = 3; // px gap between squares
const GUTTER = 26; // px width of the weekday label column
const WEEKDAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/** Parse an ISO calendar date as local midnight so weekday math is stable. */
function parseDate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

/**
 * Group the flat day list into week-columns aligned so row index === weekday
 * (0 = Sunday), padding the first column when the year doesn't start on Sunday.
 */
function buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return [];
  const offset = parseDate(days[0].date).getDay();
  const padded: (ContributionDay | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...days,
  ];
  const weeks: (ContributionDay | null)[][] = [];
  for (let dayIndex = 0; dayIndex < padded.length; dayIndex += 7) {
    weeks.push(padded.slice(dayIndex, dayIndex + 7));
  }
  return weeks;
}

/** Month abbreviation to show above a column when its month differs from the previous one. */
function monthLabel(
  weeks: (ContributionDay | null)[][],
  index: number,
): string {
  const firstDay = weeks[index].find(
    (day): day is ContributionDay => day !== null,
  );
  if (!firstDay) return '';

  const month = parseDate(firstDay.date).getMonth();
  if (index === 0) return '';

  const previousFirstDay = weeks[index - 1].find(
    (day): day is ContributionDay => day !== null,
  );
  const previousMonth = previousFirstDay
    ? parseDate(previousFirstDay.date).getMonth()
    : -1;
  return month !== previousMonth ? MONTHS[month] : '';
}

function formatDate(iso: string): string {
  return parseDate(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ContributionGraph() {
  const reduce = useReducedMotion();
  const theme = useTheme();
  const { days, total, loading, error } = useGitHubContributions(
    resume.profile.github,
  );

  const accent = theme.palette.primary.main;
  const isDark = theme.palette.mode === 'dark';
  // Empty cell first, then the accent scale ramping up by intensity.
  const LEVEL_COLORS = [
    isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)',
    alpha(accent, 0.3),
    alpha(accent, 0.52),
    alpha(accent, 0.76),
    accent,
  ];
  const cellOutline = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(15,23,42,0.06)';

  if (loading) {
    return (
      <Skeleton
        variant='rounded'
        height={140}
        sx={{ borderRadius: 2, mb: { xs: 3, md: 4 } }}
      />
    );
  }

  // If the third-party service is down, just hide it.
  if (error || days.length === 0) return null;

  const weeks = buildWeeks(days);

  return (
    <Box sx={{ mb: { xs: 3, md: 4 } }}>
      <Box
        sx={{
          overflowX: 'auto',
          pb: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: 'inline-flex', flexDirection: 'column' }}>
          {/* Month labels */}
          <Box
            sx={{ display: 'flex', ml: `${GUTTER}px`, mb: 0.75, height: 16 }}
          >
            {weeks.map((_, weekIndex) => (
              <Box
                key={weekIndex}
                sx={{ width: CELL, mr: `${GAP}px`, flexShrink: 0 }}
              >
                <Typography
                  variant='caption'
                  sx={{
                    fontSize: 10,
                    color: 'text.secondary',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {monthLabel(weeks, weekIndex)}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex' }}>
            {/* Weekday labels */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: `${GAP}px`,
                width: GUTTER,
                flexShrink: 0,
              }}
            >
              {WEEKDAY_LABELS.map((label, rowIndex) => (
                <Box
                  key={rowIndex}
                  sx={{ height: CELL, display: 'flex', alignItems: 'center' }}
                >
                  <Typography
                    variant='caption'
                    sx={{ fontSize: 9, color: 'text.secondary' }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Week columns */}
            <Box sx={{ display: 'flex', gap: `${GAP}px` }}>
              {weeks.map((week, weekIndex) => (
                <MotionBox
                  key={weekIndex}
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: weekIndex * 0.01 }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: `${GAP}px`,
                  }}
                >
                  {week.map((day, dayIndex) =>
                    day ? (
                      <Tooltip
                        key={dayIndex}
                        arrow
                        title={`${day.count} contribution${
                          day.count === 1 ? '' : 's'
                        } on ${formatDate(day.date)}`}
                      >
                        <Box
                          sx={{
                            width: CELL,
                            height: CELL,
                            borderRadius: '2px',
                            bgcolor: LEVEL_COLORS[day.level],
                            outline: `1px solid ${cellOutline}`,
                            outlineOffset: '-1px',
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Box key={dayIndex} sx={{ width: CELL, height: CELL }} />
                    ),
                  )}
                </MotionBox>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer: total + legend */}
      <Stack
        direction='row'
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1,
          mt: 1,
        }}
      >
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {total.toLocaleString()} contributions in the last year
        </Typography>
        <Stack
          direction='row'
          spacing={0.75}
          sx={{ alignItems: 'center', color: 'text.secondary' }}
        >
          <Typography variant='caption'>Less</Typography>
          {LEVEL_COLORS.map((color) => (
            <Box
              key={color}
              sx={{
                width: CELL,
                height: CELL,
                borderRadius: '2px',
                bgcolor: color,
              }}
            />
          ))}
          <Typography variant='caption'>More</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

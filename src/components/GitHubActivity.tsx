import { Box, Button, Link, Skeleton, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import Section from './Section';
import resume from '../data/resume';
import { cardSx } from '../styles/card';
import useGitHubActivity, { type GitHubRepo } from '../hooks/useGitHubActivity';
import ContributionGraph from './ContributionGraph';

/** Brand-ish colors for the languages likely to show up in these repos. */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Scala: '#c22d40',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Python: '#3572A5',
  Java: '#b07219',
  'C#': '#178600',
  Shell: '#89e051',
  Vue: '#41b883',
  Dockerfile: '#384d54',
};

function languageColor(language: string | null): string {
  if (!language) return '#6e7681';
  return LANGUAGE_COLORS[language] ?? '#6e7681';
}

/** "3 days ago" style relative time from an ISO timestamp. */
function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const seconds = Math.round((Date.now() - then) / 1000);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const divisions: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4.34524, 'week'],
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year'],
  ];
  let duration = seconds;
  for (const [amount, unit] of divisions) {
    if (Math.abs(duration) < amount) {
      return rtf.format(-Math.round(duration), unit);
    }
    duration /= amount;
  }
  return '';
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <Box>
      <Typography
        component='span'
        sx={{ fontWeight: 700, fontSize: '1.25rem', color: 'text.primary' }}
      >
        {value}
      </Typography>{' '}
      <Typography component='span' sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
    </Box>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <Box
      component='a'
      href={repo.htmlUrl}
      target='_blank'
      rel='noopener'
      sx={(theme) => ({
        ...cardSx(theme),
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
      })}
    >
      <Stack direction='row' spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
        <GitHubIcon fontSize='small' sx={{ color: 'text.secondary' }} />
        <Typography
          variant='h6'
          component='h3'
          sx={{ color: 'primary.main', wordBreak: 'break-word' }}
        >
          {repo.name}
        </Typography>
      </Stack>

      <Typography
        sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2, flex: 1 }}
      >
        {repo.description ?? 'No description provided.'}
      </Typography>

      <Stack
        direction='row'
        spacing={2}
        sx={{ alignItems: 'center', color: 'text.secondary', flexWrap: 'wrap' }}
      >
        {repo.language && (
          <Stack direction='row' spacing={0.75} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                bgcolor: languageColor(repo.language),
              }}
            />
            <Typography variant='body2'>{repo.language}</Typography>
          </Stack>
        )}
        {repo.stargazers > 0 && (
          <Stack direction='row' spacing={0.5} sx={{ alignItems: 'center' }}>
            <StarBorderIcon sx={{ fontSize: 16 }} />
            <Typography variant='body2'>{repo.stargazers}</Typography>
          </Stack>
        )}
        {repo.forks > 0 && (
          <Stack direction='row' spacing={0.5} sx={{ alignItems: 'center' }}>
            <ForkRightIcon sx={{ fontSize: 16 }} />
            <Typography variant='body2'>{repo.forks}</Typography>
          </Stack>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant='body2'>
          Updated {timeAgo(repo.pushedAt)}
        </Typography>
      </Stack>
    </Box>
  );
}

export default function GitHubActivity() {
  const { user, repos, loading, error } = useGitHubActivity(
    resume.profile.github,
  );

  return (
    <Section
      id='github'
      eyebrow='04 — Live from GitHub'
      title='GitHub Activity'
    >
      {loading && (
        <>
          <Skeleton variant='text' width={280} height={32} sx={{ mb: 3 }} />
          <Box
            sx={{
              display: 'grid',
              gap: 2.5,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                variant='rounded'
                height={150}
                sx={{ borderRadius: 3 }}
              />
            ))}
          </Box>
        </>
      )}

      {!loading && error && (
        <Box sx={(theme) => ({ ...cardSx(theme), textAlign: 'center' })}>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Couldn't load live GitHub data right now — but the repos are all
            there.
          </Typography>
          <Button
            variant='outlined'
            color='primary'
            startIcon={<GitHubIcon />}
            href={resume.profile.github}
            target='_blank'
            rel='noopener'
          >
            View GitHub profile
          </Button>
        </Box>
      )}

      {!loading && !error && (
        <>
          {user && (
            <Stack
              direction='row'
              spacing={3}
              sx={{ mb: { xs: 3, md: 4 }, flexWrap: 'wrap', rowGap: 1 }}
            >
              <Stat value={user.publicRepos} label='public repos' />
              <Stat value={user.followers} label='followers' />
              <Stat value={user.following} label='following' />
              <Box sx={{ flexGrow: 1 }} />
              <Link
                href={user.htmlUrl}
                target='_blank'
                rel='noopener'
                underline='hover'
                sx={{
                  color: 'text.secondary',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <GitHubIcon fontSize='small' />@{user.login}
              </Link>
            </Stack>
          )}

          <ContributionGraph />

          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Most recently active repositories, pulled live from the GitHub API.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gap: 2.5,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            }}
          >
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </Box>
        </>
      )}
    </Section>
  );
}

import { useEffect, useState } from 'react';

/**
 * Live GitHub data pulled from the public REST API (no token required).
 * Unauthenticated requests are rate-limited to 60/hour per IP, which is
 * comfortably within budget for a personal portfolio. The hook fails
 * gracefully so the section can fall back to a link to the profile.
 */

export interface GitHubUser {
  login: string;
  htmlUrl: string;
  avatarUrl: string;
  name: string | null;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  htmlUrl: string;
  description: string | null;
  language: string | null;
  stargazers: number;
  forks: number;
  pushedAt: string;
}

interface GitHubActivity {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loading: boolean;
  error: boolean;
}

const API = 'https://api.github.com';

/** Pull the GitHub handle out of a profile URL like https://github.com/foo */
export function usernameFromUrl(url: string): string {
  return url.replace(/\/+$/, '').split('/').pop() ?? '';
}

export default function useGitHubActivity(
  profileUrl: string,
  repoCount = 6,
): GitHubActivity {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const username = usernameFromUrl(profileUrl);
        if (!username) throw new Error('No GitHub username in profile URL');

        const headers = { Accept: 'application/vnd.github+json' };
        const [userRes, reposRes] = await Promise.all([
          fetch(`${API}/users/${username}`, {
            headers,
            signal: controller.signal,
          }),
          fetch(
            `${API}/users/${username}/repos?type=owner&sort=pushed&per_page=100`,
            { headers, signal: controller.signal },
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error('GitHub API request failed');
        }

        const userJson = await userRes.json();
        const reposJson: Array<Record<string, unknown>> = await reposRes.json();

        setUser({
          login: userJson.login,
          htmlUrl: userJson.html_url,
          avatarUrl: userJson.avatar_url,
          name: userJson.name,
          bio: userJson.bio,
          publicRepos: userJson.public_repos,
          followers: userJson.followers,
          following: userJson.following,
        });

        setRepos(
          reposJson
            .filter((repo) => !repo.fork)
            .slice(0, repoCount)
            .map((repo) => ({
              id: repo.id as number,
              name: repo.name as string,
              htmlUrl: repo.html_url as string,
              description: (repo.description as string | null) ?? null,
              language: (repo.language as string | null) ?? null,
              stargazers: (repo.stargazers_count as number) ?? 0,
              forks: (repo.forks_count as number) ?? 0,
              pushedAt: repo.pushed_at as string,
            })),
        );
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [profileUrl, repoCount]);

  return { user, repos, loading, error };
}

import { useEffect, useState } from 'react';
import { usernameFromUrl } from './useGitHubActivity';

export interface ContributionDay {
  date: string; // e.g. "2025-06-29"
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // pre-bucketed intensity
}

interface ContributionData {
  days: ContributionDay[];
  total: number;
  loading: boolean;
  error: boolean;
}

// Third party endpoint which serves github api data
const API = 'https://github-contributions-api.jogruber.de/v4';

export default function useGitHubContributions(
  profileUrl: string,
): ContributionData {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState(0);
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

        const res = await fetch(`${API}/${username}?y=last`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Contributions API request failed');

        const json = await res.json();
        setDays(json.contributions ?? []);
        setTotal(json.total?.lastYear ?? 0);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
    // Abort on unmount
    return () => controller.abort();
  }, [profileUrl]);

  return { days, total, loading, error };
}

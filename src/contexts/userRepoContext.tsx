import type { GitHubRepo } from '@/lib/types';
import { createContext, useContext } from 'react';

type RepoContextType = {
  repos: GitHubRepo[];
  setRepos: (repos: GitHubRepo[]) => void;
};

export const repoContext = createContext<RepoContextType>({
  repos: [],
  setRepos: () => {},
});

export function useRepoContext() {
  return useContext(repoContext);
}

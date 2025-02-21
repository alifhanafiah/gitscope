'use client';

import type { GitHubRepo } from '@/lib/types';
import { useState } from 'react';
import { repoContext } from './userRepoContext';

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  return (
    <repoContext.Provider value={{ repos, setRepos }}>
      {children}
    </repoContext.Provider>
  );
}

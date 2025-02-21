'use client';

import { useRepoContext } from '@/contexts/userRepoContext';
import styles from '@/styles/repolist.module.css';
import Link from 'next/link';

export default function RepoList() {
  const { repos } = useRepoContext();

  if (!repos || repos.length === 0) return null;

  // Assume all repos are from the same user.
  const username = repos[0].owner.login;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Repositories for {username}</h2>
      <ul className={styles.list}>
        {repos.map((repo) => (
          <li key={repo.id} className={styles.item}>
            <Link
              href={`/readme/${repo.owner.login}/${repo.name}`}
              className={styles.link}
            >
              {repo.name}
            </Link>
            {repo.description && (
              <p className={styles.description}>{repo.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

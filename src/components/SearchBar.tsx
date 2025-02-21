'use client';

import { useRepoContext } from '@/contexts/userRepoContext';
import { fetchUserRepos } from '@/lib/actions';
import styles from '@/styles/searchbar.module.css';
import { useRef } from 'react';

export default function SearchBar() {
  const ref = useRef<HTMLFormElement>(null);
  const { setRepos } = useRepoContext();

  return (
    <form
      ref={ref}
      action={async (formData: FormData) => {
        const result = await fetchUserRepos(formData);

        if (result?.error) {
          alert('Error: ' + result.message);
          return;
        }

        setRepos(result.repos);
        ref.current?.reset();
      }}
      className={styles.wrapper}
    >
      <label htmlFor="search-input" className={styles.label}>
        <input
          id="search-input"
          name="username"
          className={styles.bar}
          type="text"
          placeholder="Who are you searching for?"
          title="Search"
          aria-label="Search"
        />
      </label>
    </form>
  );
}

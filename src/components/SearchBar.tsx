'use client';

import styles from '@/styles/searchbar.module.css';
import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = 'Who are you searching for?',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (onSearch) onSearch(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="search-input" className={styles.label}>
        <input
          id="search-input"
          className={styles.bar}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          title="Search"
          aria-label="Search"
        />
      </label>
    </div>
  );
}

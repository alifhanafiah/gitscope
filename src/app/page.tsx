import SearchBar from '@/components/SearchBar';
import Title from '@/components/Title';
import styles from '@/styles/page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <Title />
      </div>

      <SearchBar />
    </div>
  );
}

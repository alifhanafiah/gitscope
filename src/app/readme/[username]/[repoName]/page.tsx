import MarkdownRenderer from '@/components/MarkdownRenderer';
import { fetchRepoReadmeByParams } from '@/lib/actions';
import styles from '@/styles/readme.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type ReadmePageProps = {
  params: Promise<{
    username: string;
    repoName: string;
  }>;
};

export default async function ReadmePage({ params }: ReadmePageProps) {
  const { username, repoName } = await params;
  const result = await fetchRepoReadmeByParams(username, repoName);

  if (result.error) {
    if (result.message === 'Repository not found or no README available') {
      return (
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>{repoName} README</h1>
            <Link href="/" className={styles.backButton}>
              Back
            </Link>
          </header>
          <div className={styles.content}>
            <p className={styles.noReadme}>
              This repository does not have a README.
            </p>
          </div>
        </div>
      );
    } else {
      notFound();
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{repoName} README</h1>
        <Link href="/" className={styles.backButton}>
          Back
        </Link>
      </header>
      <div className={styles.content}>
        <MarkdownRenderer content={result.readme || ''} />
      </div>
    </div>
  );
}

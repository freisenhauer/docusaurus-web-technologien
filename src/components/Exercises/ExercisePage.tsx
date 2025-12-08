import React, {ReactElement} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ReactMarkdown from 'react-markdown';
import styles from './ExercisePage.module.css';

interface Exercise {
  name: string;
  path: string;
  url: string;
  readme: string | null;
}

interface ExerciseData {
  exercise: Exercise;
  chapter: {
    name: string;
    url: string;
  };
}

interface ExercisePageProps {
  exerciseData: ExerciseData;
}

function formatName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function ExercisePage({ exerciseData }: ExercisePageProps): ReactElement {
  const { exercise, chapter } = exerciseData;
  const exerciseName = formatName(exercise.name);
  const chapterName = formatName(chapter.name);

  return (
    <Layout
      title={exerciseName}
      description={`Übung: ${exerciseName}`}
    >
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to="/uebungen">Übungen</Link>
          <span className={styles.separator}>/</span>
          <Link to={`/uebungen/${chapter.name}`}>{chapterName}</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{exerciseName}</span>
        </nav>

        <header className={styles.header}>
          <p className={styles.chapterLabel}>{chapterName}</p>
          <div className={styles.titleRow}>
            <h1>{exerciseName}</h1>
            <Link
              to={exercise.url}
              className={styles.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              Zur Übung auf GitHub
            </Link>
          </div>
        </header>

        <article className={styles.content}>
          {exercise.readme ? (
            <ReactMarkdown>{exercise.readme}</ReactMarkdown>
          ) : (
            <p className={styles.noContent}>Keine Beschreibung verfügbar.</p>
          )}
        </article>
      </div>
    </Layout>
  );
}
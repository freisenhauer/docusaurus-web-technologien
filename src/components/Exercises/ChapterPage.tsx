import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './ChapterPage.module.css';

interface Exercise {
  name: string;
  path: string;
  url: string;
  readme: string | null;
}

interface ChapterData {
  chapter: string;
  url: string;
  exercises: Exercise[];
}

interface ChapterPageProps {
  chapterData: ChapterData;
}

function formatChapterName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatExerciseName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractFirstParagraph(markdown: string | null): string {
  if (!markdown) return 'Keine Beschreibung verfügbar.';

  // Remove title (first line starting with #)
  const lines = markdown.split('\n');
  const contentLines = lines.filter(line => !line.startsWith('#'));

  // Find first non-empty paragraph
  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i].trim();
    if (line.length > 0 && !line.startsWith('```')) {
      return line;
    }
  }

  return 'Keine Beschreibung verfügbar.';
}

export default function ChapterPage({ chapterData }: ChapterPageProps): JSX.Element {
  const chapterName = formatChapterName(chapterData.chapter);

  return (
    <Layout
      title={`Übungen: ${chapterName}`}
      description={`Übungen zum Kapitel ${chapterName}`}
    >
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to="/uebungen">← Zurück zur Übersicht</Link>
        </nav>

        <header className={styles.header}>
          <h1>{chapterName}</h1>
          <Link
            to={chapterData.url}
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
            Kapitel auf GitHub ansehen
          </Link>
        </header>

        <div className={styles.exercisesGrid}>
          {chapterData.exercises.map((exercise, index) => (
            <Link
              key={index}
              to={`/uebungen/${chapterData.chapter}/${exercise.name}`}
              className={styles.exerciseCard}
            >
              <h3 className={styles.exerciseTitle}>
                {formatExerciseName(exercise.name)}
              </h3>
              <p className={styles.exerciseDescription}>
                {extractFirstParagraph(exercise.readme)}
              </p>
              <span className={styles.exerciseLink}>
                Zur Übung →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
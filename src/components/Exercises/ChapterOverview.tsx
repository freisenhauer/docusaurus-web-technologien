import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';
import styles from './ChapterOverview.module.css';

interface Exercise {
  name: string;
  path: string;
  url: string;
  readme: string | null;
}

interface Chapter {
  chapter: string;
  url: string;
  exercises: Exercise[];
}

interface ExercisesData {
  exercises: Chapter[];
}

function formatChapterName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function ChapterOverview(): JSX.Element {
  const data = usePluginData('fetch-exercises-plugin') as ExercisesData;

  if (!data || !data.exercises || data.exercises.length === 0) {
    return (
      <div className={styles.container}>
        <p>Keine Übungen verfügbar.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.chaptersGrid}>
        {data.exercises.map((chapter, index) => (
          <Link
            key={index}
            to={`/uebungen/${chapter.chapter}`}
            className={styles.chapterCard}
          >
            <div className={styles.chapterHeader}>
              <h2 className={styles.chapterTitle}>
                {formatChapterName(chapter.chapter)}
              </h2>
              <span className={styles.exerciseCount}>
                {chapter.exercises.length} {chapter.exercises.length === 1 ? 'Übung' : 'Übungen'}
              </span>
            </div>
            <div className={styles.chapterFooter}>
              <span className={styles.viewLink}>
                Übungen ansehen →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
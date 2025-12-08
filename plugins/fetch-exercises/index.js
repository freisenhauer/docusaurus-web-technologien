const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'freisenhauer';
const REPO_NAME = 'uebungen-web-technologien';
const EXERCISES_PATH = 'uebungen';

async function fetchGitHubContent(path) {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchExercises() {
  console.log('Fetching exercises from GitHub...');

  try {
    // Get main exercise directories
    const mainDirs = await fetchGitHubContent(EXERCISES_PATH);

    const exercises = [];

    for (const dir of mainDirs) {
      if (dir.type !== 'dir') continue;

      console.log(`Processing chapter: ${dir.name}`);

      // Get subdirectories (individual exercises)
      const exerciseDirs = await fetchGitHubContent(dir.path);

      const chapterExercises = [];

      for (const exerciseDir of exerciseDirs) {
        if (exerciseDir.type !== 'dir') continue;

        console.log(`  - Processing exercise: ${exerciseDir.name}`);

        // Try to fetch README.md
        try {
          const readmeContent = await fetchGitHubContent(`${exerciseDir.path}/README.md`);

          if (readmeContent.content) {
            // Decode base64 content
            const readme = Buffer.from(readmeContent.content, 'base64').toString('utf-8');

            chapterExercises.push({
              name: exerciseDir.name,
              path: exerciseDir.path,
              url: exerciseDir.html_url,
              readme: readme,
            });
          }
        } catch (error) {
          console.warn(`    Warning: Could not fetch README for ${exerciseDir.name}`);
          chapterExercises.push({
            name: exerciseDir.name,
            path: exerciseDir.path,
            url: exerciseDir.html_url,
            readme: null,
          });
        }
      }

      exercises.push({
        chapter: dir.name,
        url: dir.html_url,
        exercises: chapterExercises,
      });
    }

    console.log(`Successfully fetched ${exercises.length} chapters`);
    return exercises;

  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
}

module.exports = function (context, options) {
  return {
    name: 'fetch-exercises-plugin',

    async loadContent() {
      const exercises = await fetchExercises();
      return exercises;
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData, createData, addRoute } = actions;

      // Make exercises available globally
      setGlobalData({ exercises: content });

      // Also save to a JSON file for backup/debugging
      const outputPath = path.join(context.siteDir, '.docusaurus', 'exercises.json');
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, JSON.stringify(content, null, 2));

      console.log(`Exercises data saved to ${outputPath}`);

      // Create routes for each chapter and exercise
      for (const chapter of content) {
        const chapterSlug = chapter.chapter;

        // Create chapter data file
        const chapterDataPath = await createData(
          `exercises-chapter-${chapterSlug}.json`,
          JSON.stringify(chapter)
        );

        // Add route for chapter overview page
        addRoute({
          path: `/uebungen/${chapterSlug}`,
          component: '@site/src/components/Exercises/ChapterPage.tsx',
          exact: true,
          modules: {
            chapterData: chapterDataPath,
          },
        });

        // Create routes for individual exercises
        for (const exercise of chapter.exercises) {
          const exerciseSlug = exercise.name;

          // Create exercise data file
          const exerciseDataPath = await createData(
            `exercises-${chapterSlug}-${exerciseSlug}.json`,
            JSON.stringify({ exercise, chapter: { name: chapter.chapter, url: chapter.url } })
          );

          // Add route for individual exercise page
          addRoute({
            path: `/uebungen/${chapterSlug}/${exerciseSlug}`,
            component: '@site/src/components/Exercises/ExercisePage.tsx',
            exact: true,
            modules: {
              exerciseData: exerciseDataPath,
            },
          });
        }
      }

      console.log(`Created routes for ${content.length} chapters`);
    },
  };
};
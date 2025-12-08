import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

function DarkModeToggleContent() {
  const [mounted, setMounted] = React.useState(false);
  const [colorMode, setColorMode] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    setMounted(true);
    // Get initial color mode from document
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setColorMode(isDark ? 'dark' : 'light');

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setColorMode(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const toggleColorMode = () => {
    const newMode = colorMode === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newMode);
    localStorage.setItem('theme', newMode);
    setColorMode(newMode);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.darkModeTeaser}>
      <p className={styles.darkModeText}>
        Das einzige Hochschulskript der Welt mit Dark Theme
      </p>
      <button
        className={styles.darkModeToggle}
        onClick={toggleColorMode}
        aria-label="Toggle dark mode"
      >
        {colorMode === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
}

export default function DarkModeToggle() {
  return (
    <BrowserOnly fallback={<div style={{height: '80px'}} />}>
      {() => <DarkModeToggleContent />}
    </BrowserOnly>
  );
}

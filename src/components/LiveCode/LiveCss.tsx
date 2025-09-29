import React from "react";
import Editor from "react-simple-code-editor";
import clsx from "clsx";
import styles from "./LiveCode.module.css"; // Styles wiederverwenden

/**
 * LiveCss – CSS- und HTML-Editor mit Live-Preview
 * - initialCss: Start-CSS (editierbar)
 * - initialHtml: HTML-Grundgerüst für die Vorschau
 * - Auto-Render bei Änderungen (debounced)
 */
export default function LiveCss({
                                  initialCss,
                                  initialHtml,
                                  previewHeight = 320,
                                  debounceMs = 200,
                                  onRender,
                                }: {
  initialCss?: string;
  initialHtml?: string;
  previewHeight?: number;
  debounceMs?: number;
  onRender?: () => void;
}) {
  const [css, setCss] = React.useState(initialCss);
  const [html, setHtml] = React.useState(initialHtml);
  const frameRef = React.useRef<HTMLIFrameElement | null>(null);
  const debounceRef = React.useRef<number | null>(null);

  const srcdoc = React.useMemo(() => buildSrcDoc(html, css), [html, css]);

  // Auto-Render mit Debounce
  React.useEffect(() => {
    if (!frameRef.current) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      if (frameRef.current) frameRef.current.srcdoc = srcdoc;
      onRender?.();
    }, debounceMs);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [srcdoc, debounceMs, onRender]);

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.grid)}>
        <div className={clsx(styles.editorWrap)}>
          <Editor
            value={css}
            onValueChange={setCss}
            highlight={(c) => escapeHtml(c)}
            padding={14}
            className={clsx(styles.editor)}
            style={{ minHeight: 220 }}
          />
        </div>
        <div className={clsx(styles.editorWrap)}>
          <Editor
            value={html}
            onValueChange={setHtml}
            highlight={(c) => escapeHtml(c)}
            padding={14}
            className={clsx(styles.editor)}
            style={{ minHeight: 220 }}
          />
        </div>
      </div>

      <div className={clsx(styles.previewWrap)}>
        <iframe
          ref={frameRef}
          sandbox="allow-forms allow-pointer-lock allow-popups allow-modals" // keine Scripts
          className={clsx(styles.previewFrame)}
          style={{ height: previewHeight }}
          title="CSS preview"
        />
      </div>
    </div>
  );
}

function buildSrcDoc(html: string, css: string) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<style>
${css}
</style>
</head>
<body>
${html}
</body>
</html>`;
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

import React, { useRef, useState } from "react";
import Editor from "react-simple-code-editor";
import clsx from "clsx";
import styles from "./LiveCode.module.css";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";

/**
 * LiveHtml – HTML-Renderer im selben Stil wie LiveJavascript
 * - initialHtml als Prop (vorausgefüllt, editierbar)
 * - Rendert in sandboxed <iframe> (standardmäßig OHNE Scripts)
 * - Optional: onRender (Callback nach Render), previewHeight, renderLabel, allowScripts
 * - SSR-safe: highlight escapet HTML
 */
export default function LiveHtml({
                                   initialHtml = "",
                                   onRender,
                                   previewHeight = 300,
                                   allowScripts = false,
                                   debounceMs = 200,
                                 }: {
  initialHtml?: string;
  onRender?: () => void;
  previewHeight?: number;
  allowScripts?: boolean;
  debounceMs?: number;
}) {
  const [html, setHtml] = useState(initialHtml);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const debounceRef = useRef<number | null>(null);


  const sandbox = allowScripts
    ? "allow-scripts allow-forms allow-pointer-lock allow-popups allow-modals"
    : "allow-forms allow-pointer-lock allow-popups allow-modals";

  // Wrap HTML with default dark mode styles
  const wrappedHtml = React.useMemo(() => {
    const isDark = typeof document !== 'undefined' &&
                   document.documentElement.getAttribute('data-theme') === 'dark';
    const baseStyles = isDark ? 'color: white; background: transparent;' : '';
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>body { ${baseStyles} }</style>
</head>
<body>${html}</body>
</html>`;
  }, [html]);

// Auto-Render bei Änderungen mit Debounce
  React.useEffect(() => {
    if (!frameRef.current) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      if (frameRef.current) {
        frameRef.current.srcdoc = wrappedHtml;
        onRender?.();
      }
    }, debounceMs);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [wrappedHtml, debounceMs, onRender]);


  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.editorWrap)}>
        <Editor
          value={html}
          onValueChange={setHtml}
          highlight={(c) => Prism.highlight(c, Prism.languages.markup,"markup")}
          padding={14}
          className={clsx(styles.editor)}
          style={{ minHeight: 220 }}
        />
      </div>


      <div className={clsx(styles.previewWrap)}>
        <iframe
          ref={frameRef}
          sandbox={sandbox}
          className={clsx(styles.previewFrame)}
          style={{ height: previewHeight }}
          title="HTML preview"
        />
      </div>
    </div>
  );
}

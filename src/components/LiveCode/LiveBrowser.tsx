import React from "react";
import Editor from "react-simple-code-editor";
import clsx from "clsx";
import styles from "./LiveCode.module.css";

import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";

type LiveBrowserProps = {
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  previewHeight?: number;
  debounceMs?: number;
  allowScripts?: boolean; // muss true sein, damit JS im iframe läuft
  onRender?: () => void;
};

export default function LiveBrowser({
                                      initialHtml,
                                      initialCss,
                                      initialJs,
                                      previewHeight = 340,
                                      debounceMs = 200,
                                      allowScripts = true,
                                      onRender,
                                    }: LiveBrowserProps) {
  const [html, setHtml] = React.useState(initialHtml);
  const [css, setCss] = React.useState(initialCss);
  const [js, setJs] = React.useState(initialJs);

  const frameRef = React.useRef<HTMLIFrameElement | null>(null);
  const debounceRef = React.useRef<number | null>(null);

  const sandbox = allowScripts
    ? "allow-scripts allow-forms allow-pointer-lock allow-popups allow-modals"
    : "allow-forms allow-pointer-lock allow-popups allow-modals";

  const srcdoc = React.useMemo(() => buildSrcDoc(html, css, js), [html, css, js]);

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
      {/* HTML */}
      <div className={clsx(styles.editorWrap)}>
        <Editor
          value={html}
          onValueChange={setHtml}
          highlight={(c) => Prism.highlight(c, Prism.languages.markup, "markup")}
          padding={14}
          className={clsx(styles.editor)}
          style={{ minHeight: 180 }}
        />
      </div>

      {/* CSS */}
      <div className={clsx(styles.editorWrap)}>
        <Editor
          value={css}
          onValueChange={setCss}
          highlight={(c) => Prism.highlight(c, Prism.languages.css, "css")}
          padding={14}
          className={clsx(styles.editor)}
          style={{ minHeight: 180 }}
        />
      </div>

      {/* JS */}
      <div className={clsx(styles.editorWrap)}>
        <Editor
          value={js}
          onValueChange={setJs}
          highlight={(c) => Prism.highlight(c, Prism.languages.javascript, "javascript")}
          padding={14}
          className={clsx(styles.editor)}
          style={{ minHeight: 180 }}
        />
      </div>

      {/* Preview */}
      <div className={clsx(styles.previewWrap)}>
        <iframe
          ref={frameRef}
          sandbox={sandbox}
          className={clsx(styles.previewFrame)}
          style={{ height: previewHeight }}
          title="Live Browser Preview"
        />
      </div>
    </div>
  );
}

function buildSrcDoc(html: string, css: string, js: string) {
  // Wir behandeln `html` als Fragment und setzen es in einen gültigen HTML-Frame ein.
  // JS wird am Ende des Bodys in einem IIFE ausgeführt (async bereit).
  const wrappedJs = `
<script>
(()=>{ try {
  const run = async () => { ${js} };
  run();
} catch(e){ console.error(e); } })();
</script>`.trim();

  // Wenn Scripts nicht erlaubt sind, ignoriert das iframe den <script>-Block einfach.
  return [
    "<!doctype html>",
    "<html>",
    "<head>",
    '<meta charset="utf-8" />',
    "<style>",
    css || "",
    "</style>",
    "</head>",
    "<body>",
    html || "",
    wrappedJs,
    "</body>",
    "</html>",
  ].join("\n");
}

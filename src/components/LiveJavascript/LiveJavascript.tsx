import React, { useRef, useState } from "react";
import Editor from "react-simple-code-editor";
import clsx from "clsx";
import styles from "./LiveJavascript.module.css"; // Default Import als CSS-Module

/**
 * LiveJavascript (async, ohne PrismJS)
 * - initialCode als Prop
 * - async/top-level await unterstützt
 * - Optional: onRun, timeoutMs, height, runLabel
 */
export default function LiveJavascript({
                                         initialCode = "",
                                         onRun,
                                         timeoutMs = 10000,
                                         height = 220,
                                         runLabel = "Code ausführen",
                                       }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const consoleRef = useRef(null);

  const makeScopedConsole = () => {
    const collected = [];
    const push = (...args) => {
      const line = args
        .map((a) => {
          try {
            return typeof a === "string" ? a : JSON.stringify(a);
          } catch {
            return String(a);
          }
        })
        .join(" ");
      collected.push(line);
    };
    const api = { log: push, info: push, warn: push, error: push };
    consoleRef.current = { api, collected };
    return consoleRef.current;
  };

  const execute = async () => {
    const scoped = makeScopedConsole();
    const wrapped = `return (async () => {\n${code}\n})()`;
    const AsyncFn = new Function("console", "setTimeout", wrapped);
    return AsyncFn(scoped.api, setTimeout);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setLogs([]);

    const start = Date.now();
    try {
      const race = Promise.race([
        execute(),
        new Promise((_, rej) =>
          setTimeout(() => rej(new Error("Timeout überschritten")), timeoutMs)
        ),
      ]);

      const result = await race;
      const duration = Date.now() - start;

      setLogs(consoleRef.current.collected);
      setOutput(`${formatResult(result)}\n\n— Laufzeit: ${duration} ms`);
      onRun?.(result);
    } catch (err) {
      setLogs(consoleRef.current?.collected ?? []);
      setOutput(`Fehler: ${err?.message ?? String(err)}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.editorWrap)}>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(c) => c}
          padding={14}
          className={clsx(styles.editor)}
          style={{ minHeight: height }}
        />
      </div>

      <button
        onClick={runCode}
        disabled={isRunning}
        className={clsx(styles.runBtn, isRunning && styles.runBtnDisabled)}
      >
        {isRunning ? "Läuft…" : runLabel}
      </button>

      <div className={clsx(styles.grid)}>
        <div className={clsx(styles.outputBox)}>
          <div className={clsx(styles.outputLabel)}>Ausgabe</div>
          <pre className={clsx(styles.outputPre)}>{output}</pre>
        </div>
        <div className={clsx(styles.outputBox)}>
          <div className={clsx(styles.outputLabel)}>console</div>
          <pre className={clsx(styles.outputPre)}>{logs.join("\n")}</pre>
        </div>
      </div>
    </div>
  );
}

function formatResult(value) {
  try {
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (value === null || value === undefined) return String(value);
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

// Beispiel-Nutzung in Docusaurus:
// <LiveJavascript initialCode={`console.log('Hallo Welt');`} />

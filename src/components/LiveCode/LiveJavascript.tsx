import React, { useEffect, useRef, useState } from "react";
import Editor from "react-simple-code-editor";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./LiveCode.module.css";

import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";

import { transform } from "sucrase";

type ConsoleLike = {
  log: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
};

type TSDiagnosticView = {
  line: number;
  col: number;
  message: string;
  code: string;
};

type Props = {
  initialCode?: string;
  onRun?: (result: unknown) => void;
  timeoutMs?: number;
  height?: number;
  runLabel?: string;
  language?: "javascript" | "typescript";
  enableTypeDiagnostics?: boolean;
  tsBrowserUrl?: string; // optional override, sonst useBaseUrl("/vendor/typescript.js")
};

export default function LiveJavascript({
                                         initialCode = "",
                                         onRun,
                                         timeoutMs = 10000,
                                         height = 220,
                                         runLabel = "Code ausführen",
                                         language = "javascript",
                                         enableTypeDiagnostics = false,
                                         tsBrowserUrl,
                                       }: Props) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [diags, setDiags] = useState<TSDiagnosticView[]>([]);
  const [tsLoadError, setTsLoadError] = useState<string | null>(null);

  const consoleRef = useRef<{ api: ConsoleLike; collected: string[] } | null>(null);
  const tsRef = useRef<any | null>(null);
  const serviceRef = useRef<any | null>(null); // ts.LanguageService
  const versionRef = useRef<number>(1);        // Script-Version für LS

  const defaultTsUrl = useBaseUrl("/vendor/typescript.js");
  const tsUrl = tsBrowserUrl ?? defaultTsUrl;

  // --- Browser-Shims (verhindern "process is not defined") ---
  function ensureBrowserShims() {
    const w = window as any;
    if (typeof w.process === "undefined") w.process = {};
    if (typeof w.process.env === "undefined") w.process.env = {};
    if (typeof w.process.versions === "undefined") w.process.versions = { node: "0.0.0" };
    if (typeof w.process.version === "undefined") w.process.version = "0.0.0";
    if (typeof w.process.platform === "undefined") w.process.platform = "browser";
    if (typeof w.global === "undefined") w.global = window;
  }

  // --- TS-UMD laden & LanguageService initialisieren ---
  useEffect(() => {
    if (!enableTypeDiagnostics || typeof window === "undefined") return;
    if (tsRef.current && serviceRef.current) return;

    ensureBrowserShims();
    let cancelled = false;

    const script = document.createElement("script");
    script.src = tsUrl;
    script.async = true;

    const fail = (msg: string) => {
      if (cancelled) return;
      setTsLoadError(`[TS] ${msg} – prüfe tsBrowserUrl: ${tsUrl}`);
    };

    script.onload = () => {
      if (cancelled) return;
      const tsAny =
        (window as any).ts || (window as any).typescript || (window as any).tsserver;
      if (!tsAny) {
        fail("UMD geladen, aber window.ts fehlt");
        return;
      }
      tsRef.current = tsAny;

      // In-Memory LanguageService (ein File, keine Libs)
      // Wir hängen ein Preamble davor, damit "console", "window", "document", "setTimeout" existieren.
      const fileName = "file.ts";
      let fileText = makePreamble() + code;

      const host: any = {
        getScriptFileNames: () => [fileName],
        getScriptVersion: () => String(versionRef.current),
        getScriptSnapshot: (name: string) => {
          if (name !== fileName) return undefined;
          return tsAny.ScriptSnapshot.fromString(fileText);
        },
        getCurrentDirectory: () => "/",
        getCompilationSettings: () => ({
          target: tsAny.ScriptTarget.ES2020,
          module: tsAny.ModuleKind.ESNext,
          strict: true,
          noLib: true, // wichtig: keine lib.d.ts laden
          noEmit: true,
          allowJs: false,
        }),
        getDefaultLibFileName: () => "lib.d.ts",
        fileExists: (f: string) => f === fileName,
        readFile: (f: string) => (f === fileName ? fileText : undefined),
        readDirectory: () => [fileName],
      };

      const service = tsAny.createLanguageService(host, tsAny.createDocumentRegistry());
      serviceRef.current = { service, ts: tsAny, fileName, getText: () => fileText, setText: (t: string) => (fileText = t) };
      setTsLoadError(null);

      // Initiale Diagnostik
      runDiagnostics(code);
    };

    script.onerror = () => fail("Script konnte nicht geladen werden (404/Netzwerk)");

    document.head.appendChild(script);
    return () => {
      cancelled = true;
      script.remove();
      serviceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableTypeDiagnostics, tsUrl]);

  // Bei Codeänderung neu diagnostizieren
  useEffect(() => {
    if (!enableTypeDiagnostics) return;
    runDiagnostics(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, language, enableTypeDiagnostics]);

  function makePreamble() {
    // Minimal global ambient decls + Mini-"lib" für Arrays,
    // damit der Language Service Indexzugriffe wie items[0] korrekt typisiert.
    return [
      // Laufzeit-Globals
      "declare var console: any;",
      "declare function setTimeout(handler: any, timeout?: number, ...args: any[]): any;",
      "declare const window: any;",
      "declare const document: any;",

      // --- Mini-Lib: Arrays ---
      "interface Array<T> {",
      "  length: number;",
      "  [n: number]: T;",
      "}",
      "interface ReadonlyArray<T> {",
      "  length: number;",
      "  [n: number]: T;",
      "}",

      // (optional weitere Kleinigkeiten: Record, Promise-Stub, usw. – nur falls nötig)
      "",
    ].join("\n");
  }

  function runDiagnostics(src: string) {
    const svc = serviceRef.current as
      | { service: any; ts: any; fileName: string; getText: () => string; setText: (t: string) => void }
      | null;

    if (!svc || language !== "typescript") {
      setDiags([]);
      return;
    }

    try {
      const pre = makePreamble();
      svc.setText(pre + src);
      versionRef.current++;
      const { service, ts, fileName } = svc;

      // Wir holen syntactic + semantic diagnostics
      const syn = service.getSyntacticDiagnostics(fileName) || [];
      const sem = service.getSemanticDiagnostics(fileName) || [];
      const all = [...syn, ...sem];

      const preLines = pre.split("\n").length;
      const mapped: TSDiagnosticView[] = all.map((d: any) => {
        let line = 1, character = 0;
        if (d.file && typeof d.start === "number") {
          const pos = ts.getLineAndCharacterOfPosition(d.file, d.start);
          line = pos.line + 1 - preLines;     // Preamble abziehen
          character = pos.character + 1;
          if (line < 1) line = 1;             // nicht negativ werden lassen
        }
        const msg = ts.flattenDiagnosticMessageText(d.messageText, "\n");
        const code = d.code != null ? `TS${d.code}` : "TS";
        return { line, col: character, message: msg, code };
      }).filter(d => d.line >= 1); // alle Meldungen aus dem Preamble verwerfen

      setDiags(mapped);
      setTsLoadError(null);
    } catch (e) {
      setTsLoadError(`[TS] Diagnose fehlgeschlagen: ${String(e)}`);
      setDiags([]);
    }
  }

  // Highlighting
  const prismLang =
    language === "typescript" ? Prism.languages.typescript : Prism.languages.javascript;
  const prismId = language === "typescript" ? "typescript" : "javascript";

  // Console-Isolation
  const makeScopedConsole = () => {
    const collected: string[] = [];
    const push = (...args: any[]) => {
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
    const api: ConsoleLike = { log: push, info: push, warn: push, error: push };
    consoleRef.current = { api, collected };
    return consoleRef.current;
  };

  // Transpilierung (Sucrase) – damit die Runtime trotz TS läuft
  const transpileIfNeeded = (src: string) => {
    if (language !== "typescript") return src;
    return transform(src, { transforms: ["typescript"] }).code;
  };

  // Ausführung (top-level await erlaubt)
  const execute = async () => {
    const scoped = makeScopedConsole();
    const compiled = transpileIfNeeded(code);
    const wrapped = `return (async () => {\n${compiled}\n})()`;
    const AsyncFn = new Function("console", "setTimeout", wrapped) as (
      c: ConsoleLike,
      s: typeof setTimeout
    ) => Promise<unknown>;
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

      setLogs(consoleRef.current?.collected ?? []);
      setOutput(`${formatResult(result)}\n\n— Laufzeit: ${duration} ms`);
      onRun?.(result);
    } catch (err: any) {
      setLogs(consoleRef.current?.collected ?? []);
      setOutput(`Fehler: ${err?.message ?? String(err)}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.editorWrap, diags.length > 0 && styles.hasErrors)}>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(c) => Prism.highlight(c, prismLang, prismId)}
          padding={14}
          className={clsx(styles.editor)}
          style={{ minHeight: height }}
        />
      </div>

      {enableTypeDiagnostics && (tsLoadError || diags.length > 0) && (
        <div className={clsx(styles.outputBox)}>
          <div className={clsx(styles.outputLabel)}>TypeScript-Checks</div>
          {tsLoadError ? (
            <pre className={clsx(styles.outputPre)}>{tsLoadError}</pre>
          ) : (
            <ul className={clsx(styles.tsDiagList)}>
              {diags.map((d, i) => (
                <li key={i}>
                  <code>{d.code}</code> – Zeile {d.line}, Spalte {d.col}: {d.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

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

function formatResult(value: unknown) {
  try {
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (value === null || value === undefined) return String(value);
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

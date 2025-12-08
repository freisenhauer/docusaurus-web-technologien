import clsx from "clsx";
import styles from "@site/src/components/HomepageFeatures/styles.module.css";
import FeatureRow from "../FeatureRow";
import Intro, {IntroHeader} from "../Intro";
import Link from "@docusaurus/Link";
import React from "react";
import {Icon, IconInfo} from "@mittwald/flow-react-components";

function ScriptIntro() {
  return (
    <Intro>
      <IntroHeader>
        <Icon>
          <IconInfo />
        </Icon>
        <h3>
            Skript
        </h3>
      </IntroHeader>
      <p>
        Das gesamte Script inklusive aller Informationen, die für die Vorlesung und die Prüfung benötigt werden
      </p>
    </Intro>
  );
}

function Script() {
  return (
    <>
      <h3>
        Skript
      </h3>
      <p>
        Die Vorlesung stützt sich vollständig auf das Skript.
        Die Folien, die zur Begleitung der Vorlesung erstellt wurden, sind nur als Ergänzung gedacht und enthalten keine neuen Informationen.
        Die wichtigsten Folien wurden im Skript eingebettet.
      </p>
      <p>
        <ul>
          <li>
            <Link href="/docs/Kategorien von Web-Applikationen">
              Hier gehts zum Skript als Webversion
            </Link>
          </li>
          <li>
            <Link href="/web-technologien-skript.pdf" target="_blank">
              Hier gehts zum Skript als PDF-Download
            </Link>
            <br />
            <small style={{ color: 'var(--ifm-color-content-secondary, #525860)' }}>
              Hinweis: Die PDF wird automatisch generiert. Es können vereinzelt komische Seitenumbrüche vorkommen.
            </small>
          </li>
        </ul>
      </p>
      <p>
          Fehlen dir Informationen im Skript oder hast du Verbesserungsvorschläge?{" "}
        <Link href="https://github.com/freisenhauer/docusaurus-web-technologien/issues">
            Erstelle hier ein Issue!
        </Link>
      </p>
    </>
  );
}


export default function SkriptFeature() {
  return (
    <FeatureRow>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--4")}>
            <ScriptIntro />
          </div>
          <div className={clsx("col col--8")}>
            <div className={clsx("padding--md", styles.feature)}>
              <Script />
            </div>
          </div>
        </div>
      </div>
    </FeatureRow>
  );
}

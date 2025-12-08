import clsx from "clsx";
import styles from "@site/src/components/HomepageFeatures/styles.module.css";
import FeatureRow from "../FeatureRow";
import Intro, {IntroHeader} from "../Intro";
import Link from "@docusaurus/Link";
import React from "react";
import {Icon, IconCode} from "@mittwald/flow-react-components";

function UebungenIntro() {
  return (
    <Intro>
      <IntroHeader>
        <Icon>
          <IconCode />
        </Icon>
        <h3>
          Übungen
        </h3>
      </IntroHeader>
      <p>
        Praktische Übungen zu jedem Kapitel der Vorlesung, um das Gelernte direkt anzuwenden
      </p>
    </Intro>
  );
}

function Uebungen() {
  return (
    <>
      <h3>
        Übungen
      </h3>
      <p>
        Zu den wichtigsten Kapiteln der Vorlesung gibt es praktische Übungen.
        Die Übungen sind nach Themengebieten strukturiert und bauen auf den Inhalten der Vorlesung auf.
      </p>
      <p>
        <ul>
          <li>
            <Link href="/uebungen">
              Hier gehts zur Übersicht aller Übungen
            </Link>
          </li>
          <li>
            <Link href="https://github.com/freisenhauer/uebungen-web-technologien" target="_blank">
              Hier gehts zum Übungs-Repository auf GitHub
            </Link>
          </li>
        </ul>
      </p>
      <p>
        Die Übungen sind optional, aber sehr empfohlen, um die Inhalte der Vorlesung zu vertiefen und praktische Erfahrung zu sammeln.
      </p>
    </>
  );
}


export default function UebungenFeature() {
  return (
    <FeatureRow>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--4")}>
            <UebungenIntro />
          </div>
          <div className={clsx("col col--8")}>
            <div className={clsx("padding--md", styles.feature)}>
              <Uebungen />
            </div>
          </div>
        </div>
      </div>
    </FeatureRow>
  );
}
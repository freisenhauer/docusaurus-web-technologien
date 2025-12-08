import clsx from "clsx";
import styles from "@site/src/components/HomepageFeatures/styles.module.css";
import FeatureRow from "../FeatureRow";
import Intro, {IntroHeader} from "../Intro";
import Link from "@docusaurus/Link";
import React from "react";
import {Icon, IconEdit} from "@mittwald/flow-react-components";

function PruefungsleistungIntro() {
  return (
    <Intro>
      <IntroHeader>
        <Icon>
          <IconEdit />
        </Icon>
        <h3>
          Prüfungsleistung
        </h3>
      </IntroHeader>
      <p>
        Informationen zu den Themen für die Prüfungsleistung und zur Projektarbeit
      </p>
    </Intro>
  );
}

function Pruefungsleistung() {
  return (
    <>
      <h3>
        Prüfungsleistung
      </h3>
      <p>
        Im Rahmen der Prüfungsleistung entwickelst du in einer Gruppe eine Web-Applikation zu einem vorgegebenen Thema.
        Die Applikation wird in der Prüfung vorgestellt.
      </p>
      <p>
        <ul>
          <li>
            <Link href="/pruefungsleistung">
              Hier geht es zu den verfügbaren Themen
            </Link>
          </li>
        </ul>
      </p>
    </>
  );
}


export default function PruefungsleistungFeature() {
  return (
    <FeatureRow variant={true}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--4")}>
            <PruefungsleistungIntro />
          </div>
          <div className={clsx("col col--8")}>
            <div className={clsx("padding--md", styles.feature)}>
              <Pruefungsleistung />
            </div>
          </div>
        </div>
      </div>
    </FeatureRow>
  );
}

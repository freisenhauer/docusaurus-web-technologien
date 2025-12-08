import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";

import styles from "./index.module.css";
import SkriptFeature from "@site/src/components/HomepageFeatures/SkriptFeature";
import UebungenFeature from "@site/src/components/HomepageFeatures/UebungenFeature";
import PruefungsleistungFeature from "@site/src/components/HomepageFeatures/PruefungsleistungFeature";
import DarkModeToggle from "@site/src/components/DarkModeToggle";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {Heading} from "@mittwald/flow-react-components";

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Diese Website begleitet die Vorlesung Web-Technologien von Frederic Reisenhauer an der Privaten Hochschule für Wirtschaft und Technik (phwt)."
    >
      <div className={styles.wrapper}>
        <HomepageHeader />
        <main className={"index"}>
          <SkriptFeature />
          <UebungenFeature />
          <PruefungsleistungFeature />
        </main>
      </div>
    </Layout>
  );
}

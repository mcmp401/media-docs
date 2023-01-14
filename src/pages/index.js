import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>Media Network</>,
    imageUrl: "about-intro",
    description: (
      <>
        A secure, transparent, and blockchain-agnostic CDN Marketplace.
      </>
    ),
  }, //
  {
    title: <>Media Edge</>,
    imageUrl: "media-edge-about",
    description: <>Participate in the marketplace as a provider and receive MEDIA rewards.</>
  },
  {
    title: <>Media App</>,
    imageUrl: "media-app-about",
    description: <>Front-end interface for the Media Network protocol.</>
  },

  {
    title: <>Media Contracts</>,
    imageUrl: "ms-about",
    description: <>Decentralized & censorship-resistant marketplace for CDN services.</>
  },

];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4 aos-init aos-animate", styles.feature)}>
      {imgUrl && (
        <Link className="navbar_link" to={imgUrl}>
          <div className="tab mt-3">
            <h3>{title}</h3>
            <p className="lead mb-0">{description}</p>
          </div>
        </Link>
      )}
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title="Media Network"
      description="Documentation"
    >
      {/* <header className={clsx("hero hero--primary", styles.heroBanner)}> */}
      {/* <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p> */}
      {/* <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div> */}
      {/* </div> */}
      {/* </header> */}
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row cards__container">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;

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
         A new architecture for a highly-scalable, decentralized and censorship-resistant dCDN.
      </>
    ),
  }, //
  {
    title: <>Media Edge</>,
    imageUrl: "media-edge-about",
    description: <>Participate in the network as a node provider and receive MEDIA rewards.</>
  },
  {
    title: <>Media PeerPool</>,
    imageUrl: "peerpool-about",
    description: <>A peer-assisted solution enabling end users to share content between each other.</>
  },

  {
    title: <>Media Server</>,
    imageUrl: "ms-about",
    description: <>Build a simple live streaming platform using Media Server and Media Network.</>
  },

  {
    title: <>IPFS Integration</>,
    imageUrl: "ipfs-about",
    description: <>Install and run an IPFS node serving its content to the world through Media Network.</>
  },
  {
    title: <>Arweave Integration</>,
    imageUrl: "ar-about",
    description: <>Install and run an Arweave gateway using Media Network as the distribution layer.</>,
  },
  {
    title: <>Storj Integration</>,
    imageUrl: "storj-about",
    description: <>Install and run a Storj DCS gateway using Media Network as the distribution layer.</>
  },
  {
    title: <>Owncast Integration</>,
    imageUrl: "owncast-about",
    description: <>Take control over your content and stream it yourself with Owncast + Media Network.</>
  },
  {
    title: <>Uniswap Front-End</>,
    imageUrl: "uniswap-about",
    description: <>Run an Uniswap front-end with your own rules, powered by IPFS & Media Network</>
  },
  {
    title: <>Livepeer</>,
    imageUrl: "livepeer-about",
    description: <>Learn how to transcode your videos with Livepeer and deliver them via Media's CDN</>
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

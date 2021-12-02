module.exports = {
  title: "Documentation",
  tagline:
    "A Peer-to-Peer Content Delivery Network",
  url: "https://media.network/",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "mediafoundation", // Usually your GitHub org/user name.
  projectName: "documentation", // Usually your repo name.
  themeConfig: {
    image: "https://media.network/images/mediasocial.jpg",
    colorMode: {
        disableSwitch: false,
      },
    sidebarCollapsible: true,
    navbar: {
      title: "Documentation",
      logo: {
        alt: "Media Network Logo",
        src: "https://media.network/images/medianetwork.svg",
        srcDark: "https://media.network/images/medianetwork.svg",
      },
      items: [
        {
          href: "https://t.me/Media_FDN",
          label: "Chat",
          position: "right",
        },
        {
          href: "https://github.com/mediafoundation",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Misc",
          items: [
            {
              label: "Launch App",
              href: "https://app.media.network",
            },
            {
              label: "Back to home",
              href: "https://media.network",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Twitter",
              href: "https://twitter.com/Media_FDN",
            },
            {
              label: "Telegram",
              href: "https://t.me/Media_FDN",
            },
            {
              label: "Discord",
              href: "https://discord.com/invite/wwSw3J7F2j",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/mediafoundation",
            },
            {
              label: "Whitepaper",
              href: "https://media.network/whitepaper.pdf",
            },
            {
              label: "Coingecko",
              href: "https://www.coingecko.com/en/coins/media-network",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Media Foundation`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          path: "src",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};

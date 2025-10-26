import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Niall's Blog",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "google", tagID: 'G-0J1ZT7T2L0',
    },
    locale: "en-US",
    baseUrl: "niallbell.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#FFFAF3",           // soft neutral background
          lightgray: "#dcdcdc",       // subtle borders
          gray: "#a0a0a0",            // graph links, heavier borders
          darkgray: "#3a3a3a",        // body text (dark grey)
          dark: "#1f1f1f",            // header text and icons
          secondary: "#517885",       // link color, current graph node
          tertiary: "#517885",        // hover states, visited graph nodes
          highlight: "rgba(81, 120, 133, 0.1)", // internal link background
          textHighlight: "#51788533", // markdown highlight background
        },
        darkMode: {
          light: "#1F1D2E",           // dark background
          lightgray: "#2c2c2e",       // subtle borders
          gray: "#505050",            // graph links, heavier borders
          darkgray: "#d0d0d0",        // body text (light grey)
          dark: "#f0f0f0",            // header text and icons
          secondary: "#517885",       // link color, current graph node
          tertiary: "#517885",        // hover states, visited graph nodes
          highlight: "rgba(81, 120, 133, 0.2)", // internal link background
          textHighlight: "#51788533", // markdown highlight background
        },
      }
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config

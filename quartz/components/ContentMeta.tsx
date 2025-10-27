import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: (string | JSX.Element)[] = []

      if (fileData.dates) {
        segments.push(<Date date={getDate(cfg, fileData)!} locale={cfg.locale} />)
      }

      // Add reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(
          <span class="meta-item">
            {displayedTime}
          </span>
        )
      }

      // Add topic if it exists in frontmatter
      if (fileData.frontmatter?.topic) {
        const topics = Array.isArray(fileData.frontmatter.topic) 
          ? fileData.frontmatter.topic.join(', ')
          : String(fileData.frontmatter.topic);
        segments.push(
          <span class="meta-item">
            {topics}
          </span>
        )
      }

      // Add maturity indicator if it exists in frontmatter
      if (fileData.frontmatter?.maturity) {
        const maturity = String(fileData.frontmatter.maturity).replace(/^['"]|['"]$/g, '')
        segments.push(
          <span class="meta-item">
            Maturity: {maturity}
          </span>
        )
      }

      return (
        <div class={classNames(displayClass, "content-meta")}>
          <p show-comma={options.showComma}>
            {segments}
          </p>
        </div>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor

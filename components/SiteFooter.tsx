import {
  SITE_CHROME,
  type SiteChromeLabels,
} from "@/lib/site-pages-i18n";
import type { InviteLanguage } from "@/lib/invite-types";
import {
  homePath,
  SITE_PAGE_SLUGS,
  sitePagePath,
  type SitePageSlug,
} from "@/lib/paths";

type Props = {
  language: InviteLanguage;
};

const FOOTER_SLUGS: SitePageSlug[] = [...SITE_PAGE_SLUGS];

function labelForSlug(chrome: SiteChromeLabels, slug: SitePageSlug): string {
  return chrome[slug];
}

export default function SiteFooter({ language }: Props) {
  const chrome = SITE_CHROME[language];

  return (
    <footer className="site-footer">
      <nav className="site-footer-nav" aria-label={chrome.siteName}>
        <a href={homePath()}>{chrome.home}</a>
        {FOOTER_SLUGS.map((slug) => (
          <a key={slug} href={sitePagePath(language, slug)}>
            {labelForSlug(chrome, slug)}
          </a>
        ))}
      </nav>
    </footer>
  );
}

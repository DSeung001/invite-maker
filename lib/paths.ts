import type { InviteLanguage } from "./invite-types";

export type SitePageSlug =
  | "about"
  | "guide"
  | "faq"
  | "privacy"
  | "terms"
  | "contact";

export const SITE_PAGE_SLUGS: readonly SitePageSlug[] = [
  "about",
  "guide",
  "faq",
  "privacy",
  "terms",
  "contact",
] as const;

export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

export function sampleImageSrc(id: string): string {
  return assetPath(`/images/samples/${id}.png`);
}

export function homePath(): string {
  return assetPath("/");
}

export function createPath(): string {
  return assetPath("/create/");
}

export function sitePagePath(lang: InviteLanguage, slug: SitePageSlug): string {
  return assetPath(`/${lang}/${slug}/`);
}

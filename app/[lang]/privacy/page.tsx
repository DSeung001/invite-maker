import { notFound } from "next/navigation";
import ContentArticle from "@/components/ContentArticle";
import { getSitePage } from "@/lib/site-pages-i18n";
import {
  buildPageMetadata,
  langStaticParams,
  parseLangParam,
} from "@/lib/site-page-meta";

type Props = {
  params: Promise<{ lang: string }>;
};

const SLUG = "privacy" as const;

export function generateStaticParams() {
  return langStaticParams();
}

export async function generateMetadata({ params }: Props) {
  const { lang: langParam } = await params;
  const lang = parseLangParam(langParam);
  if (!lang) return {};
  return buildPageMetadata(lang, SLUG);
}

export default async function PrivacyPage({ params }: Props) {
  const { lang: langParam } = await params;
  const lang = parseLangParam(langParam);
  if (!lang) notFound();
  return <ContentArticle page={getSitePage(SLUG, lang)} />;
}

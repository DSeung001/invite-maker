import { notFound } from "next/navigation";
import SiteContentNav from "@/components/SiteContentNav";
import SiteFooter from "@/components/SiteFooter";
import {
  langStaticParams,
  parseLangParam,
} from "@/lib/site-page-meta";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return langStaticParams();
}

export default async function LangLayout({ children, params }: Props) {
  const { lang: langParam } = await params;
  const lang = parseLangParam(langParam);
  if (!lang) notFound();

  return (
    <div className="site-content" lang={lang}>
      <SiteContentNav language={lang} />
      {children}
      <SiteFooter language={lang} />
    </div>
  );
}

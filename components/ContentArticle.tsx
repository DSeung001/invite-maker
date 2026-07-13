import type { ContentBlock, SitePageContent } from "@/lib/site-pages-i18n";

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "faq":
      return (
        <section className="content-faq-item">
          <h2>{block.q}</h2>
          <p>{block.a}</p>
        </section>
      );
    case "link":
      return (
        <p>
          <a
            className="content-text-link"
            href={block.href}
            {...(block.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {block.label}
          </a>
        </p>
      );
    default:
      return null;
  }
}

type Props = {
  page: SitePageContent;
};

export default function ContentArticle({ page }: Props) {
  return (
    <article className="content-article">
      <h1>{page.title}</h1>
      {page.blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} />
      ))}
    </article>
  );
}

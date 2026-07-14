import LandingPage from "@/components/LandingPage";
import { webApplicationJsonLd } from "@/lib/site-meta";

export default function HomePage() {
  const jsonLd = webApplicationJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </>
  );
}

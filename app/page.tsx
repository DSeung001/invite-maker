import LandingPage from "@/components/LandingPage";
import {
  HOME_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-meta";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: HOME_DESCRIPTION,
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Any",
  inLanguage: "ko",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
};

export default function HomePage() {
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

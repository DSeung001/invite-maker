import type { Metadata } from "next";

export const SITE_URL = "https://date-invite.devseung.com";

export const SITE_NAME = "데이트 초대장 메이커";

export const HOME_TITLE = "데이트 초대장 만들기 | 무료 링크 초대장";

export const HOME_DESCRIPTION =
  "회원가입 없이 문구·일정·음식을 담아 링크로 보내는 무료 데이트 초대장 만들기 도구입니다. 상대가 선택해 답할 수 있어요.";

export const CREATE_TITLE = "초대장 만들기";

export const CREATE_DESCRIPTION =
  "데이트 초대장에 문구, 일정, 음식 선택지를 넣고 공유 링크를 만드세요. 회원가입 없이 바로 시작할 수 있습니다.";

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
} as const;

export function homeOpenGraph(): Metadata["openGraph"] {
  return {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [OG_IMAGE],
  };
}

export function homeTwitter(): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE.url],
  };
}

export function webApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: HOME_DESCRIPTION,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    inLanguage: ["ko", "en", "ja", "zh"],
  };
}

export function faqPageJsonLd(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

import type { Metadata } from "next";
import {
  CREATE_DESCRIPTION,
  CREATE_TITLE,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-meta";

export const metadata: Metadata = {
  title: CREATE_TITLE,
  description: CREATE_DESCRIPTION,
  alternates: {
    canonical: "/create/",
  },
  openGraph: {
    title: CREATE_TITLE,
    description: CREATE_DESCRIPTION,
    url: `${SITE_URL}/create/`,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: CREATE_TITLE,
    description: CREATE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

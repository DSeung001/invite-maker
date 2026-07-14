import type { Metadata } from "next";
import {
  HOME_DESCRIPTION,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "초대장",
  description: HOME_DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/invite/",
  },
  openGraph: {
    title: SITE_NAME,
    description: HOME_DESCRIPTION,
    url: `${SITE_URL}/invite/`,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function InviteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

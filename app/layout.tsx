import type { Metadata, Viewport } from "next";
import GoogleAdSense from "@/components/GoogleAdSense";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  homeOpenGraph,
  homeTwitter,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-meta";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: homeOpenGraph(),
  twitter: homeTwitter(),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <GoogleAnalytics />
        <GoogleAdSense />
        {children}
      </body>
    </html>
  );
}

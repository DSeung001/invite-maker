import Script from "next/script";

export default function GoogleAdSense() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5825756534281389"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

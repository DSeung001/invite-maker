import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "초대장 | 데이트 초대장 메이커",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InviteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

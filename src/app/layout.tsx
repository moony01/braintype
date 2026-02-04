import './globals.css';
import type { Metadata, Viewport } from 'next';

const siteUrl = 'https://moony01.github.io/braintype';

/**
 * 루트 메타데이터 - 기본 SEO 정보
 */
export const metadata: Metadata = {
  title: 'Brain Type Test - 뇌 유형 테스트',
  description:
    'Discover your brain type with 12 fun questions! Are you a Strategist, Artist, Scientist, or Dreamer? 12가지 질문으로 알아보는 당신의 뇌 유형!',
  keywords: ['brain type test', '뇌 유형 테스트', 'quiz', '심리테스트', '성격테스트', 'personality test'],
  metadataBase: new URL('https://moony01.github.io'),
  alternates: { canonical: siteUrl },
  openGraph: {
    title: 'Brain Type Test - 뇌 유형 테스트',
    description: 'Discover your brain type! Are you a Strategist, Artist, Scientist, or Dreamer?',
    url: siteUrl,
    siteName: 'Brain Type Test',
    type: 'website',
    locale: 'en',
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Brain Type Test - Discover your brain type',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brain Type Test - 뇌 유형 테스트',
    description: 'Discover your brain type! Are you a Strategist, Artist, Scientist, or Dreamer?',
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' style='stop-color:%236366f1'/><stop offset='100%25' style='stop-color:%2306b6d4'/></linearGradient></defs><rect width='100' height='100' rx='20' fill='url(%23g)'/><text x='50' y='70' font-size='60' text-anchor='middle'>🧠</text></svg>",
  },
};

/**
 * 뷰포트 설정
 */
export const viewport: Viewport = {
  themeColor: '#6366F1',
  width: 'device-width',
  initialScale: 1,
};

/**
 * 루트 레이아웃
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

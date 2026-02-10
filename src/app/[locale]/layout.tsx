import type { Metadata } from 'next';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, localeHtmlLang, type Locale } from '@/i18n/config';

/** 언어별 페이지 타이틀 */
const titles: Record<string, string> = {
  ko: '뇌 유형 테스트 - 당신의 뇌는 어떤 유형?',
  en: 'Brain Type Test - What Type of Brain Do You Have?',
  ja: '脳タイプテスト - あなたの脳はどのタイプ？',
  zh: '大脑类型测试 - 你的大脑是什么类型？',
  es: 'Test de Tipo de Cerebro - ¿Qué tipo de cerebro tienes?',
  de: 'Gehirntyp-Test - Welcher Gehirntyp bist du?',
  fr: 'Test de Type de Cerveau - Quel type de cerveau avez-vous?',
  pt: 'Teste de Tipo de Cérebro - Qual é o seu tipo de cérebro?',
  id: 'Tes Tipe Otak - Tipe otak apa yang kamu miliki?',
  vi: 'Bài Kiểm Tra Loại Não - Bộ não của bạn thuộc loại nào?',
  tr: 'Beyin Tipi Testi - Beyin tipin ne?',
};

/** 언어별 설명 */
const descriptions: Record<string, string> = {
  ko: '12가지 질문으로 알아보는 당신의 뇌 유형! 전략가, 예술가, 과학자... 당신은 어떤 타입? 친구들과 결과를 공유하세요!',
  en: 'Discover your brain type with 12 fun questions! Strategist, Artist, Scientist... What type are you? Share results with friends!',
  ja: '12の質問であなたの脳タイプを発見！戦略家、芸術家、科学者...あなたはどのタイプ？結果を友達と共有しよう！',
  zh: '通过12个问题发现你的大脑类型！策略家、艺术家、科学家...你是哪种类型？与朋友分享结果！',
  es: '¡Descubre tu tipo de cerebro con 12 preguntas! Estratega, Artista, Científico... ¿Qué tipo eres?',
  de: 'Entdecke deinen Gehirntyp mit 12 Fragen! Stratege, Künstler, Wissenschaftler... Welcher Typ bist du?',
  fr: 'Découvrez votre type de cerveau avec 12 questions ! Stratège, Artiste, Scientifique... Quel type êtes-vous?',
  pt: 'Descubra seu tipo de cérebro com 12 perguntas! Estrategista, Artista, Cientista... Que tipo você é?',
  id: 'Temukan tipe otakmu dengan 12 pertanyaan seru! Strategis, Seniman, Ilmuwan... Tipe apa kamu?',
  vi: 'Khám phá loại não của bạn với 12 câu hỏi! Chiến lược gia, Nghệ sĩ, Nhà khoa học... Bạn thuộc loại nào?',
  tr: 'Beyin tipini 12 soruyla keşfet! Stratejist, Sanatçı, Bilim İnsanı... Sen hangi tipsin?',
};

const siteOrigin = 'https://moony01.com';
const baseUrl = 'https://moony01.com/braintype';

/** OG 이미지 URL (1200x630) */
const ogImageUrl = `${baseUrl}/images/og-image.png`;

/**
 * JSON-LD 구조화 데이터 생성 (Quiz 스키마)
 *
 * Google 리치 리절트에 표시될 수 있도록 Quiz 타입의 구조화 데이터를 생성합니다.
 * 각 언어별로 제목, 설명, URL을 동적으로 설정합니다.
 */
function generateJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    url: `${baseUrl}/${locale}`,
    inLanguage: localeHtmlLang[locale as Locale] || locale,
    educationalLevel: 'beginner',
    image: ogImageUrl,
    provider: {
      '@type': 'Organization',
      name: 'Brain Type Test',
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: 'Brain Type',
    },
  };
}

/**
 * 정적 export를 위한 모든 locale 경로 생성
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * 동적 메타데이터 생성 (언어별)
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    metadataBase: new URL(siteOrigin),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}`])),
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}`,
      type: 'website',
      locale,
      siteName: 'Brain Type Test',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: titles[locale] || titles.en,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [ogImageUrl],
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const htmlLang = localeHtmlLang[locale as Locale] || locale;

  // JSON-LD 구조화 데이터
  const jsonLd = generateJsonLd(locale);

  return (
    <>
      {/* JSON-LD 구조화 데이터 (검색엔진 리치 리절트용) */}
      <Script
        id="json-ld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Google AdSense 광고 스크립트 */}
      <Script
        id="adsense"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8955182453510440"
        crossOrigin="anonymous"
      />
      {/* lang 속성 동적 설정 */}
      <Script
        id="set-lang"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${htmlLang}";`,
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-surface via-white to-blue-50/30">
        <NextIntlClientProvider messages={messages}>
          <main className="flex min-h-screen flex-col items-center justify-center p-4">
            {children}
          </main>
        </NextIntlClientProvider>
      </div>
    </>
  );
}

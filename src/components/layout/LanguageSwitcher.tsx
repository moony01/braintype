'use client';

import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';

interface LanguageSwitcherProps {
  currentLocale: string;
}

/** 국기 이모지 매핑 */
const FLAGS: Record<string, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  ja: '🇯🇵',
  zh: '🇨🇳',
  es: '🇪🇸',
  de: '🇩🇪',
  fr: '🇫🇷',
  pt: '🇧🇷',
  id: '🇮🇩',
  vi: '🇻🇳',
  tr: '🇹🇷',
};

/**
 * 언어 전환 바 - 국기 아이콘을 탭하여 언어를 변경합니다.
 */
export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (locale: Locale) => {
    if (locale === currentLocale) return;
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          className={`text-xl transition-all hover:scale-125 active:scale-95 ${
            locale === currentLocale ? 'scale-125 drop-shadow-md' : 'opacity-60 hover:opacity-100'
          }`}
          title={localeNames[locale]}
          aria-label={localeNames[locale]}
        >
          {FLAGS[locale]}
        </button>
      ))}
    </div>
  );
}

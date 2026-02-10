import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export const dynamic = 'force-static';

/**
 * sitemap.xml 자동 생성
 *
 * 모든 로케일(11개 언어)에 대한 URL을 생성합니다.
 * 검색엔진(Google, Bing 등)이 사이트의 모든 페이지를 발견할 수 있도록 돕습니다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://moony01.com/braintype';

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }));
}

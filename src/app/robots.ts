import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * robots.txt 자동 생성
 *
 * 검색엔진 크롤러에게 사이트의 크롤링 규칙과 sitemap 위치를 알려줍니다.
 * 모든 경로를 크롤링 허용하고, sitemap.xml 위치를 명시합니다.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://moony01.github.io/braintype/sitemap.xml',
  };
}

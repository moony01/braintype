'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

/**
 * 루트 경로 접근 시 기본 locale(ko)로 리다이렉트
 */
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-surface to-white">
      <div className="animate-pulse text-6xl">🧠</div>
    </div>
  );
}

'use client';

import Header from './Header';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 공통 페이지 레이아웃
 */
export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main
        className={`relative flex min-h-screen flex-col items-center justify-center pt-16 pb-6 px-4 ${className}`}
      >
        {children}
      </main>
    </>
  );
}

'use client';

import React from 'react';

interface HomeButtonProps {
  onClick: () => void;
}

/**
 * 홈으로 돌아가기 버튼 (좌상단 고정)
 */
export default function HomeButton({ onClick }: HomeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all active:scale-95"
      aria-label="Go home"
    >
      <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { getXShareUrl, getFacebookShareUrl, copyToClipboard } from '@/lib/share';

interface ShareButtonsProps {
  brainTypeName: string;
  shareUrl: string;
}

/**
 * 소셜 미디어 공유 버튼 그룹
 */
export default function ShareButtons({ brainTypeName, shareUrl }: ShareButtonsProps) {
  const t = useTranslations('share');
  const [showToast, setShowToast] = useState(false);

  const shareText = t('shareText', { type: brainTypeName });

  const handleXShare = () => {
    window.open(getXShareUrl(shareText, shareUrl), '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    window.open(getFacebookShareUrl(shareUrl), '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-sm text-gray-500 font-medium">{t('label')}</p>
      <div className="flex flex-wrap justify-center gap-3">
        {/* X (Twitter) */}
        <button
          onClick={handleXShare}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black text-white hover:opacity-80 transition-all active:scale-95"
          aria-label="X"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="font-medium text-sm">X</span>
        </button>

        {/* Facebook */}
        <button
          onClick={handleFacebookShare}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-all active:scale-95"
          aria-label="Facebook"
        >
          <span>📘</span>
          <span className="font-medium text-sm">Facebook</span>
        </button>

        {/* 링크 복사 */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all active:scale-95"
          aria-label={t('copyLink')}
        >
          <span>🔗</span>
          <span className="font-medium text-sm">{t('copyLink')}</span>
        </button>
      </div>

      {/* 복사 완료 토스트 */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm transition-opacity duration-300 ${
          showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {t('copySuccess')}
      </div>
    </div>
  );
}

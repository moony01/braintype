'use client';

import React from 'react';
import type { QuizResult } from '@/types';
import Button from '../ui/Button';
import RadarChart from './RadarChart';
import ShareButtons from './ShareButtons';

interface ResultCardProps {
  result: QuizResult;
  title: string;
  description: string;
  traits: string[];
  restartLabel: string;
  onRestart: () => void;
  shareUrl: string;
}

/**
 * 결과 카드 컴포넌트
 * 뇌 유형, 레이더 차트, 성향 설명, 공유 버튼을 표시합니다.
 */
export default function ResultCard({
  result,
  title,
  description,
  traits,
  restartLabel,
  onRestart,
  shareUrl,
}: ResultCardProps) {
  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl p-8 text-center"
        style={{ borderTop: `6px solid ${result.brainType.colorTheme}` }}
      >
        {/* 이모지 + 유형명 */}
        <div className="mb-4">
          <span className="text-7xl animate-bounce-in inline-block" role="img" aria-label={title}>
            {result.brainType.emoji}
          </span>
        </div>

        <h2
          className="text-2xl md:text-3xl font-black mb-1"
          style={{ color: result.brainType.colorTheme }}
        >
          {title}
        </h2>

        <p className="text-gray-500 text-sm mb-6 leading-relaxed">{description}</p>

        {/* 레이더 차트 */}
        <div className="my-6">
          <RadarChart scores={result.axisScores} color={result.brainType.colorTheme} />
        </div>

        {/* 성격 특성 태그 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {traits.map((trait, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-full text-sm font-medium"
              style={{
                backgroundColor: `${result.brainType.colorTheme}15`,
                color: result.brainType.colorTheme,
              }}
            >
              {trait}
            </span>
          ))}
        </div>

        {/* 공유 버튼 */}
        <ShareButtons brainTypeName={title} shareUrl={shareUrl} />

        {/* 다시 하기 */}
        <div className="mt-6">
          <Button onClick={onRestart} variant="ghost" fullWidth>
            {restartLabel}
          </Button>
        </div>

        {/* 크로스 프로모션 */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-gray-400 text-xs mb-3">Try other tests too!</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <a
              href="https://moony01.github.io/mentalage/"
              className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-medium hover:bg-purple-100 transition-all active:scale-95"
              target="_blank"
              rel="noopener noreferrer"
            >
              🧠 Mental Age Test
            </a>
            <a
              href="https://moony01.github.io/kpopface/"
              className="px-3 py-1.5 bg-pink-50 text-pink-600 rounded-full text-xs font-medium hover:bg-pink-100 transition-all active:scale-95"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎤 K-Pop Face Test
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

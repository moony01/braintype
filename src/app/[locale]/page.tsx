'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useQuiz } from '@/hooks/useQuiz';
import Button from '@/components/ui/Button';
import HomeButton from '@/components/ui/HomeButton';
import PageLayout from '@/components/layout/PageLayout';
import AdBanner from '@/components/layout/AdBanner';
import QuestionCard from '@/components/quiz/QuestionCard';
import ProgressBar from '@/components/quiz/ProgressBar';
import ResultCard from '@/components/result/ResultCard';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

/**
 * 메인 페이지
 *
 * 4단계 흐름:
 * 1. 랜딩 화면 (시작 버튼)
 * 2. 퀴즈 화면 (12개 질문)
 * 3. 광고 화면 (Q4, Q8, Q12 답변 후 전면 인터스티셜)
 * 4. 결과 화면 (뇌 유형 + 레이더 차트 + 상단/하단 광고)
 */
export default function Home() {
  const params = useParams();
  const currentLocale = params.locale as string;

  const t = useTranslations();
  const tQuestions = useTranslations('questions');
  const tResults = useTranslations('results');
  const tAd = useTranslations('ad');

  const {
    isStarted,
    currentIndex,
    currentQuestion,
    totalQuestions,
    isCompleted,
    result,
    showingAd,
    isLastAd,
    start,
    submitAnswer,
    dismissAd,
    reset,
  } = useQuiz();

  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleAnswer = (optionId: string) => {
    submitAnswer(optionId);
  };

  // 1. 랜딩 화면
  if (!isStarted) {
    return (
      <PageLayout className="animate-fade-in text-center">
        <div className="max-w-md w-full space-y-8">
          <LanguageSwitcher currentLocale={currentLocale} />

          <div className="space-y-4">
            <div className="relative inline-block">
              <div className="text-8xl animate-bounce-slow">🧠</div>
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl -z-10 animate-pulse-glow" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              {t('home.title')}
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              {t('home.subtitle')}
            </p>
          </div>

          {/* 미리보기: 유형 아이콘 */}
          <div className="flex justify-center gap-3 text-3xl opacity-60">
            <span title="Strategist">🧠</span>
            <span title="Artist">🎨</span>
            <span title="Scientist">🔬</span>
            <span title="Performer">🎭</span>
            <span title="Architect">🏗️</span>
            <span title="Explorer">🌊</span>
            <span title="Manager">📊</span>
            <span title="Dreamer">🌟</span>
          </div>

          <Button
            onClick={start}
            size="lg"
            fullWidth
            className="text-xl py-6 shadow-xl shadow-primary/20"
          >
            {t('home.startButton')}
          </Button>

          <p className="text-xs text-gray-400">{t('home.questionCount')}</p>
        </div>
      </PageLayout>
    );
  }

  // 2. 광고 화면 (Q4, Q8, Q12 답변 후 전면 인터스티셜)
  if (showingAd) {
    return (
      <PageLayout showBottomAd={false}>
        <div className="w-full max-w-xl mx-auto p-4 animate-fade-in">
          {/* 진행률 표시 */}
          <ProgressBar current={currentIndex + 1} total={totalQuestions} />

          {/* 광고 배너 영역 */}
          <div className="my-8">
            <AdBanner className="max-w-md w-full mx-auto" />
          </div>

          {/* 계속/결과 보기 버튼 */}
          <Button
            onClick={dismissAd}
            size="lg"
            fullWidth
            className="text-lg py-5 shadow-lg shadow-primary/20"
          >
            {isLastAd ? tAd('seeResult') : tAd('continue')}
          </Button>
        </div>
      </PageLayout>
    );
  }

  // 3. 퀴즈 화면
  if (currentQuestion && !isCompleted) {
    const questionText = tQuestions(`q${currentQuestion.id}.text`);
    const options = currentQuestion.options.map((opt) => ({
      id: opt.id,
      text: tQuestions(`q${currentQuestion.id}.options.${opt.id}`),
    }));

    return (
      <PageLayout showBottomAd={false}>
        <HomeButton onClick={reset} />
        <QuestionCard
          question={questionText}
          options={options}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          onAnswer={handleAnswer}
        />
        {/* 각 질문 하단 광고 배너 */}
        <AdBanner className="mt-6 max-w-md w-full" />
      </PageLayout>
    );
  }

  // 4. 결과 화면 (상단 + 하단 광고 배너)
  if (isCompleted && result) {
    const typeKey = result.brainType.id;
    const title = tResults(`${typeKey}.title`);
    const description = tResults(`${typeKey}.description`);

    // 특성 태그 파싱 (쉼표로 구분)
    const traitsRaw = tResults(`${typeKey}.traits`);
    const traits = traitsRaw.split(',').map((s: string) => s.trim());

    return (
      <PageLayout showTopAd showBottomAd>
        <HomeButton onClick={reset} />
        <ResultCard
          result={result}
          title={title}
          description={description}
          traits={traits}
          restartLabel={t('home.startButton')}
          onRestart={reset}
          shareUrl={shareUrl}
        />
      </PageLayout>
    );
  }

  return null;
}

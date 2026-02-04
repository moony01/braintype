import { useState, useCallback, useMemo, useEffect } from 'react';
import { Question, Answer, QuizResult } from '@/types';
import { generateQuizResult } from '@/lib/calculate';
import { questions } from '@/data/questions';

/** sessionStorage 키 */
const STORAGE_KEY = 'braintype-result';

/** 저장할 결과 데이터 */
interface SavedResult {
  result: QuizResult;
}

/**
 * 광고를 표시할 문제 인덱스 목록
 *
 * Q4(인덱스 3), Q8(인덱스 7) 답변 후 광고 표시
 * 마지막 문제(Q12) 답변 후에는 결과 전 광고를 별도로 처리
 */
const AD_AFTER_INDICES = [3, 7];

interface UseQuizReturn {
  currentIndex: number;
  answers: Answer[];
  result: QuizResult | null;
  isCompleted: boolean;
  isStarted: boolean;
  currentQuestion: Question | null;
  progress: number;
  totalQuestions: number;
  /** 광고 화면 표시 중 여부 */
  showingAd: boolean;
  /** 마지막 문제 후 결과 보기 전 광고 여부 */
  isLastAd: boolean;
  start: () => void;
  submitAnswer: (optionId: string) => void;
  /** 광고 닫기 → 다음 문제로 이동 또는 결과 표시 */
  dismissAd: () => void;
  reset: () => void;
}

/**
 * 퀴즈 진행 상태를 관리하는 커스텀 훅
 *
 * 뇌 유형 테스트는 나이 입력이 필요 없으므로
 * 시작 → 질문 → (광고) → 결과의 흐름을 가집니다.
 *
 * 광고 표시 시점:
 * - Q4(인덱스 3) 답변 후: 중간 광고 → 계속 버튼 → Q5로 이동
 * - Q8(인덱스 7) 답변 후: 중간 광고 → 계속 버튼 → Q9로 이동
 * - Q12(마지막) 답변 후: 결과 전 광고 → 결과 보기 버튼 → 결과 화면
 */
export function useQuiz(): UseQuizReturn {
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  /** 광고 화면 표시 중인지 여부 */
  const [showingAd, setShowingAd] = useState(false);
  /** 마지막 문제 후 결과 보기 전 광고인지 여부 */
  const [isLastAd, setIsLastAd] = useState(false);

  // 페이지 로드 시 sessionStorage에서 결과 복원
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data: SavedResult = JSON.parse(saved);
        setResult(data.result);
        setIsCompleted(true);
        setIsStarted(true);
      }
    } catch (e) {
      console.error('결과 복원 실패:', e);
    }
  }, []);

  const totalQuestions = questions.length;

  const currentQuestion = useMemo(() => {
    if (currentIndex >= totalQuestions) return null;
    return questions[currentIndex];
  }, [currentIndex, totalQuestions]);

  const progress = useMemo(() => {
    return Math.round((currentIndex / totalQuestions) * 100);
  }, [currentIndex, totalQuestions]);

  const start = useCallback(() => {
    setIsStarted(true);
  }, []);

  const submitAnswer = useCallback(
    (optionId: string) => {
      if (!currentQuestion) return;

      const selectedOption = currentQuestion.options.find((opt) => opt.id === optionId);
      if (!selectedOption) return;

      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        optionId,
        scores: selectedOption.scores,
      };

      const newAnswers = [...answers, newAnswer];
      setAnswers(newAnswers);

      if (currentIndex < totalQuestions - 1) {
        // 중간 문제: 광고 표시 시점인지 체크
        if (AD_AFTER_INDICES.includes(currentIndex)) {
          // 광고 화면으로 전환 (다음 문제로 넘기지 않음)
          setShowingAd(true);
          setIsLastAd(false);
        } else {
          // 광고 없이 다음 문제로 이동
          setCurrentIndex((prev) => prev + 1);
        }
      } else {
        // 마지막 문제(Q12): 결과 계산 후 광고 표시
        const finalResult = generateQuizResult(newAnswers);
        setResult(finalResult);
        setShowingAd(true);
        setIsLastAd(true);

        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ result: finalResult }));
        } catch (e) {
          console.error('결과 저장 실패:', e);
        }
      }
    },
    [answers, currentQuestion, currentIndex, totalQuestions],
  );

  /**
   * 광고 닫기 함수
   *
   * 중간 광고: 다음 문제로 이동
   * 마지막 광고: 결과 화면으로 전환
   */
  const dismissAd = useCallback(() => {
    setShowingAd(false);
    if (isLastAd) {
      // 마지막 문제 후 광고 → 결과 화면 표시
      setIsCompleted(true);
    } else {
      // 중간 광고 → 다음 문제로 이동
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isLastAd]);

  const reset = useCallback(() => {
    setIsStarted(false);
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    setIsCompleted(false);
    setShowingAd(false);
    setIsLastAd(false);

    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('결과 삭제 실패:', e);
    }
  }, []);

  return {
    currentIndex,
    answers,
    result,
    isCompleted,
    isStarted,
    currentQuestion,
    progress,
    totalQuestions,
    showingAd,
    isLastAd,
    start,
    submitAnswer,
    dismissAd,
    reset,
  };
}

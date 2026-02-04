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

interface UseQuizReturn {
  currentIndex: number;
  answers: Answer[];
  result: QuizResult | null;
  isCompleted: boolean;
  isStarted: boolean;
  currentQuestion: Question | null;
  progress: number;
  totalQuestions: number;
  start: () => void;
  submitAnswer: (optionId: string) => void;
  reset: () => void;
}

/**
 * 퀴즈 진행 상태를 관리하는 커스텀 훅
 *
 * 뇌 유형 테스트는 나이 입력이 필요 없으므로
 * 시작 → 질문 → 결과의 3단계 흐름을 가집니다.
 */
export function useQuiz(): UseQuizReturn {
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

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
        setCurrentIndex((prev) => prev + 1);
      } else {
        // 모든 질문 완료 - 결과 계산
        setIsCompleted(true);
        const finalResult = generateQuizResult(newAnswers);
        setResult(finalResult);

        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ result: finalResult }));
        } catch (e) {
          console.error('결과 저장 실패:', e);
        }
      }
    },
    [answers, currentQuestion, currentIndex, totalQuestions],
  );

  const reset = useCallback(() => {
    setIsStarted(false);
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    setIsCompleted(false);

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
    start,
    submitAnswer,
    reset,
  };
}

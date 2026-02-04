import { Answer, AxisScores, BrainType, QuizResult } from '@/types';
import { brainTypes } from '@/data/brainTypes';

/**
 * 사용자 답변으로부터 각 축의 원시 점수를 합산합니다.
 * @param answers 사용자 답변 배열
 * @returns 4축 원시 점수
 */
function calculateRawScores(answers: Answer[]): AxisScores {
  const raw: AxisScores = { logic: 0, creative: 0, intuition: 0, planning: 0 };

  answers.forEach((answer) => {
    const scores = answer.scores;
    if (scores.logic) raw.logic += scores.logic;
    if (scores.creative) raw.creative += scores.creative;
    if (scores.intuition) raw.intuition += scores.intuition;
    if (scores.planning) raw.planning += scores.planning;
  });

  return raw;
}

/**
 * 원시 점수를 0~100 사이로 정규화합니다.
 * 각 축의 최대 가능 점수(약 ±9)를 기준으로 변환합니다.
 *
 * 50 = 중간, 0 = 극단적 음수 방향, 100 = 극단적 양수 방향
 */
function normalizeScores(raw: AxisScores): AxisScores {
  const MAX_RAW = 9;

  const normalize = (val: number): number => {
    const clamped = Math.max(-MAX_RAW, Math.min(MAX_RAW, val));
    return Math.round(((clamped + MAX_RAW) / (2 * MAX_RAW)) * 100);
  };

  return {
    logic: normalize(raw.logic),
    creative: normalize(raw.creative),
    intuition: normalize(raw.intuition),
    planning: normalize(raw.planning),
  };
}

/**
 * 정규화된 점수를 기반으로 가장 일치하는 뇌 유형을 찾습니다.
 *
 * 각 유형의 4축 방향과 사용자의 점수 방향을 비교하여
 * 가장 많이 일치하는 유형을 선택합니다.
 */
function matchBrainType(normalized: AxisScores): BrainType {
  const userDirection = {
    logic: normalized.logic >= 50,
    creative: normalized.creative >= 50,
    intuition: normalized.intuition >= 50,
    planning: normalized.planning >= 50,
  };

  let bestMatch = brainTypes[0];
  let bestScore = -1;

  brainTypes.forEach((type) => {
    let matchScore = 0;
    const axes: (keyof typeof userDirection)[] = ['logic', 'creative', 'intuition', 'planning'];

    axes.forEach((axis) => {
      if (type.axes[axis] === userDirection[axis]) {
        // 일치 시 해당 축의 극단성(50에서 얼마나 먼지)에 비례하여 가산점
        const extremity = Math.abs(normalized[axis] - 50);
        matchScore += 10 + extremity;
      }
    });

    if (matchScore > bestScore) {
      bestScore = matchScore;
      bestMatch = type;
    }
  });

  return bestMatch;
}

/**
 * 퀴즈 결과를 종합하여 최종 결과를 생성합니다.
 * @param answers 사용자 답변 배열
 * @returns 퀴즈 결과 (뇌 유형 + 축 점수)
 */
export function generateQuizResult(answers: Answer[]): QuizResult {
  const rawScores = calculateRawScores(answers);
  const axisScores = normalizeScores(rawScores);
  const brainType = matchBrainType(axisScores);

  return {
    brainType,
    axisScores,
    rawScores,
  };
}

import { Question } from '@/types';

/**
 * 뇌 유형 테스트 질문 데이터 (12문항)
 *
 * 4개의 축, 각 축당 3문항:
 * - Q1~Q3: 논리(Logic) vs 감성(Emotion)
 * - Q4~Q6: 창의(Creative) vs 분석(Analytical)
 * - Q7~Q9: 직관(Intuition) vs 관찰(Observation)
 * - Q10~Q12: 계획(Planning) vs 즉흥(Spontaneous)
 *
 * 각 질문의 선택지(a,b,c,d)는 해당 축에 양수/음수 점수를 부여
 */
export const questions: Question[] = [
  // === 축 1: 논리 vs 감성 ===
  {
    id: 1,
    primaryAxis: 'logic',
    options: [
      { id: 'a', scores: { logic: 3 } },
      { id: 'b', scores: { logic: 1 } },
      { id: 'c', scores: { logic: -1 } },
      { id: 'd', scores: { logic: -3 } },
    ],
  },
  {
    id: 2,
    primaryAxis: 'logic',
    options: [
      { id: 'a', scores: { logic: -3 } },
      { id: 'b', scores: { logic: -1 } },
      { id: 'c', scores: { logic: 1 } },
      { id: 'd', scores: { logic: 3 } },
    ],
  },
  {
    id: 3,
    primaryAxis: 'logic',
    options: [
      { id: 'a', scores: { logic: 2, creative: 1 } },
      { id: 'b', scores: { logic: -2, creative: -1 } },
      { id: 'c', scores: { logic: 3 } },
      { id: 'd', scores: { logic: -2, intuition: 1 } },
    ],
  },

  // === 축 2: 창의 vs 분석 ===
  {
    id: 4,
    primaryAxis: 'creative',
    options: [
      { id: 'a', scores: { creative: 3 } },
      { id: 'b', scores: { creative: 1 } },
      { id: 'c', scores: { creative: -1 } },
      { id: 'd', scores: { creative: -3 } },
    ],
  },
  {
    id: 5,
    primaryAxis: 'creative',
    options: [
      { id: 'a', scores: { creative: -2, logic: 1 } },
      { id: 'b', scores: { creative: 2 } },
      { id: 'c', scores: { creative: -3 } },
      { id: 'd', scores: { creative: 3, intuition: 1 } },
    ],
  },
  {
    id: 6,
    primaryAxis: 'creative',
    options: [
      { id: 'a', scores: { creative: -3 } },
      { id: 'b', scores: { creative: -1 } },
      { id: 'c', scores: { creative: 2 } },
      { id: 'd', scores: { creative: 3 } },
    ],
  },

  // === 축 3: 직관 vs 관찰 ===
  {
    id: 7,
    primaryAxis: 'intuition',
    options: [
      { id: 'a', scores: { intuition: 3 } },
      { id: 'b', scores: { intuition: 1 } },
      { id: 'c', scores: { intuition: -1 } },
      { id: 'd', scores: { intuition: -3 } },
    ],
  },
  {
    id: 8,
    primaryAxis: 'intuition',
    options: [
      { id: 'a', scores: { intuition: -2, planning: 1 } },
      { id: 'b', scores: { intuition: 2 } },
      { id: 'c', scores: { intuition: -3 } },
      { id: 'd', scores: { intuition: 3 } },
    ],
  },
  {
    id: 9,
    primaryAxis: 'intuition',
    options: [
      { id: 'a', scores: { intuition: -3 } },
      { id: 'b', scores: { intuition: 2, creative: 1 } },
      { id: 'c', scores: { intuition: -1 } },
      { id: 'd', scores: { intuition: 3 } },
    ],
  },

  // === 축 4: 계획 vs 즉흥 ===
  {
    id: 10,
    primaryAxis: 'planning',
    options: [
      { id: 'a', scores: { planning: 3 } },
      { id: 'b', scores: { planning: 1 } },
      { id: 'c', scores: { planning: -1 } },
      { id: 'd', scores: { planning: -3 } },
    ],
  },
  {
    id: 11,
    primaryAxis: 'planning',
    options: [
      { id: 'a', scores: { planning: -3 } },
      { id: 'b', scores: { planning: -1 } },
      { id: 'c', scores: { planning: 2, logic: 1 } },
      { id: 'd', scores: { planning: 3 } },
    ],
  },
  {
    id: 12,
    primaryAxis: 'planning',
    options: [
      { id: 'a', scores: { planning: 2 } },
      { id: 'b', scores: { planning: -2 } },
      { id: 'c', scores: { planning: 3 } },
      { id: 'd', scores: { planning: -3, creative: 1 } },
    ],
  },
];

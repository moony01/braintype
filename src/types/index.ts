/**
 * 뇌 유형 테스트 타입 정의
 * 4개의 축(Axis)을 기반으로 8가지 뇌 유형을 분류합니다.
 */

/** 4개의 분석 축 */
export type AxisKey = 'logic' | 'creative' | 'intuition' | 'planning';

/**
 * 각 축의 점수
 * 양수(+) = 축의 첫 번째 성향 (Logic, Creative, Intuition, Planning)
 * 음수(-) = 축의 반대 성향 (Emotion, Analytical, Observation, Spontaneous)
 */
export interface AxisScores {
  /** 논리(+) vs 감성(-) */
  logic: number;
  /** 창의(+) vs 분석(-) */
  creative: number;
  /** 직관(+) vs 관찰(-) */
  intuition: number;
  /** 계획(+) vs 즉흥(-) */
  planning: number;
}

/** 질문 선택지 */
export interface QuestionOption {
  id: string;
  /** 각 축에 미치는 점수 (일부 축만 영향) */
  scores: Partial<AxisScores>;
}

/** 질문 */
export interface Question {
  id: number;
  /** 질문이 주로 측정하는 축 */
  primaryAxis: AxisKey;
  options: QuestionOption[];
}

/** 사용자 답변 */
export interface Answer {
  questionId: number;
  optionId: string;
  scores: Partial<AxisScores>;
}

/** 8가지 뇌 유형 ID */
export type BrainTypeId =
  | 'strategist'
  | 'artist'
  | 'scientist'
  | 'performer'
  | 'architect'
  | 'explorer'
  | 'manager'
  | 'dreamer';

/** 뇌 유형 정의 */
export interface BrainType {
  id: BrainTypeId;
  emoji: string;
  colorTheme: string;
  /** 각 축의 방향 (true = 양, false = 음) */
  axes: {
    logic: boolean;
    creative: boolean;
    intuition: boolean;
    planning: boolean;
  };
}

/** 퀴즈 결과 */
export interface QuizResult {
  brainType: BrainType;
  /** 정규화된 축 점수 (0~100) */
  axisScores: AxisScores;
  /** 원본 합산 점수 */
  rawScores: AxisScores;
}

/** 퀴즈 상태 */
export interface QuizState {
  currentIndex: number;
  answers: Answer[];
  result: QuizResult | null;
  isCompleted: boolean;
}

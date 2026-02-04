import { BrainType } from '@/types';

/**
 * 8가지 뇌 유형 정의
 *
 * 4개 축의 양/음 조합으로 2^4 = 16가지가 가능하지만,
 * 의미 있는 8가지로 그룹핑하여 제공합니다.
 *
 * 축 방향:
 * - logic: true=논리적, false=감성적
 * - creative: true=창의적, false=분석적
 * - intuition: true=직관적, false=관찰적
 * - planning: true=계획적, false=즉흥적
 */
export const brainTypes: BrainType[] = [
  {
    id: 'strategist',
    emoji: '🧠',
    colorTheme: '#3B82F6',
    axes: { logic: true, creative: false, intuition: false, planning: true },
  },
  {
    id: 'artist',
    emoji: '🎨',
    colorTheme: '#EC4899',
    axes: { logic: false, creative: true, intuition: true, planning: false },
  },
  {
    id: 'scientist',
    emoji: '🔬',
    colorTheme: '#10B981',
    axes: { logic: true, creative: false, intuition: false, planning: false },
  },
  {
    id: 'performer',
    emoji: '🎭',
    colorTheme: '#F59E0B',
    axes: { logic: false, creative: true, intuition: true, planning: true },
  },
  {
    id: 'architect',
    emoji: '🏗️',
    colorTheme: '#6366F1',
    axes: { logic: true, creative: true, intuition: false, planning: true },
  },
  {
    id: 'explorer',
    emoji: '🌊',
    colorTheme: '#14B8A6',
    axes: { logic: false, creative: false, intuition: true, planning: false },
  },
  {
    id: 'manager',
    emoji: '📊',
    colorTheme: '#8B5CF6',
    axes: { logic: true, creative: false, intuition: true, planning: true },
  },
  {
    id: 'dreamer',
    emoji: '🌟',
    colorTheme: '#F472B6',
    axes: { logic: false, creative: true, intuition: false, planning: false },
  },
];

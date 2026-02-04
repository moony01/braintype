import React from 'react';
import ProgressBar from './ProgressBar';

interface Option {
  id: string;
  text: string;
}

interface QuestionCardProps {
  question: string;
  options: Option[];
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (id: string) => void;
}

/** 선택지 라벨 색상 */
const OPTION_COLORS = [
  'bg-blue-50 text-blue-600 group-hover:bg-blue-500',
  'bg-green-50 text-green-600 group-hover:bg-green-500',
  'bg-amber-50 text-amber-600 group-hover:bg-amber-500',
  'bg-rose-50 text-rose-600 group-hover:bg-rose-500',
];

/**
 * 질문 카드 컴포넌트
 * 질문 텍스트와 4개의 선택지를 표시합니다.
 */
export default function QuestionCard({
  question,
  options,
  currentIndex,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-xl mx-auto p-4 animate-slide-in">
      <ProgressBar current={currentIndex + 1} total={totalQuestions} />

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-tight text-center">
        {question}
      </h2>

      <div className="space-y-3">
        {options.map((option, idx) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.id)}
            className="w-full p-4 text-left bg-white rounded-2xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] group"
          >
            <div className="flex items-center">
              <span
                className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl font-bold mr-4 transition-colors group-hover:text-white ${OPTION_COLORS[idx] || OPTION_COLORS[0]}`}
              >
                {option.id.toUpperCase()}
              </span>
              <span className="text-base md:text-lg font-medium text-gray-700 group-hover:text-gray-900">
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

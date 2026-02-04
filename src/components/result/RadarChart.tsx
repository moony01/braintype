'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { AxisScores } from '@/types';

interface RadarChartProps {
  scores: AxisScores;
  color: string;
}

/**
 * 4축 레이더 차트 (순수 SVG)
 *
 * 외부 라이브러리 없이 SVG로 4축 레이더 차트를 그립니다.
 * 각 축의 점수(0~100)를 시각적으로 표현합니다.
 */
export default function RadarChart({ scores, color }: RadarChartProps) {
  const t = useTranslations('result.axes');

  const size = 280;
  const center = size / 2;
  const radius = 85;

  /** 4축 레이블 및 위치 */
  const axes = [
    { key: 'logic', label: t('logic'), angle: -90, positive: t('logicPos'), negative: t('logicNeg') },
    { key: 'creative', label: t('creative'), angle: 0, positive: t('creativePos'), negative: t('creativeNeg') },
    { key: 'intuition', label: t('intuition'), angle: 90, positive: t('intuitionPos'), negative: t('intuitionNeg') },
    { key: 'planning', label: t('planning'), angle: 180, positive: t('planningPos'), negative: t('planningNeg') },
  ];

  /** 각도를 라디안으로 변환 */
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  /** 축의 끝점 좌표 계산 */
  const getPoint = (angle: number, r: number) => ({
    x: center + r * Math.cos(toRad(angle)),
    y: center + r * Math.sin(toRad(angle)),
  });

  /** 배경 원형 그리드 (25%, 50%, 75%, 100%) */
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  /** 사용자 점수에 따른 데이터 영역의 각 꼭짓점 */
  const dataPoints = axes.map((axis) => {
    const score = scores[axis.key as keyof AxisScores] / 100;
    return getPoint(axis.angle, radius * score);
  });

  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-56 h-56 md:w-64 md:h-64">
        {/* 배경 그리드 */}
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={axes.map((a) => {
              const p = getPoint(a.angle, radius * level);
              return `${p.x},${p.y}`;
            }).join(' ')}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        ))}

        {/* 축 선 */}
        {axes.map((axis) => {
          const end = getPoint(axis.angle, radius);
          return (
            <line
              key={axis.key}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="#D1D5DB"
              strokeWidth="1"
            />
          );
        })}

        {/* 데이터 영역 */}
        <path d={dataPath} fill={`${color}30`} stroke={color} strokeWidth="2.5" />

        {/* 데이터 꼭짓점 */}
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} stroke="white" strokeWidth="2" />
        ))}

        {/* 축 라벨 */}
        {axes.map((axis) => {
          const labelPoint = getPoint(axis.angle, radius + 32);
          return (
            <text
              key={axis.key}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-600 text-[10px] font-bold"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>

      {/* 점수 상세 */}
      <div className="grid grid-cols-2 gap-2 mt-4 w-full max-w-xs">
        {axes.map((axis) => {
          const score = scores[axis.key as keyof AxisScores];
          const isPositive = score >= 50;
          return (
            <div
              key={axis.key}
              className="flex items-center gap-2 text-sm bg-gray-50 rounded-lg px-3 py-2"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-gray-500">{axis.label}</span>
              <span className="ml-auto font-bold text-gray-700">
                {isPositive ? axis.positive : axis.negative}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

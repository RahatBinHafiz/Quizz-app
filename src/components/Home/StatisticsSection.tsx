import React, { useState } from 'react';
import { Award, CheckCircle2, FileQuestion, TrendingUp, History, RotateCcw } from 'lucide-react';
import { UserStats } from '../../types/quiz';

interface StatisticsSectionProps {
  stats: UserStats;
  onResetStats?: () => void;
  onReviewPastQuiz?: (quizId: string) => void;
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  stats,
  onResetStats,
  onReviewPastQuiz,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Take the last 7 quizzes for the performance chart
  const recentHistory = [...stats.history].slice(0, 7).reverse();

  // Chart coordinate calculations
  const chartWidth = 520;
  const chartHeight = 160;
  const paddingX = 40;
  const paddingY = 24;

  const points = recentHistory.map((quiz, index) => {
    const x =
      recentHistory.length > 1
        ? paddingX + (index / (recentHistory.length - 1)) * (chartWidth - 2 * paddingX)
        : chartWidth / 2;
    // Map score (0 to 100) to y (chartHeight - paddingY down to paddingY)
    const y =
      chartHeight -
      paddingY -
      (quiz.scorePercentage / 100) * (chartHeight - 2 * paddingY);
    return { x, y, score: quiz.scorePercentage, category: quiz.category, date: quiz.date };
  });

  const linePath =
    points.length > 1
      ? points.reduce(
          (acc, p, i) =>
            i === 0
              ? `M ${p.x} ${p.y}`
              : `${acc} C ${points[i - 1].x + 20} ${points[i - 1].y}, ${p.x - 20} ${p.y}, ${p.x} ${p.y}`,
          ''
        )
      : '';

  const areaPath =
    points.length > 1
      ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
      : '';

  return (
    <section className="bg-white rounded-3xl border border-[#7C5CFC]/15 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#7C5CFC] tracking-wider uppercase mb-1">
            <TrendingUp className="w-4 h-4 text-[#FFD84D]" />
            <span>Progress & Metrics</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#34245C]">
            Performance Overview
          </h3>
        </div>

        {onResetStats && (
          <button
            onClick={() => {
              if (window.confirm('Reset all quiz statistics and history to zero?')) {
                onResetStats();
              }
            }}
            className="text-xs font-medium text-[#817A91] hover:text-[#E87575] flex items-center gap-1 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-[#FDF1F1]"
            title="Reset history"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Stats</span>
          </button>
        )}
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Stat 1: Quizzes Completed */}
        <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#7C5CFC]/10 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#F0EBFF] flex items-center justify-center mb-2">
            <Award className="w-4 h-4 text-[#7C5CFC]" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#34245C] font-mono-numbers block leading-none">
              {stats.quizzesCompleted}
            </span>
            <span className="text-xs font-semibold text-[#817A91] mt-1.5 block">
              Quizzes Completed
            </span>
          </div>
        </div>

        {/* Stat 2: Questions Answered */}
        <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#7C5CFC]/10 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#FFF4C2] flex items-center justify-center mb-2">
            <FileQuestion className="w-4 h-4 text-[#34245C]" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#34245C] font-mono-numbers block leading-none">
              {stats.questionsAnswered}
            </span>
            <span className="text-xs font-semibold text-[#817A91] mt-1.5 block">
              Questions Answered
            </span>
          </div>
        </div>

        {/* Stat 3: Correct Answers */}
        <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#7C5CFC]/10 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#EBF8F2] flex items-center justify-center mb-2">
            <CheckCircle2 className="w-4 h-4 text-[#55B88A]" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#34245C] font-mono-numbers block leading-none">
              {stats.correctAnswers}
            </span>
            <span className="text-xs font-semibold text-[#817A91] mt-1.5 block">
              Correct Answers
            </span>
          </div>
        </div>

        {/* Stat 4: Average Score */}
        <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#7C5CFC]/10 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#F0EBFF] flex items-center justify-center mb-2">
            <TrendingUp className="w-4 h-4 text-[#7C5CFC]" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#7C5CFC] font-mono-numbers block leading-none">
              {stats.averageScore}%
            </span>
            <span className="text-xs font-semibold text-[#817A91] mt-1.5 block">
              Average Score
            </span>
          </div>
        </div>
      </div>

      {/* Progress Chart Container */}
      <div className="rounded-2xl bg-[#FFFDF7] border border-[#7C5CFC]/10 p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-sm font-bold text-[#34245C]">
              Recent Quiz Performance
            </h4>
            <span className="text-xs text-[#817A91]">
              Accuracy trend over the last {recentHistory.length} sessions
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium text-[#817A91]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFC]" />
              <span>Score %</span>
            </div>
          </div>
        </div>

        {recentHistory.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <div className="relative min-w-[320px]">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-44 overflow-visible"
              >
                <defs>
                  <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FFF4C2" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference grid lines */}
                {[0, 25, 50, 75, 100].map((val) => {
                  const yPos =
                    chartHeight -
                    paddingY -
                    (val / 100) * (chartHeight - 2 * paddingY);
                  return (
                    <g key={val}>
                      <line
                        x1={paddingX}
                        y1={yPos}
                        x2={chartWidth - paddingX}
                        y2={yPos}
                        stroke="#7C5CFC"
                        strokeOpacity="0.08"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={paddingX - 8}
                        y={yPos + 3}
                        textAnchor="end"
                        className="text-[10px] fill-[#817A91] font-mono-numbers"
                      >
                        {val}%
                      </text>
                    </g>
                  );
                })}

                {/* Shaded Area */}
                {areaPath && <path d={areaPath} fill="url(#scoreAreaGradient)" />}

                {/* Smooth Curve */}
                {linePath && (
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#7C5CFC"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Data Points */}
                {points.map((p, idx) => (
                  <g
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={hoveredPoint === idx ? 7 : 5}
                      fill={hoveredPoint === idx ? '#FFD84D' : '#FFFFFF'}
                      stroke="#7C5CFC"
                      strokeWidth="2.5"
                      className="transition-all duration-150"
                    />

                    {/* Tooltip bubble on hover */}
                    {hoveredPoint === idx && (
                      <g transform={`translate(${p.x}, ${p.y - 28})`}>
                        <rect
                          x="-35"
                          y="-14"
                          width="70"
                          height="22"
                          rx="6"
                          fill="#34245C"
                        />
                        <text
                          x="0"
                          y="1"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          className="text-[11px] font-bold font-mono-numbers"
                        >
                          {p.score}%
                        </text>
                      </g>
                    )}

                    {/* Label below axis */}
                    <text
                      x={p.x}
                      y={chartHeight - 6}
                      textAnchor="middle"
                      className="text-[10px] font-medium fill-[#817A91]"
                    >
                      Quiz {idx + 1}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-sm text-[#817A91]">
            Complete your first quiz to generate your progress chart!
          </div>
        )}

        {/* Recent sessions list */}
        {recentHistory.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#7C5CFC]/10">
            <span className="text-xs font-bold text-[#817A91] uppercase tracking-wider block mb-2">
              Recent Attempts
            </span>
            <div className="space-y-2">
              {stats.history.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-white border border-[#7C5CFC]/10 hover:border-[#7C5CFC]/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <History className="w-3.5 h-3.5 text-[#7C5CFC]" />
                    <span className="font-semibold text-[#34245C]">{item.category}</span>
                    <span className="text-[#817A91]">({item.difficulty})</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono-numbers font-bold text-[#7C5CFC]">
                      {item.scorePercentage}%
                    </span>
                    <span className="text-[#817A91]">
                      {item.correctCount}/{item.totalQuestions}
                    </span>
                    {onReviewPastQuiz && item.answers && item.answers.length > 0 && (
                      <button
                        onClick={() => onReviewPastQuiz(item.id)}
                        className="text-[#7C5CFC] hover:underline font-medium"
                      >
                        Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

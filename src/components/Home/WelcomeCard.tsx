import React from 'react';
import { Sparkles, Trophy, Zap, Clock } from 'lucide-react';

interface WelcomeCardProps {
  onStartQuiz: () => void;
  onExploreCategories: () => void;
  totalAvailableQuestions: number;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  onStartQuiz,
  onExploreCategories,
  totalAvailableQuestions,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-[#7C5CFC]/15 p-6 sm:p-8 lg:p-10 shadow-sm">
      {/* Decorative subtle background accents */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#FFF4C2]/60 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#F0EBFF]/80 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7C5CFC] tracking-wider uppercase mb-2">
            <Sparkles className="w-4 h-4 text-[#FFD84D]" />
            <span>Smart Interactive Assessment</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#34245C] tracking-tight leading-tight">
            Ready for your next challenge?
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-[#817A91] leading-relaxed">
            Test your comprehension with 4-choice questions, real-time explanations,
            and performance tracking across 8 academic and technical domains.
          </p>

          {/* Clean unboxed inline highlights */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-[#817A91]">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FFD84D]" />
              <span className="font-mono-numbers text-[#34245C] font-semibold">
                {totalAvailableQuestions}+
              </span>{' '}
              Verified Questions
            </div>
            <span aria-hidden="true" className="text-[#817A91]/40">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <span>Timed & Self-Paced Modes</span>
            </div>
            <span aria-hidden="true" className="text-[#817A91]/40">·</span>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#55B88A]" />
              <span>Instant Review & Analytics</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={onStartQuiz}
            className="px-6 py-3.5 text-base font-bold text-white bg-[#7C5CFC] hover:bg-[#6949EB] active:scale-98 rounded-2xl shadow-md shadow-[#7C5CFC]/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Start Quiz</span>
            <span aria-hidden="true" className="text-lg">→</span>
          </button>

          <button
            onClick={onExploreCategories}
            className="px-6 py-3 text-sm font-semibold text-[#34245C] bg-[#F0EBFF] hover:bg-[#FFF4C2] rounded-2xl transition-colors duration-150 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Browse Topics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

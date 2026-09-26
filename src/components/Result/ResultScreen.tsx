import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Home,
  MinusCircle,
  Target,
  Sparkles,
  Share2,
} from 'lucide-react';
import { QuizResult } from '../../types/quiz';

interface ResultScreenProps {
  result: QuizResult;
  onReviewAnswers: () => void;
  onTryAgain: () => void;
  onBackToHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onReviewAnswers,
  onTryAgain,
  onBackToHome,
}) => {
  useEffect(() => {
    if (result.scorePercentage >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7C5CFC', '#FFD84D', '#55B88A', '#FFF4C2'],
        });
      } catch {}
    }
  }, [result.scorePercentage]);

  // Encouragement headline based on percentage
  const getFeedbackMessage = () => {
    if (result.scorePercentage >= 90) {
      return {
        title: 'Outstanding Mastery!',
        subtitle: 'You mastered this topic with exceptional precision.',
        color: 'text-[#55B88A]',
      };
    }
    if (result.scorePercentage >= 75) {
      return {
        title: 'Excellent work!',
        subtitle: 'Solid understanding of core concepts and principles.',
        color: 'text-[#7C5CFC]',
      };
    }
    if (result.scorePercentage >= 50) {
      return {
        title: 'Good Effort!',
        subtitle: 'Good baseline. A quick review will solidify your knowledge.',
        color: 'text-[#FFD84D]',
      };
    }
    return {
      title: 'Keep Practicing!',
      subtitle: 'Review the explanations below to turn mistakes into breakthroughs.',
      color: 'text-[#E87575]',
    };
  };

  const feedback = getFeedbackMessage();

  // Format time taken
  const minutes = Math.floor(result.timeTakenSeconds / 60);
  const seconds = result.timeTakenSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Circular ring calculations
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (result.scorePercentage / 100) * circumference;

  return (
    <div className="max-w-2xl mx-auto px-3.5 sm:px-6 py-5 sm:py-12 pb-24 md:pb-12">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#7C5CFC]/15 p-4 sm:p-10 shadow-sm relative overflow-hidden text-center">
        {/* Soft background accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#FFF4C2]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EBFF] text-[#7C5CFC] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD84D]" />
            <span>Quiz Complete!</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#34245C]">
            {feedback.title}
          </h2>
          <p className="text-sm text-[#817A91] mt-1 max-w-md mx-auto">
            {feedback.subtitle}
          </p>

          {/* Circular Score Ring */}
          <div className="my-8 flex flex-col items-center justify-center">
            <div className="relative" style={{ width: size, height: size }}>
              <svg width={size} height={size} className="rotate-[-90deg]">
                {/* Background Ring */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#F0EBFF"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Progress Ring */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#7C5CFC"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Inside score label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#817A91]">
                  Total Marks
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#34245C] font-mono-numbers">
                  {result.correctCount} <span className="text-xl sm:text-2xl text-[#817A91]">/ {result.totalQuestions}</span>
                </span>
                <span className="text-xs font-bold text-[#7C5CFC] font-mono-numbers mt-0.5">
                  {result.scorePercentage}% Accuracy
                </span>
              </div>
            </div>
          </div>

          {/* Prominent Marks & Net Score Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
            <div className="px-4 py-2 rounded-xl bg-[#F0EBFF] border border-[#7C5CFC]/25 text-[#34245C] text-xs sm:text-sm font-bold flex items-center gap-2">
              <span>🎯 প্রাপ্ত নম্বর (Marks Obtained):</span>
              <span className="text-[#7C5CFC] font-extrabold font-mono-numbers text-sm sm:text-base">
                {result.correctCount} / {result.totalQuestions}
              </span>
            </div>
            {result.incorrectCount > 0 && (
              <div className="px-3.5 py-2 rounded-xl bg-[#FFFDF7] border border-[#817A91]/20 text-[#817A91] text-xs font-semibold flex items-center gap-1.5" title="Admission Test format: 1 mark per correct, -0.25 per wrong">
                <span>মেডিকেল/এডমিশন নেট মার্ক (-০.২৫):</span>
                <span className="text-[#34245C] font-bold font-mono-numbers">
                  {Math.max(0, result.correctCount - result.incorrectCount * 0.25).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Metric Breakdown Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
            <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-[#55B88A]/20">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#55B88A] mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Correct</span>
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-[#34245C] font-mono-numbers block">
                {result.correctCount}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-[#E87575]/20">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#E87575] mb-1">
                <XCircle className="w-4 h-4" />
                <span>Incorrect</span>
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-[#34245C] font-mono-numbers block">
                {result.incorrectCount}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-[#7C5CFC]/15">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#817A91] mb-1">
                <MinusCircle className="w-4 h-4" />
                <span>Unanswered</span>
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-[#34245C] font-mono-numbers block">
                {result.unansweredCount}
              </span>
            </div>
          </div>

          {/* Additional details bar */}
          <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#7C5CFC]/10 flex items-center justify-around text-xs font-semibold text-[#817A91] mb-8">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#7C5CFC]" />
              <span>
                Accuracy:{' '}
                <strong className="text-[#34245C] font-mono-numbers">
                  {result.scorePercentage}%
                </strong>
              </span>
            </div>
            <span aria-hidden="true" className="text-[#7C5CFC]/20">|</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7C5CFC]" />
              <span>
                Time:{' '}
                <strong className="text-[#34245C] font-mono-numbers">
                  {timeFormatted}
                </strong>
              </span>
            </div>
            <span aria-hidden="true" className="text-[#7C5CFC]/20">|</span>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#FFD84D]" />
              <span>
                Topic: <strong className="text-[#34245C]">{result.category}</strong>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
            <button
              onClick={onReviewAnswers}
              className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#7C5CFC] hover:bg-[#6949EB] active:scale-95 rounded-xl shadow-md shadow-[#7C5CFC]/25 transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation min-h-[48px]"
            >
              <BookOpen className="w-4 h-4" />
              <span>Review Answers</span>
            </button>

            <button
              onClick={onTryAgain}
              className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-[#34245C] bg-[#FFF4C2] hover:bg-[#ffeaa0] active:scale-95 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation min-h-[48px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <button
              onClick={onBackToHome}
              className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-[#817A91] hover:text-[#34245C] bg-[#F0EBFF] hover:bg-[#e4dcff] active:scale-95 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation min-h-[48px]"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

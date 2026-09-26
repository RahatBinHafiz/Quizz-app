import React, { useState } from 'react';
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Sparkles,
  RotateCcw,
  Home,
  Check,
  X,
  Filter,
} from 'lucide-react';
import { QuizResult } from '../../types/quiz';

interface ReviewScreenProps {
  result: QuizResult;
  onTryAgain: () => void;
  onBackToHome: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const BENGALI_LETTERS = ['ক', 'খ', 'গ', 'ঘ'];

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  result,
  onTryAgain,
  onBackToHome,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');

  const filteredQuestions = result.questions.map((q, idx) => {
    const answer = result.answers[idx];
    const isSelected = answer?.selectedOption !== null && answer?.selectedOption !== undefined;
    const isCorrect = answer?.isCorrect ?? false;
    const isUnanswered = !isSelected;
    const isIncorrect = isSelected && !isCorrect;

    return {
      question: q,
      index: idx,
      answer,
      isSelected,
      isCorrect,
      isUnanswered,
      isIncorrect,
    };
  }).filter((item) => {
    if (filter === 'correct') return item.isCorrect;
    if (filter === 'incorrect') return item.isIncorrect;
    if (filter === 'unanswered') return item.isUnanswered;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#817A91] hover:text-[#34245C] mb-2 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h2 className="text-2xl font-extrabold text-[#34245C]">
            Answer Review
          </h2>
          <span className="text-xs text-[#817A91]">
            {result.category} · Score: {result.scorePercentage}% ({result.correctCount}/{result.totalQuestions})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTryAgain}
            className="px-4 py-2 text-xs font-bold text-[#34245C] bg-[#FFF4C2] hover:bg-[#ffeaa0] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <button
            onClick={onBackToHome}
            className="px-4 py-2 text-xs font-bold text-white bg-[#7C5CFC] hover:bg-[#6949EB] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs (Interactive Filter Controls allowed per design constitution) */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F0EBFF] rounded-2xl mb-6 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            filter === 'all'
              ? 'bg-white text-[#34245C] shadow-sm'
              : 'text-[#817A91] hover:text-[#34245C]'
          }`}
        >
          All Questions ({result.totalQuestions})
        </button>

        <button
          onClick={() => setFilter('correct')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'correct'
              ? 'bg-[#EBF8F2] text-[#1E4D38] shadow-sm'
              : 'text-[#817A91] hover:text-[#55B88A]'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#55B88A]" />
          <span>Correct ({result.correctCount})</span>
        </button>

        <button
          onClick={() => setFilter('incorrect')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'incorrect'
              ? 'bg-[#FDF1F1] text-[#692525] shadow-sm'
              : 'text-[#817A91] hover:text-[#E87575]'
          }`}
        >
          <XCircle className="w-3.5 h-3.5 text-[#E87575]" />
          <span>Incorrect ({result.incorrectCount})</span>
        </button>

        <button
          onClick={() => setFilter('unanswered')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            filter === 'unanswered'
              ? 'bg-white text-[#34245C] shadow-sm'
              : 'text-[#817A91] hover:text-[#34245C]'
          }`}
        >
          <MinusCircle className="w-3.5 h-3.5 text-[#817A91]" />
          <span>Unanswered ({result.unansweredCount})</span>
        </button>
      </div>

      {/* Review Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#7C5CFC]/15 p-10 text-center text-[#817A91] text-sm">
            No questions matching the &ldquo;{filter}&rdquo; filter.
          </div>
        ) : (
          filteredQuestions.map(({ question: q, index, answer, isCorrect, isUnanswered, isIncorrect }) => {
            const userAnswerIdx = answer?.selectedOption;
            const correctAnswerIdx = q.correctAnswer;

            return (
              <div
                key={q.id}
                className="bg-white rounded-3xl border border-[#7C5CFC]/15 p-6 sm:p-7 shadow-sm transition-all"
              >
                {/* Question Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-extrabold text-[#7C5CFC] tracking-wider uppercase">
                    Question {index + 1}
                  </span>

                  <div className="flex items-center gap-2">
                    {isCorrect && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#55B88A] bg-[#EBF8F2] px-2.5 py-1 rounded-lg">
                        <Check className="w-3.5 h-3.5" />
                        <span>Correct</span>
                      </span>
                    )}
                    {isIncorrect && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E87575] bg-[#FDF1F1] px-2.5 py-1 rounded-lg">
                        <X className="w-3.5 h-3.5" />
                        <span>Incorrect</span>
                      </span>
                    )}
                    {isUnanswered && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#817A91] bg-slate-100 px-2.5 py-1 rounded-lg">
                        <MinusCircle className="w-3.5 h-3.5" />
                        <span>Unanswered</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#2D2640] mb-4 leading-snug">
                  {q.question}
                </h3>

                {/* 4 Options */}
                <div className="space-y-2.5 mb-5">
                  {q.options.map((optionText, optIdx) => {
                    const isThisCorrect = optIdx === correctAnswerIdx;
                    const isThisUserSelected = optIdx === userAnswerIdx;
                    const isBengali = /[\u0980-\u09FF]/.test(q.question + optionText);
                    const letter = isBengali
                      ? BENGALI_LETTERS[optIdx] || OPTION_LETTERS[optIdx]
                      : OPTION_LETTERS[optIdx];

                    let rowStyle = 'bg-[#FFFDF7] border-slate-200 text-[#2D2640]';
                    let badgeStyle = 'bg-[#F0EBFF] text-[#7C5CFC]';
                    let indicator = null;

                    if (isThisCorrect) {
                      rowStyle = 'bg-[#EBF8F2] border-[#55B88A] text-[#1E4D38]';
                      badgeStyle = 'bg-[#55B88A] text-white';
                      indicator = (
                        <div className="flex items-center gap-1 text-xs font-bold text-[#55B88A]">
                          <Check className="w-4 h-4" />
                          <span>Correct Answer</span>
                        </div>
                      );
                    } else if (isThisUserSelected) {
                      rowStyle = 'bg-[#FDF1F1] border-[#E87575] text-[#692525]';
                      badgeStyle = 'bg-[#E87575] text-white';
                      indicator = (
                        <div className="flex items-center gap-1 text-xs font-bold text-[#E87575]">
                          <X className="w-4 h-4" />
                          <span>Your Choice</span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between gap-3 text-sm font-semibold transition-colors ${rowStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${badgeStyle}`}
                          >
                            {letter}
                          </span>
                          <span>{optionText}</span>
                        </div>
                        {indicator}
                      </div>
                    );
                  })}
                </div>

                {/* Summary Footprint */}
                <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-[#7C5CFC]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[#817A91]">Your Answer: </span>
                      <strong className="text-[#34245C]">
                        {userAnswerIdx !== null && userAnswerIdx !== undefined
                          ? `${/[\u0980-\u09FF]/.test(q.question) ? BENGALI_LETTERS[userAnswerIdx] : OPTION_LETTERS[userAnswerIdx]} ${
                              isCorrect ? '✓' : '❌'
                            }`
                          : 'None (Skipped)'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#817A91]">Correct Answer: </span>
                      <strong className="text-[#55B88A]">
                        {/[\u0980-\u09FF]/.test(q.question) ? BENGALI_LETTERS[correctAnswerIdx] : OPTION_LETTERS[correctAnswerIdx]} ✓
                      </strong>
                    </div>
                  </div>

                  <span className="text-[#817A91] text-[11px]">
                    Category: {q.category} · {q.difficulty}
                  </span>
                </div>

                {/* Educational Explanation Box */}
                {q.explanation && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-[#F0EBFF]/60 border border-[#7C5CFC]/20 text-xs sm:text-sm text-[#34245C]">
                    <div className="flex items-center gap-1.5 font-bold text-[#7C5CFC] mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFD84D]" />
                      <span>Explanation:</span>
                    </div>
                    <p className="text-[#2D2640] leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Floating Navigation */}
      <div className="mt-8 text-center">
        <button
          onClick={onBackToHome}
          className="px-6 py-3 text-sm font-bold text-white bg-[#7C5CFC] hover:bg-[#6949EB] rounded-xl shadow-md shadow-[#7C5CFC]/25 transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>
      </div>
    </div>
  );
};

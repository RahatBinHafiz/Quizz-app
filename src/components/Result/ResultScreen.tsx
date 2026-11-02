import React, { useState, useEffect } from 'react';
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
  Check,
  X,
  Printer,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { QuizResult } from '../../types/quiz';
import { FormattedQuestionText } from '../FormattedQuestionText';

interface ResultScreenProps {
  result: QuizResult;
  onReviewAnswers: () => void;
  onTryAgain: () => void;
  onBackToHome: () => void;
}

const BENGALI_LETTERS = ['ক', 'খ', 'গ', 'ঘ'];
const ENGLISH_LETTERS = ['A', 'B', 'C', 'D'];

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onReviewAnswers,
  onTryAgain,
  onBackToHome,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');
  const [isQuestionsExpanded, setIsQuestionsExpanded] = useState<boolean>(true);

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
        title: 'অসাধারণ পারফরম্যান্স! (Outstanding Mastery)',
        subtitle: 'আপনি সর্বোচ্চ দক্ষতার সাথে এই বিষয়টি সম্পন্ন করেছেন।',
        color: 'text-[#55B88A]',
      };
    }
    if (result.scorePercentage >= 75) {
      return {
        title: 'দারুণ ফলাফল! (Excellent Work)',
        subtitle: 'অধ্যায়ের মৌলিক ধারণায় আপনার চমৎকার দখল রয়েছে।',
        color: 'text-[#7C5CFC]',
      };
    }
    if (result.scorePercentage >= 50) {
      return {
        title: 'সন্তোষজনক অগ্রগতি! (Good Effort)',
        subtitle: 'ভুল উত্তরগুলো নিচে ভালো করে দেখে প্রস্তুতি আরও ঝালিয়ে নিন।',
        color: 'text-[#FFD84D]',
      };
    }
    return {
      title: 'পুনরায় অনুশীলন করুন! (Keep Practicing)',
      subtitle: 'নিচের প্রশ্ন ও নির্ভুল ব্যাখ্যাগুলো পড়ে পুনরাবৃত্তি করুন।',
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

  const reviewItems = result.questions.map((q, idx) => {
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
  });

  const filteredItems = reviewItems.filter((item) => {
    if (filter === 'correct') return item.isCorrect;
    if (filter === 'incorrect') return item.isIncorrect;
    if (filter === 'unanswered') return item.isUnanswered;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-3.5 sm:px-6 py-5 sm:py-10 pb-24 md:pb-12 space-y-6 sm:space-y-8">
      {/* Top Result Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#7C5CFC]/15 p-4 sm:p-10 shadow-sm relative overflow-hidden text-center">
        {/* Soft background accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#FFF4C2]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EBFF] text-[#7C5CFC] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD84D]" />
            <span>পরীক্ষা সম্পন্ন হয়েছে (Exam Completed)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#34245C]">
            {feedback.title}
          </h2>
          <p className="text-sm text-[#817A91] mt-1 max-w-md mx-auto">
            {feedback.subtitle}
          </p>

          {/* Circular Score Ring */}
          <div className="my-7 flex flex-col items-center justify-center">
            <div className="relative" style={{ width: size, height: size }}>
              <svg width={size} height={size} className="rotate-[-90deg]">
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#F0EBFF"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
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
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#817A91]">
                  প্রাপ্ত নম্বর (Marks)
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#34245C] font-mono-numbers">
                  {result.correctCount} <span className="text-xl sm:text-2xl text-[#817A91]">/ {result.totalQuestions}</span>
                </span>
                <span className="text-xs font-bold text-[#7C5CFC] font-mono-numbers mt-0.5">
                  {result.scorePercentage}% সঠিক
                </span>
              </div>
            </div>
          </div>

          {/* Prominent Marks & Net Score Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
            <div className="px-4 py-2.5 rounded-xl bg-[#F0EBFF] border border-[#7C5CFC]/25 text-[#34245C] text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs">
              <span>🎯 মোট প্রাপ্ত নম্বর (Total Score):</span>
              <span className="text-[#7C5CFC] font-extrabold font-mono-numbers text-sm sm:text-lg">
                {result.correctCount} / {result.totalQuestions}
              </span>
            </div>
            {result.incorrectCount > 0 && (
              <div className="px-3.5 py-2.5 rounded-xl bg-[#FFFDF7] border border-[#817A91]/20 text-[#817A91] text-xs font-semibold flex items-center gap-1.5" title="এইচএসসি / ভর্তি পরীক্ষা ফরম্যাট">
                <span>নেগেটিভ মার্কিং সহ (-০.২৫):</span>
                <span className="text-[#34245C] font-bold font-mono-numbers">
                  {Math.max(0, result.correctCount - result.incorrectCount * 0.25).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Metric Breakdown Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
            <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-[#55B88A]/25">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#55B88A] mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>সঠিক (Correct)</span>
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-[#1E4D38] font-mono-numbers block">
                {result.correctCount}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-[#E87575]/25">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#E87575] mb-1">
                <XCircle className="w-4 h-4" />
                <span>ভুল (Incorrect)</span>
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-[#692525] font-mono-numbers block">
                {result.incorrectCount}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-[#7C5CFC]/20">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#817A91] mb-1">
                <MinusCircle className="w-4 h-4" />
                <span>উত্তরহীন (Skipped)</span>
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-[#34245C] font-mono-numbers block">
                {result.unansweredCount}
              </span>
            </div>
          </div>

          {/* Details Bar */}
          <div className="p-3 sm:p-4 rounded-2xl bg-[#FFFDF7] border border-[#7C5CFC]/10 flex items-center justify-around text-xs font-semibold text-[#817A91] mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#7C5CFC]" />
              <span>
                নির্ভুলতা:{' '}
                <strong className="text-[#34245C] font-mono-numbers">
                  {result.scorePercentage}%
                </strong>
              </span>
            </div>
            <span aria-hidden="true" className="text-[#7C5CFC]/20">|</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7C5CFC]" />
              <span>
                সময়:{' '}
                <strong className="text-[#34245C] font-mono-numbers">
                  {timeFormatted}
                </strong>
              </span>
            </div>
            <span aria-hidden="true" className="text-[#7C5CFC]/20">|</span>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#FFD84D]" />
              <span>
                পরীক্ষা: <strong className="text-[#34245C]">{result.category}</strong>
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('full-questions-review-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#7C5CFC] hover:bg-[#6949EB] active:scale-95 rounded-xl shadow-md shadow-[#7C5CFC]/25 transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation min-h-[44px]"
            >
              <BookOpen className="w-4 h-4" />
              <span>সব {result.totalQuestions}টি প্রশ্নের উত্তর দেখুন</span>
            </button>

            <button
              onClick={onTryAgain}
              className="px-5 py-3 text-xs sm:text-sm font-bold text-[#34245C] bg-[#FFF4C2] hover:bg-[#ffeaa0] active:scale-95 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>পুনরায় পরীক্ষা দিন (Try Again)</span>
            </button>

            <button
              onClick={onBackToHome}
              className="px-5 py-3 text-xs sm:text-sm font-bold text-[#817A91] hover:text-[#34245C] bg-[#F0EBFF] hover:bg-[#e4dcff] active:scale-95 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation min-h-[44px]"
            >
              <Home className="w-4 h-4" />
              <span>হোমপেজে ফিরে যান (Home)</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-3 text-xs sm:text-sm font-bold text-[#817A91] hover:text-[#34245C] bg-white border border-slate-200 hover:border-[#7C5CFC] active:scale-95 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation min-h-[44px] hidden sm:flex"
              title="Print or Save Result"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* DETAILED 50 QUESTIONS REVIEW SECTION */}
      <section id="full-questions-review-section" className="space-y-4">
        {/* Section Header */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#7C5CFC]/15 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#7C5CFC] uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>পূর্ণাঙ্গ প্রশ্নোত্তর ও সমাধান</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#34245C]">
              সকল {result.totalQuestions}টি প্রশ্নের ফলাফল ও সঠিক উত্তর পর্যালোচনা
            </h3>
            <p className="text-xs text-[#817A91] mt-0.5">
              পরীক্ষার্থীর দেওয়া উত্তর, সঠিক উত্তর, নম্বর বণ্টন এবং বিস্তারিত ব্যাখ্যা।
            </p>
          </div>

          <button
            onClick={() => setIsQuestionsExpanded(!isQuestionsExpanded)}
            className="px-3.5 py-2 rounded-xl bg-[#F0EBFF] hover:bg-[#FFF4C2] text-[#34245C] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer self-stretch sm:self-auto justify-center"
          >
            <span>{isQuestionsExpanded ? 'সংক্ষিপ্ত করুন' : 'বিস্তারিত দেখুন'}</span>
            {isQuestionsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {isQuestionsExpanded && (
          <>
            {/* Filter Pills */}
            <div className="flex items-center gap-2 p-1.5 bg-[#F0EBFF] rounded-2xl overflow-x-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  filter === 'all'
                    ? 'bg-white text-[#34245C] shadow-sm'
                    : 'text-[#817A91] hover:text-[#34245C]'
                }`}
              >
                সব প্রশ্ন ({result.totalQuestions})
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
                <span>সঠিক ({result.correctCount})</span>
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
                <span>ভুল ({result.incorrectCount})</span>
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
                <span>উত্তরহীন ({result.unansweredCount})</span>
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-4 sm:space-y-5">
              {filteredItems.length === 0 ? (
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#7C5CFC]/15 p-8 text-center text-[#817A91] text-sm">
                  এই ফিল্টারে কোনো প্রশ্ন পাওয়া যায়নি।
                </div>
              ) : (
                filteredItems.map(({ question: q, index, answer, isCorrect, isUnanswered, isIncorrect }) => {
                  const userAnswerIdx = answer?.selectedOption;
                  const correctAnswerIdx = q.correctAnswer;
                  const isBengali = /[\u0980-\u09FF]/.test(q.question);
                  const letters = isBengali ? BENGALI_LETTERS : ENGLISH_LETTERS;

                  return (
                    <div
                      key={q.id ?? index}
                      className={`bg-white rounded-2xl sm:rounded-3xl border p-4 sm:p-6 shadow-xs transition-all ${
                        isCorrect
                          ? 'border-[#55B88A]/35 hover:border-[#55B88A]'
                          : isIncorrect
                          ? 'border-[#E87575]/35 hover:border-[#E87575]'
                          : 'border-slate-200 hover:border-[#7C5CFC]/40'
                      }`}
                    >
                      {/* Top Question Row with Question Number & Mark Status */}
                      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-[#F0EBFF] text-[#7C5CFC] text-xs font-extrabold font-mono-numbers">
                            প্রশ্ন {index + 1}
                          </span>
                          <span className="text-[11px] font-semibold text-[#817A91]">
                            {q.category}
                          </span>
                        </div>

                        {/* Marks status badge */}
                        <div>
                          {isCorrect && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1E4D38] bg-[#EBF8F2] border border-[#55B88A]/30 px-2.5 py-1 rounded-lg">
                              <Check className="w-3.5 h-3.5 text-[#55B88A]" />
                              <span>+১.০ মার্ক (সঠিক)</span>
                            </span>
                          )}
                          {isIncorrect && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#692525] bg-[#FDF1F1] border border-[#E87575]/30 px-2.5 py-1 rounded-lg">
                              <X className="w-3.5 h-3.5 text-[#E87575]" />
                              <span>০.০ মার্ক (ভুল উত্তর)</span>
                            </span>
                          )}
                          {isUnanswered && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#817A91] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                              <MinusCircle className="w-3.5 h-3.5" />
                              <span>০.০ মার্ক (উত্তর করা হয়নি)</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Question Title & Code block */}
                      <div className="mb-4">
                        <FormattedQuestionText
                          text={q.question}
                          className="text-base sm:text-lg font-bold text-[#2D2640] leading-snug"
                        />
                      </div>

                      {/* 4 Options Grid */}
                      <div className="space-y-2 mb-4">
                        {q.options.map((optionText, optIdx) => {
                          const isThisCorrect = optIdx === correctAnswerIdx;
                          const isThisUserSelected = optIdx === userAnswerIdx;
                          const letter = letters[optIdx] || ENGLISH_LETTERS[optIdx];

                          let optionStyle = 'bg-[#FFFDF7] border-slate-200 text-[#2D2640]';
                          let badgeStyle = 'bg-[#F0EBFF] text-[#7C5CFC]';
                          let tag = null;

                          if (isThisCorrect) {
                            optionStyle = 'bg-[#EBF8F2] border-[#55B88A] text-[#1E4D38] shadow-xs';
                            badgeStyle = 'bg-[#55B88A] text-white';
                            tag = (
                              <div className="flex items-center gap-1 text-xs font-bold text-[#55B88A] shrink-0">
                                <Check className="w-4 h-4" />
                                <span>সঠিক উত্তর</span>
                              </div>
                            );
                          }

                          if (isThisUserSelected) {
                            if (!isThisCorrect) {
                              optionStyle = 'bg-[#FDF1F1] border-[#E87575] text-[#692525] shadow-xs';
                              badgeStyle = 'bg-[#E87575] text-white';
                              tag = (
                                <div className="flex items-center gap-1 text-xs font-bold text-[#E87575] shrink-0">
                                  <X className="w-4 h-4" />
                                  <span>আপনার উত্তর</span>
                                </div>
                              );
                            } else {
                              tag = (
                                <div className="flex items-center gap-1 text-xs font-bold text-[#55B88A] shrink-0">
                                  <Check className="w-4 h-4" />
                                  <span>আপনার উত্তর (সঠিক)</span>
                                </div>
                              );
                            }
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-3 sm:p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold transition-colors ${optionStyle}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${badgeStyle}`}
                                >
                                  {letter}
                                </span>
                                <span>{optionText}</span>
                              </div>
                              {tag}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation & User Choice Summary Box */}
                      <div className="p-3 sm:p-4 rounded-xl bg-[#FFFDF7] border border-[#7C5CFC]/15 text-xs space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#7C5CFC]/10">
                          <div className="flex items-center gap-3">
                            <span className="text-[#817A91]">
                              আপনার উত্তর:{' '}
                              <strong className={isCorrect ? 'text-[#55B88A]' : isIncorrect ? 'text-[#E87575]' : 'text-[#817A91]'}>
                                {userAnswerIdx !== null && userAnswerIdx !== undefined
                                  ? `${letters[userAnswerIdx]}. ${q.options[userAnswerIdx]}`
                                  : 'উত্তর করা হয়নি'}
                              </strong>
                            </span>
                            <span className="text-[#817A91]">|</span>
                            <span className="text-[#817A91]">
                              সঠিক উত্তর:{' '}
                              <strong className="text-[#55B88A]">
                                {letters[correctAnswerIdx]}. {q.options[correctAnswerIdx]}
                              </strong>
                            </span>
                          </div>
                        </div>

                        {/* Explanation Text */}
                        {q.explanation && (
                          <div className="text-[#5B5569] leading-relaxed pt-1">
                            <strong className="text-[#34245C] font-bold">💡 ব্যাখ্যা: </strong>
                            <span>{q.explanation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

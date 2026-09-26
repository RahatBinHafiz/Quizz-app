import React, { useState } from 'react';
import {
  Layers,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Sliders,
  Check,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { Difficulty, QuizConfig } from '../types/quiz';
import { CATEGORIES } from '../data/questionBank';

interface QuizSetupProps {
  initialCategory?: string;
  totalAvailableInCategory: (cat: string) => number;
  onStartQuiz: (config: QuizConfig) => void;
  onBack: () => void;
}

export const QuizSetup: React.FC<QuizSetupProps> = ({
  initialCategory = 'All Categories',
  totalAvailableInCategory,
  onStartQuiz,
  onBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const availableCount = totalAvailableInCategory(selectedCategory);
  
  // Default to 50 for Biology (or availableCount if smaller), otherwise 10
  const [questionCount, setQuestionCount] = useState<number>(() => {
    if (initialCategory === 'Biology') return 50;
    return 10;
  });
  const [difficulty, setDifficulty] = useState<Difficulty>('Mixed');
  const [timerOption, setTimerOption] = useState<number | null>(() => {
    return initialCategory === 'Biology' ? 50 : 30;
  }); // Default timer: 50 minutes for Biology 50 Qs
  const [customMinutes, setCustomMinutes] = useState<number>(50);
  const [instantFeedback, setInstantFeedback] = useState<boolean>(false); // Default to Real Exam Mode (no premature answers)
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(false);

  // Dynamic question counts including 50
  const baseCountOptions = [10, 20, 30, 40, 50];
  const difficultyOptions: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Mixed'];
  const timerPresets = [
    { label: '50 Mins (Default)', value: 50 },
    { label: '40 Mins', value: 40 },
    { label: '30 Mins', value: 30 },
    { label: '20 Mins', value: 20 },
    { label: 'No Timer', value: null },
    { label: 'Custom', value: -1 },
  ];

  const handleCategoryChange = (catName: string) => {
    setSelectedCategory(catName);
    const count = totalAvailableInCategory(catName);
    if (catName === 'Biology') {
      setQuestionCount(50);
      setShuffleQuestions(false);
      setTimerOption(50);
    } else if (questionCount > count) {
      setQuestionCount(count);
    }
  };

  const handleStart = () => {
    const finalTimer = timerOption === -1 ? customMinutes : timerOption;
    onStartQuiz({
      category: selectedCategory,
      questionCount: Math.min(questionCount, availableCount > 0 ? availableCount : 10),
      difficulty,
      timerMinutes: finalTimer,
      instantFeedback,
      shuffle: shuffleQuestions,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8 pb-20 md:pb-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#817A91] hover:text-[#34245C] mb-4 sm:mb-6 transition-colors cursor-pointer touch-manipulation"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Main Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#7C5CFC]/15 p-4 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFF4C2]/30 rounded-bl-full pointer-events-none" />

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7C5CFC] tracking-wider uppercase mb-1">
            <Sliders className="w-4 h-4 text-[#FFD84D]" />
            <span>Customize Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#34245C] tracking-tight">
            Configure Your Quiz
          </h2>
          <p className="mt-1 text-sm text-[#817A91]">
            Select your preferred subject, question density, difficulty, and timer constraints.
          </p>
        </div>

        <div className="space-y-7">
          {/* Section 1: Category */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-[#34245C] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#7C5CFC]" />
                <span>Quiz Category</span>
              </label>
              <span className="text-xs text-[#817A91] font-mono-numbers">
                {availableCount} questions in this pool
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => handleCategoryChange('All Categories')}
                className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'All Categories'
                    ? 'bg-[#F0EBFF] border-[#7C5CFC] text-[#34245C] shadow-sm'
                    : 'bg-[#FFFDF7] border-[#7C5CFC]/15 text-[#817A91] hover:border-[#7C5CFC]/50 hover:text-[#34245C]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>✨ All Categories</span>
                  {selectedCategory === 'All Categories' && (
                    <Check className="w-3.5 h-3.5 text-[#7C5CFC]" />
                  )}
                </div>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.name
                      ? 'bg-[#F0EBFF] border-[#7C5CFC] text-[#34245C] shadow-sm'
                      : 'bg-[#FFFDF7] border-[#7C5CFC]/15 text-[#817A91] hover:border-[#7C5CFC]/50 hover:text-[#34245C]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{cat.name}</span>
                    {selectedCategory === cat.name && (
                      <Check className="w-3.5 h-3.5 text-[#7C5CFC] shrink-0 ml-1" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Special Highlight for Biology 40 Questions Set */}
            {selectedCategory === 'Biology' && (
              <div className="mt-3 p-3.5 rounded-2xl bg-[#EBF8F2] border border-[#55B88A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🧬</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#1E4D38]">
                      কোষ ও এর গঠন (Cell & Structure) — সম্পূর্ণ ৪০টি প্রশ্ন
                    </h4>
                    <span className="text-[11px] text-[#55B88A]">
                      ১ থেকে ৪০ পর্যন্ত সবগুলো প্রশ্ন অধ্যায় অনুসারে সাজানো আছে।
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setQuestionCount(40);
                    setDifficulty('Mixed');
                    setShuffleQuestions(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    questionCount === 40 && !shuffleQuestions
                      ? 'bg-[#55B88A] text-white shadow-sm'
                      : 'bg-white text-[#1E4D38] border border-[#55B88A]/40 hover:bg-[#55B88A] hover:text-white'
                  }`}
                >
                  {questionCount === 40 && !shuffleQuestions ? '✓ অল ৪০ সিলেক্টেড' : 'সবগুলো ৪০টি প্রশ্ন নিন'}
                </button>
              </div>
            )}
          </div>

          {/* Section 2: Number of Questions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-[#34245C]">
                Number of Questions
              </label>
              <span className="text-xs text-[#817A91]">
                Target: {questionCount} Questions
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {baseCountOptions.map((count) => {
                const isSelected = questionCount === count;
                const isOverPool = count > availableCount && availableCount > 0;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`px-5 py-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer font-mono-numbers ${
                      isSelected
                        ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white shadow-sm'
                        : isOverPool
                        ? 'bg-slate-50 border-slate-200 text-[#817A91] opacity-60'
                        : 'bg-[#FFFDF7] border-[#7C5CFC]/15 text-[#34245C] hover:border-[#7C5CFC]'
                    }`}
                  >
                    {count} Questions
                  </button>
                );
              })}

              {availableCount > 0 && (
                <button
                  type="button"
                  onClick={() => setQuestionCount(availableCount)}
                  className={`px-5 py-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer font-mono-numbers flex items-center gap-1.5 ${
                    questionCount === availableCount
                      ? 'bg-[#34245C] border-[#34245C] text-[#FFD84D] shadow-sm'
                      : 'bg-[#FFFDF7] border-[#7C5CFC]/15 text-[#34245C] hover:border-[#7C5CFC]'
                  }`}
                >
                  <span>All ({availableCount} Questions)</span>
                  {questionCount === availableCount && <Check className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            {availableCount < questionCount && availableCount > 0 && (
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#E87575]">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>
                  The current pool has {availableCount} questions. All {availableCount} will be used.
                </span>
              </div>
            )}
          </div>

          {/* Section 2.5: Question Order */}
          <div className="pt-2 border-t border-[#7C5CFC]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-sm font-bold text-[#34245C] block">
                Question Sequence / Order
              </span>
              <span className="text-xs text-[#817A91] block">
                Keep the natural 1 to 40 sequential topic order or randomize the order.
              </span>
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#F0EBFF] rounded-xl">
              <button
                type="button"
                onClick={() => setShuffleQuestions(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !shuffleQuestions
                    ? 'bg-white text-[#34245C] shadow-sm'
                    : 'text-[#817A91] hover:text-[#34245C]'
                }`}
              >
                Sequential (1 → 40)
              </button>
              <button
                type="button"
                onClick={() => setShuffleQuestions(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  shuffleQuestions
                    ? 'bg-white text-[#34245C] shadow-sm'
                    : 'text-[#817A91] hover:text-[#34245C]'
                }`}
              >
                Random Shuffle
              </button>
            </div>
          </div>

          {/* Section 3: Difficulty */}
          <div>
            <label className="block text-sm font-bold text-[#34245C] mb-3">
              Difficulty Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {difficultyOptions.map((diff) => {
                const isSelected = difficulty === diff;
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'bg-[#34245C] border-[#34245C] text-[#FFD84D] shadow-sm'
                        : 'bg-[#FFFDF7] border-[#7C5CFC]/15 text-[#34245C] hover:border-[#7C5CFC]'
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Timer */}
          <div>
            <label className="block text-sm font-bold text-[#34245C] mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7C5CFC]" />
              <span>Quiz Timer</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-3">
              {timerPresets.map((preset) => {
                const isSelected = timerOption === preset.value;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setTimerOption(preset.value)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'bg-[#7C5CFC] border-[#7C5CFC] text-white shadow-sm'
                        : 'bg-[#FFFDF7] border-[#7C5CFC]/15 text-[#34245C] hover:border-[#7C5CFC]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {timerOption === -1 && (
              <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#7C5CFC]/20 mt-2 flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-[#34245C]">
                  Custom Minutes:
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="180"
                    step="5"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(Number(e.target.value))}
                    className="w-32 sm:w-48 accent-[#7C5CFC] cursor-pointer"
                  />
                  <span className="text-sm font-bold font-mono-numbers text-[#7C5CFC] w-14">
                    {customMinutes} min
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Real Exam Mode Notice */}
          <div className="pt-2 border-t border-[#7C5CFC]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-sm font-bold text-[#34245C] block">
                {instantFeedback ? 'Practice Mode (Instant Feedback)' : 'Real Exam Mode (Standard)'}
              </span>
              <span className="text-xs text-[#817A91] block">
                {instantFeedback
                  ? 'Shows right/wrong answers and explanations immediately after answering.'
                  : 'Takes your answers quietly. Total marks, right/wrong answers, and explanations are shown at the end.'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setInstantFeedback(!instantFeedback)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                instantFeedback ? 'bg-[#7C5CFC]' : 'bg-[#D4C9FB]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  instantFeedback ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Start Button & Summary */}
        <div className="mt-8 pt-6 border-t border-[#7C5CFC]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#817A91]">
            <Zap className="w-4 h-4 text-[#FFD84D]" />
            <span>
              Configured: <strong className="text-[#34245C]">{Math.min(questionCount, availableCount > 0 ? availableCount : 10)}</strong> questions in{' '}
              <strong className="text-[#34245C]">{selectedCategory}</strong>
            </span>
          </div>

          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-[#7C5CFC] hover:bg-[#6949EB] active:scale-95 rounded-xl shadow-md shadow-[#7C5CFC]/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer touch-manipulation min-h-[48px]"
          >
            <span>Start Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

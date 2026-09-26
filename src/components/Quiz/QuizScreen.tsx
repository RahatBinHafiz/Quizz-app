import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  LayoutGrid,
  X,
  AlertTriangle,
} from 'lucide-react';
import { Question, QuizConfig, QuizResult, UserAnswer } from '../../types/quiz';
import { ProgressBar } from './ProgressBar';
import { Timer } from './Timer';
import { AnswerOption } from './AnswerOption';

interface QuizScreenProps {
  questions: Question[];
  config: QuizConfig;
  onFinishQuiz: (result: QuizResult) => void;
  onQuitQuiz: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  config,
  onFinishQuiz,
  onQuitQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number | null>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [isGridModalOpen, setIsGridModalOpen] = useState<boolean>(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState<boolean>(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const selectedOption = userAnswers[currentIndex] ?? null;
  const isAnswered = selectedOption !== null;
  const isFinalQuestion = currentIndex === totalQuestions - 1;

  // Track total quiz duration
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpentSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle selecting an option
  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));

    if (config.instantFeedback) {
      setShowExplanation((prev) => ({
        ...prev,
        [currentIndex]: true,
      }));
    }
  };

  // Clear answer
  const handleClearAnswer = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
    setShowExplanation((prev) => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finalizeQuiz();
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    setIsGridModalOpen(false);
  };

  // Finalize and calculate score
  const finalizeQuiz = () => {
    const answers: UserAnswer[] = questions.map((q, index) => {
      const selected = userAnswers[index] ?? null;
      const isCorrect = selected === q.correctAnswer;
      return {
        questionId: q.id,
        selectedOption: selected,
        isCorrect,
        timeSpentSeconds: Math.round(timeSpentSeconds / totalQuestions),
      };
    });

    const correctCount = answers.filter((a) => a.isCorrect).length;
    const unansweredCount = answers.filter((a) => a.selectedOption === null).length;
    const incorrectCount = totalQuestions - correctCount - unansweredCount;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    const result: QuizResult = {
      id: `quiz_${Date.now()}`,
      date: new Date().toISOString(),
      category: config.category,
      difficulty: config.difficulty,
      totalQuestions,
      correctCount,
      incorrectCount,
      unansweredCount,
      scorePercentage,
      timeTakenSeconds: timeSpentSeconds,
      answers,
      questions,
    };

    onFinishQuiz(result);
  };

  const handleTimeUp = () => {
    alert('⏱ Time is up! Submitting your answers.');
    finalizeQuiz();
  };

  if (!currentQuestion) {
    return (
      <div className="text-center py-20 text-[#817A91]">
        No questions available for this quiz.
      </div>
    );
  }

  // Does this question reveal the answer right now?
  // In instantFeedback mode: immediately when answered.
  const isRevealed = config.instantFeedback && isAnswered;
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Top Bar with Category, Grid Jump, and Timer */}
      <div className="bg-white rounded-2xl border border-[#7C5CFC]/15 p-4 sm:p-5 shadow-sm mb-5">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuitConfirm(true)}
              className="p-1.5 rounded-lg text-[#817A91] hover:text-[#E87575] hover:bg-[#FDF1F1] transition-colors cursor-pointer"
              title="Quit Quiz"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-[#34245C]">
              {config.category}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Optional Timer */}
            {config.timerMinutes && (
              <Timer
                initialSeconds={config.timerMinutes * 60}
                onTimeUp={handleTimeUp}
              />
            )}

            {/* Jump Grid Trigger */}
            <button
              onClick={() => setIsGridModalOpen(true)}
              className="p-2 rounded-xl bg-[#F0EBFF] hover:bg-[#FFF4C2] text-[#34245C] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Question Map"
            >
              <LayoutGrid className="w-4 h-4 text-[#7C5CFC]" />
              <span className="hidden sm:inline">Overview</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar
          currentIndex={currentIndex}
          total={totalQuestions}
          category={currentQuestion.category}
        />
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-[#7C5CFC]/15 p-6 sm:p-8 shadow-sm mb-6 transition-all">
        {/* Category & Difficulty metadata */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#817A91] mb-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#7C5CFC]">
              {currentQuestion.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{currentQuestion.difficulty}</span>
          </div>

          {config.instantFeedback && isAnswered && (
            <div
              className={`flex items-center gap-1 text-xs font-bold ${
                isCorrect ? 'text-[#55B88A]' : 'text-[#E87575]'
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Incorrect</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Question Text */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D2640] leading-snug tracking-tight mb-6">
          {currentQuestion.question}
        </h2>

        {/* Exactly 4 Answer Options */}
        <div className="space-y-3 sm:space-y-3.5">
          {currentQuestion.options.map((optionText, optIdx) => (
            <AnswerOption
              key={optIdx}
              index={optIdx}
              text={optionText}
              isSelected={selectedOption === optIdx}
              isAnswerSubmitted={isRevealed}
              isCorrect={isCorrect}
              isCorrectOption={optIdx === currentQuestion.correctAnswer}
              onSelect={handleSelectOption}
            />
          ))}
        </div>

        {/* Instant Feedback Explanation Box */}
        {isRevealed && currentQuestion.explanation && (
          <div className="mt-6 p-4 rounded-2xl bg-[#FFFDF7] border border-[#7C5CFC]/20 text-xs sm:text-sm text-[#34245C] animate-fadeIn">
            <div className="flex items-center gap-1.5 font-bold text-[#7C5CFC] mb-1">
              <Sparkles className="w-4 h-4 text-[#FFD84D]" />
              <span>Explanation:</span>
            </div>
            <p className="text-[#2D2640] leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Quiz Controls at the Bottom */}
      <div className="bg-white rounded-2xl border border-[#7C5CFC]/15 p-4 sm:p-5 shadow-sm flex items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`px-4 sm:px-5 py-2.5 rounded-xl border text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            currentIndex === 0
              ? 'opacity-40 border-slate-200 text-[#817A91] cursor-not-allowed'
              : 'border-[#7C5CFC]/20 bg-[#FFFDF7] text-[#34245C] hover:border-[#7C5CFC] active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Clear Answer Button */}
        {isAnswered && (
          <button
            onClick={handleClearAnswer}
            className="text-xs font-semibold text-[#817A91] hover:text-[#E87575] py-1.5 px-3 rounded-lg hover:bg-[#FDF1F1] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Answer</span>
          </button>
        )}

        {/* Next / Finish Button */}
        <button
          onClick={handleNext}
          className={`px-6 sm:px-7 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 ${
            isFinalQuestion
              ? 'bg-[#34245C] hover:bg-[#251944] shadow-[#34245C]/30'
              : 'bg-[#7C5CFC] hover:bg-[#6949EB] shadow-[#7C5CFC]/25'
          }`}
        >
          <span>{isFinalQuestion ? 'Finish Quiz' : 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Overview Grid Drawer / Modal */}
      {isGridModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#7C5CFC]/20 shadow-xl relative animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-[#7C5CFC]/10 mb-4">
              <h3 className="text-base font-bold text-[#34245C]">
                Question Navigator ({totalQuestions} Total)
              </h3>
              <button
                onClick={() => setIsGridModalOpen(false)}
                className="p-1 rounded-lg text-[#817A91] hover:text-[#34245C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2.5 max-h-72 overflow-y-auto p-1">
              {questions.map((_, idx) => {
                const answered = userAnswers[idx] !== undefined;
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`h-11 rounded-xl font-mono-numbers text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer border ${
                      isCurrent
                        ? 'border-[#7C5CFC] bg-[#7C5CFC] text-white ring-2 ring-[#FFD84D]'
                        : answered
                        ? 'border-[#55B88A]/40 bg-[#EBF8F2] text-[#1E4D38]'
                        : 'border-[#7C5CFC]/15 bg-[#FFFDF7] text-[#817A91] hover:border-[#7C5CFC]'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    <span className="text-[9px] font-normal">
                      {answered ? '✓' : '—'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#7C5CFC]/10 flex items-center justify-between text-xs text-[#817A91]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EBF8F2] border border-[#55B88A]" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFFDF7] border border-[#7C5CFC]/30" />
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFC]" />
                <span>Current</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quit Confirmation Modal */}
      {showQuitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-[#7C5CFC]/20 shadow-xl">
            <h3 className="text-lg font-bold text-[#34245C] mb-2">
              Quit current quiz?
            </h3>
            <p className="text-xs text-[#817A91] leading-relaxed mb-6">
              Your ongoing progress for this session will not be saved to your statistics.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="px-4 py-2 text-xs font-bold text-[#34245C] bg-[#F0EBFF] hover:bg-[#FFF4C2] rounded-xl transition-colors cursor-pointer"
              >
                Keep Going
              </button>
              <button
                onClick={onQuitQuiz}
                className="px-4 py-2 text-xs font-bold text-white bg-[#E87575] hover:bg-[#d66060] rounded-xl transition-colors cursor-pointer"
              >
                Quit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

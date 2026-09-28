/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { WelcomeCard } from './components/Home/WelcomeCard';
import { CategoryCard } from './components/Home/CategoryCard';
import { StatisticsSection } from './components/Home/StatisticsSection';
import { QuizSetup } from './components/QuizSetup';
import { QuizScreen } from './components/Quiz/QuizScreen';
import { ResultScreen } from './components/Result/ResultScreen';
import { ReviewScreen } from './components/Review/ReviewScreen';
import { QuestionBankModal } from './components/QuestionBankModal';
import { CATEGORIES } from './data/questionBank';
import { StorageService } from './services/storage';
import { Question, QuizConfig, QuizResult, UserStats } from './types/quiz';
import { Award, BookOpen, Layers } from 'lucide-react';

type Screen = 'home' | 'setup' | 'quiz' | 'result' | 'review';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [navTab, setNavTab] = useState<'home' | 'categories' | 'stats' | 'bank'>('home');
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [stats, setStats] = useState<UserStats>(StorageService.getUserStats());
  const [isBankOpen, setIsBankOpen] = useState(false);

  // Active Quiz State
  const [quizConfig, setQuizConfig] = useState<QuizConfig>({
    category: 'All Categories',
    questionCount: 10,
    difficulty: 'Mixed',
    timerMinutes: 40,
    instantFeedback: false,
  });
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<Question[]>([]);
  const [latestResult, setLatestResult] = useState<QuizResult | null>(null);

  // Initialize questions and user statistics
  useEffect(() => {
    // Clear any previous custom questions that belonged to Biology
    try {
      const custom = StorageService.getCustomQuestions().filter((q) => q.category !== 'Biology');
      localStorage.setItem('mcq_master_custom_questions_v1', JSON.stringify(custom));
    } catch {}

    const loadedQuestions = StorageService.getAllQuestions();
    setAllQuestions(loadedQuestions);
    setStats(StorageService.getUserStats());

    // Check if an uncompleted session was saved
    const savedSession = StorageService.getActiveSession();
    if (savedSession && savedSession.questions && savedSession.questions.length > 0) {
      // In case user refreshed during a quiz
      setActiveQuizQuestions(savedSession.questions);
      setQuizConfig(savedSession.config);
    }
  }, []);

  // Filter available count in a given category
  const totalAvailableInCategory = (catName: string) => {
    if (catName === 'All Categories' || catName === 'Custom Quiz') {
      return allQuestions.length;
    }
    return allQuestions.filter((q) => q.category === catName).length;
  };

  // Start Setup flow with specific category
  const handleSelectCategory = (categoryName: string) => {
    const count = totalAvailableInCategory(categoryName);
    setQuizConfig((prev) => ({
      ...prev,
      category: categoryName,
      questionCount: categoryName === 'Biology' ? 50 : Math.min(20, count),
      difficulty: 'Mixed',
      timerMinutes: categoryName === 'Biology' ? 50 : 30, // 50 minutes for 50 questions
      shuffle: false,
    }));
    setCurrentScreen('setup');
  };

  // Quick start all 50 Biology questions with 50 minutes timer
  const handleStartAllBiology = () => {
    const bioList = allQuestions.filter((q) => q.category === 'Biology');
    const config: QuizConfig = {
      category: 'Biology',
      questionCount: bioList.length > 0 ? bioList.length : 50,
      difficulty: 'Mixed',
      timerMinutes: 50, // 50 minutes timed exam session (1 min per question)
      instantFeedback: false, // Strict Exam Mode: Take all 50 answers, reveal results at the end
      shuffle: false,
    };
    handleStartQuiz(config);
  };

  // Quick Start from Navbar
  const handleQuickStart = () => {
    setQuizConfig((prev) => ({
      ...prev,
      category: 'All Categories',
      questionCount: 10,
    }));
    setCurrentScreen('setup');
  };

  // Start the actual Quiz
  const handleStartQuiz = (config: QuizConfig) => {
    setQuizConfig(config);

    let eligible = [...allQuestions];
    if (config.category !== 'All Categories' && config.category !== 'Custom Quiz') {
      eligible = eligible.filter((q) => q.category === config.category);
    }

    // Only filter by difficulty if user requested fewer questions than the pool
    if (config.difficulty !== 'Mixed' && config.questionCount < eligible.length) {
      const diffEligible = eligible.filter((q) => q.difficulty === config.difficulty);
      if (diffEligible.length >= config.questionCount) {
        eligible = diffEligible;
      }
    }

    // Preserve sequential order 1 to 40 unless shuffle was specifically chosen
    const finalOrdered = config.shuffle
      ? [...eligible].sort(() => 0.5 - Math.random())
      : [...eligible];

    const selected = finalOrdered.slice(0, Math.min(config.questionCount, finalOrdered.length));

    setActiveQuizQuestions(selected);
    StorageService.saveActiveSession({
      questions: selected,
      config,
    });

    setCurrentScreen('quiz');
  };

  // Finish Quiz and save result
  const handleFinishQuiz = (result: QuizResult) => {
    setLatestResult(result);
    const updatedStats = StorageService.recordQuizResult(result);
    setStats(updatedStats);
    setCurrentScreen('result');
  };

  // Reset user stats
  const handleResetStats = () => {
    const fresh = StorageService.resetStats();
    setStats(fresh);
  };

  // Review a past quiz from history
  const handleReviewPastQuiz = (quizId: string) => {
    const found = stats.history.find((h) => h.id === quizId);
    if (found && found.questions && found.questions.length > 0) {
      setLatestResult(found);
      setCurrentScreen('review');
    }
  };

  // Add custom question
  const handleAddCustomQuestion = (newQ: Omit<Question, 'id'>) => {
    StorageService.addCustomQuestion(newQ);
    setAllQuestions(StorageService.getAllQuestions());
  };

  // Add multiple custom questions
  const handleAddMultipleQuestions = (newQs: Omit<Question, 'id'>[]) => {
    StorageService.addMultipleCustomQuestions(newQs);
    setAllQuestions(StorageService.getAllQuestions());
  };

  // Delete custom question
  const handleDeleteCustomQuestion = (id: string | number) => {
    StorageService.deleteCustomQuestion(id);
    setAllQuestions(StorageService.getAllQuestions());
  };

  // Navbar tab selector
  const handleNavSelect = (tab: 'home' | 'categories' | 'stats' | 'bank') => {
    setNavTab(tab);
    if (tab === 'bank') {
      setIsBankOpen(true);
      return;
    }

    if (currentScreen === 'quiz') {
      if (!window.confirm('Leave active quiz? Your current progress will be lost.')) {
        return;
      }
      StorageService.clearActiveSession();
    }

    setCurrentScreen('home');

    // Smooth scroll to sections if on home
    setTimeout(() => {
      if (tab === 'categories') {
        const el = document.getElementById('categories-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (tab === 'stats') {
        const el = document.getElementById('stats-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#2D2640] flex flex-col font-sans">
      {/* Navbar with 3-Zone Contract (hidden during active quiz for distraction-free focus mode) */}
      {currentScreen !== 'quiz' && (
        <Navbar
          currentTab={navTab}
          onSelectTab={handleNavSelect}
          onQuickStart={handleQuickStart}
          onOpenQuestionBank={() => setIsBankOpen(true)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {/* SCREEN 1: HOME */}
        {currentScreen === 'home' && (
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-4 sm:py-10 space-y-7 sm:space-y-10 pb-24 md:pb-10">
            {/* Top Brand Subtitle & Welcome Card */}
            <div>
              <div className="text-center mb-6 sm:mb-8">
                <span className="text-[11px] sm:text-xs font-bold text-[#7C5CFC] uppercase tracking-widest block mb-1">
                  Interactive Knowledge Hub
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#34245C] tracking-tight">
                  MCQ MASTER
                </h1>
                <p className="text-xs sm:text-base font-medium text-[#817A91] mt-0.5 sm:mt-1">
                  Test your knowledge. Learn something new.
                </p>
              </div>

              <WelcomeCard
                onStartQuiz={handleQuickStart}
                onExploreCategories={() => {
                  const el = document.getElementById('categories-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                totalAvailableQuestions={allQuestions.length}
              />
            </div>

            {/* Featured Biology 50-Question Set Card */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FFF4C2]/50 via-white to-[#F0EBFF]/60 border-2 border-[#7C5CFC]/25 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3 sm:gap-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#7C5CFC] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#7C5CFC]/20">
                  <span className="text-xl sm:text-2xl">🧬</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1 sm:mb-0.5">
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#EBF8F2] text-[#1E4D38] border border-[#55B88A]/30 text-[10px] sm:text-[11px] font-bold">
                      সেরা ৫০টি প্রশ্ন (50 MCQs)
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#FFF4C2] text-[#34245C] border border-[#FFD84D]/40 text-[10px] sm:text-[11px] font-bold font-mono-numbers flex items-center gap-1">
                      ⏱ ৫০ মিনিট (50 Mins)
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#817A91] hidden sm:inline">আবুল হাসান স্যার · অধ্যায় ১</span>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-[#34245C] leading-snug">
                    জীববিজ্ঞান ১ম পত্র: কোষ ও এর গঠন (সাইটোপ্লাজম ও অঙ্গাণু - ৫০টি MCQ)
                  </h3>
                  <p className="text-xs text-[#817A91] mt-0.5 line-clamp-2 sm:line-clamp-none">
                    সাইটোপ্লাজম ও সাইটসল, রাইবোজোম, গলগি বডি, লাইসোজোম, এন্ডোপ্লাজমীয় রেটিকুলাম, মাইটোকন্ড্রিয়া, ক্লোরোপ্লাস্ট ও প্লাষ্টিড, সেন্ট্রিওল ও সাইটোস্কেলেটন, পারঅক্সিজোম ও নিউক্লিয়াস।
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full md:w-auto shrink-0">
                <button
                  onClick={handleStartAllBiology}
                  className="px-5 py-3 rounded-xl bg-[#7C5CFC] hover:bg-[#6949EB] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#7C5CFC]/25 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap touch-manipulation min-h-[44px]"
                >
                  <span>Start 50 Questions Exam (50m)</span>
                  <span aria-hidden="true">→</span>
                </button>
                <button
                  onClick={() => handleSelectCategory('Biology')}
                  className="px-4 py-3 rounded-xl bg-white hover:bg-[#F0EBFF] text-[#34245C] border border-[#7C5CFC]/20 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap touch-manipulation min-h-[44px]"
                >
                  <span>Customize</span>
                </button>
              </div>
            </div>

            {/* Category Cards Section */}
            <section id="categories-section" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#7C5CFC] tracking-wider uppercase mb-1">
                    <Layers className="w-4 h-4 text-[#FFD84D]" />
                    <span>Choose a Topic</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#34245C]">
                    Quiz Categories
                  </h2>
                </div>
                <span className="text-xs text-[#817A91]">
                  Click any card to customize questions & timer
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORIES.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    questionCount={totalAvailableInCategory(category.name)}
                    onSelect={handleSelectCategory}
                  />
                ))}
              </div>
            </section>

            {/* Statistics Section */}
            <div id="stats-section">
              <StatisticsSection
                stats={stats}
                onResetStats={handleResetStats}
                onReviewPastQuiz={handleReviewPastQuiz}
              />
            </div>
          </div>
        )}

        {/* SCREEN 2: QUIZ SETUP */}
        {currentScreen === 'setup' && (
          <QuizSetup
            initialCategory={quizConfig.category}
            totalAvailableInCategory={totalAvailableInCategory}
            onStartQuiz={handleStartQuiz}
            onBack={() => setCurrentScreen('home')}
          />
        )}

        {/* SCREEN 3: ACTIVE QUIZ */}
        {currentScreen === 'quiz' && (
          <QuizScreen
            questions={activeQuizQuestions}
            config={quizConfig}
            onFinishQuiz={handleFinishQuiz}
            onQuitQuiz={() => {
              StorageService.clearActiveSession();
              setCurrentScreen('home');
            }}
          />
        )}

        {/* SCREEN 4: RESULT */}
        {currentScreen === 'result' && latestResult && (
          <ResultScreen
            result={latestResult}
            onReviewAnswers={() => setCurrentScreen('review')}
            onTryAgain={() => handleStartQuiz(quizConfig)}
            onBackToHome={() => setCurrentScreen('home')}
          />
        )}

        {/* SCREEN 5: REVIEW */}
        {currentScreen === 'review' && latestResult && (
          <ReviewScreen
            result={latestResult}
            onTryAgain={() => handleStartQuiz(quizConfig)}
            onBackToHome={() => setCurrentScreen('home')}
          />
        )}
      </main>

      {/* Question Bank Modal */}
      <QuestionBankModal
        questions={allQuestions}
        isOpen={isBankOpen}
        onClose={() => setIsBankOpen(false)}
        onAddQuestion={handleAddCustomQuestion}
        onAddMultipleQuestions={handleAddMultipleQuestions}
        onDeleteCustomQuestion={handleDeleteCustomQuestion}
        defaultCategory="Biology"
      />

      {/* Quiet, Clean Footer */}
      <footer className="mt-16 border-t border-[#7C5CFC]/10 py-6 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#817A91]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#34245C]">MCQ MASTER</span>
            <span aria-hidden="true">·</span>
            <span>Eye-friendly educational quiz app</span>
          </div>
          <div>
            <span>4 Options · Instant Feedback · Progress Analytics</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

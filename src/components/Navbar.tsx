import React from 'react';
import { Award, BookOpen, Layers, BarChart3, PlusCircle } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'categories' | 'stats' | 'bank';
  onSelectTab: (tab: 'home' | 'categories' | 'stats' | 'bank') => void;
  onQuickStart: () => void;
  onOpenQuestionBank: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onQuickStart,
  onOpenQuestionBank,
}) => {
  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#FFFDF7]/90 backdrop-blur-md border-b border-[#7C5CFC]/10 transition-colors">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Zone 1: Single element brand wordmark */}
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#7C5CFC] flex items-center justify-center text-white shadow-sm shadow-[#7C5CFC]/30 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD84D]" />
            </div>
            <div>
              <span className="text-base sm:text-xl font-bold tracking-tight text-[#34245C] block leading-none font-sans">
                MCQ <span className="text-[#7C5CFC]">MASTER</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-[#817A91] tracking-wide block mt-0.5">
                Smart Quiz Platform
              </span>
            </div>
          </button>

          {/* Zone 2: Desktop text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
            <button
              onClick={() => onSelectTab('home')}
              className={`transition-colors flex items-center gap-1.5 whitespace-nowrap py-1 cursor-pointer ${
                currentTab === 'home'
                  ? 'text-[#7C5CFC] border-b-2 border-[#7C5CFC]'
                  : 'text-[#817A91] hover:text-[#34245C]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onSelectTab('categories')}
              className={`transition-colors flex items-center gap-1.5 whitespace-nowrap py-1 cursor-pointer ${
                currentTab === 'categories'
                  ? 'text-[#7C5CFC] border-b-2 border-[#7C5CFC]'
                  : 'text-[#817A91] hover:text-[#34245C]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Categories</span>
            </button>

            <button
              onClick={() => onSelectTab('stats')}
              className={`transition-colors flex items-center gap-1.5 whitespace-nowrap py-1 cursor-pointer ${
                currentTab === 'stats'
                  ? 'text-[#7C5CFC] border-b-2 border-[#7C5CFC]'
                  : 'text-[#817A91] hover:text-[#34245C]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Statistics</span>
            </button>

            <button
              onClick={onOpenQuestionBank}
              className={`transition-colors flex items-center gap-1.5 whitespace-nowrap py-1 cursor-pointer ${
                currentTab === 'bank'
                  ? 'text-[#7C5CFC] border-b-2 border-[#7C5CFC]'
                  : 'text-[#817A91] hover:text-[#34245C]'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-[#FFD84D]" />
              <span>Question Bank</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={onQuickStart}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-[#7C5CFC] hover:bg-[#6949EB] active:scale-95 rounded-xl shadow-sm shadow-[#7C5CFC]/25 transition-all duration-150 whitespace-nowrap flex items-center gap-1 sm:gap-1.5 cursor-pointer touch-manipulation"
            >
              <span>Start Quiz</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Thumb Friendly) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#7C5CFC]/15 pb-safe shadow-lg shadow-purple-900/10 transition-transform">
        <div className="grid grid-cols-4 h-14 max-w-lg mx-auto">
          <button
            onClick={() => onSelectTab('home')}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer touch-manipulation ${
              currentTab === 'home' ? 'text-[#7C5CFC]' : 'text-[#817A91] hover:text-[#34245C]'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px] font-bold">Home</span>
          </button>

          <button
            onClick={() => onSelectTab('categories')}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer touch-manipulation ${
              currentTab === 'categories' ? 'text-[#7C5CFC]' : 'text-[#817A91] hover:text-[#34245C]'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-bold">Topics</span>
          </button>

          <button
            onClick={() => onSelectTab('stats')}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer touch-manipulation ${
              currentTab === 'stats' ? 'text-[#7C5CFC]' : 'text-[#817A91] hover:text-[#34245C]'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[10px] font-bold">Stats</span>
          </button>

          <button
            onClick={onOpenQuestionBank}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer touch-manipulation ${
              currentTab === 'bank' ? 'text-[#7C5CFC]' : 'text-[#817A91] hover:text-[#34245C]'
            }`}
          >
            <PlusCircle className="w-5 h-5 text-[#FFD84D]" />
            <span className="text-[10px] font-bold">Bank</span>
          </button>
        </div>
      </nav>
    </>
  );
};

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
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/90 backdrop-blur-md border-b border-[#7C5CFC]/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single element brand wordmark */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#7C5CFC] flex items-center justify-center text-white shadow-sm shadow-[#7C5CFC]/30 group-hover:scale-105 transition-transform duration-200">
            <Award className="w-5 h-5 text-[#FFD84D]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#34245C] block leading-none font-sans">
              MCQ <span className="text-[#7C5CFC]">MASTER</span>
            </span>
            <span className="text-[11px] font-medium text-[#817A91] tracking-wide block mt-0.5">
              Smart Quiz Platform
            </span>
          </div>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
          <button
            onClick={() => onSelectTab('home')}
            className={`transition-colors flex items-center gap-1.5 whitespace-nowrap py-1 ${
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
            className={`transition-colors flex items-center gap-1.5 whitespace-nowrap py-1 ${
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
            className={`transition-colors flex items-center gap-1.5 whitespace-nowrap py-1 ${
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
            className={`transition-colors flex items-center gap-1.5 whitespace-nowrap py-1 ${
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
        <div className="flex items-center gap-3">
          <button
            onClick={onQuickStart}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#7C5CFC] hover:bg-[#6949EB] active:scale-95 rounded-xl shadow-sm shadow-[#7C5CFC]/25 transition-all duration-150 whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <span>Start Quiz</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </header>
  );
};

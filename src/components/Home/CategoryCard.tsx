import React from 'react';
import {
  Globe,
  Laptop,
  Calculator,
  Atom,
  Dna,
  Wifi,
  BookOpen,
  Code2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { QuizCategory } from '../../types/quiz';

interface CategoryCardProps {
  category: QuizCategory;
  questionCount: number;
  onSelect: (categoryName: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  questionCount,
  onSelect,
}) => {
  const getIcon = () => {
    switch (category.name) {
      case 'General Knowledge':
        return <Globe className="w-5 h-5 text-[#7C5CFC]" />;
      case 'Computer Science':
        return <Laptop className="w-5 h-5 text-[#7C5CFC]" />;
      case 'Mathematics':
        return <Calculator className="w-5 h-5 text-[#7C5CFC]" />;
      case 'Science':
        return <Atom className="w-5 h-5 text-[#7C5CFC]" />;
      case 'Biology':
        return <Dna className="w-5 h-5 text-[#7C5CFC]" />;
      case 'ICT':
        return <Wifi className="w-5 h-5 text-[#7C5CFC]" />;
      case 'English':
        return <BookOpen className="w-5 h-5 text-[#7C5CFC]" />;
      case 'Programming':
        return <Code2 className="w-5 h-5 text-[#7C5CFC]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#7C5CFC]" />;
    }
  };

  return (
    <button
      onClick={() => onSelect(category.name)}
      className="group text-left w-full bg-white hover:bg-[#FFFDF7] p-5 rounded-2xl border border-[#7C5CFC]/15 hover:border-[#7C5CFC] shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden flex flex-col justify-between min-h-[140px] cursor-pointer"
    >
      {/* Accent corner tag */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFF4C2]/40 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

      <div>
        <div className="w-10 h-10 rounded-xl bg-[#F0EBFF] flex items-center justify-center mb-3 group-hover:bg-[#FFD84D] transition-colors duration-200">
          {getIcon()}
        </div>
        <h3 className="text-base font-bold text-[#34245C] group-hover:text-[#7C5CFC] transition-colors leading-tight">
          {category.name}
        </h3>
        <p className="text-xs text-[#817A91] line-clamp-1 mt-1">
          {category.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#7C5CFC]/10">
        <span className="text-xs font-semibold text-[#817A91] font-mono-numbers">
          {questionCount} Questions
        </span>
        <div className="w-7 h-7 rounded-lg bg-[#F0EBFF] group-hover:bg-[#7C5CFC] flex items-center justify-center transition-colors">
          <ArrowRight className="w-3.5 h-3.5 text-[#7C5CFC] group-hover:text-white transition-colors" />
        </div>
      </div>
    </button>
  );
};

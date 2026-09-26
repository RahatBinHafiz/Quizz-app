import React from 'react';
import { Check, X } from 'lucide-react';

interface AnswerOptionProps {
  index: number; // 0, 1, 2, 3
  text: string;
  isSelected: boolean;
  isAnswerSubmitted: boolean;
  isCorrect: boolean;
  isCorrectOption: boolean; // whether this specific option is the right answer
  onSelect: (index: number) => void;
  disabled?: boolean;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const BENGALI_LETTERS = ['ক', 'খ', 'গ', 'ঘ'];

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  index,
  text,
  isSelected,
  isAnswerSubmitted,
  isCorrectOption,
  onSelect,
  disabled = false,
}) => {
  const isBengali = /[\u0980-\u09FF]/.test(text);
  const letter = isBengali ? (BENGALI_LETTERS[index] || OPTION_LETTERS[index]) : (OPTION_LETTERS[index] || String.fromCharCode(65 + index));

  // Determine appearance based on states
  let cardStyle =
    'bg-white border-[#7C5CFC]/20 text-[#2D2640] hover:border-[#7C5CFC] hover:shadow-sm';
  let badgeStyle =
    'bg-[#F0EBFF] text-[#7C5CFC] border border-[#7C5CFC]/20';
  let indicatorIcon = null;

  if (isAnswerSubmitted) {
    if (isCorrectOption) {
      // It's the correct answer!
      cardStyle = 'bg-[#EBF8F2] border-[#55B88A] text-[#1E4D38] shadow-sm';
      badgeStyle = 'bg-[#55B88A] text-white border-transparent';
      indicatorIcon = <Check className="w-4 h-4 text-[#55B88A]" />;
    } else if (isSelected && !isCorrectOption) {
      // User selected this and it was wrong!
      cardStyle = 'bg-[#FDF1F1] border-[#E87575] text-[#692525] shadow-sm';
      badgeStyle = 'bg-[#E87575] text-white border-transparent';
      indicatorIcon = <X className="w-4 h-4 text-[#E87575]" />;
    } else {
      // Inactive / unselected other option after submission
      cardStyle = 'bg-white/60 border-slate-200 text-[#817A91] opacity-75';
      badgeStyle = 'bg-slate-100 text-[#817A91] border-transparent';
    }
  } else if (isSelected) {
    // Selected before submitting (or in active draft mode)
    cardStyle = 'bg-[#F0EBFF] border-[#7C5CFC] text-[#34245C] shadow-sm ring-1 ring-[#7C5CFC]';
    badgeStyle = 'bg-[#7C5CFC] text-white border-[#7C5CFC]';
    indicatorIcon = (
      <div className="w-2.5 h-2.5 rounded-full bg-[#7C5CFC]" />
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      disabled={disabled}
      className={`w-full text-left p-3.5 sm:p-5 rounded-2xl border-2 transition-all duration-150 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] select-none touch-manipulation active:scale-[0.98] min-h-[52px] sm:min-h-[56px] ${cardStyle} ${
        disabled && !isAnswerSubmitted ? 'cursor-not-allowed opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        {/* Letter Badge */}
        <div
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${badgeStyle}`}
        >
          {letter}
        </div>

        {/* Option Text */}
        <span className="text-sm sm:text-base font-semibold leading-snug break-words">
          {text}
        </span>
      </div>

      {/* Trailing Indicator / Radio */}
      <div className="shrink-0 flex items-center justify-center">
        {indicatorIcon ? (
          <div className="w-6 h-6 rounded-full flex items-center justify-center">
            {indicatorIcon}
          </div>
        ) : (
          <div
            className={`w-5 h-5 rounded-full border-2 transition-colors ${
              isSelected ? 'border-[#7C5CFC] bg-[#7C5CFC]' : 'border-[#817A91]/30 bg-transparent'
            }`}
          />
        )}
      </div>
    </button>
  );
};

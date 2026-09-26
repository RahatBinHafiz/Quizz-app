import React from 'react';

interface ProgressBarProps {
  currentIndex: number;
  total: number;
  category: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  total,
  category,
}) => {
  const currentNum = currentIndex + 1;
  const percentage = Math.round((currentNum / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs font-semibold mb-2">
        <span className="text-[#34245C] font-bold">
          Question <span className="font-mono-numbers text-sm text-[#7C5CFC]">{currentNum}</span> of{' '}
          <span className="font-mono-numbers">{total}</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[#817A91] hidden sm:inline">{category}</span>
          <span className="font-mono-numbers text-[#7C5CFC] font-bold text-xs">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2.5 bg-[#F0EBFF] rounded-full overflow-hidden p-0.5 border border-[#7C5CFC]/10">
        <div
          className="h-full bg-gradient-to-r from-[#FFD84D] to-[#7C5CFC] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

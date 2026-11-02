import React from 'react';

interface FormattedQuestionTextProps {
  text: string;
  className?: string;
}

export const FormattedQuestionText: React.FC<FormattedQuestionTextProps> = ({
  text,
  className = 'text-base sm:text-xl font-bold text-[#2D2640] leading-snug',
}) => {
  // If no newlines, render plain text
  if (!text.includes('\n')) {
    return <span className={className}>{text}</span>;
  }

  const parts = text.split('\n\n');
  const mainQuestion = parts[0];
  const codeSnippet = parts.slice(1).join('\n\n');

  return (
    <div className="space-y-3">
      <div className={className}>{mainQuestion}</div>
      {codeSnippet && (
        <div className="rounded-xl bg-[#201835] text-[#ECE6FF] p-3.5 sm:p-4 text-xs sm:text-sm font-mono overflow-x-auto shadow-inner border border-[#3E325D]">
          <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-[#3E325D] text-[10px] text-[#A59CB8] uppercase tracking-wider font-sans font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E87575]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD84D]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#55B88A]" />
            <span className="ml-1">C Code / Snippet</span>
          </div>
          <pre className="whitespace-pre font-mono leading-relaxed">{codeSnippet}</pre>
        </div>
      )}
    </div>
  );
};

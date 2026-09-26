import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  isPaused?: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  initialSeconds,
  onTimeUp,
  isPaused = false,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);

  useEffect(() => {
    setSecondsRemaining(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isPaused || secondsRemaining <= 0) {
      if (secondsRemaining <= 0) {
        onTimeUp();
      }
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining, isPaused, onTimeUp]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isUrgent = secondsRemaining < 60;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-bold font-mono-numbers ${
        isUrgent
          ? 'bg-[#FDF1F1] text-[#E87575] border-[#E87575] animate-pulse'
          : 'bg-[#FFF4C2]/60 text-[#34245C] border-[#FFD84D]'
      }`}
      title="Remaining time"
    >
      <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'text-[#E87575]' : 'text-[#7C5CFC]'}`} />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

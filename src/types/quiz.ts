export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

export interface Question {
  id: string | number;
  category: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, or 3
  explanation: string;
  difficulty: QuestionDifficulty;
}

export interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  questionCount?: number;
}

export interface QuizConfig {
  category: string;
  questionCount: number;
  difficulty: Difficulty;
  timerMinutes: number | null; // null means No Timer
  instantFeedback: boolean; // whether to reveal correct/wrong immediately on selection
  shuffle?: boolean; // whether to shuffle questions or keep natural order
}

export interface UserAnswer {
  questionId: string | number;
  selectedOption: number | null; // 0..3 or null if skipped
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface QuizResult {
  id: string;
  date: string;
  category: string;
  difficulty: Difficulty;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  scorePercentage: number;
  timeTakenSeconds: number;
  answers: UserAnswer[];
  questions: Question[];
}

export interface UserStats {
  quizzesCompleted: number;
  questionsAnswered: number;
  correctAnswers: number;
  averageScore: number;
  history: QuizResult[];
}

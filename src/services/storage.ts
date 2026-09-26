import { Question, QuizResult, UserStats } from '../types/quiz';
import { INITIAL_QUESTION_BANK } from '../data/questionBank';

const STATS_KEY = 'mcq_master_user_stats_v1';
const CUSTOM_QUESTIONS_KEY = 'mcq_master_custom_questions_v1';
const ACTIVE_SESSION_KEY = 'mcq_master_active_session_v1';

// Initial realistic starter history matching the prompt example:
// Quizzes Completed: 24, Questions Answered: 480, Correct Answers: 392, Average Score: 81.7%
const INITIAL_DEMO_STATS: UserStats = {
  quizzesCompleted: 24,
  questionsAnswered: 480,
  correctAnswers: 392,
  averageScore: 81.7,
  history: [
    {
      id: 'demo-1',
      date: new Date(Date.now() - 6 * 86400000).toISOString(),
      category: 'Computer Science',
      difficulty: 'Medium',
      totalQuestions: 20,
      correctCount: 16,
      incorrectCount: 3,
      unansweredCount: 1,
      scorePercentage: 80,
      timeTakenSeconds: 420,
      answers: [],
      questions: [],
    },
    {
      id: 'demo-2',
      date: new Date(Date.now() - 5 * 86400000).toISOString(),
      category: 'Mathematics',
      difficulty: 'Easy',
      totalQuestions: 20,
      correctCount: 18,
      incorrectCount: 2,
      unansweredCount: 0,
      scorePercentage: 90,
      timeTakenSeconds: 360,
      answers: [],
      questions: [],
    },
    {
      id: 'demo-3',
      date: new Date(Date.now() - 4 * 86400000).toISOString(),
      category: 'Programming',
      difficulty: 'Hard',
      totalQuestions: 20,
      correctCount: 15,
      incorrectCount: 4,
      unansweredCount: 1,
      scorePercentage: 75,
      timeTakenSeconds: 510,
      answers: [],
      questions: [],
    },
    {
      id: 'demo-4',
      date: new Date(Date.now() - 3 * 86400000).toISOString(),
      category: 'Science',
      difficulty: 'Medium',
      totalQuestions: 20,
      correctCount: 17,
      incorrectCount: 3,
      unansweredCount: 0,
      scorePercentage: 85,
      timeTakenSeconds: 390,
      answers: [],
      questions: [],
    },
    {
      id: 'demo-5',
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      category: 'ICT',
      difficulty: 'Easy',
      totalQuestions: 20,
      correctCount: 19,
      incorrectCount: 1,
      unansweredCount: 0,
      scorePercentage: 95,
      timeTakenSeconds: 310,
      answers: [],
      questions: [],
    },
    {
      id: 'demo-6',
      date: new Date(Date.now() - 1 * 86400000).toISOString(),
      category: 'General Knowledge',
      difficulty: 'Medium',
      totalQuestions: 20,
      correctCount: 17,
      incorrectCount: 2,
      unansweredCount: 1,
      scorePercentage: 85,
      timeTakenSeconds: 430,
      answers: [],
      questions: [],
    },
  ],
};

export const StorageService = {
  getUserStats(): UserStats {
    try {
      const data = localStorage.getItem(STATS_KEY);
      if (data) {
        return JSON.parse(data);
      }
      // Initialize with starter stats
      localStorage.setItem(STATS_KEY, JSON.stringify(INITIAL_DEMO_STATS));
      return INITIAL_DEMO_STATS;
    } catch {
      return INITIAL_DEMO_STATS;
    }
  },

  saveUserStats(stats: UserStats): void {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to save stats to localStorage', e);
    }
  },

  recordQuizResult(result: QuizResult): UserStats {
    const currentStats = this.getUserStats();
    const updatedHistory = [result, ...currentStats.history].slice(0, 50); // Keep last 50
    const totalQuizzes = currentStats.quizzesCompleted + 1;
    const totalQuestions = currentStats.questionsAnswered + result.totalQuestions;
    const totalCorrect = currentStats.correctAnswers + result.correctCount;
    const averageScore = Math.round((totalCorrect / Math.max(1, totalQuestions)) * 1000) / 10;

    const newStats: UserStats = {
      quizzesCompleted: totalQuizzes,
      questionsAnswered: totalQuestions,
      correctAnswers: totalCorrect,
      averageScore,
      history: updatedHistory,
    };

    this.saveUserStats(newStats);
    this.clearActiveSession();
    return newStats;
  },

  resetStats(): UserStats {
    const freshStats: UserStats = {
      quizzesCompleted: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      averageScore: 0,
      history: [],
    };
    this.saveUserStats(freshStats);
    return freshStats;
  },

  getCustomQuestions(): Question[] {
    try {
      const data = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addCustomQuestion(question: Omit<Question, 'id'>): Question {
    const customList = this.getCustomQuestions();
    const newQuestion: Question = {
      ...question,
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
    customList.push(newQuestion);
    try {
      localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(customList));
    } catch (e) {
      console.error('Failed to save custom question', e);
    }
    return newQuestion;
  },

  addMultipleCustomQuestions(questions: Omit<Question, 'id'>[]): Question[] {
    const customList = this.getCustomQuestions();
    const newItems: Question[] = questions.map((q, idx) => ({
      ...q,
      id: `custom_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
    }));
    const updated = [...customList, ...newItems];
    try {
      localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save bulk questions', e);
    }
    return newItems;
  },

  deleteCustomQuestion(id: string | number): void {
    const customList = this.getCustomQuestions().filter((q) => q.id !== id);
    try {
      localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(customList));
    } catch (e) {
      console.error('Failed to delete custom question', e);
    }
  },

  getAllQuestions(): Question[] {
    const custom = this.getCustomQuestions();
    return [...INITIAL_QUESTION_BANK, ...custom];
  },

  saveActiveSession(session: any): void {
    try {
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Failed to persist active session', e);
    }
  },

  getActiveSession(): any | null {
    try {
      const data = localStorage.getItem(ACTIVE_SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  clearActiveSession(): void {
    try {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch {}
  },
};

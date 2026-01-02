
export enum TaskType {
  FILL_IN_BLANK = 'fill-in-blank',
  MULTIPLE_CHOICE = 'multiple-choice',
  DRAG_DROP = 'drag-drop',
  CORRECT_MISTAKE = 'correct-mistake',
  TRANSLATION = 'translation'
}

export interface QuizTask {
  id: string;
  type: TaskType;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
}

export interface IrregularVerb {
  v1: string;
  v2: string;
  v3: string;
  translation: string;
}

export interface GrammarSection {
  id: string;
  title: string;
  theory: string;
  usage: string[];
  forms: {
    affirmative: string;
    negative: string;
    question: string;
  };
  examples: string[];
  initialQuiz: QuizTask[];
  flashcards: Flashcard[];
  irregularVerbs?: IrregularVerb[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface UserProgress {
  completedSections: string[];
  quizScores: Record<string, number>;
  dailyStreak: number;
}

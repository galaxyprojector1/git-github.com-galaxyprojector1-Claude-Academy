export type ModuleStatus = 'locked' | 'available' | 'completed';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Module {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  status: ModuleStatus;
  content: string; // Represents Markdown/HTML content
  quiz: Question[];
}

export type ViewState = 'dashboard' | 'lesson' | 'quiz';

export interface AppState {
  currentView: ViewState;
  activeModuleId: number | null;
  completedModules: number[];
  unlockedModules: number[];
}
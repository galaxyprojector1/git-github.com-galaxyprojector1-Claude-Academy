import React, { useState, useEffect } from 'react';
import { Module, AppState, ViewState } from './types';
import { MODULES } from './constants';
import { ModuleCard } from './components/ModuleCard';
import { LessonView } from './components/LessonView';
import { QuizView } from './components/QuizView';

const App: React.FC = () => {
  // --- State Management ---
  const [modules, setModules] = useState<Module[]>(MODULES);
  
  // Try to load state from localStorage, else default
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('claude-academy-state');
    if (saved) return JSON.parse(saved);
    return {
      currentView: 'dashboard',
      activeModuleId: null,
      completedModules: [],
      unlockedModules: [1] // Start with module 1 unlocked
    };
  });

  // Sync derived state (modules prop) with app state
  useEffect(() => {
    const updatedModules = MODULES.map(m => ({
      ...m,
      status: state.completedModules.includes(m.id) 
        ? 'completed' 
        : state.unlockedModules.includes(m.id) 
          ? 'available' 
          : 'locked'
    })) as Module[];
    setModules(updatedModules);
    
    // Save to local storage
    localStorage.setItem('claude-academy-state', JSON.stringify(state));
  }, [state.completedModules, state.unlockedModules]);

  // --- Handlers ---

  const handleModuleClick = (id: number) => {
    setState(prev => ({ ...prev, currentView: 'lesson', activeModuleId: id }));
  };

  const handleStartQuiz = () => {
    setState(prev => ({ ...prev, currentView: 'quiz' }));
  };

  const handleBackToDashboard = () => {
    setState(prev => ({ ...prev, currentView: 'dashboard', activeModuleId: null }));
  };

  const handleBackToLesson = () => {
    setState(prev => ({ ...prev, currentView: 'lesson' }));
  };

  const handleQuizCompletion = (success: boolean) => {
    if (success && state.activeModuleId) {
      const nextModuleId = state.activeModuleId + 1;
      
      setState(prev => {
        const isAlreadyCompleted = prev.completedModules.includes(prev.activeModuleId!);
        const newCompleted = isAlreadyCompleted ? prev.completedModules : [...prev.completedModules, prev.activeModuleId!];
        
        const isNextUnlocked = prev.unlockedModules.includes(nextModuleId);
        const newUnlocked = (nextModuleId <= MODULES.length && !isNextUnlocked) 
          ? [...prev.unlockedModules, nextModuleId] 
          : prev.unlockedModules;

        return {
          ...prev,
          currentView: 'dashboard',
          activeModuleId: null,
          completedModules: newCompleted,
          unlockedModules: newUnlocked
        };
      });
    } else {
      // Failed or just want to retry immediately? 
      // Current implementation in QuizView handles "Retry" internal logic, 
      // but if they click "Retry" (which calls onComplete(false) in a real app might reset)
      // Here we assume if not success, we just go back to lesson or dashboard.
      if (!success) {
        // Just reload the quiz view effectively by doing nothing or verify logic
        setState(prev => ({ ...prev, currentView: 'quiz' })); // actually handled inside QuizView mostly
      }
    }
  };

  // --- Render Helpers ---

  const activeModule = modules.find(m => m.id === state.activeModuleId);

  const calculateGlobalProgress = () => {
    return Math.round((state.completedModules.length / MODULES.length) * 100);
  };

  return (
    <div className="min-h-screen bg-claude-bg text-claude-text font-sans selection:bg-claude-accent selection:text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-claude-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleBackToDashboard}
          >
            <div className="w-8 h-8 bg-claude-accent rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
              C
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-claude-text">
              Claude Academy
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-xs font-medium text-claude-subtext uppercase tracking-wider">
              Progression
            </div>
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-claude-accent transition-all duration-700 ease-out"
                style={{ width: `${calculateGlobalProgress()}%` }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {state.currentView === 'dashboard' && (
          <div className="animate-fade-in">
            <header className="mb-12 text-center max-w-2xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-claude-text">
                Maîtrisez Claude Code
              </h1>
              <p className="text-lg md:text-xl text-claude-subtext leading-relaxed">
                Un parcours progressif en 8 modules pour devenir expert de l'outil CLI d'Anthropic.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  index={index}
                  onClick={handleModuleClick} 
                />
              ))}
            </div>
            
            <footer className="mt-20 text-center text-sm text-claude-subtext border-t border-claude-border pt-8">
              <p>© 2024 Claude Academy. Design inspiré par Anthropic.</p>
            </footer>
          </div>
        )}

        {state.currentView === 'lesson' && activeModule && (
          <LessonView 
            module={activeModule} 
            onBack={handleBackToDashboard}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {state.currentView === 'quiz' && activeModule && (
          <QuizView 
            module={activeModule}
            onComplete={handleQuizCompletion}
            onBack={handleBackToLesson}
          />
        )}
      </main>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { Module, Question } from '../types';
import { Icons } from './Icon';

interface QuizViewProps {
  module: Module;
  onComplete: (success: boolean) => void;
  onBack: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ module, onComplete, onBack }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = module.quiz[currentQuestionIdx];
  const totalQuestions = module.quiz.length;

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleValidate = () => {
    setIsAnswered(true);
    if (selectedOption === question.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(curr => curr + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleFinish = () => {
    const passed = score === totalQuestions; // Strict pass: 100% required
    onComplete(passed);
  };

  if (showResult) {
    const passed = score === totalQuestions;
    return (
      <div className="max-w-xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
          {passed ? <Icons.Award /> : <Icons.X />}
        </div>
        <h2 className="font-serif text-3xl font-bold mb-4">
          {passed ? "Félicitations !" : "Encore un effort"}
        </h2>
        <p className="text-claude-subtext mb-8">
          {passed 
            ? "Vous avez maîtrisé ce module. Continuez votre progression." 
            : `Vous avez obtenu ${score}/${totalQuestions}. Relisez le cours pour valider ce module.`}
        </p>
        <div className="flex gap-4">
          {!passed && (
            <button 
              onClick={onBack}
              className="px-6 py-2 border border-claude-border rounded-full hover:bg-gray-50 transition-colors"
            >
              Relire le cours
            </button>
          )}
          <button 
            onClick={handleFinish}
            className="bg-claude-accent hover:bg-claude-accentHover text-white px-8 py-2 rounded-full font-medium transition-colors"
          >
            {passed ? "Module Suivant" : "Réessayer"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
       {/* Header */}
       <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="text-claude-subtext hover:text-claude-text">
          <Icons.X />
        </button>
        <div className="h-1.5 flex-1 mx-8 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-claude-accent transition-all duration-500 ease-out"
            style={{ width: `${((currentQuestionIdx) / totalQuestions) * 100}%` }}
          />
        </div>
        <span className="font-sans text-sm font-medium text-claude-subtext">
          {currentQuestionIdx + 1}/{totalQuestions}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 rounded-3xl shadow-soft border border-claude-border">
        <h2 className="font-serif text-xl font-bold text-claude-text mb-6">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let stateClass = "border-claude-border hover:border-claude-accent/50 hover:bg-claude-warm/30";
            
            if (selectedOption === idx) {
              stateClass = "border-claude-accent bg-claude-warm/50 text-claude-text ring-1 ring-claude-accent";
            }
            
            if (isAnswered) {
              if (idx === question.correctIndex) {
                stateClass = "border-green-500 bg-green-50 text-green-700";
              } else if (selectedOption === idx) {
                stateClass = "border-red-300 bg-red-50 text-red-700 opacity-60";
              } else {
                stateClass = "border-gray-100 text-gray-400 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium ${stateClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        {isAnswered && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-fade-in">
            <p className="text-sm text-gray-600">
              <span className="font-bold block mb-1">
                {selectedOption === question.correctIndex ? "Correct !" : "Incorrect"}
              </span>
              {question.explanation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex justify-end">
          {!isAnswered ? (
            <button
              disabled={selectedOption === null}
              onClick={handleValidate}
              className={`
                px-6 py-2 rounded-full font-medium transition-all
                ${selectedOption === null 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-claude-text text-white hover:bg-black'}
              `}
            >
              Valider
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-claude-accent hover:bg-claude-accentHover text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              {currentQuestionIdx < totalQuestions - 1 ? "Question Suivante" : "Voir les résultats"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
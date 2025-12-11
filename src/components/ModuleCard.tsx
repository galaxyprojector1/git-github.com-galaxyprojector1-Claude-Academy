import React from 'react';
import { Module } from '../types';
import { Icons } from './Icon';

interface ModuleCardProps {
  module: Module;
  onClick: (id: number) => void;
  index: number;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick, index }) => {
  const isLocked = module.status === 'locked';
  const isCompleted = module.status === 'completed';

  return (
    <div 
      onClick={() => !isLocked && onClick(module.id)}
      className={`
        group relative p-6 rounded-2xl border transition-all duration-300 ease-out
        ${isLocked
          ? 'bg-claude-bg border-transparent opacity-60 cursor-not-allowed'
          : 'bg-white border-claude-border cursor-pointer hover:shadow-hover hover:-translate-y-2 hover:scale-[1.02] hover:border-claude-accent/50 active:scale-[0.98]'
        }
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`
          font-sans text-xs font-bold tracking-wider uppercase px-2 py-1 rounded
          ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-claude-warm text-claude-subtext'}
        `}>
          Module {index + 1}
        </span>
        <div className="text-claude-subtext">
          {isCompleted ? <span className="text-green-600"><Icons.Check /></span> : isLocked ? <Icons.Lock /> : null}
        </div>
      </div>

      <h3 className={`font-serif text-xl md:text-2xl font-bold mb-3 ${isLocked ? 'text-gray-400' : 'text-claude-text group-hover:text-claude-accent transition-colors'}`}>
        {module.title}
      </h3>

      <p className="font-sans text-sm md:text-base text-claude-subtext mb-6 line-clamp-2 leading-relaxed">
        {module.subtitle}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs font-medium text-claude-subtext flex items-center gap-1">
          <Icons.BookOpen /> {module.duration}
        </span>
        
        {!isLocked && (
          <button className={`
            w-8 h-8 rounded-full flex items-center justify-center transition-colors
            ${isCompleted 
              ? 'bg-green-50 text-green-600' 
              : 'bg-claude-warm text-claude-accent group-hover:bg-claude-accent group-hover:text-white'}
          `}>
            {isCompleted ? <Icons.Check /> : <Icons.Play />}
          </button>
        )}
      </div>
    </div>
  );
};
import React, { useEffect } from 'react';
import { Module } from '../types';
import { Icons } from './Icon';
import { ContentRenderer } from './ContentRenderer';

interface LessonViewProps {
  module: Module;
  onBack: () => void;
  onStartQuiz: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ module, onBack, onStartQuiz }) => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-0 sm:px-4 py-0 sm:py-8 animate-fade-in bg-white sm:bg-transparent">
      <button
        onClick={onBack}
        className="mb-2 sm:mb-8 px-4 sm:px-0 py-3 sm:py-0 flex items-center text-claude-subtext hover:text-claude-accent transition-colors text-sm font-medium"
      >
        <span className="mr-1"><Icons.ArrowLeft /></span> Retour au Dashboard
      </button>

      <article className="bg-white px-5 py-4 sm:p-8 md:p-12 rounded-none sm:rounded-3xl shadow-none sm:shadow-soft border-0 sm:border border-claude-border">
        <header className="mb-8 sm:mb-10 border-b border-claude-border pb-6 sm:pb-8">
          <span className="font-sans text-sm font-bold text-claude-accent tracking-widest uppercase">
            Module {module.id}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-claude-text mt-3 mb-4">
            {module.title}
          </h1>
          <p className="font-sans text-lg text-claude-subtext">
            {module.subtitle}
          </p>
        </header>

        {/* Content Renderer with Popovers */}
        <div
          className="prose prose-lg prose-stone max-w-none
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-claude-text
            prose-p:font-sans prose-p:text-gray-600 prose-p:leading-relaxed
            prose-strong:text-claude-text
            prose-ul:list-disc prose-ul:pl-4
            prose-li:marker:text-claude-accent
          "
        >
          <ContentRenderer html={module.content} />

          <style>{`
            .tip {
              background-color: #F4EBE4;
              border-left: 4px solid #D97757;
              padding: 1rem;
              border-radius: 0.5rem;
              margin: 1.5rem 0;
              font-family: 'Inter', sans-serif;
              color: #3F3E3B;
            }
          `}</style>
        </div>

        <div className="mt-12 pt-8 border-t border-claude-border flex justify-end">
          <button 
            onClick={onStartQuiz}
            className="flex items-center gap-2 bg-claude-accent hover:bg-claude-accentHover text-white px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-900/10"
          >
            Passer le Quiz <Icons.ChevronRight />
          </button>
        </div>
      </article>
    </div>
  );
};
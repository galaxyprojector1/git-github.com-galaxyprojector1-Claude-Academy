import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { GLOSSARY } from '../data/glossary';

interface PopoverData {
  term: string;
  rect: DOMRect;
}

interface PopoverContentProps {
  term: string;
  rect: DOMRect;
  onClose: () => void;
}

const PopoverContent: React.FC<PopoverContentProps> = ({ term, rect, onClose }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const entry = GLOSSARY[term];

  // Calculate position
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!popoverRef.current) return;

    const popoverRect = popoverRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const gap = 12;

    // Default: above, centered
    let top = rect.top + scrollY - popoverRect.height - gap;
    let left = rect.left + scrollX - (popoverRect.width / 2) + (rect.width / 2);

    // Flip to bottom if not enough space above
    if (rect.top - popoverRect.height - gap < 20) {
      top = rect.bottom + scrollY + gap;
    }

    // Horizontal constraints
    const minLeft = 10;
    const maxLeft = document.body.clientWidth - popoverRect.width - 10;
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    setPosition({ top, left });
  }, [rect]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }, 100);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!entry) return null;

  return (
    <div
      ref={popoverRef}
      className="fixed w-[300px] max-w-[90vw] max-h-[350px] overflow-y-auto bg-white rounded-lg p-4 shadow-xl border border-gray-200 z-[1000]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        animation: 'fadeIn 0.2s ease-out',
      }}
      role="tooltip"
    >
      {/* Title */}
      <div className="font-bold text-[#A05A48] mb-2 text-sm uppercase tracking-wide">
        {entry.title}
      </div>

      {/* Summary */}
      <div className="mb-3 text-sm leading-relaxed text-gray-700">
        {entry.summary}
      </div>

      {/* Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsDetailsOpen(!isDetailsOpen);
        }}
        className="text-[#A05A48] font-semibold text-sm underline decoration-[#A05A48] underline-offset-4 hover:text-[#6d3b30] transition-colors duration-200 mb-2"
      >
        {isDetailsOpen ? 'Afficher moins' : 'En savoir plus'}
      </button>

      {/* Details */}
      {isDetailsOpen && (
        <div className="mt-2 pt-3 border-t border-dashed border-gray-200 text-sm text-gray-600 bg-gray-50 p-3 rounded">
          {entry.details}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

interface ContentRendererProps {
  html: string;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ html }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePopover, setActivePopover] = useState<PopoverData | null>(null);

  // Setup click handlers on info-triggers
  useEffect(() => {
    if (!containerRef.current) return;

    const triggers = containerRef.current.querySelectorAll('.info-trigger');

    const handleClick = (e: Event) => {
      e.stopPropagation();
      const target = e.currentTarget as HTMLElement;
      const term = target.getAttribute('data-term');

      if (!term) return;

      const rect = target.getBoundingClientRect();

      // If clicking same trigger, close
      if (activePopover?.term === term) {
        setActivePopover(null);
      } else {
        setActivePopover({ term, rect });
      }
    };

    triggers.forEach((trigger) => {
      // Add styling
      trigger.classList.add('cursor-pointer', 'inline-flex', 'items-center', 'gap-1');

      // Wrap content in code-pill style if not already
      const content = trigger.innerHTML;
      if (!trigger.querySelector('.code-pill')) {
        trigger.innerHTML = `
          <span class="code-pill">${content}</span>
          <span class="info-icon">i</span>
        `;
      }

      trigger.addEventListener('click', handleClick);
    });

    return () => {
      triggers.forEach((trigger) => {
        trigger.removeEventListener('click', handleClick);
      });
    };
  }, [html, activePopover?.term]);

  // Close popover when clicking outside
  const handleContainerClick = useCallback(() => {
    // Don't close immediately, let the trigger handle it
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Popover Portal */}
      {activePopover && createPortal(
        <PopoverContent
          term={activePopover.term}
          rect={activePopover.rect}
          onClose={() => setActivePopover(null)}
        />,
        document.body
      )}

      {/* Global styles for info-triggers */}
      <style>{`
        .info-trigger {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          vertical-align: middle;
        }

        .info-trigger .code-pill {
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          background-color: #F0F0F0;
          color: #C75548;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.9em;
        }

        .info-trigger .info-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: #A05A48;
          color: white;
          font-size: 12px;
          font-weight: bold;
          font-family: 'Georgia', serif;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s ease, background-color 0.2s;
        }

        .info-trigger:hover .info-icon {
          transform: scale(1.1);
          background-color: #8a4b3b;
        }
      `}</style>
    </>
  );
};

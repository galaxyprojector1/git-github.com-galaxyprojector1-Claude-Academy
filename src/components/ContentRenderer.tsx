import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
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
  const [isPositioned, setIsPositioned] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const entry = GLOSSARY[term];

  // Keep onClose ref updated
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Calculate position after mount - use useLayoutEffect for synchronous positioning
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const calculatePosition = () => {
      if (!popoverRef.current) return;

      const popoverRect = popoverRef.current.getBoundingClientRect();
      const gap = 12;

      // Position below the trigger, centered horizontally
      let top = rect.bottom + gap;
      let left = rect.left + (rect.width / 2) - (popoverRect.width / 2);

      // If not enough space below, position above
      if (rect.bottom + popoverRect.height + gap > window.innerHeight) {
        top = rect.top - popoverRect.height - gap;
      }

      // Horizontal constraints
      const minLeft = 10;
      const maxLeft = window.innerWidth - popoverRect.width - 10;
      if (left < minLeft) left = minLeft;
      if (left > maxLeft) left = maxLeft;

      setPosition({ top, left });
      setIsPositioned(true);
    };

    // Calculate immediately, and again after a frame to handle any layout shifts
    calculatePosition();
    const frameId = requestAnimationFrame(calculatePosition);

    return () => cancelAnimationFrame(frameId);
  }, [rect]);

  // Close on click outside, escape, or page scroll
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onCloseRef.current();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };

    // Handle scroll events (wheel for desktop, touchmove for mobile)
    const handleScroll = (e: WheelEvent | TouchEvent) => {
      // If scrolling inside the popover → open "En savoir plus"
      if (popoverRef.current && popoverRef.current.contains(e.target as Node)) {
        setIsDetailsOpen(true);
        return;
      }
      // If scrolling outside → close popover
      onCloseRef.current();
    };

    // Add listeners immediately
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchmove', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []); // Empty deps - use ref for onClose

  if (!entry) return null;

  return (
    <div
      ref={popoverRef}
      className="fixed w-[300px] max-w-[90vw] max-h-[350px] overflow-y-auto bg-white rounded-lg p-4 shadow-xl border border-gray-200 z-[1000]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        opacity: isPositioned ? 1 : 0,
        animation: isPositioned ? 'fadeIn 0.2s ease-out' : 'none',
      }}
      role="tooltip"
    >
      {/* Title */}
      <div className="font-bold text-[#A05A48] mb-2 text-sm uppercase tracking-wide">
        {entry.title}
      </div>

      {/* Summary - render HTML for bold text */}
      <div
        className="mb-3 text-sm leading-relaxed text-gray-700"
        dangerouslySetInnerHTML={{ __html: entry.summary }}
      />

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

      {/* Details - render HTML for bold text */}
      {isDetailsOpen && (
        <div
          className="mt-2 pt-3 border-t border-dashed border-gray-200 text-sm text-gray-600 bg-gray-50 p-3 rounded"
          dangerouslySetInnerHTML={{ __html: entry.details }}
        />
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

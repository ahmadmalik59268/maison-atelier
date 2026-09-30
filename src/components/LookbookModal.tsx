import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { LookbookLook } from '../types';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  looks: LookbookLook[];
  initialLookId?: string;
  onInquire: (look: LookbookLook) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  looks,
  initialLookId,
  onInquire,
}) => {
  const initialIndex = initialLookId
    ? Math.max(0, looks.findIndex((l) => l.id === initialLookId))
    : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  React.useEffect(() => {
    if (initialLookId) {
      const idx = looks.findIndex((l) => l.id === initialLookId);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, [initialLookId, looks]);

  if (!isOpen || looks.length === 0) return null;

  const currentLook = looks[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % looks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + looks.length) % looks.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#18181B]/85 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-10 relative">
        <div className="relative w-full max-w-5xl bg-[#FAF8F5] border border-[#E8E2D8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F5F3F0]">
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg text-[#18181B] font-medium uppercase tracking-tight">
                Paris Runway Lookbook
              </span>
              <span className="text-xs text-[#77767B]">
                Autumn / Winter 2025 • Presentation Vol. IX
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#18181B] hover:text-[#9E4734]"
              aria-label="Close lookbook"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Look Container (7 cols) */}
            <div className="lg:col-span-7 bg-[#18181B] relative h-[450px] sm:h-[550px] overflow-hidden flex items-center justify-center">
              <img
                src={currentLook.image}
                alt={currentLook.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Navigation overlays */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] text-[#18181B] flex items-center justify-center border border-[#E8E2D8] shadow-md transition-colors"
                aria-label="Previous look"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] text-[#18181B] flex items-center justify-center border border-[#E8E2D8] shadow-md transition-colors"
                aria-label="Next look"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 bg-[#18181B]/80 text-white px-3 py-1 text-xs font-mono">
                {currentLook.number} / {looks.length < 10 ? `0${looks.length}` : looks.length}
              </div>
            </div>

            {/* Editorial Metadata (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF8F5]">
              <div className="space-y-6">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#9E4734] font-semibold block">
                    {currentLook.number} • Runway Silhouette
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#18181B] mt-1 font-normal leading-snug">
                    {currentLook.title}
                  </h3>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#47464B] font-light leading-relaxed">
                  {currentLook.description}
                </p>

                <div className="space-y-3 pt-2 text-xs border-t border-[#E8E2D8]">
                  <div className="flex justify-between py-1 border-b border-[#E8E2D8]/60">
                    <span className="text-[#77767B]">Palette:</span>
                    <span className="font-medium text-[#18181B]">{currentLook.palette}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E8E2D8]/60">
                    <span className="text-[#77767B]">Textile:</span>
                    <span className="font-medium text-[#18181B]">{currentLook.textile}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E8E2D8]/60">
                    <span className="text-[#77767B]">Form:</span>
                    <span className="font-medium text-[#18181B]">{currentLook.silhouette}</span>
                  </div>
                </div>

                {/* Thumbnails strip */}
                <div className="pt-2">
                  <p className="text-[10px] font-sans uppercase tracking-wider text-[#77767B] mb-2">
                    Capsule Progression
                  </p>
                  <div className="flex gap-2">
                    {looks.map((look, idx) => (
                      <button
                        key={look.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-12 h-14 overflow-hidden border transition-all ${
                          currentIndex === idx
                            ? 'border-[#9E4734] ring-1 ring-[#9E4734]'
                            : 'border-[#E8E2D8] opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={look.image}
                          alt={look.number}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-[#E8E2D8]">
                <button
                  onClick={() => {
                    onInquire(currentLook);
                    onClose();
                  }}
                  className="w-full py-4 bg-[#18181B] text-white font-sans text-[11px] font-semibold uppercase tracking-widest hover:bg-[#9E4734] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Inquire &amp; Reserve Silhouette
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

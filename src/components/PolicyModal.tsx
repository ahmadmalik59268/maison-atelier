import React from 'react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#18181B]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-12 relative">
        <div className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#E8E2D8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="px-6 py-4 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F5F3F0]">
            <h3 className="font-serif text-xl text-[#18181B] font-medium">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-[#18181B] hover:text-[#9E4734]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-[#47464B] leading-relaxed font-light">
            <p>{content}</p>
            <div className="pt-4 border-t border-[#E8E2D8] flex justify-between items-center text-[10px] uppercase tracking-wider text-[#77767B]">
              <span>Maison Atelier Legal Registry</span>
              <span>Updated Autumn 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

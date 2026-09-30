import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#18181B] text-[#FAF8F5] px-6 py-4 shadow-2xl flex items-center justify-between gap-4 border-l-2 border-[#9E4734] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 bg-[#9E4734]"></span>
        <p className="text-xs uppercase tracking-widest font-sans font-medium text-[#FAF8F5]">
          {message}
        </p>
      </div>
      <button 
        onClick={onClose}
        className="text-[#E8E2D8] hover:text-white transition-colors text-xs font-mono ml-2"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

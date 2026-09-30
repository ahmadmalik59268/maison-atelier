import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, Leaf, Ruler } from 'lucide-react';

interface CraftsmanshipPromiseProps {
  onOpenBoutiques?: () => void;
}

export const CraftsmanshipPromise: React.FC<CraftsmanshipPromiseProps> = ({ onOpenBoutiques }) => {
  const navigate = useNavigate();

  const handleSalons = () => {
    if (onOpenBoutiques) onOpenBoutiques();
    else navigate('/boutiques');
  };

  return (
    <section id="promise" className="w-full bg-[#FAF8F5] py-14 sm:py-20 lg:py-28">
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[#9E4734] font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] block">
            The Atelier Promise
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#18181B] font-normal tracking-tight">
            Uncompromising Standards of Haute Craft
          </h2>
          <p className="font-sans text-xs sm:text-base text-[#77767B] font-light leading-relaxed">
            Every Ahmad Clothing piece is designed to be cherished, preserved, and handed down across generations.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
          {/* Pillar 1 */}
          <div className="bg-[#F5F3F0] p-6 sm:p-8 lg:p-10 space-y-3 sm:space-y-4 border border-[#E8E2D8] hover:border-[#18181B] transition-all group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FAF8F5] flex items-center justify-center text-[#18181B] border border-[#E8E2D8] group-hover:bg-[#18181B] group-hover:text-white transition-colors">
              <Scissors className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-[#9E4734] font-semibold block">
              Provenance
            </span>
            <h3 className="font-serif text-lg sm:text-2xl text-[#18181B] font-medium">
              Artisanal Craftsmanship
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#77767B] leading-relaxed font-light">
              Hand-finished garments cut and sewn by multi-generational family ateliers in Florence and Porto, retaining classical artisanal techniques.
            </p>
            <div className="pt-1 sm:pt-2">
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-[#18181B] flex items-center gap-2 font-semibold">
                <span className="w-1.5 h-1.5 bg-[#9E4734]" />
                24 Master Tailors on Staff
              </span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#F5F3F0] p-6 sm:p-8 lg:p-10 space-y-3 sm:space-y-4 border border-[#E8E2D8] hover:border-[#18181B] transition-all group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FAF8F5] flex items-center justify-center text-[#18181B] border border-[#E8E2D8] group-hover:bg-[#18181B] group-hover:text-white transition-colors">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-[#9E4734] font-semibold block">
              Traceability
            </span>
            <h3 className="font-serif text-lg sm:text-2xl text-[#18181B] font-medium">
              Pure &amp; Sustainable Fibers
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#77767B] leading-relaxed font-light">
              GOTS-certified organic cotton, unblended Mongolian cashmere, and ethically sheared merino wool. Zero non-biodegradable synthetic fibers.
            </p>
            <div className="pt-1 sm:pt-2">
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-[#18181B] flex items-center gap-2 font-semibold">
                <span className="w-1.5 h-1.5 bg-[#9E4734]" />
                100% Traceable Fiber Batch ID
              </span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#F5F3F0] p-6 sm:p-8 lg:p-10 space-y-3 sm:space-y-4 border border-[#E8E2D8] hover:border-[#18181B] transition-all group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FAF8F5] flex items-center justify-center text-[#18181B] border border-[#E8E2D8] group-hover:bg-[#18181B] group-hover:text-white transition-colors">
              <Ruler className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-[#9E4734] font-semibold block">
              Bespoke Fitting
            </span>
            <h3 className="font-serif text-lg sm:text-2xl text-[#18181B] font-medium">
              Complimentary Tailoring
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#77767B] leading-relaxed font-light">
              Every garment qualifies for complimentary bespoke fitting and seam adjustments across our Parisian, Tokyo, Milan, and New York salons.
            </p>
            <div className="pt-1 sm:pt-2 flex items-center justify-between">
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-[#18181B] flex items-center gap-2 font-semibold">
                <span className="w-1.5 h-1.5 bg-[#9E4734]" />
                Lifetime Repair Guarantee
              </span>
              <button
                onClick={handleSalons}
                className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#9E4734] underline font-medium hover:text-[#18181B] cursor-pointer"
              >
                Salons →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

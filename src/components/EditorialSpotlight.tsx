import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Quote } from 'lucide-react';

interface EditorialSpotlightProps {
  onOpenLookbook?: () => void;
  onSelectRunwayLook?: (lookId: string) => void;
}

export const EditorialSpotlight: React.FC<EditorialSpotlightProps> = ({
  onOpenLookbook,
  onSelectRunwayLook,
}) => {
  const navigate = useNavigate();

  const handleOpenLookbook = () => {
    if (onOpenLookbook) onOpenLookbook();
    else navigate('/lookbook');
  };

  const handleSelectLook = (lookId: string) => {
    if (onSelectRunwayLook) onSelectRunwayLook(lookId);
    else navigate('/lookbook');
  };

  return (
    <section id="editorial-preview" className="w-full bg-[#EAE8E5] py-14 sm:py-20 lg:py-28 overflow-hidden border-t border-[#E8E2D8]">
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* High Fashion Quotation */}
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 mb-10 sm:mb-16">
          <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#9E4734] mx-auto opacity-80" />
          <blockquote className="font-serif text-lg sm:text-3xl lg:text-[2.65rem] text-[#18181B] font-normal italic tracking-tight leading-snug">
            “Clothing that speaks through quiet confidence, architectural proportion, and uncompromising materials.”
          </blockquote>
          <p className="font-sans text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#77767B]">
            — Vogue International Fashion Review • Paris Runway Report
          </p>
        </div>

        {/* High Aesthetic Bento Lookbook Teaser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Bento Image: Look 04 */}
          <div 
            onClick={() => handleSelectLook('look-4')}
            className="lg:col-span-7 h-[280px] sm:h-[420px] lg:h-[520px] overflow-hidden bg-[#18181B] relative cursor-pointer group"
          >
            <img
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              alt="Model wearing flowing taupe alpaca mantle in brutalist colonnade"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPlYrQfbZcQEyypJXKNaWkpmaDtrIoj12GHVZNEOXJkfPcSSwQUo7qhHxIwWknuz_EjI5GQAgHkTghTJGRQcJ6XArjCzsHz9xjEbebyRbsruEu-bmaTvs6SlrhQZzBse84NqfMZgKuI6O2-9OclRyujeFWl_jkkdxtnqonK_gWvrEHGSj95y5M2qxNX6UeNocj1KesqX7W1Le49tMRN6Xq-Ir6OANAwUTNaht-2z9cMwRcwNjb2jAN"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/85 via-transparent to-transparent" />
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-[#FAF8F5]">
              <span className="font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[#FAF8F5]/80 block">
                Look 04 • Runway Preview
              </span>
              <p className="font-serif text-lg sm:text-2xl mt-0.5 sm:mt-1 font-medium">
                The Draped Mantle in Double-Faced Alpaca
              </p>
            </div>
          </div>

          {/* Bento Right Content: Editorial Essay */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8 bg-[#FAF8F5] p-6 sm:p-8 lg:p-12 border border-[#E8E2D8] shadow-sm">
            <div className="space-y-2 sm:space-y-4">
              <span className="font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[#9E4734] block">
                Editorial Essay
              </span>
              <h3 className="font-serif text-xl sm:text-3xl text-[#18181B] font-normal leading-tight">
                The Architecture of Silence
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#77767B] font-light leading-relaxed">
                In an era dominated by hyper-speed cycles and saturated saturation, Maison Atelier returns to the quiet permanence of pure materiality. Each contour is drawn to accentuate the wearer&apos;s poise rather than overwhelm it.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-2">
              <div className="flex items-center justify-between text-[#18181B] font-sans text-xs py-2 bg-[#F5F3F0] px-3 sm:px-4 border border-[#E8E2D8]">
                <span className="text-[#77767B]">Runway Palette:</span>
                <span className="font-medium text-[11px] sm:text-xs">Oat, Anthracite, Camel, Terracotta</span>
              </div>
              <div className="flex items-center justify-between text-[#18181B] font-sans text-xs py-2 bg-[#F5F3F0] px-3 sm:px-4 border border-[#E8E2D8]">
                <span className="text-[#77767B]">Capsule Pieces:</span>
                <span className="font-medium">28 Silhouettes</span>
              </div>

              <button
                onClick={handleOpenLookbook}
                className="w-full py-3.5 sm:py-4 bg-[#18181B] text-[#FAF8F5] font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-center block hover:bg-[#9E4734] transition-colors shadow-sm cursor-pointer"
              >
                Explore The Lookbook Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

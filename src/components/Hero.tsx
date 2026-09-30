import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExplore?: () => void;
  onViewLookbook?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onViewLookbook }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    if (onExplore) onExplore();
    else navigate('/shop');
  };

  const handleLookbook = () => {
    if (onViewLookbook) onViewLookbook();
    else navigate('/lookbook');
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#EAE8E5]">
      <div className="relative w-full min-h-[85vh] lg:min-h-[88vh] flex items-end">
        {/* Background Editorial Image Layer */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-102"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAPv0yus3cFdH-xx7I-qBEfshJBZykbnOm_s0C37sYgpz-LiQa-UwQVfSkwe6NE377jYu7URZlj3XRVTzDYxaWpWj5ARcrcOyymaI34vWx2SnT9ikCot1wMWOusim89LxWlOVNx5EYZI5xgSeYsSznuGdXsYv4M21HiXJEZgsyYUyX4tWkVjqq1pPqaIgsJQYta_g2uqinkd23wS-MfXThEcBdwbvwidHwsFtJBGehnvT0UwC0y3vfe')`
          }}
          role="img"
          aria-label="Editorial lookbook photograph of two models in bespoke camel coat and beige tailored trousers"
        />

        {/* High Fashion Scrim & Depth Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/90 via-[#18181B]/40 to-black/10" />
        <div className="absolute inset-0 bg-[#FAF8F5]/5 backdrop-blur-[0.5px]" />

        {/* Hero Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 pb-12 sm:pb-24 pt-28 sm:pt-32 max-w-7xl mx-auto">
          <div className="max-w-4xl space-y-4 sm:space-y-6">
            {/* Tagline & Release Pill */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-block w-6 sm:w-8 h-[1px] bg-[#FAF8F5]" />
              <span className="font-sans text-[10px] sm:text-[11px] font-semibold text-[#FAF8F5] tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                Autumn / Winter 2025 Release
              </span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/20 backdrop-blur-md text-[#FAF8F5] font-sans text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider border border-white/25">
                Limited Capsule • 100% Sustainable
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] text-[#FAF8F5] tracking-tight leading-[1.02] sm:leading-[0.98] font-normal">
              The Poetry of Tailoring.
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-xs sm:text-base lg:text-lg text-[#FAF8F5]/90 max-w-2xl font-light leading-relaxed">
              Refined architectural silhouettes and timeless savoir-faire sculpted from pure Italian wools, organic silks, and Portuguese cashmere.
            </p>

            {/* CTAs */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={handleExplore}
                className="w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FAF8F5] text-[#18181B] font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#9E4734] hover:text-white transition-all duration-200 shadow-md cursor-pointer"
              >
                Explore The Collection
              </button>

              <button
                onClick={handleLookbook}
                className="w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 sm:py-4 bg-[#18181B]/40 text-[#FAF8F5] backdrop-blur-md border border-[#FAF8F5]/40 font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#FAF8F5] hover:text-[#18181B] transition-all duration-200 cursor-pointer"
              >
                View Lookbook
              </button>

              <div className="hidden xl:flex items-center gap-4 ml-4 pl-4 border-l border-[#FAF8F5]/25 text-[#FAF8F5]/85 font-sans text-[11px] tracking-wider uppercase font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#FAF8F5]" />
                  Certified Artisan Mills
                </span>
                <span>•</span>
                <span>Hand-Finished in Florence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Editorial Spine */}
        <div className="hidden 2xl:block absolute right-12 bottom-24 z-10 [writing-mode:vertical-rl] text-[#FAF8F5]/60 font-sans text-[10px] tracking-[0.3em] uppercase">
          Vol. IX — Monolithic Drape &amp; Pure Cashmere
        </div>
      </div>
    </section>
  );
};

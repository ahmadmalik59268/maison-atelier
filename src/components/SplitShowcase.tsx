import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SplitShowcaseProps {
  onShopWomen?: () => void;
  onShopMen?: () => void;
}

export const SplitShowcase: React.FC<SplitShowcaseProps> = ({ onShopWomen, onShopMen }) => {
  const navigate = useNavigate();

  const handleWomen = () => {
    if (onShopWomen) onShopWomen();
    else navigate('/women');
  };

  const handleMen = () => {
    if (onShopMen) onShopMen();
    else navigate('/men');
  };

  return (
    <section className="w-full bg-[#F5F3F0] py-12 sm:py-20 lg:py-24 border-y border-[#E8E2D8]">
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Left Banner: Women's Collection */}
          <div className="relative group h-[460px] sm:h-[540px] lg:h-[640px] overflow-hidden bg-[#EAE8E5] flex items-end">
            <img
              alt="Maison Atelier Women's Collection"
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmIA_DcRJdUFwM0n4qRnlDxGQO6ucAaixL66nneK-1vXR1C-KNWpZD_25lMNIZsXMlLTcXsbheCjHPQiGmAZIWYe6KF4ytAKRlvpXA04xIhyzaX8batfi96jEtwRQT7TM-4MKRwcRQQ-wUD-9a-qK4o9h6O8ftI5k1l0IDJmXSPrHI9hgq_BwhsjcCSbpyduZ1i_nMcALroL-SbBWPi42aftpdNR3_b1r4AJLDM8gWyVsiS9Ip_zCL"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/90 via-[#18181B]/40 to-transparent" />
            <div className="relative z-10 p-6 sm:p-10 lg:p-12 space-y-3 sm:space-y-4 max-w-lg">
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#FAF8F5]/80 font-semibold block">
                Curated Wardrobe • Fall/Winter
              </span>
              <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl text-[#FAF8F5] leading-tight font-normal">
                Women's Collection —<br />Grace in Motion
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#FAF8F5]/85 font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                Flowing trench coats, oversized architectural tailoring, and bias-cut silks shaped for effortless movement from dawn till dusk.
              </p>
              <div className="pt-1 sm:pt-2">
                <button
                  onClick={handleWomen}
                  className="inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#FAF8F5] text-[#18181B] font-sans text-[10px] font-semibold uppercase tracking-widest hover:bg-[#9E4734] hover:text-white transition-colors shadow-sm cursor-pointer"
                >
                  Shop Women
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Banner: Men's Collection */}
          <div className="relative group h-[460px] sm:h-[540px] lg:h-[640px] overflow-hidden bg-[#EAE8E5] flex items-end">
            <img
              alt="Maison Atelier Men's Sartorial Collection"
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkjscK0FCnZL9wjWokaA9vV9_nB3Q99XPmO_cCbEwvfq3MBiH8GcScwCxtQcvx1ulbtU9A4BhZ88VRBat_UaWW2Skp0KJQKZWunB5lnS2NSX7btMRbQu-43CO9yTfZtpluA2et-WFNRAYdfM7EzK9NBokgH4DzI8S7WXU24eqUyte4v7yYg1_1Yb82WbzprlpUiU1BVuWNptz9fKy9xIw0xgEUx2-7fsS18Oo4k-OwzstY-pRhcl9C"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/90 via-[#18181B]/40 to-transparent" />
            <div className="relative z-10 p-6 sm:p-10 lg:p-12 space-y-3 sm:space-y-4 max-w-lg">
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#FAF8F5]/80 font-semibold block">
                Tailored Architecture • Modern Sartorial
              </span>
              <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl text-[#FAF8F5] leading-tight font-normal">
                Men's Sartorial —<br />Modern Structure
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#FAF8F5]/85 font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                Double-faced cashmere topcoats, unstructured raglan shoulders, and dense heavyweight knits from heritage European mills.
              </p>
              <div className="pt-1 sm:pt-2">
                <button
                  onClick={handleMen}
                  className="inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#FAF8F5] text-[#18181B] font-sans text-[10px] font-semibold uppercase tracking-widest hover:bg-[#9E4734] hover:text-white transition-colors shadow-sm cursor-pointer"
                >
                  Shop Men
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

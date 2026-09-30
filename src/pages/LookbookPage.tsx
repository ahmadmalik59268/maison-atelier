import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Eye, ArrowRight, Share2, Compass, Check } from 'lucide-react';
import { LOOKBOOK_LOOKS } from '../data/atelierData';
import { useShop } from '../context/ShopContext';

export const LookbookPage: React.FC = () => {
  const { openQuickView, addToast } = useShop();
  const [selectedSeason, setSelectedSeason] = useState<'All' | 'Winter / Spring 2026' | 'Autumn / Winter 2025'>('All');
  const [activeLookIndex, setActiveLookIndex] = useState(0);

  const filteredLooks = selectedSeason === 'All'
    ? LOOKBOOK_LOOKS
    : LOOKBOOK_LOOKS.filter(l => l.season === selectedSeason);

  const activeLook = filteredLooks[activeLookIndex] || filteredLooks[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#8C8275] mb-2">
            Haute Couture Dossier • Paris
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-light tracking-tight">
            Runway Lookbook
          </h1>
          <p className="text-sm text-[#5A534A] font-light mt-3 leading-relaxed">
            Directly from the Grand Palais salon presentations. An exploration of sculptural tailoring, noble raw fibres, and timeless monochrome elegance.
          </p>

          {/* Season Filter Bar */}
          <div className="flex justify-center gap-2 mt-8">
            {['All', 'Winter / Spring 2026', 'Autumn / Winter 2025'].map((season) => (
              <button
                key={season}
                onClick={() => {
                  setSelectedSeason(season as any);
                  setActiveLookIndex(0);
                }}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${
                  selectedSeason === season
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-white border border-[#E5E0D8] text-[#5A534A] hover:text-[#1A1A1A]'
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Editorial Spotlight View */}
        {activeLook && (
          <div className="bg-white border border-[#E5E0D8] p-6 sm:p-10 shadow-sm mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 relative group overflow-hidden bg-[#F5F2EB]">
                <img
                  src={activeLook.image}
                  alt={activeLook.title}
                  className="w-full h-[520px] sm:h-[620px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                  {activeLook.lookNumber}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C8275]">
                    {activeLook.season}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light mt-1">
                    {activeLook.title}
                  </h2>
                  <p className="text-xs font-mono text-[#8C8275] mt-1">
                    Featured Silhouette: {activeLook.featuredSilhouette}
                  </p>
                </div>

                <p className="text-sm text-[#5A534A] font-light leading-relaxed">
                  {activeLook.editorialDescription}
                </p>

                <div className="p-4 bg-[#FAF8F5] border border-[#E5E0D8] space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275]">
                    Runway Composition
                  </p>
                  <p className="text-xs text-[#1A1A1A] font-serif italic">
                    "{activeLook.quote}"
                  </p>
                  <p className="text-[11px] font-mono text-[#5A534A]">
                    Noble Fiber: {activeLook.fabricDetails}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    to={`/product/${activeLook.relatedProductId}`}
                    className="flex-1 bg-[#1A1A1A] text-white py-3.5 text-xs font-mono uppercase tracking-[0.2em] text-center hover:bg-black transition-colors"
                  >
                    Acquire Look Pieces
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      addToast('Lookbook dossier URL copied to clipboard.', 'info');
                    }}
                    className="border border-[#E5E0D8] px-4 py-3 text-xs font-mono uppercase text-[#5A534A] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-[#1A1A1A]">
              Runway Archive Matrix ({filteredLooks.length} Dossiers)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredLooks.map((look, idx) => {
              const isSelected = look.id === activeLook?.id;
              return (
                <div
                  key={look.id}
                  onClick={() => setActiveLookIndex(idx)}
                  className={`bg-white border cursor-pointer transition-all ${
                    isSelected ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#E5E0D8] hover:border-[#8C8275]'
                  }`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F2EB]">
                    <img
                      src={look.image}
                      alt={look.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-black/75 text-white px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase">
                      {look.lookNumber}
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-[9px] font-mono uppercase tracking-widest text-[#8C8275]">{look.season}</p>
                    <p className="font-serif text-base text-[#1A1A1A] truncate">{look.title}</p>
                    <p className="text-xs text-[#8C8275] font-mono truncate">{look.featuredSilhouette}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

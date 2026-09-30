import React, { useState } from 'react';
import { Sparkles, ShoppingBag, ArrowRight, RotateCcw, Check, Heart, Layers } from 'lucide-react';
import { STYLE_PRESETS } from '../data/atelierData';
import { useShop } from '../context/ShopContext';

export const StyleStudioPage: React.FC = () => {
  const { products, addToCart, toggleWishlist, isWishlisted, formatPrice, addToast } = useShop();

  // Selected tops, bottoms, outerwear, accessories
  const [selectedPresetId, setSelectedPresetId] = useState<string>(STYLE_PRESETS[0].id);

  const activePreset = STYLE_PRESETS.find(p => p.id === selectedPresetId) || STYLE_PRESETS[0];

  const presetProducts = products.filter(p => activePreset.itemIds.includes(p.id));
  const presetTotal = presetProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddEnsembleToBag = () => {
    presetProducts.forEach(p => {
      addToCart(p, p.sizes[0] || 'M', p.colors[0]);
    });
    addToast(`All ${presetProducts.length} ensemble garments added to your Shopping Bag.`, 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E5E0D8] px-3.5 py-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#1A1A1A]">
              Interactive Atelier Stylist
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-light tracking-tight">
            Virtual Style Studio
          </h1>
          <p className="text-sm text-[#5A534A] font-light mt-3 leading-relaxed">
            Curate harmonized silhouette pairings across noble virgin wools, suri alpaca, and mulberry silk. Assemble complete capsule looks for gala receptions and metropolitan journeys.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STYLE_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`p-5 text-left border transition-all ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md'
                    : 'bg-white border-[#E5E0D8] text-[#1A1A1A] hover:border-[#8C8275]'
                }`}
              >
                <span className={`text-[9px] font-mono uppercase tracking-widest block mb-1 ${
                  isSelected ? 'text-[#C4BDB3]' : 'text-[#8C8275]'
                }`}>
                  {preset.occasion}
                </span>
                <p className="font-serif text-lg font-light">{preset.name}</p>
                <p className={`text-xs mt-2 line-clamp-2 ${
                  isSelected ? 'text-[#E5E0D8]' : 'text-[#5A534A]'
                }`}>
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Ensemble Breakdown */}
        <div className="bg-white border border-[#E5E0D8] p-6 sm:p-10 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-[#E5E0D8] gap-4 mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C8275]">
                Active Ensemble Capsule
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-light mt-1">
                {activePreset.name}
              </h2>
              <p className="text-xs text-[#5A534A] font-light mt-1">
                {activePreset.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] block">
                  Complete Ensemble ({presetProducts.length} Items)
                </span>
                <span className="font-mono text-xl font-medium text-[#1A1A1A]">
                  {formatPrice(presetTotal)}
                </span>
              </div>
              <button
                onClick={handleAddEnsembleToBag}
                className="bg-[#1A1A1A] text-white px-6 py-3 text-xs font-mono uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Acquire Capsule
              </button>
            </div>
          </div>

          {/* Grid of Garments in Capsule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {presetProducts.map((product) => (
              <div key={product.id} className="border border-[#E5E0D8] p-4 bg-[#FAF8F5]/50 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-white mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm ${
                        isWishlisted(product.id) ? 'bg-white text-rose-800' : 'bg-white/80 text-[#1A1A1A]'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <p className="text-[10px] font-mono uppercase text-[#8C8275]">{product.category}</p>
                  <p className="font-serif text-lg text-[#1A1A1A] mt-0.5">{product.name}</p>
                  <p className="text-xs font-mono text-[#5A534A] mt-1">{product.material}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-[#1A1A1A]">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(product, product.sizes[0] || 'M', product.colors[0]);
                      addToast(`${product.name} added to Shopping Bag.`, 'success');
                    }}
                    className="border border-[#1A1A1A] text-[#1A1A1A] px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    Add Piece
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

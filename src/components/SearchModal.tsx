import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { products, formatPrice } = useShop();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = products.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      (p.sku || '').toLowerCase().includes(q)
    );
  });

  const handleSelectProduct = (product: Product) => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  const handleFullSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#18181B]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-start justify-center p-4 sm:p-6 lg:p-12 pt-20 relative">
        <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E8E2D8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Search Input Bar */}
          <form onSubmit={handleFullSearchSubmit} className="p-4 border-b border-[#E8E2D8] flex items-center gap-3 bg-white">
            <Search className="w-5 h-5 text-[#9E4734]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search garments, virgin wools, silks, outerwear..."
              className="flex-1 bg-transparent font-sans text-sm text-[#18181B] placeholder:text-[#77767B] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs text-[#77767B] hover:text-[#18181B] font-mono mr-2"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#18181B] hover:text-[#9E4734]"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="px-5 py-2.5 bg-[#F5F3F0] border-b border-[#E8E2D8] flex items-center gap-2 overflow-x-auto text-[10px] font-sans uppercase tracking-wider font-semibold text-[#77767B]">
            <span>Suggested:</span>
            <button onClick={() => setQuery('Wool')} className="hover:text-[#18181B] cursor-pointer">Virgin Wool</button>
            <span>•</span>
            <button onClick={() => setQuery('Cashmere')} className="hover:text-[#18181B] cursor-pointer">Cashmere</button>
            <span>•</span>
            <button onClick={() => setQuery('Silk')} className="hover:text-[#18181B] cursor-pointer">Mulberry Silk</button>
            <span>•</span>
            <button onClick={() => setQuery('Blazer')} className="hover:text-[#18181B] cursor-pointer">Blazers</button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#77767B]">
                No silhouettes found matching &quot;{query}&quot;. Try exploring our cashmere or wool curations.
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectProduct(item)}
                  className="flex items-center justify-between p-2.5 hover:bg-[#F5F3F0] cursor-pointer transition-colors border border-transparent hover:border-[#E8E2D8] group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-[#F2EFEB] shrink-0 overflow-hidden border border-[#E8E2D8]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9E4734] block">
                        {item.subtitle}
                      </span>
                      <h4 className="font-sans text-xs sm:text-sm font-semibold text-[#18181B] group-hover:text-[#9E4734] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#77767B]">{item.fabric}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-sans text-xs font-semibold text-[#18181B] tabular-nums font-mono">
                      {formatPrice(item.price)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#77767B] group-hover:text-[#18181B] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>

          {query && (
            <div className="p-3 bg-white border-t border-[#E8E2D8] text-center">
              <button
                onClick={handleFullSearchSubmit}
                className="text-xs font-sans uppercase tracking-widest text-[#9E4734] font-bold hover:underline"
              >
                View all results on search page →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

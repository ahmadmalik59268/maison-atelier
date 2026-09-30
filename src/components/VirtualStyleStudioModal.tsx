import React, { useState } from 'react';
import { X, Sparkles, ShoppingBag, Check, Layers, RefreshCw } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { useShop } from '../context/ShopContext';
import { CURRENCIES } from '../data/atelierData';

interface VirtualStyleStudioModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  products?: Product[];
  currency?: CurrencyCode;
  onAddEnsembleToBag?: (selectedProducts: Product[]) => void;
}

export const VirtualStyleStudioModal: React.FC<VirtualStyleStudioModalProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  products: propProducts,
  currency: propCurrency,
  onAddEnsembleToBag,
}) => {
  const {
    products: contextProducts,
    currency: contextCurrency,
    addToCart,
    isStyleStudioOpen,
    setIsStyleStudioOpen,
    addToast,
  } = useShop();

  const products = propProducts || contextProducts;
  const currency = propCurrency || contextCurrency;
  const isOpen = propIsOpen !== undefined ? propIsOpen : isStyleStudioOpen;
  const onClose = propOnClose || (() => setIsStyleStudioOpen(false));

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  // Filter pools
  const outerwearPool = products.filter((p) => p.category === 'outerwear');
  const topsPool = products.filter((p) => p.category === 'knitwear' || p.category === 'dresses');
  const bottomsPool = products.filter((p) => p.category === 'tailoring');
  const accessoriesPool = products.filter((p) => p.category === 'accessories');

  const [selectedOuterwear, setSelectedOuterwear] = useState<Product>(outerwearPool[0] || products[0]);
  const [selectedTop, setSelectedTop] = useState<Product>(topsPool[0] || products[1]);
  const [selectedBottom, setSelectedBottom] = useState<Product>(bottomsPool[0] || products[2]);
  const [selectedAccessory, setSelectedAccessory] = useState<Product>(accessoriesPool[0] || products[3]);

  if (!isOpen) return null;

  const ensembleItems = [selectedOuterwear, selectedTop, selectedBottom, selectedAccessory].filter(Boolean);
  const totalUsd = ensembleItems.reduce((sum, item) => sum + item.price, 0);
  const convertedTotal = Math.round(totalUsd * curr.rate);

  const randomizeLook = () => {
    if (outerwearPool.length) setSelectedOuterwear(outerwearPool[Math.floor(Math.random() * outerwearPool.length)]);
    if (topsPool.length) setSelectedTop(topsPool[Math.floor(Math.random() * topsPool.length)]);
    if (bottomsPool.length) setSelectedBottom(bottomsPool[Math.floor(Math.random() * bottomsPool.length)]);
    if (accessoriesPool.length) setSelectedAccessory(accessoriesPool[Math.floor(Math.random() * accessoriesPool.length)]);
  };

  const handleAcquire = () => {
    if (onAddEnsembleToBag) {
      onAddEnsembleToBag(ensembleItems);
    } else {
      ensembleItems.forEach((item) => {
        addToCart(item, item.sizes[0] || 'M', item.colors[0]);
      });
      addToast(`Ensemble (${ensembleItems.length} pieces) added to Shopping Bag.`, 'success');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-[#E5E0D8] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E0D8] bg-white flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FAF8F5] border border-[#E5E0D8]">
              <Sparkles className="w-5 h-5 text-[#1A1A1A]" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C8275]">
                Maison Atelier • Virtual Studio
              </p>
              <h2 className="font-serif text-2xl text-[#1A1A1A] font-light">
                Capsule Ensemble Curator
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={randomizeLook}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-widest border border-[#E5E0D8] bg-[#FAF8F5] hover:bg-[#E5E0D8] text-[#1A1A1A]"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Randomize Capsule
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#FAF8F5] text-[#8C8275] hover:text-[#1A1A1A] border border-[#E5E0D8]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Content */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 4 slots selector */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Outerwear Slot */}
            <div className="bg-white border border-[#E5E0D8] p-4 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275]">
                1. Architectural Outerwear
              </span>
              {selectedOuterwear && (
                <div className="flex gap-4 items-center">
                  <img
                    src={selectedOuterwear.images[0] || selectedOuterwear.image}
                    alt={selectedOuterwear.name}
                    className="w-20 h-24 object-cover border border-[#E5E0D8]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-[#1A1A1A] truncate font-medium">
                      {selectedOuterwear.name}
                    </p>
                    <p className="text-[11px] font-mono text-[#8C8275]">{selectedOuterwear.material}</p>
                    <p className="font-mono text-xs text-[#1A1A1A] mt-1">
                      {curr.symbol}{Math.round(selectedOuterwear.price * curr.rate).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              {outerwearPool.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pt-2 border-t border-[#E5E0D8]/60">
                  {outerwearPool.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedOuterwear(p)}
                      className={`w-10 h-12 shrink-0 border overflow-hidden ${
                        selectedOuterwear?.id === p.id ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#E5E0D8] opacity-60'
                      }`}
                    >
                      <img src={p.images[0] || p.image} alt={p.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Top / Knitwear Slot */}
            <div className="bg-white border border-[#E5E0D8] p-4 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275]">
                2. Foundation / Knitwear
              </span>
              {selectedTop && (
                <div className="flex gap-4 items-center">
                  <img
                    src={selectedTop.images[0] || selectedTop.image}
                    alt={selectedTop.name}
                    className="w-20 h-24 object-cover border border-[#E5E0D8]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-[#1A1A1A] truncate font-medium">
                      {selectedTop.name}
                    </p>
                    <p className="text-[11px] font-mono text-[#8C8275]">{selectedTop.material}</p>
                    <p className="font-mono text-xs text-[#1A1A1A] mt-1">
                      {curr.symbol}{Math.round(selectedTop.price * curr.rate).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              {topsPool.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pt-2 border-t border-[#E5E0D8]/60">
                  {topsPool.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedTop(p)}
                      className={`w-10 h-12 shrink-0 border overflow-hidden ${
                        selectedTop?.id === p.id ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#E5E0D8] opacity-60'
                      }`}
                    >
                      <img src={p.images[0] || p.image} alt={p.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom / Tailoring Slot */}
            <div className="bg-white border border-[#E5E0D8] p-4 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275]">
                3. Tailoring & Trousers
              </span>
              {selectedBottom && (
                <div className="flex gap-4 items-center">
                  <img
                    src={selectedBottom.images[0] || selectedBottom.image}
                    alt={selectedBottom.name}
                    className="w-20 h-24 object-cover border border-[#E5E0D8]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-[#1A1A1A] truncate font-medium">
                      {selectedBottom.name}
                    </p>
                    <p className="text-[11px] font-mono text-[#8C8275]">{selectedBottom.material}</p>
                    <p className="font-mono text-xs text-[#1A1A1A] mt-1">
                      {curr.symbol}{Math.round(selectedBottom.price * curr.rate).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              {bottomsPool.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pt-2 border-t border-[#E5E0D8]/60">
                  {bottomsPool.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedBottom(p)}
                      className={`w-10 h-12 shrink-0 border overflow-hidden ${
                        selectedBottom?.id === p.id ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#E5E0D8] opacity-60'
                      }`}
                    >
                      <img src={p.images[0] || p.image} alt={p.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accessory Slot */}
            <div className="bg-white border border-[#E5E0D8] p-4 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275]">
                4. Tuscan Leather & Accents
              </span>
              {selectedAccessory && (
                <div className="flex gap-4 items-center">
                  <img
                    src={selectedAccessory.images[0] || selectedAccessory.image}
                    alt={selectedAccessory.name}
                    className="w-20 h-24 object-cover border border-[#E5E0D8]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-[#1A1A1A] truncate font-medium">
                      {selectedAccessory.name}
                    </p>
                    <p className="text-[11px] font-mono text-[#8C8275]">{selectedAccessory.material}</p>
                    <p className="font-mono text-xs text-[#1A1A1A] mt-1">
                      {curr.symbol}{Math.round(selectedAccessory.price * curr.rate).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              {accessoriesPool.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pt-2 border-t border-[#E5E0D8]/60">
                  {accessoriesPool.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedAccessory(p)}
                      className={`w-10 h-12 shrink-0 border overflow-hidden ${
                        selectedAccessory?.id === p.id ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#E5E0D8] opacity-60'
                      }`}
                    >
                      <img src={p.images[0] || p.image} alt={p.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-4 bg-white border border-[#E5E0D8] p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275]">
                Curated Dossier Total
              </span>
              <h3 className="font-serif text-2xl text-[#1A1A1A] font-light">
                Complete Capsule Ensemble
              </h3>

              <div className="space-y-2 py-4 border-y border-[#E5E0D8] text-xs font-mono">
                {ensembleItems.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[#5A534A]">
                    <span className="truncate max-w-[160px]">{it.name}</span>
                    <span>{curr.symbol}{Math.round(it.price * curr.rate).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="font-mono text-xs uppercase text-[#8C8275]">Grand Total:</span>
                <span className="font-mono text-xl font-bold text-[#1A1A1A]">
                  {curr.symbol}{convertedTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <button
                onClick={handleAcquire}
                className="w-full bg-[#1A1A1A] text-white py-3.5 text-xs font-mono uppercase tracking-[0.2em] hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Acquire Full Ensemble
              </button>
              <p className="text-[10px] text-center text-[#8C8275] font-mono">
                Complimentary global air courier & bespoke cedar garment packaging included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

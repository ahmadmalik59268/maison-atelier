import React, { useState } from 'react';
import { LayoutGrid, Grid2X2, ArrowUpDown, Filter, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

interface NewArrivalsProps {
  initialCategory?: string;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ initialCategory = 'all' }) => {
  const navigate = useNavigate();
  const { products } = useShop();

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'curated' | 'price-low' | 'price-high' | 'rating'>('curated');
  const [isCompactGrid, setIsCompactGrid] = useState(false);

  const categories = [
    { id: 'all', label: 'All Pieces' },
    { id: 'outerwear', label: 'Outerwear & Coats' },
    { id: 'tailoring', label: 'Tailored Suiting' },
    { id: 'knitwear', label: 'Cashmere & Knits' },
    { id: 'dresses', label: 'Silk & Evening' },
    { id: 'accessories', label: 'Objects & Leather' },
  ];

  const materials = [
    { id: 'all', label: 'All Fibers' },
    { id: 'wool', label: 'Virgin Wool' },
    { id: 'cashmere', label: 'Mongolian Cashmere' },
    { id: 'silk', label: 'Mulberry Silk' },
    { id: 'linen', label: 'French Flax' },
    { id: 'alpaca', label: 'Surí Alpaca' },
    { id: 'leather', label: 'Tuscan Leather' },
  ];

  // Filtering
  let filtered = products.filter((item) => {
    // Category or gender filter
    if (activeCategory === 'women') {
      if (item.gender !== 'women' && item.gender !== 'unisex') return false;
    } else if (activeCategory === 'men') {
      if (item.gender !== 'men' && item.gender !== 'unisex') return false;
    } else if (activeCategory !== 'all') {
      if (item.category !== activeCategory) return false;
    }

    // Material filter
    if (selectedMaterial !== 'all') {
      if (item.materialCategory !== selectedMaterial) return false;
    }

    return true;
  });

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="new-arrivals" className="w-full px-4 sm:px-6 lg:px-12 py-14 sm:py-20 lg:py-28 bg-[#FAF8F5] max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6 border-b border-[#E8E2D8] pb-6 sm:pb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className="text-[#9E4734] font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]">
              Selected Works
            </span>
            <span className="text-[#77767B] font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em]">
              — Edition 2025 • {filtered.length} Works Available
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#18181B] tracking-tight font-normal">
            New Arrivals
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#77767B] mt-1.5 sm:mt-2 max-w-lg font-light leading-relaxed">
            Curated seasonal pieces designed for effortless elegance, sculptural comfort, and fluid movement.
          </p>
        </div>

        {/* Style Studio Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/style-studio')}
            className="px-4 py-2.5 bg-[#F5F3F0] hover:bg-[#18181B] hover:text-white text-[#18181B] font-sans text-[10px] uppercase tracking-widest font-semibold border border-[#E8E2D8] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9E4734]" />
            Launch Silhouette Studio
          </button>
        </div>
      </div>

      {/* Main Categories Navigation Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-[#E8E2D8] pb-3 mb-6 overflow-x-auto">
        <div className="flex items-center gap-x-2.5 sm:gap-x-4 font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.14em] whitespace-nowrap">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat.id;
            return (
              <React.Fragment key={cat.id}>
                <button
                  onClick={() => setActiveCategory(cat.id)}
                  className={`transition-colors py-1 cursor-pointer font-semibold ${
                    isActive
                      ? 'text-[#18181B] border-b-2 border-[#18181B]'
                      : 'text-[#77767B] hover:text-[#18181B]'
                  }`}
                >
                  {cat.label}
                </button>
                {idx < categories.length - 1 && (
                  <span className="text-[#E8E2D8] select-none">/</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Controls: Sort and Grid Toggle */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-1.5 text-[#77767B]">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-sans text-[#18181B] focus:outline-none cursor-pointer"
            >
              <option value="curated">Curated Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="h-4 w-[1px] bg-[#E8E2D8]" />

          <div className="flex items-center border border-[#E8E2D8]">
            <button
              onClick={() => setIsCompactGrid(false)}
              className={`p-1.5 cursor-pointer ${!isCompactGrid ? 'bg-[#18181B] text-white' : 'text-[#77767B] hover:text-[#18181B]'}`}
              title="4-Column View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsCompactGrid(true)}
              className={`p-1.5 cursor-pointer ${isCompactGrid ? 'bg-[#18181B] text-white' : 'text-[#77767B] hover:text-[#18181B]'}`}
              title="2-Column Editorial View"
            >
              <Grid2X2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Fiber Material Pill Filter Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-[10px] font-sans uppercase tracking-wider">
        <span className="text-[#77767B] shrink-0 font-semibold flex items-center gap-1 mr-1">
          <Filter className="w-3 h-3 text-[#9E4734]" />
          Fiber:
        </span>
        {materials.map((m) => {
          const isSelected = selectedMaterial === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMaterial(m.id)}
              className={`px-3 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#18181B] text-white border-[#18181B] font-semibold'
                  : 'bg-white text-[#77767B] border-[#E8E2D8] hover:border-[#18181B] hover:text-[#18181B]'
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 sm:py-20 text-center space-y-3 bg-[#F5F3F0] border border-[#E8E2D8] p-8">
          <p className="font-serif text-lg sm:text-xl text-[#18181B]">No archival silhouettes found in this filter combination.</p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedMaterial('all');
              }}
              className="text-xs uppercase font-sans tracking-widest text-[#9E4734] underline underline-offset-4 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`grid gap-3 sm:gap-6 gap-y-8 sm:gap-y-12 ${
            isCompactGrid
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
};

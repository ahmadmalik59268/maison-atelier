import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Filter,
  X,
  ArrowUpDown,
  LayoutGrid,
  Grid2X2,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const { products, formatPrice } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const categoryParam = searchParams.get('category') || 'all';
  const genderParam = searchParams.get('gender') || 'all';
  const materialParam = searchParams.get('material') || 'all';
  const sortParam = searchParams.get('sort') || 'curated';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedGender, setSelectedGender] = useState<string>(genderParam);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(materialParam);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(sortParam);
  const [isCompactGrid, setIsCompactGrid] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'outerwear', label: 'Outerwear & Coats' },
    { id: 'tailoring', label: 'Atelier Tailoring' },
    { id: 'knitwear', label: 'Fine Cashmere Knits' },
    { id: 'dresses', label: 'Evening & Silk Dresses' },
    { id: 'accessories', label: 'Leather & Objects' },
  ];

  const genders = [
    { id: 'all', label: 'All Collections' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'unisex', label: 'Unisex' },
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

  const allSizes = ['34 FR', '36 FR', '38 FR', '40 FR', '42 FR', '46 IT', '48 IT', '50 IT', '52 IT', 'XS', 'S', 'M', 'L', 'XL'];

  // Filtered & Sorted calculation
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Gender
      if (selectedGender !== 'all') {
        if (selectedGender === 'women' && p.gender !== 'women' && p.gender !== 'unisex') return false;
        if (selectedGender === 'men' && p.gender !== 'men' && p.gender !== 'unisex') return false;
        if (selectedGender === 'unisex' && p.gender !== 'unisex') return false;
      }
      // Material
      if (selectedMaterial !== 'all') {
        if (p.materialCategory !== selectedMaterial) return false;
      }
      // Size
      if (selectedSize !== 'all') {
        if (!p.sizes.some((s) => s.includes(selectedSize) || selectedSize.includes(s))) return false;
      }
      // Price
      if (p.price > maxPrice) return false;
      // In Stock
      if (onlyInStock && p.stock_quantity <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name-az') return a.name.localeCompare(b.name);
      if (sortBy === 'newest') return (b.new_arrival ? 1 : 0) - (a.new_arrival ? 1 : 0);
      return 0;
    });
  }, [products, selectedCategory, selectedGender, selectedMaterial, selectedSize, maxPrice, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedGender('all');
    setSelectedMaterial('all');
    setSelectedSize('all');
    setMaxPrice(1000);
    setOnlyInStock(false);
    setSortBy('curated');
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedGender !== 'all' ? 1 : 0) +
    (selectedMaterial !== 'all' ? 1 : 0) +
    (selectedSize !== 'all' ? 1 : 0) +
    (maxPrice < 1000 ? 1 : 0) +
    (onlyInStock ? 1 : 0);

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-[#E8E2D8] pb-6 sm:pb-8 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#9E4734] font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]">
            Archival Catalog
          </span>
          <span className="text-[#77767B] font-sans text-[10px] sm:text-[11px] uppercase tracking-wider">
            — {filteredProducts.length} Silhouettes Cataloged
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#18181B] tracking-tight font-normal">
          Complete Collection
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#77767B] mt-2 max-w-2xl font-light leading-relaxed">
          Explore the full repertoire of Maison Atelier ready-to-wear, bespoke tailoring, fine knitwear, and sculptural accessories. Crafted from the finest natural fibers in Biella, Como, and Prato.
        </p>
      </div>

      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E2D8]">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden px-4 py-2.5 bg-[#F5F3F0] text-[#18181B] font-sans text-xs uppercase tracking-widest font-semibold border border-[#E8E2D8] flex items-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#9E4734]" />
          <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
        </button>

        {/* Quick Category Chips for Desktop */}
        <div className="hidden lg:flex items-center gap-2 overflow-x-auto text-[11px] font-sans uppercase tracking-wider">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 border transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#18181B] text-white border-[#18181B] font-semibold'
                  : 'bg-white text-[#77767B] border-[#E8E2D8] hover:border-[#18181B] hover:text-[#18181B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort & Grid Switcher */}
        <div className="flex items-center gap-4 text-xs ml-auto">
          <div className="flex items-center gap-2 text-[#77767B]">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-sans text-[#18181B] font-medium focus:outline-none cursor-pointer border-b border-[#E8E2D8] pb-1"
            >
              <option value="curated">Curated Order</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-az">Alphabetical A-Z</option>
              <option value="rating">Highest Patron Rating</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center border border-[#E8E2D8]">
            <button
              onClick={() => setIsCompactGrid(false)}
              className={`p-1.5 cursor-pointer ${!isCompactGrid ? 'bg-[#18181B] text-white' : 'text-[#77767B] hover:text-[#18181B]'}`}
              title="Standard 3/4 Column Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsCompactGrid(true)}
              className={`p-1.5 cursor-pointer ${isCompactGrid ? 'bg-[#18181B] text-white' : 'text-[#77767B] hover:text-[#18181B]'}`}
              title="2-Column Editorial Grid"
            >
              <Grid2X2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Sidebar Filters + Right Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Desktop Left Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-6 border-r border-[#E8E2D8]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
            <span className="font-sans text-xs uppercase tracking-widest font-bold text-[#18181B] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#9E4734]" />
              Filter Refinements
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[10px] font-sans uppercase tracking-widest text-[#9E4734] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                Reset
              </button>
            )}
          </div>

          {/* Gender Filter */}
          <div className="space-y-3">
            <h4 className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#18181B]">
              Department / Gender
            </h4>
            <div className="space-y-1.5">
              {genders.map((g) => (
                <label key={g.id} className="flex items-center gap-2.5 text-xs font-sans text-[#47464B] cursor-pointer hover:text-[#18181B]">
                  <input
                    type="radio"
                    name="gender"
                    checked={selectedGender === g.id}
                    onChange={() => setSelectedGender(g.id)}
                    className="accent-[#9E4734]"
                  />
                  <span>{g.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fiber / Material Filter */}
          <div className="space-y-3">
            <h4 className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#18181B]">
              Fiber &amp; Material
            </h4>
            <div className="space-y-1.5">
              {materials.map((m) => (
                <label key={m.id} className="flex items-center gap-2.5 text-xs font-sans text-[#47464B] cursor-pointer hover:text-[#18181B]">
                  <input
                    type="radio"
                    name="material"
                    checked={selectedMaterial === m.id}
                    onChange={() => setSelectedMaterial(m.id)}
                    className="accent-[#9E4734]"
                  />
                  <span>{m.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-3">
            <h4 className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#18181B]">
              Atelier Sizing
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSize('all')}
                className={`px-2.5 py-1 text-[10px] font-mono border cursor-pointer ${
                  selectedSize === 'all'
                    ? 'bg-[#18181B] text-white border-[#18181B]'
                    : 'bg-white text-[#77767B] border-[#E8E2D8] hover:border-[#18181B]'
                }`}
              >
                All Sizes
              </button>
              {allSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-2 py-1 text-[10px] font-mono border cursor-pointer ${
                    selectedSize === s
                      ? 'bg-[#18181B] text-white border-[#18181B]'
                      : 'bg-white text-[#77767B] border-[#E8E2D8] hover:border-[#18181B]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[11px] font-sans uppercase font-semibold text-[#18181B]">
              <span>Maximum Price</span>
              <span className="font-mono text-[#9E4734]">{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="200"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#9E4734] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#77767B]">
              <span>{formatPrice(200)}</span>
              <span>{formatPrice(1000)}</span>
            </div>
          </div>

          {/* Availability */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 text-xs font-sans text-[#18181B] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="accent-[#9E4734]"
              />
              <span className="font-medium">In-Stock Ateliers Only</span>
            </label>
          </div>
        </aside>

        {/* Right Product Grid */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-[#F5F3F0] border border-[#E8E2D8] p-8">
              <p className="font-serif text-2xl text-[#18181B]">No garments match your specified criteria.</p>
              <p className="font-sans text-xs text-[#77767B] max-w-md mx-auto">
                Try widening your price range, choosing a different fiber composition, or resetting your filter refinements.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-3 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest hover:bg-[#9E4734] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-4 sm:gap-6 gap-y-8 sm:gap-y-12 ${
                isCompactGrid
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-[#18181B]/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#FAF8F5] h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-4">
                <span className="font-serif text-xl text-[#18181B]">Refine Collection</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 text-[#18181B] hover:text-[#9E4734] cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#18181B] block">
                  Category
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`p-2 text-[10px] uppercase tracking-wider font-medium border text-left cursor-pointer ${
                        selectedCategory === c.id
                          ? 'bg-[#18181B] text-white border-[#18181B]'
                          : 'bg-white text-[#77767B] border-[#E8E2D8]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#18181B] block">
                  Department
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {genders.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGender(g.id)}
                      className={`p-2 text-[10px] uppercase tracking-wider font-medium border text-left cursor-pointer ${
                        selectedGender === g.id
                          ? 'bg-[#18181B] text-white border-[#18181B]'
                          : 'bg-white text-[#77767B] border-[#E8E2D8]'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="space-y-2">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#18181B] block">
                  Fiber
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {materials.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMaterial(m.id)}
                      className={`p-2 text-[10px] uppercase tracking-wider font-medium border text-left cursor-pointer ${
                        selectedMaterial === m.id
                          ? 'bg-[#18181B] text-white border-[#18181B]'
                          : 'bg-white text-[#77767B] border-[#E8E2D8]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-sans uppercase font-bold text-[#18181B]">
                  <span>Max Price</span>
                  <span className="font-mono text-[#9E4734]">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#9E4734]"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E2D8] flex gap-3">
              <button
                onClick={resetFilters}
                className="w-1/3 py-3 border border-[#18181B] text-[#18181B] font-sans text-xs uppercase tracking-widest font-semibold cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-2/3 py-3 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors cursor-pointer"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

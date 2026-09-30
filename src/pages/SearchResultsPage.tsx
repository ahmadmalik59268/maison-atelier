import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const { products } = useShop();

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchTerm(keyword);
    setSearchParams({ q: keyword });
  };

  const matchingProducts = useMemo(() => {
    const q = queryParam.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(q);
      const catMatch = p.category.toLowerCase().includes(q);
      const descMatch = p.description.toLowerCase().includes(q);
      const fabricMatch = p.fabric.toLowerCase().includes(q);
      const materialMatch = (p.material || '').toLowerCase().includes(q);
      const skuMatch = (p.sku || '').toLowerCase().includes(q);
      const originMatch = (p.origin || '').toLowerCase().includes(q);
      const badgeMatch = (p.badge || '').toLowerCase().includes(q);

      return (
        nameMatch ||
        catMatch ||
        descMatch ||
        fabricMatch ||
        materialMatch ||
        skuMatch ||
        originMatch ||
        badgeMatch
      );
    });
  }, [products, queryParam]);

  const popularKeywords = [
    'Camel Blazer',
    'Mongolian Cashmere',
    'Mulberry Silk',
    'French Flax',
    'Surí Alpaca',
    'Tuscan Leather',
    'Trousers',
    'Outerwear',
  ];

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Search Header Form */}
      <div className="max-w-3xl mx-auto mb-10 text-center space-y-4">
        <span className="text-[#9E4734] font-sans text-[10px] uppercase tracking-[0.2em] font-semibold">
          Atelier Archive Search
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#18181B] font-normal tracking-tight">
          Explore the Catalog
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#77767B] font-light">
          Query by garment name, fiber composition, Italian mill origin, or piece SKU.
        </p>

        <form onSubmit={handleSearchSubmit} className="relative mt-6 max-w-2xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search silhouettes, fibers, tailoring..."
            className="w-full pl-12 pr-12 py-4 bg-white border border-[#18181B] text-sm font-sans text-[#18181B] placeholder:text-[#77767B]/70 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#9E4734]"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#47464B]" />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSearchParams({});
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#77767B] hover:text-[#18181B]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Suggested Keywords */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[10px] font-sans uppercase tracking-wider">
          <span className="text-[#77767B] font-semibold">Suggested:</span>
          {popularKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => handleKeywordClick(kw)}
              className="px-2.5 py-1 bg-[#F5F3F0] hover:bg-[#18181B] hover:text-white border border-[#E8E2D8] transition-colors cursor-pointer"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="border-t border-b border-[#E8E2D8] py-4 mb-8 flex items-center justify-between text-xs font-sans">
        <span className="font-semibold text-[#18181B]">
          {queryParam ? (
            <>
              {matchingProducts.length} result{matchingProducts.length === 1 ? '' : 's'} for &ldquo;
              <span className="text-[#9E4734] font-bold">{queryParam}</span>&rdquo;
            </>
          ) : (
            <>Showing all {matchingProducts.length} cataloged pieces</>
          )}
        </span>

        {queryParam && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSearchParams({});
            }}
            className="text-[10px] uppercase tracking-wider text-[#77767B] hover:text-[#18181B] underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Results Grid */}
      {matchingProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#F5F3F0] border border-[#E8E2D8] p-8 max-w-2xl mx-auto">
          <p className="font-serif text-2xl text-[#18181B]">No matching silhouettes discovered.</p>
          <p className="font-sans text-xs text-[#77767B]">
            We could not find any garments matching &ldquo;{queryParam}&rdquo;. Please verify your spelling or browse our full collections.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest hover:bg-[#9E4734] transition-colors"
            >
              View Full Collection
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 gap-y-8 sm:gap-y-12">
          {matchingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, ArrowUpDown } from 'lucide-react';

interface CategoryPageProps {
  customType?: 'women' | 'men' | 'new-arrivals';
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ customType }) => {
  const { category: categorySlug } = useParams<{ category: string }>();
  const location = useLocation();
  const { products, categories, formatPrice } = useShop();

  const [sortBy, setSortBy] = useState<string>('curated');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');

  // Determine effective category or department
  const type = customType || (location.pathname.startsWith('/women') ? 'women' : location.pathname.startsWith('/men') ? 'men' : location.pathname.startsWith('/new-arrivals') ? 'new-arrivals' : categorySlug);

  const categoryMeta = useMemo(() => {
    if (type === 'women') {
      return {
        title: "Women's Collection",
        subtitle: 'Fall/Winter 2025 Release',
        description: 'Sculptural outerwear, relaxed pleated trousers, and fluid bias-cut silk dresses engineered with architectural grace.',
        banner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmIA_DcRJdUFwM0n4qRnlDxGQO6ucAaixL66nneK-1vXR1C-KNWpZD_25lMNIZsXMlLTcXsbheCjHPQiGmAZIWYe6KF4ytAKRlvpXA04xIhyzaX8batfi96jEtwRQT7TM-4MKRwcRQQ-wUD-9a-qK4o9h6O8ftI5k1l0IDJmXSPrHI9hgq_BwhsjcCSbpyduZ1i_nMcALroL-SbBWPi42aftpdNR3_b1r4AJLDM8gWyVsiS9Ip_zCL',
      };
    }
    if (type === 'men') {
      return {
        title: "Men's Sartorial",
        subtitle: 'Bespoke Tailoring & Heavy Knits',
        description: 'Double-faced cashmere coats, Vitale Barberis 120s virgin wool trousers, and unstructured raglan topcoats.',
        banner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkjscK0FCnZL9wjWokaA9vV9_nB3Q99XPmO_cCbEwvfq3MBiH8GcScwCxtQcvx1ulbtU9A4BhZ88VRBat_UaWW2Skp0KJQKZWunB5lnS2NSX7btMRbQu-43CO9yTfZtpluA2et-WFNRAYdfM7EzK9NBokgH4DzI8S7WXU24eqUyte4v7yYg1_1Yb82WbzprlpUiU1BVuWNptz9fKy9xIw0xgEUx2-7fsS18Oo4k-OwzstY-pRhcl9C',
      };
    }
    if (type === 'new-arrivals') {
      return {
        title: 'New Arrivals',
        subtitle: 'Edition 2025 Repertoire',
        description: 'Fresh from our Italian and Portuguese ateliers. Limited small-batch runs crafted from certified natural luxury fibers.',
        banner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPv0yus3cFdH-xx7I-qBEfshJBZykbnOm_s0C37sYgpz-LiQa-UwQVfSkwe6NE377jYu7URZlj3XRVTzDYxaWpWj5ARcrcOyymaI34vWx2SnT9ikCot1wMWOusim89LxWlOVNx5EYZI5xgSeYsSznuGdXsYv4M21HiXJEZgsyYUyX4tWkVjqq1pPqaIgsJQYta_g2uqinkd23wS-MfXThEcBdwbvwidHwsFtJBGehnvT0UwC0y3vfe',
      };
    }

    const matchedCat = categories.find((c) => c.slug === type || c.id === type);
    if (matchedCat) {
      return {
        title: matchedCat.name,
        subtitle: 'Atelier Archives',
        description: matchedCat.description,
        banner: matchedCat.image,
      };
    }

    return {
      title: `${type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Collection'} Works`,
      subtitle: 'Maison Atelier Repertoire',
      description: 'Refined craftsmanship and high-fashion minimalism for the discerning patron.',
      banner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPlYrQfbZcQEyypJXKNaWkpmaDtrIoj12GHVZNEOXJkfPcSSwQUo7qhHxIwWknuz_EjI5GQAgHkTghTJGRQcJ6XArjCzsHz9xjEbebyRbsruEu-bmaTvs6SlrhQZzBse84NqfMZgKuI6O2-9OclRyujeFWl_jkkdxtnqonK_gWvrEHGSj95y5M2qxNX6UeNocj1KesqX7W1Le49tMRN6Xq-Ir6OANAwUTNaht-2z9cMwRcwNjb2jAN',
    };
  }, [type, categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (type === 'women') {
        if (p.gender !== 'women' && p.gender !== 'unisex') return false;
      } else if (type === 'men') {
        if (p.gender !== 'men' && p.gender !== 'unisex') return false;
      } else if (type === 'new-arrivals') {
        if (!p.new_arrival && p.badge !== 'New' && p.badge !== 'New Season') return false;
      } else if (type) {
        if (p.category !== type) return false;
      }

      if (selectedMaterial !== 'all' && p.materialCategory !== selectedMaterial) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, type, selectedMaterial, sortBy]);

  const materials = [
    { id: 'all', label: 'All Fibers' },
    { id: 'wool', label: 'Virgin Wool' },
    { id: 'cashmere', label: 'Cashmere' },
    { id: 'silk', label: 'Mulberry Silk' },
    { id: 'linen', label: 'French Flax' },
    { id: 'alpaca', label: 'Surí Alpaca' },
    { id: 'leather', label: 'Tuscan Leather' },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Category Hero Banner */}
      <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[440px] bg-[#18181B] overflow-hidden flex items-end">
        <img
          src={categoryMeta.banner}
          alt={categoryMeta.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/95 via-[#18181B]/50 to-transparent" />

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 pb-10 sm:pb-14 max-w-7xl mx-auto text-white">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-widest text-[#FAF8F5]/80 hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Collections</span>
          </Link>
          <span className="text-[#9E4734] font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] block">
            {categoryMeta.subtitle}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mt-1">
            {categoryMeta.title}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#FAF8F5]/85 max-w-xl font-light mt-2 leading-relaxed">
            {categoryMeta.description}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16 max-w-7xl mx-auto">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E2D8]">
          {/* Fiber filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto text-[10px] font-sans uppercase tracking-wider">
            <span className="text-[#77767B] font-semibold shrink-0">Fiber:</span>
            {materials.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMaterial(m.id)}
                className={`px-3 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  selectedMaterial === m.id
                    ? 'bg-[#18181B] text-white border-[#18181B] font-semibold'
                    : 'bg-white text-[#77767B] border-[#E8E2D8] hover:border-[#18181B] hover:text-[#18181B]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-[#77767B] ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-sans text-[#18181B] font-medium focus:outline-none cursor-pointer border-b border-[#E8E2D8] pb-1"
            >
              <option value="curated">Curated Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Patron Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[#F5F3F0] border border-[#E8E2D8] p-8">
            <p className="font-serif text-2xl text-[#18181B]">No garments found in this category.</p>
            <p className="font-sans text-xs text-[#77767B]">
              Try adjusting your fiber filter or explore our complete catalog.
            </p>
            <Link
              to="/shop"
              className="inline-block mt-4 px-6 py-3 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest hover:bg-[#9E4734] transition-colors"
            >
              Browse Full Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 gap-y-8 sm:gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

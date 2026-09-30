import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, wishlistCount, moveToCartFromWishlist, toggleWishlist, formatPrice } = useShop();

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#E8E2D8] pb-6 sm:pb-8 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#9E4734] font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]">
            Curated Patron Dossier
          </span>
          <span className="text-[#77767B] font-sans text-[10px] sm:text-[11px] uppercase tracking-wider">
            — {wishlistCount} Saved Works
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#18181B] tracking-tight font-normal">
          Personal Archive &amp; Wishlist
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#77767B] mt-2 max-w-xl font-light leading-relaxed">
          Your preserved seasonal curation. Move pieces directly into your Atelier bag or consult salon availability for a private champagne fitting.
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="py-20 sm:py-28 text-center space-y-4 bg-[#F5F3F0] border border-[#E8E2D8] p-8 max-w-2xl mx-auto">
          <div className="w-12 h-12 bg-white flex items-center justify-center mx-auto text-[#77767B] border border-[#E8E2D8]">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl text-[#18181B]">Your Archive is Currently Unpopulated</h2>
          <p className="font-sans text-xs text-[#77767B] max-w-md mx-auto">
            Explore our collections and click the heart icon on any silhouette to reserve it in your personal dossier.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/new-arrivals"
              className="px-6 py-3.5 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors"
            >
              Explore New Arrivals
            </Link>
            <Link
              to="/lookbook"
              className="px-6 py-3.5 bg-white border border-[#18181B] text-[#18181B] font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#FAF8F5] transition-colors"
            >
              View Runway Lookbook
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 gap-y-8 sm:gap-y-12">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="flex flex-col justify-between bg-[#FAF8F5]">
              <ProductCard product={product} />

              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => moveToCartFromWishlist(product)}
                  className="flex-1 py-2 bg-[#18181B] text-white text-[10px] font-sans uppercase tracking-wider font-semibold hover:bg-[#9E4734] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Move to Bag
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-2 border border-[#E8E2D8] hover:border-[#18181B] text-[#77767B] hover:text-[#9E4734] transition-colors cursor-pointer"
                  title="Remove from archive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

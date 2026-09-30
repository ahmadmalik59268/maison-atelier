import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
}) => {
  const navigate = useNavigate();
  const {
    wishlistProducts,
    wishlistCount,
    toggleWishlist,
    moveToCartFromWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    formatPrice,
  } = useShop();

  const open = propIsOpen !== undefined ? propIsOpen : isWishlistOpen;
  const handleClose = propOnClose || (() => setIsWishlistOpen(false));

  if (!open) return null;

  const handleProductClick = (product: Product) => {
    handleClose();
    navigate(`/product/${product.id}`);
  };

  const handleViewWishlistPage = () => {
    handleClose();
    navigate('/wishlist');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-[#18181B]/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E8E2D8] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F5F3F0]">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#77767B] font-semibold block">
                Personal Archive
              </span>
              <h2 className="font-serif text-2xl text-[#18181B] font-medium">
                Saved Works ({wishlistCount})
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-[#18181B] hover:text-[#9E4734] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <p className="font-serif text-xl text-[#18181B]">Your archive is empty.</p>
                <p className="font-sans text-xs text-[#77767B] max-w-xs mx-auto">
                  Save pieces to follow fabric batch availability or schedule a salon fitting.
                </p>
                <button
                  onClick={() => {
                    handleClose();
                    navigate('/shop');
                  }}
                  className="px-6 py-3 bg-[#18181B] text-white font-sans text-[10px] uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors cursor-pointer"
                >
                  Discover Works
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 pb-6 border-b border-[#E8E2D8] last:border-0"
                >
                  <div
                    onClick={() => handleProductClick(product)}
                    className="w-20 h-26 bg-[#F2EFEB] shrink-0 overflow-hidden cursor-pointer border border-[#E8E2D8]"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => handleProductClick(product)}
                          className="font-sans text-xs sm:text-sm font-semibold text-[#18181B] hover:text-[#9E4734] cursor-pointer leading-tight"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-[#77767B] hover:text-[#9E4734] transition-colors cursor-pointer"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-sans text-[11px] text-[#77767B] mt-0.5">
                        {product.fabric}
                      </p>
                      <p className="font-sans text-xs font-semibold text-[#18181B] mt-1 tabular-nums font-mono">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => moveToCartFromWishlist(product)}
                        className="w-full py-2 bg-[#18181B] text-white font-sans text-[10px] uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        Move to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {wishlistProducts.length > 0 && (
            <div className="p-4 bg-[#F5F3F0] border-t border-[#E8E2D8]">
              <button
                onClick={handleViewWishlistPage}
                className="w-full py-3 bg-white border border-[#18181B] text-[#18181B] font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#FAF8F5] transition-colors text-center cursor-pointer"
              >
                View Full Wishlist Page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

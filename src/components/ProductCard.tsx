import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, Plus, Eye } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
}) => {
  const navigate = useNavigate();
  const {
    formatPrice,
    isInWishlist,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors && product.colors.length > 0 ? product.colors[0] : { name: 'Standard', hex: '#18181B' }
  );
  const [showQuickSizes, setShowQuickSizes] = useState<boolean>(false);

  const isWishlisted = isInWishlist(product.id);
  const isOutOfStock = product.stock_quantity <= 0;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      setQuickViewProduct(product);
    }
  };

  return (
    <article className="group flex flex-col bg-[#FAF8F5] relative">
      {/* 3:4 Image Frame with Hover Actions */}
      <div 
        className="relative w-full aspect-[3/4] bg-[#F2EFEB] overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-[#FAF8F5]/80 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-[#18181B] text-white px-3 py-1 font-sans text-[10px] uppercase font-bold tracking-widest">
              Atelier Archive • Sold Out
            </span>
          </div>
        )}

        {/* Badges Top Left */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#FAF8F5] text-[#18181B] font-sans text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider shadow-sm border border-[#E8E2D8]">
              {product.badge}
            </span>
          )}
          {product.secondaryBadge && (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#18181B] text-white font-sans text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider shadow-sm">
              {product.secondaryBadge}
            </span>
          )}
        </div>

        {/* Action icons Top Right: Quick View & Wishlist */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isWishlisted 
                ? 'bg-[#9E4734] text-white opacity-100 shadow-sm' 
                : 'bg-[#FAF8F5]/90 backdrop-blur-md text-[#18181B] hover:text-[#9E4734] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 border border-[#E8E2D8]'
            }`}
            title={isWishlisted ? "Saved to archive" : "Save to wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-white stroke-white' : ''}`} />
          </button>

          <button
            onClick={handleOpenQuickView}
            aria-label="Quick preview piece"
            className="w-7 h-7 sm:w-8 sm:h-8 hidden sm:flex items-center justify-center bg-[#FAF8F5]/90 backdrop-blur-md text-[#18181B] hover:text-[#9E4734] opacity-0 group-hover:opacity-100 transition-all duration-200 border border-[#E8E2D8] cursor-pointer"
            title="Quick view"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Desktop Quick Add Hover Overlay */}
        {!isOutOfStock && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="hidden sm:block absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#18181B]/80 via-[#18181B]/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20"
          >
            {showQuickSizes ? (
              <div className="bg-[#FAF8F5] p-2 space-y-2 border border-[#E8E2D8]">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-[#18181B]">
                  <span>Select Size</span>
                  <button 
                    onClick={() => setShowQuickSizes(false)}
                    className="text-[#77767B] hover:text-[#18181B] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        addToCart(product, size, selectedColor, 1);
                        setShowQuickSizes(false);
                      }}
                      className="flex-1 min-w-[38px] py-1.5 text-[10px] font-medium border border-[#E8E2D8] hover:border-[#18181B] hover:bg-[#18181B] hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      {size.replace(' FR', '').replace(' IT', '').replace(' EU', '')}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowQuickSizes(true)}
                className="w-full py-2.5 bg-[#FAF8F5] text-[#18181B] font-sans text-[10px] font-semibold uppercase tracking-widest hover:bg-[#9E4734] hover:text-white transition-colors shadow-sm cursor-pointer"
              >
                Quick Add • Size Select
              </button>
            )}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div 
        className="pt-3 sm:pt-4 flex flex-col flex-grow justify-between space-y-1.5 sm:space-y-2 cursor-pointer"
        onClick={handleCardClick}
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#77767B] font-semibold truncate max-w-[130px]">
              {product.subtitle}
            </span>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-[#18181B]">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#9E4734] fill-[#9E4734]" />
              <span className="font-mono">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="font-sans text-xs sm:text-base font-semibold text-[#18181B] group-hover:text-[#9E4734] transition-colors mt-0.5 line-clamp-1 leading-snug">
            {product.name}
          </h3>

          <p className="font-sans text-[11px] sm:text-xs text-[#77767B] mt-0.5 truncate">
            {product.fabric || product.material}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-xs sm:text-base font-semibold text-[#18181B] tabular-nums">
              {formatPrice(product.price)}
            </span>
            {(product.compare_at_price || product.originalPrice) && (
              <span className="font-sans text-[10px] sm:text-xs text-[#77767B] line-through tabular-nums">
                {formatPrice(product.compare_at_price || product.originalPrice!)}
              </span>
            )}
          </div>

          {/* Colorway Swatches */}
          <div 
            className="flex items-center gap-1 sm:gap-1.5" 
            title="Available Colorways"
            onClick={(e) => e.stopPropagation()}
          >
            {product.colors.map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color.hex }}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-all cursor-pointer ${
                    color.border ? 'border border-[#C8C5CB]' : ''
                  } ${
                    isSelected ? 'ring-1 ring-offset-1 ring-[#18181B]' : 'hover:opacity-80'
                  }`}
                  title={color.name}
                  aria-label={color.name}
                />
              );
            })}
          </div>
        </div>

        {/* Mobile-only Quick Add Button */}
        {!isOutOfStock && (
          <div className="sm:hidden pt-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, product.sizes[0], selectedColor, 1);
              }}
              className="w-full py-1.5 bg-[#F5F3F0] border border-[#E8E2D8] hover:bg-[#18181B] hover:text-white text-[9px] uppercase tracking-wider font-semibold text-[#18181B] flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              Quick Bag
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

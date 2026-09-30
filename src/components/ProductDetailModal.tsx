import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Star, Heart, Ruler, Check, Calendar, MessageSquarePlus, ShieldCheck, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, ProductColor } from '../types';

interface ProductDetailModalProps {
  product?: Product | null;
  isOpen?: boolean;
  onClose?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product: propProduct,
  isOpen: propIsOpen,
  onClose: propOnClose,
}) => {
  const navigate = useNavigate();
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
  } = useShop();

  const product = propProduct !== undefined ? propProduct : quickViewProduct;
  const isOpen = propIsOpen !== undefined ? propIsOpen : quickViewProduct !== null;
  const handleClose = propOnClose || (() => setQuickViewProduct(null));

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product?.colors[0] || { name: '', hex: '' }
  );
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'details' | 'sustainability' | 'reviews' | 'care'>('details');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : { name: 'Standard', hex: '#18181B' });
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : '');
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const isWishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    handleClose();
  };

  const handleGoToFullPage = () => {
    handleClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Scrim */}
      <div
        className="fixed inset-0 bg-[#18181B]/75 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="flex min-h-full items-center justify-center p-2 sm:p-6 lg:p-10 relative">
        <div className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E8E2D8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-[#FAF8F5]/90 border border-[#E8E2D8] text-[#18181B] hover:text-[#9E4734] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto md:overflow-hidden">
            {/* Left Image Gallery View (col-span-5) */}
            <div className="md:col-span-5 bg-[#F2EFEB] relative flex flex-col justify-between p-4 sm:p-6 border-b md:border-b-0 md:border-r border-[#E8E2D8]">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border border-[#E8E2D8]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                  {product.badge && (
                    <span className="px-2 py-0.5 bg-[#FAF8F5] text-[#18181B] font-sans text-[8px] font-semibold uppercase tracking-wider border border-[#E8E2D8]">
                      {product.badge}
                    </span>
                  )}
                  {product.secondaryBadge && (
                    <span className="px-2 py-0.5 bg-[#18181B] text-white font-sans text-[8px] font-semibold uppercase tracking-wider">
                      {product.secondaryBadge}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E2D8] flex items-center justify-between text-xs font-sans text-[#77767B]">
                <span className="font-mono text-[10px]">{product.traceabilityId}</span>
                <span className="font-semibold text-[#18181B]">{product.origin}</span>
              </div>
            </div>

            {/* Right Product Details View (col-span-7) */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-4">
                {/* Category & Title */}
                <div>
                  <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#9E4734] font-semibold block mb-1">
                    {product.subtitle}
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl text-[#18181B] font-normal leading-snug">
                    {product.name}
                  </h2>
                </div>

                {/* Rating & Price */}
                <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans text-xl font-bold text-[#18181B] tabular-nums font-mono">
                      {formatPrice(product.price)}
                    </span>
                    {(product.compare_at_price || product.originalPrice) && (
                      <span className="font-sans text-xs text-[#77767B] line-through tabular-nums font-mono">
                        {formatPrice(product.compare_at_price || product.originalPrice!)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs font-sans">
                    <Star className="w-3.5 h-3.5 fill-[#9E4734] text-[#9E4734]" />
                    <span className="font-bold">{product.rating.toFixed(1)}</span>
                    <span className="text-[#77767B]">({product.reviewsCount} critiques)</span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="font-sans text-xs text-[#47464B] leading-relaxed font-light line-clamp-3">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="font-semibold uppercase text-[#18181B]">Colorway:</span>
                    <span className="text-[#77767B]">{selectedColor.name}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        style={{ backgroundColor: c.hex }}
                        className={`w-6 h-6 border transition-all cursor-pointer ${
                          selectedColor.name === c.name ? 'ring-2 ring-offset-1 ring-[#18181B]' : 'hover:opacity-80'
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="font-semibold uppercase text-[#18181B]">Size:</span>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-[10px] text-[#9E4734] uppercase tracking-wider underline cursor-pointer"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-mono border uppercase tracking-wider cursor-pointer ${
                          selectedSize === s
                            ? 'bg-[#18181B] text-white border-[#18181B]'
                            : 'bg-white text-[#18181B] border-[#E8E2D8]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-4 border-t border-[#E8E2D8]">
                <div className="flex gap-2">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3.5 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 border transition-colors cursor-pointer ${
                      isWishlisted ? 'bg-[#9E4734] text-white border-[#9E4734]' : 'bg-white border-[#E8E2D8] text-[#18181B]'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white stroke-white' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleGoToFullPage}
                  className="w-full py-2.5 bg-[#F5F3F0] border border-[#E8E2D8] text-[#18181B] font-sans text-[10px] uppercase tracking-widest font-semibold hover:bg-[#18181B] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Complete Product Details &amp; Dossier</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  MapPin,
  Check,
  RotateCcw,
  MessageSquarePlus,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductColor, Review } from '../types';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    products,
    getProductById,
    getProductBySlug,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addReview,
    showToast,
  } = useShop();

  const product = getProductById(id || '') || getProductBySlug(id || '');

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  // Accordions
  const [openSection, setOpenSection] = useState<'details' | 'materials' | 'shipping' | 'salon' | null>('details');

  // Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSizePurchased, setReviewSizePurchased] = useState('');
  const [reviewFitFeedback, setReviewFitFeedback] = useState<'True to Size' | 'Slightly Large' | 'Slightly Small'>('True to Size');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : { name: 'Standard', hex: '#18181B' });
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : '');
      setActiveImageIndex(0);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-8 bg-[#FAF8F5] text-center">
        <h2 className="font-serif text-3xl text-[#18181B] mb-2">Piece Not Found in Archives</h2>
        <p className="font-sans text-xs text-[#77767B] max-w-md mb-6">
          The requested silhouette may have been archived or is temporarily unavailable in our current seasonal release.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest hover:bg-[#9E4734] transition-colors"
        >
          Explore Active Collections
        </Link>
      </div>
    );
  }

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const isWishlisted = isInWishlist(product.id);
  const isOutOfStock = product.stock_quantity <= 0;
  const maxQty = Math.max(1, product.stock_quantity);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      showToast('Please select your preferred color and size.');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      showToast('Please select your preferred color and size.');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const toggleSection = (section: 'details' | 'materials' | 'shipping' | 'salon') => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle || !reviewComment) {
      showToast('Please provide a critique headline and detailed evaluation.');
      return;
    }
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor || 'Atelier Patron',
      location: reviewLocation || 'Paris, France',
      rating: reviewRating,
      date: 'Just Now',
      title: reviewTitle,
      comment: reviewComment,
      verified: true,
      sizePurchased: reviewSizePurchased || selectedSize || '38 FR',
      fitFeedback: reviewFitFeedback,
    };
    addReview(product.id, newRev);
    setShowReviewForm(false);
    setReviewTitle('');
    setReviewComment('');
  };

  // Related products ("Complete the Look")
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category !== product.category || p.gender === product.gender))
    .slice(0, 4);

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-[#77767B] mb-6">
          <Link to="/" className="hover:text-[#18181B]">Maison</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#18181B]">Collections</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-[#18181B]">{product.category}</Link>
          <span>/</span>
          <span className="text-[#18181B] font-semibold truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Top Product Section: Left Image Gallery (col-span-7), Right Editorial Purchasing Panel (col-span-5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pb-16 border-b border-[#E8E2D8]">
          {/* Left Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail Column */}
            {galleryImages.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 bg-[#F2EFEB] overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#18181B] ring-1 ring-[#18181B]'
                        : 'border-[#E8E2D8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover object-center" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-[3/4] bg-[#F2EFEB] overflow-hidden border border-[#E8E2D8]">
              <img
                src={galleryImages[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <span className="px-3 py-1 bg-[#FAF8F5] text-[#18181B] font-sans text-[10px] font-semibold uppercase tracking-widest shadow-sm border border-[#E8E2D8]">
                    {product.badge}
                  </span>
                )}
                {product.secondaryBadge && (
                  <span className="px-3 py-1 bg-[#18181B] text-white font-sans text-[10px] font-semibold uppercase tracking-widest shadow-sm">
                    {product.secondaryBadge}
                  </span>
                )}
              </div>

              {/* Wishlist Button on Image */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center border transition-colors z-10 cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#9E4734] text-white border-[#9E4734]'
                    : 'bg-[#FAF8F5]/90 backdrop-blur-md text-[#18181B] border-[#E8E2D8] hover:text-[#9E4734]'
                }`}
                title={isWishlisted ? "Saved to personal archive" : "Save to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white stroke-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right Product Buy Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Provenance & Traceability Header */}
              <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3 text-xs">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#9E4734] font-semibold">
                  {product.subtitle}
                </span>
                <span className="font-mono text-[10px] text-[#77767B]">
                  ID: {product.traceabilityId}
                </span>
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="font-serif text-2xl sm:text-4xl text-[#18181B] font-normal leading-tight tracking-tight">
                  {product.name}
                </h1>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-sans text-xl sm:text-2xl font-bold text-[#18181B] tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    {(product.compare_at_price || product.originalPrice) && (
                      <span className="font-sans text-sm text-[#77767B] line-through tabular-nums">
                        {formatPrice(product.compare_at_price || product.originalPrice!)}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 text-xs font-sans text-[#18181B]">
                    <Star className="w-4 h-4 fill-[#9E4734] text-[#9E4734]" />
                    <span className="font-bold">{product.rating.toFixed(1)}</span>
                    <span className="text-[#77767B]">({product.reviewsCount} critiques)</span>
                  </div>
                </div>
              </div>

              {/* Fabric & Origin Badge */}
              <div className="p-3 bg-[#F5F3F0] border border-[#E8E2D8] space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#77767B] font-sans">Composition:</span>
                  <span className="font-medium text-[#18181B]">{product.fabric}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#77767B] font-sans">Artisan Origin:</span>
                  <span className="font-medium text-[#18181B]">{product.origin}</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-[#47464B] leading-relaxed font-light">
                {product.description}
              </p>

              {/* Colorway Selection */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-semibold uppercase tracking-wider text-[#18181B]">Colorway:</span>
                  <span className="text-[#77767B]">{selectedColor?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor?.name === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        style={{ backgroundColor: c.hex }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-all cursor-pointer ${
                          c.border ? 'border border-[#C8C5CB]' : ''
                        } ${
                          isSelected ? 'ring-2 ring-offset-2 ring-[#18181B]' : 'hover:opacity-80'
                        }`}
                        title={c.name}
                        aria-label={c.name}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Sizing Selection & Size Guide */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-semibold uppercase tracking-wider text-[#18181B]">
                    Atelier Size:
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[11px] font-sans uppercase tracking-widest text-[#9E4734] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-xs font-mono font-medium border transition-colors uppercase tracking-wider cursor-pointer ${
                          isSelected
                            ? 'bg-[#18181B] text-white border-[#18181B]'
                            : 'bg-white text-[#18181B] border-[#E8E2D8] hover:border-[#18181B]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>

                {/* Size Guide Table Overlay */}
                {showSizeGuide && (
                  <div className="p-4 bg-[#FAF8F5] border border-[#18181B] space-y-2 text-xs font-sans mt-2 animate-in fade-in duration-150">
                    <div className="flex justify-between items-center font-bold text-[#18181B]">
                      <span>Proportional Conversion Chart</span>
                      <button onClick={() => setShowSizeGuide(false)} className="text-[#77767B] hover:text-[#18181B]">✕</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px] font-mono border-collapse">
                        <thead>
                          <tr className="border-b border-[#E8E2D8] text-left">
                            <th className="py-1">FR</th>
                            <th className="py-1">IT</th>
                            <th className="py-1">US</th>
                            <th className="py-1">Bust (cm)</th>
                            <th className="py-1">Waist (cm)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E2D8]/50">
                          <tr><td className="py-1 font-bold">34</td><td>38</td><td>2</td><td>82-85</td><td>62-65</td></tr>
                          <tr><td className="py-1 font-bold">36</td><td>40</td><td>4</td><td>86-89</td><td>66-69</td></tr>
                          <tr><td className="py-1 font-bold">38</td><td>42</td><td>6</td><td>90-93</td><td>70-73</td></tr>
                          <tr><td className="py-1 font-bold">40</td><td>44</td><td>8</td><td>94-97</td><td>74-77</td></tr>
                          <tr><td className="py-1 font-bold">42</td><td>46</td><td>10</td><td>98-102</td><td>78-82</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity & Stock */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center border border-[#E8E2D8] bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-xs hover:bg-[#F5F3F0] transition-colors cursor-pointer"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-mono text-xs font-bold text-[#18181B]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                    className="px-3 py-2 text-xs hover:bg-[#F5F3F0] transition-colors cursor-pointer"
                    disabled={quantity >= maxQty}
                  >
                    +
                  </button>
                </div>

                <span className="text-[11px] font-sans font-medium text-[#77767B]">
                  {product.stock_quantity > 0 ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                      {product.stock_quantity} pieces remaining in atelier
                    </span>
                  ) : (
                    <span className="text-[#9E4734] font-bold">Archived • Sold Out</span>
                  )}
                </span>
              </div>

              {/* CTAs: Add to Cart & Buy Now */}
              <div className="space-y-2.5 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="w-full py-4 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Atelier Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="w-full py-3.5 bg-transparent border border-[#18181B] text-[#18181B] font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#FAF8F5] hover:border-[#9E4734] hover:text-[#9E4734] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Instant Bespoke Checkout
                </button>
              </div>

              {/* Atelier Fitting Salon Banner */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#9E4734] shrink-0" />
                  <span className="text-[#47464B] font-sans text-[11px]">
                    Complimentary fitting available in Paris, New York, Tokyo, Milan &amp; London.
                  </span>
                </div>
                <Link
                  to="/boutiques"
                  className="text-[10px] uppercase tracking-widest text-[#9E4734] font-bold underline shrink-0 hover:text-[#18181B]"
                >
                  Book Salon
                </Link>
              </div>
            </div>

            {/* Accordion Expandables */}
            <div className="divide-y divide-[#E8E2D8] border-t border-b border-[#E8E2D8] mt-6">
              {/* 1. Tailoring & Details */}
              <div className="py-3">
                <button
                  onClick={() => toggleSection('details')}
                  className="w-full flex items-center justify-between text-xs font-sans font-semibold uppercase tracking-wider text-[#18181B] text-left cursor-pointer"
                >
                  <span>Tailoring &amp; Architectural Cut</span>
                  {openSection === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'details' && (
                  <ul className="mt-3 space-y-1.5 text-xs text-[#77767B] font-sans pl-4 list-disc animate-in fade-in duration-150">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 2. Materials & Care */}
              <div className="py-3">
                <button
                  onClick={() => toggleSection('materials')}
                  className="w-full flex items-center justify-between text-xs font-sans font-semibold uppercase tracking-wider text-[#18181B] text-left cursor-pointer"
                >
                  <span>Materials, Traceability &amp; Care</span>
                  {openSection === 'materials' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'materials' && (
                  <div className="mt-3 space-y-2 text-xs text-[#77767B] font-sans animate-in fade-in duration-150">
                    <p><strong>Primary Fiber:</strong> {product.fabric}</p>
                    <p><strong>Mill Provenance:</strong> {product.origin}</p>
                    {Array.isArray(product.care) ? (
                      <ul className="space-y-1 pl-4 list-disc pt-1">
                        {product.care.map((c: string, idx: number) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="pt-1">{product.care}</p>
                    )}
                  </div>
                )}
              </div>

              {/* 3. Shipping & Returns */}
              <div className="py-3">
                <button
                  onClick={() => toggleSection('shipping')}
                  className="w-full flex items-center justify-between text-xs font-sans font-semibold uppercase tracking-wider text-[#18181B] text-left cursor-pointer"
                >
                  <span>Complimentary Air Delivery &amp; Returns</span>
                  {openSection === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSection === 'shipping' && (
                  <div className="mt-3 space-y-2 text-xs text-[#77767B] font-sans animate-in fade-in duration-150">
                    <p>
                      Complimentary priority carbon-neutral air delivery via DHL Express on all orders above $250.
                    </p>
                    <p>
                      Complimentary return shipping and garment exchanges within 30 days of courier receipt in original cedar encasement.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="py-16 border-b border-[#E8E2D8]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[#9E4734] font-sans text-[10px] uppercase tracking-[0.2em] font-semibold">
                Patron Dossier
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#18181B]">
                Critiques &amp; Fitting Notes
              </h2>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-5 py-2.5 bg-[#18181B] text-white font-sans text-[10px] uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Log Patron Critique</span>
            </button>
          </div>

          {/* Add Review Form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="mb-10 p-6 bg-[#F5F3F0] border border-[#18181B] space-y-4 animate-in fade-in duration-200 max-w-2xl">
              <h3 className="font-serif text-lg text-[#18181B]">Submit Fitting Evaluation</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-1">
                    Patron Name / Title
                  </label>
                  <input
                    type="text"
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="e.g. Lady Vivienne G."
                    className="w-full p-2 bg-white border border-[#E8E2D8] text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-1">
                    Location / Salon
                  </label>
                  <input
                    type="text"
                    value={reviewLocation}
                    onChange={(e) => setReviewLocation(e.target.value)}
                    placeholder="e.g. Milan, Italy"
                    className="w-full p-2 bg-white border border-[#E8E2D8] text-xs"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-1">
                    Rating (1-5)
                  </label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-[#E8E2D8] text-xs"
                  >
                    <option value="5">5 ★★★★★ (Exceptional)</option>
                    <option value="4">4 ★★★★☆ (Exemplary)</option>
                    <option value="3">3 ★★★☆☆ (Satisfactory)</option>
                    <option value="2">2 ★★☆☆☆ (Imperfect)</option>
                    <option value="1">1 ★☆☆☆☆ (Sub-standard)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-1">
                    Size Fitted
                  </label>
                  <input
                    type="text"
                    value={reviewSizePurchased}
                    onChange={(e) => setReviewSizePurchased(e.target.value)}
                    placeholder="e.g. 38 FR"
                    className="w-full p-2 bg-white border border-[#E8E2D8] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-1">
                    Fit Precision
                  </label>
                  <select
                    value={reviewFitFeedback}
                    onChange={(e) => setReviewFitFeedback(e.target.value as any)}
                    className="w-full p-2 bg-white border border-[#E8E2D8] text-xs"
                  >
                    <option value="True to Size">True to Size</option>
                    <option value="Slightly Large">Slightly Large</option>
                    <option value="Slightly Small">Slightly Small</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-1">
                  Critique Headline
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Exquisite shoulder construction and drape"
                  className="w-full p-2 bg-white border border-[#E8E2D8] text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-1">
                  Evaluation Details
                </label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Detail the fabric weight, drape under natural light, hand-feel, and tailoring finish..."
                  className="w-full p-2 bg-white border border-[#E8E2D8] text-xs"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 border border-[#E8E2D8] text-xs uppercase tracking-wider font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#18181B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#9E4734]"
                >
                  Save Critique
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          {(!product.reviews || product.reviews.length === 0) ? (
            <p className="text-xs font-sans text-[#77767B] italic">
              No public critiques yet logged for this specific silhouette. Be the first patron to leave a fitting review.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-6 bg-[#F5F3F0] border border-[#E8E2D8] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#9E4734]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#9E4734]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-[#77767B]">{rev.date}</span>
                  </div>

                  <h4 className="font-serif text-base text-[#18181B] font-medium">{rev.title}</h4>
                  <p className="font-sans text-xs text-[#47464B] leading-relaxed">{rev.comment}</p>

                  <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-[#77767B] border-t border-[#E8E2D8]">
                    <span>{rev.author} • {rev.location}</span>
                    <span className="text-[#9E4734] font-semibold">{rev.fitFeedback} ({rev.sizePurchased})</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Complete The Look / Related Products */}
        <section className="py-16">
          <div className="mb-8">
            <span className="text-[#9E4734] font-sans text-[10px] uppercase tracking-[0.2em] font-semibold">
              Curated Coordination
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#18181B] font-normal mt-1">
              Complete the Look
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#77767B] mt-1 font-light">
              Pieces selected by our Paris atelier stylists to harmonize in silhouette, proportion, and fiber texture.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

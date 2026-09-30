import React, { useState } from 'react';
import { X, Star, Check } from 'lucide-react';
import { Product, Review } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSubmitReview: (productId: string, review: Review) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  product,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [sizePurchased, setSizePurchased] = useState(product?.sizes[0] || '38 FR');
  const [fitFeedback, setFitFeedback] = useState<'True to Size' | 'Slightly Large' | 'Slightly Small'>('True to Size');

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: 'rev-' + Date.now(),
      author: author || 'Atelier Patron',
      location: location || 'Paris',
      rating,
      date: 'Today',
      title: title || 'Exceptional craftsmanship',
      comment,
      verified: true,
      sizePurchased,
      fitFeedback,
    };
    onSubmitReview(product.id, newReview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#18181B]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 lg:p-10 relative">
        <div className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E8E2D8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="px-5 py-4 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F5F3F0]">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#9E4734] font-semibold block">
                Garment Review
              </span>
              <h3 className="font-serif text-lg text-[#18181B] font-medium truncate max-w-xs">
                {product.name}
              </h3>
            </div>
            <button onClick={onClose} className="p-1 text-[#18181B] hover:text-[#9E4734]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
            {/* Star Rating */}
            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                Your Assessment
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 text-[#9E4734]"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        (hoverRating || rating) >= star ? 'fill-[#9E4734] stroke-[#9E4734]' : 'stroke-[#C8C5CB]'
                      }`}
                    />
                  </button>
                ))}
                <span className="font-mono text-xs font-semibold ml-2 text-[#18181B]">
                  {rating} / 5 Stars
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laurent M."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8E2D8] focus:border-[#18181B] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Milan, Italy"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8E2D8] focus:border-[#18181B] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                  Size Purchased
                </label>
                <select
                  value={sizePurchased}
                  onChange={(e) => setSizePurchased(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E8E2D8] focus:border-[#18181B] outline-none"
                >
                  {product.sizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                  Fit Evaluation
                </label>
                <select
                  value={fitFeedback}
                  onChange={(e) => setFitFeedback(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-[#E8E2D8] focus:border-[#18181B] outline-none"
                >
                  <option value="True to Size">True to Size</option>
                  <option value="Slightly Large">Slightly Large</option>
                  <option value="Slightly Small">Slightly Small</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                Headline
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Impeccable wool drape and finish"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E8E2D8] focus:border-[#18181B] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                Artisanal Experience &amp; Notes
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe fabric weight, seam execution, fit, or styling..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E8E2D8] focus:border-[#18181B] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#18181B] text-white font-sans text-[10px] uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors"
            >
              Publish Atelier Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

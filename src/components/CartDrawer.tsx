import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Gift, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
}) => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    cartSubtotalUsd,
    updateCartQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    formatPrice,
    showToast,
  } = useShop();

  const open = propIsOpen !== undefined ? propIsOpen : isCartOpen;
  const handleClose = propOnClose || (() => setIsCartOpen(false));

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!open) return null;

  const rawSubtotalUsd = cartSubtotalUsd;
  const discountAmountUsd = (rawSubtotalUsd * discountPercent) / 100;
  const subtotalUsd = Math.max(0, rawSubtotalUsd - discountAmountUsd);

  const freeShippingThresholdUsd = 250;
  const remainingForFreeShippingUsd = Math.max(0, freeShippingThresholdUsd - subtotalUsd);
  const shippingCostUsd = subtotalUsd >= freeShippingThresholdUsd || subtotalUsd === 0 ? 0 : 35;
  const totalUsd = subtotalUsd + shippingCostUsd;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoCode.trim().toUpperCase();
    if (clean === 'GUILD15' || clean.startsWith('GUILD-')) {
      setDiscountPercent(15);
      setPromoSuccess('15% Atelier Guild Privilege Applied');
      showToast('15% Private Guild discount applied.');
    } else if (clean === 'ATELIER10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Seasonal Patron Reduction Applied');
      showToast('10% seasonal discount applied.');
    } else {
      setPromoError('Invalid privilege voucher. Try GUILD15');
    }
  };

  const handleProceedCheckout = () => {
    handleClose();
    navigate('/checkout');
  };

  const handleViewCartPage = () => {
    handleClose();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-[#18181B]/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E8E2D8] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F5F3F0]">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#77767B] font-semibold block">
                Current Curation
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-[#18181B] font-medium">
                Atelier Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-[#18181B] hover:text-[#9E4734] transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Meter */}
          <div className="bg-[#EAE8E5] px-5 sm:px-6 py-3 border-b border-[#E4E2DF]">
            {remainingForFreeShippingUsd > 0 ? (
              <div className="space-y-1.5">
                <p className="font-sans text-xs text-[#18181B]">
                  Add <strong className="font-semibold text-[#9E4734]">{formatPrice(remainingForFreeShippingUsd)}</strong> more for complimentary worldwide courier dispatch.
                </p>
                <div className="w-full h-1 bg-[#D9D4CC]">
                  <div
                    className="h-full bg-[#9E4734] transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotalUsd / freeShippingThresholdUsd) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-sans font-semibold text-emerald-800">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>Complimentary Priority Air Delivery Unlocked</span>
              </div>
            )}
          </div>

          {/* Bag Items Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <span className="font-serif text-lg text-[#18181B]">Your Atelier bag is empty</span>
                <p className="font-sans text-xs text-[#77767B] max-w-xs font-light">
                  Archival silhouettes and ready-to-wear pieces will be cataloged here.
                </p>
                <button
                  onClick={() => {
                    handleClose();
                    navigate('/shop');
                  }}
                  className="mt-2 px-6 py-2.5 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest hover:bg-[#9E4734] transition-colors cursor-pointer"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#E8E2D8]">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-18 h-24 sm:w-20 sm:h-26 object-cover bg-[#F2EFEB] shrink-0 border border-[#E8E2D8]"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-sm sm:text-base font-medium text-[#18181B] line-clamp-1">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#77767B] hover:text-[#9E4734] transition-colors p-1 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="font-sans text-[11px] text-[#77767B]">{item.fabric}</p>

                        <div className="flex items-center gap-2 text-xs font-sans text-[#47464B]">
                          <span>{item.selectedSize}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            {item.selectedColor.name}
                            <span
                              className="w-2.5 h-2.5 inline-block border border-[#C8C5CB]"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Unit Total */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#E8E2D8] bg-white">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="p-1 text-xs hover:bg-[#F5F3F0] transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="p-1 text-xs hover:bg-[#F5F3F0] transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs sm:text-sm font-bold text-[#18181B]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#F5F3F0] border-t border-[#E8E2D8] space-y-4">
              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Privilege Voucher (e.g. GUILD15)"
                  className="flex-1 px-3 py-2 bg-white border border-[#E8E2D8] text-xs font-mono uppercase focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#18181B] text-white text-[10px] font-sans font-semibold uppercase tracking-wider hover:bg-[#9E4734] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {promoSuccess && <p className="text-[10px] font-sans text-emerald-700 font-semibold">{promoSuccess}</p>}
              {promoError && <p className="text-[10px] font-sans text-[#9E4734]">{promoError}</p>}

              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-[#77767B]">
                  <span>Subtotal:</span>
                  <span className="font-mono text-[#18181B]">{formatPrice(rawSubtotalUsd)}</span>
                </div>
                {discountAmountUsd > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Guild Discount ({discountPercent}%):</span>
                    <span className="font-mono">- {formatPrice(discountAmountUsd)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#77767B]">
                  <span>Courier Shipping:</span>
                  <span className="font-mono text-[#18181B]">
                    {shippingCostUsd === 0 ? <strong className="text-emerald-700 uppercase">Complimentary</strong> : formatPrice(shippingCostUsd)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#18181B] text-base font-bold text-[#18181B]">
                  <span className="font-serif">Total:</span>
                  <span className="font-mono text-lg text-[#9E4734]">{formatPrice(totalUsd)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3.5 bg-[#18181B] text-[#FAF8F5] font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleViewCartPage}
                  className="w-full py-2.5 bg-white border border-[#18181B] text-[#18181B] font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#FAF8F5] transition-colors text-center cursor-pointer"
                >
                  View Full Cart Details
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[9px] font-sans uppercase tracking-widest text-[#77767B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9E4734]" />
                <span>30-Day Bespoke Exchange &amp; Return Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

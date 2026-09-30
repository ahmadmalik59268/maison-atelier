import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Gift, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartCount, cartSubtotalUsd, updateCartQuantity, removeFromCart, clearCart, formatPrice, showToast } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);

  const rawSubtotal = cartSubtotalUsd;
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const discountedSubtotal = Math.max(0, rawSubtotal - discountAmount);

  const freeShippingThreshold = 250;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - discountedSubtotal);
  const shippingCost = discountedSubtotal >= freeShippingThreshold || discountedSubtotal === 0 ? 0 : 35;
  const giftCost = isGiftWrapped ? 15 : 0;
  const finalTotal = discountedSubtotal + shippingCost + giftCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoCode.trim().toUpperCase();
    if (clean === 'GUILD15' || clean.startsWith('GUILD-')) {
      setDiscountPercent(15);
      setPromoSuccess('Guild Member Privilege: 15% reduction applied.');
      showToast('15% Private Guild discount applied.');
    } else if (clean === 'ATELIER10') {
      setDiscountPercent(10);
      setPromoSuccess('Seasonal Patron: 10% reduction applied.');
      showToast('10% seasonal discount applied.');
    } else if (clean === 'VIP20' || clean === 'MAISON20') {
      setDiscountPercent(20);
      setPromoSuccess('Haute Circle VIP: 20% reduction applied.');
      showToast('20% VIP discount applied.');
    } else {
      setPromoError('Invalid salon promotion code.');
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#E8E2D8] pb-6 sm:pb-8 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#9E4734] font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]">
            Bespoke Order Bag
          </span>
          <span className="text-[#77767B] font-sans text-[10px] sm:text-[11px] uppercase tracking-wider">
            — {cartCount} Silhouettes Curation
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#18181B] tracking-tight font-normal">
          Your Shopping Bag
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="py-20 sm:py-28 text-center space-y-4 bg-[#F5F3F0] border border-[#E8E2D8] p-8 max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl text-[#18181B]">Your Atelier Bag is Empty</h2>
          <p className="font-sans text-xs text-[#77767B] max-w-md mx-auto">
            You have not selected any garments for this session. Explore our curated collections to build your wardrobe.
          </p>
          <div className="pt-3 flex justify-center gap-3">
            <Link
              to="/shop"
              className="px-8 py-4 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors"
            >
              Explore All Collections
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Shipping Progress Meter */}
            <div className="p-4 bg-[#F5F3F0] border border-[#E8E2D8] space-y-2">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="font-semibold text-[#18181B] flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#9E4734]" />
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-emerald-800 font-bold">Complimentary Worldwide Priority Air Shipping Unlocked</span>
                  ) : (
                    <span>
                      Add <strong className="text-[#9E4734]">{formatPrice(remainingForFreeShipping)}</strong> more to qualify for Complimentary Global Air Shipping
                    </span>
                  )}
                </span>
                <span className="font-mono text-[11px] text-[#77767B]">
                  {Math.min(100, Math.round((discountedSubtotal / freeShippingThreshold) * 100))}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#E8E2D8] overflow-hidden">
                <div
                  className="h-full bg-[#9E4734] transition-all duration-300"
                  style={{ width: `${Math.min(100, (discountedSubtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>

            {/* Items Table/List */}
            <div className="divide-y divide-[#E8E2D8] border-t border-b border-[#E8E2D8]">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Left: Image & Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-26 sm:w-24 sm:h-32 object-cover object-center bg-[#F2EFEB] border border-[#E8E2D8] shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-sans tracking-wider text-[#77767B]">
                        {item.fabric}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg text-[#18181B] font-medium">
                        {item.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-[#47464B]">
                        <span>Size: <strong>{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          Color: <strong>{item.selectedColor.name}</strong>
                          <span
                            className="w-2.5 h-2.5 inline-block border border-[#C8C5CB]"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                        </span>
                      </div>
                      <p className="font-mono text-xs font-bold text-[#18181B] pt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* Right: Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="flex items-center border border-[#E8E2D8] bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="px-2.5 py-1.5 text-xs hover:bg-[#F5F3F0] transition-colors cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 font-mono text-xs font-bold text-[#18181B]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="px-2.5 py-1.5 text-xs hover:bg-[#F5F3F0] transition-colors cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono text-sm font-bold text-[#18181B] tabular-nums min-w-[70px] text-right">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-[#77767B] hover:text-[#9E4734] transition-colors cursor-pointer"
                      title="Remove piece"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions: Clear & Continue Shopping */}
            <div className="flex justify-between items-center pt-2">
              <Link
                to="/shop"
                className="text-xs uppercase font-sans tracking-widest font-semibold text-[#18181B] hover:text-[#9E4734] flex items-center gap-1.5"
              >
                ← Continue Browsing Collections
              </Link>
              <button
                onClick={clearCart}
                className="text-xs uppercase font-sans tracking-widest text-[#77767B] hover:text-[#9E4734] cursor-pointer"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#F5F3F0] border border-[#E8E2D8] space-y-5">
              <h2 className="font-serif text-xl text-[#18181B] border-b border-[#E8E2D8] pb-3">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#18181B]">
                  Privilege Voucher / Promo
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. GUILD15 or ATELIER10"
                    className="flex-1 px-3 py-2 bg-white border border-[#E8E2D8] text-xs font-mono uppercase focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#18181B] text-white text-xs uppercase font-sans font-semibold tracking-wider hover:bg-[#9E4734] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && <p className="text-[10px] font-sans text-emerald-700 font-semibold">{promoSuccess}</p>}
                {promoError && <p className="text-[10px] font-sans text-[#9E4734]">{promoError}</p>}
              </form>

              {/* Gift Wrapping Option */}
              <div className="pt-2 border-t border-[#E8E2D8]">
                <label className="flex items-center justify-between text-xs font-sans text-[#18181B] cursor-pointer">
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#9E4734]" />
                    Cedar Chest &amp; Handwritten Gift Card
                  </span>
                  <input
                    type="checkbox"
                    checked={isGiftWrapped}
                    onChange={(e) => setIsGiftWrapped(e.target.checked)}
                    className="accent-[#9E4734]"
                  />
                </label>
                {isGiftWrapped && (
                  <span className="text-[10px] font-mono text-[#77767B] block mt-1 pl-5">
                    + {formatPrice(15)} artisanal box fee
                  </span>
                )}
              </div>

              {/* Price Calculation Lines */}
              <div className="space-y-2 pt-3 border-t border-[#E8E2D8] text-xs font-sans">
                <div className="flex justify-between text-[#77767B]">
                  <span>Subtotal:</span>
                  <span className="font-mono text-[#18181B]">{formatPrice(rawSubtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Guild Discount ({discountPercent}%):</span>
                    <span className="font-mono">- {formatPrice(discountAmount)}</span>
                  </div>
                )}

                {isGiftWrapped && (
                  <div className="flex justify-between text-[#77767B]">
                    <span>Cedar Gift Packaging:</span>
                    <span className="font-mono text-[#18181B]">{formatPrice(15)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#77767B]">
                  <span>Global Express Air Courier:</span>
                  <span className="font-mono text-[#18181B]">
                    {shippingCost === 0 ? <strong className="text-emerald-700 uppercase">Complimentary</strong> : formatPrice(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-[#18181B] text-base font-bold text-[#18181B]">
                  <span className="font-serif">Estimated Total:</span>
                  <span className="font-mono text-xl text-[#9E4734]">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Bespoke Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-sans uppercase tracking-wider text-[#77767B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9E4734]" />
                <span>SSL Encrypted • Carbon Neutral Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { X, Check, Lock, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { CartItem, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/atelierData';

interface CheckoutModalProps {
  isOpen: boolean;
  currency: CurrencyCode;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  currency,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    firstName: 'Constance',
    lastName: 'Moreau',
    email: 'constance.moreau@atelier-guild.com',
    phone: '+33 6 12 34 56 78',
    address: '18 Place Vendôme',
    city: 'Paris',
    postalCode: '75001',
    country: 'France',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '11/28',
    cardCvc: '•••',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    id: string;
    total: number;
    itemsCount: number;
  } | null>(null);

  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.USD;
  const subtotalUsd = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingUsd = subtotalUsd >= 250 ? 0 : 35;
  const totalUsd = subtotalUsd + shippingUsd;
  const totalConverted = Math.round(totalUsd * curr.rate);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = 'MA-2025-' + Math.floor(1000 + Math.random() * 9000);
      setIsProcessing(false);
      setConfirmedOrder({
        id: orderId,
        total: totalConverted,
        itemsCount: items.reduce((s, i) => s + i.quantity, 0),
      });
      onOrderSuccess(orderId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#18181B]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 lg:p-10 relative">
        <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#E8E2D8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F5F3F0]">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#9E4734]" />
              <span className="font-serif text-lg text-[#18181B] font-medium uppercase tracking-tight">
                Secure Bespoke Checkout
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#18181B] hover:text-[#9E4734]"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {confirmedOrder ? (
            /* Post-Order State */
            <div className="p-6 sm:p-12 text-center space-y-5 sm:space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#18181B] text-white flex items-center justify-center mx-auto shadow-md">
                <Check className="w-6 h-6 sm:w-7 sm:h-7 text-[#FAF8F5]" />
              </div>

              <div className="space-y-2">
                <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#9E4734] font-semibold block">
                  Curation Confirmed
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#18181B] font-normal">
                  Thank You, {formData.firstName}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#77767B] max-w-md mx-auto">
                  Your order has been transmitted to our master ateliers in Florence and Porto.
                </p>
              </div>

              <div className="p-5 sm:p-6 bg-[#F5F3F0] border border-[#E8E2D8] max-w-md mx-auto text-left space-y-3 font-sans text-xs">
                <div className="flex justify-between border-b border-[#E8E2D8] pb-2">
                  <span className="text-[#77767B]">Courier Tracking Reference:</span>
                  <span className="font-mono font-bold text-[#18181B]">{confirmedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E2D8] pb-2">
                  <span className="text-[#77767B]">Dispatch Destination:</span>
                  <span className="text-[#18181B] font-medium">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E2D8] pb-2">
                  <span className="text-[#77767B]">Courier Status:</span>
                  <span className="text-[#9E4734] font-semibold">Preparing In Florence Atelier</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-semibold">
                  <span>Total Settled:</span>
                  <span className="font-mono">{curr.symbol}{confirmedOrder.total}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-8 py-3.5 bg-[#18181B] text-white font-sans text-[11px] uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors cursor-pointer"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="p-5 sm:p-8 space-y-5 sm:space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Delivery info */}
              <div>
                <h4 className="font-serif text-base sm:text-lg text-[#18181B] font-medium mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#9E4734]" />
                  Courier Destination &amp; Client File
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white border border-[#E8E2D8] focus:border-[#18181B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white border border-[#E8E2D8] focus:border-[#18181B] outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                      Email for Shipment Tracking
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white border border-[#E8E2D8] focus:border-[#18181B] outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white border border-[#E8E2D8] focus:border-[#18181B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white border border-[#E8E2D8] focus:border-[#18181B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white border border-[#E8E2D8] focus:border-[#18181B] outline-none"
                    >
                      <option value="France">France</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Italy">Italy</option>
                      <option value="Japan">Japan</option>
                      <option value="Switzerland">Switzerland</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="border-t border-[#E8E2D8] pt-4">
                <h4 className="font-serif text-base sm:text-lg text-[#18181B] font-medium mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#9E4734]" />
                  Secure Payment Selection
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-4 text-xs font-semibold uppercase tracking-wider border flex items-center justify-center gap-2 ${
                      paymentMethod === 'card'
                        ? 'border-[#18181B] bg-[#18181B] text-white'
                        : 'border-[#E8E2D8] bg-white text-[#18181B]'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`py-2.5 px-4 text-xs font-semibold uppercase tracking-wider border flex items-center justify-center gap-2 ${
                      paymentMethod === 'applepay'
                        ? 'border-[#18181B] bg-[#18181B] text-white'
                        : 'border-[#E8E2D8] bg-white text-[#18181B]'
                    }`}
                  >
                    Apple Pay
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-3 bg-[#F5F3F0] border border-[#E8E2D8] space-y-2 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 bg-white border border-[#E8E2D8] font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          name="cardExp"
                          value={formData.cardExp}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1.5 bg-white border border-[#E8E2D8] font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-[#18181B] mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1.5 bg-white border border-[#E8E2D8] font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Final Summary & Submit */}
              <div className="border-t border-[#E8E2D8] pt-4 space-y-3">
                <div className="flex justify-between text-sm font-semibold text-[#18181B]">
                  <span>Total Amount Due</span>
                  <span className="font-mono text-base">{curr.symbol}{totalConverted}</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#18181B] text-white font-sans text-[11px] font-semibold uppercase tracking-widest hover:bg-[#9E4734] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Authorizing Sovereign Bank Transaction...</span>
                  ) : (
                    <span>Authorize Payment &amp; Dispatch Order • {curr.symbol}{totalConverted}</span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#77767B] uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9E4734]" />
                  <span>256-Bit TLS Encrypted • Zero Counterfeit Guaranteed</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

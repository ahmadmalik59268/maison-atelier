import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ShieldCheck, Truck, CreditCard, Banknote, CheckCircle, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotalUsd, user, placeOrder, formatPrice, showToast } = useShop();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Lady Constance Moreau',
    email: user?.email || 'constance.moreau@atelier-guild.com',
    phone: user?.phone || '+33 6 12 34 56 78',
    street: user?.addresses?.[0]?.street || '18 Place Vendôme',
    city: user?.addresses?.[0]?.city || 'Paris',
    state: user?.addresses?.[0]?.state || 'Île-de-France',
    country: user?.addresses?.[0]?.country || 'France',
    postalCode: user?.addresses?.[0]?.postalCode || '75001',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '11/28',
    cardCvc: '•••',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'applepay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const rawSubtotal = cartSubtotalUsd;
  const shippingFee = rawSubtotal >= 250 ? 0 : 35;
  const total = rawSubtotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 bg-[#FAF8F5] text-center">
        <h2 className="font-serif text-3xl text-[#18181B] mb-2">Your Bag is Empty</h2>
        <p className="font-sans text-xs text-[#77767B] max-w-md mb-6">
          Please add garments to your bag before accessing the bespoke checkout terminal.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest hover:bg-[#9E4734] transition-colors"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.street || !formData.city || !formData.postalCode) {
      showToast('Please fill all mandatory courier address coordinates.');
      return;
    }

    setIsProcessing(true);

    try {
      const createdOrder = await placeOrder({
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          id: `addr-${Date.now()}`,
          fullName: formData.fullName,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        paymentMethod,
        items: cart,
        subtotal: rawSubtotal,
        shipping: shippingFee,
        total,
      });

      setIsProcessing(false);
      navigate(`/order-success?id=${createdOrder.id}`);
    } catch {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Back Link & Header */}
      <div className="mb-8 border-b border-[#E8E2D8] pb-6">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-[#77767B] hover:text-[#18181B] mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Bag</span>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#9E4734] font-sans text-[10px] uppercase tracking-[0.2em] font-semibold block">
              Encrypted Checkout Protocol
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#18181B] font-normal tracking-tight mt-1">
              Bespoke Order Authorization
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#77767B] bg-[#F5F3F0] px-3 py-1.5 border border-[#E8E2D8]">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span>256-Bit SSL Secured</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left Forms (col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Patron Information */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl text-[#18181B] border-b border-[#E8E2D8] pb-2 flex items-center justify-between">
              <span>1. Patron Information</span>
              <span className="text-xs font-sans font-normal text-[#77767B]">Personal dossier</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#18181B] mb-1">
                  Full Name / Title *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] text-xs font-sans text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#18181B] mb-1">
                  Email Address (for telemetry) *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] text-xs font-sans text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#18181B] mb-1">
                  Telephone (for courier arrival notification) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] text-xs font-sans text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Courier Shipping Address */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl text-[#18181B] border-b border-[#E8E2D8] pb-2 flex items-center justify-between">
              <span>2. Delivery Address</span>
              <span className="text-xs font-sans font-normal text-[#77767B]">White-glove courier</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#18181B] mb-1">
                  Street Address &amp; Residence / Suite *
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 18 Place Vendôme, Apt 4B"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] text-xs font-sans text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#18181B] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] text-xs font-sans text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#18181B] mb-1">
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] text-xs font-sans text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#18181B] mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] text-xs font-sans text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#18181B] mb-1">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] text-xs font-sans text-[#18181B] focus:border-[#18181B] focus:outline-none"
                >
                  <option value="France">France</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Italy">Italy</option>
                  <option value="Japan">Japan</option>
                  <option value="Germany">Germany</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl text-[#18181B] border-b border-[#E8E2D8] pb-2 flex items-center justify-between">
              <span>3. Payment Settlement</span>
              <span className="text-xs font-sans font-normal text-[#77767B]">Encrypted portal</span>
            </h2>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-[#18181B] bg-white ring-1 ring-[#18181B]'
                    : 'border-[#E8E2D8] bg-[#F5F3F0] text-[#77767B]'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#18181B]" />
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#18181B]">
                  Credit Card
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('applepay')}
                className={`p-3.5 border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                  paymentMethod === 'applepay'
                    ? 'border-[#18181B] bg-white ring-1 ring-[#18181B]'
                    : 'border-[#E8E2D8] bg-[#F5F3F0] text-[#77767B]'
                }`}
              >
                <span className="font-bold text-sm"> Pay</span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#18181B]">
                  Apple Pay
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-[#18181B] bg-white ring-1 ring-[#18181B]'
                    : 'border-[#E8E2D8] bg-[#F5F3F0] text-[#77767B]'
                }`}
              >
                <Banknote className="w-4 h-4 text-[#18181B]" />
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#18181B]">
                  Cash on Delivery
                </span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 bg-white border border-[#E8E2D8] space-y-3 animate-in fade-in duration-150">
                <div>
                  <label className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#18181B] mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D8] text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#18181B] mb-1">
                      Expiration (MM/YY)
                    </label>
                    <input
                      type="text"
                      name="cardExp"
                      value={formData.cardExp}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D8] text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#18181B] mb-1">
                      Security Code (CVC)
                    </label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D8] text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 bg-[#F5F3F0] border border-[#E8E2D8] text-xs font-sans text-[#47464B]">
                <p>
                  <strong>Concierge Cash Settlement:</strong> Payment will be received by our authorized white-glove DHL courier upon personal physical handoff and garment inspection.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Order Summary (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-[#F5F3F0] border border-[#E8E2D8] space-y-5 sticky top-28">
            <h2 className="font-serif text-xl text-[#18181B] border-b border-[#E8E2D8] pb-3">
              Order Review ({cart.length} works)
            </h2>

            {/* Line Items List */}
            <div className="divide-y divide-[#E8E2D8] max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-16 object-cover bg-[#F2EFEB] border border-[#E8E2D8] shrink-0"
                    />
                    <div>
                      <h4 className="font-serif font-medium text-[#18181B] line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-[#77767B] font-sans">
                        {item.selectedSize} • {item.selectedColor.name} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#18181B] tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary calculations */}
            <div className="space-y-2 pt-3 border-t border-[#E8E2D8] text-xs font-sans">
              <div className="flex justify-between text-[#77767B]">
                <span>Garment Subtotal:</span>
                <span className="font-mono text-[#18181B]">{formatPrice(rawSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#77767B]">
                <span>Air Express Shipping:</span>
                <span className="font-mono text-[#18181B]">
                  {shippingFee === 0 ? <span className="text-emerald-700 font-bold uppercase">Complimentary</span> : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-[#18181B] text-base font-bold text-[#18181B]">
                <span className="font-serif">Authorized Total:</span>
                <span className="font-mono text-xl text-[#9E4734]">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Authorizing Atelier Ticket...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Bespoke Order • {formatPrice(total)}</span>
                </>
              )}
            </button>

            <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-sans uppercase tracking-wider text-[#77767B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9E4734]" />
              <span>Full Atelier Authenticity &amp; Return Guarantee</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

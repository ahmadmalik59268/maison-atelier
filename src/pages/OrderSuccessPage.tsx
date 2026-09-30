import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, Printer, MapPin, Sparkles, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const { orders, formatPrice } = useShop();

  const order = orders.find(
    (o) => o.id === orderId || o.trackingNumber === orderId
  ) || orders[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Banner */}
        <div className="bg-white border border-[#E5E0D8] p-8 sm:p-12 shadow-sm text-center mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A1A1A]" />
          <div className="w-16 h-16 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
          </div>

          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8C8275] mb-2">
            Acquisition Confirmed
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light tracking-tight mb-4">
            Thank You for Your Patronage
          </h1>
          <p className="text-sm text-[#5A534A] max-w-md mx-auto leading-relaxed mb-6 font-light">
            Your garment is now being prepared for white-glove dispatch. A confirmation and digital dossier have been transmitted to your email.
          </p>

          <div className="inline-flex items-center gap-3 bg-[#FAF8F5] border border-[#E5E0D8] px-5 py-2.5 text-xs font-mono text-[#1A1A1A]">
            <span className="text-[#8C8275]">Order Dossier:</span>
            <span className="font-semibold">{order?.id || orderId || 'MA-2025-0891'}</span>
          </div>
        </div>

        {order && (
          <div className="bg-white border border-[#E5E0D8] p-8 sm:p-10 shadow-sm space-y-8 mb-8">
            {/* Tracking Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-[#E5E0D8] gap-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275]">
                  Status & Delivery
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-serif font-medium text-[#1A1A1A] capitalize">
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275]">
                  Estimated Dispatch
                </p>
                <p className="text-sm font-mono text-[#1A1A1A] mt-1">
                  {order.estimatedDelivery || '2 - 3 Business Days'}
                </p>
              </div>
            </div>

            {/* Courier Steps */}
            <div className="py-4">
              <div className="grid grid-cols-3 gap-2 text-center relative">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center mb-2">
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#1A1A1A] font-semibold">Atelier Pack</span>
                  <span className="text-[9px] text-[#8C8275]">Complete</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#1A1A1A] text-[#1A1A1A] flex items-center justify-center mb-2">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#1A1A1A] font-semibold">Air Courier</span>
                  <span className="text-[9px] text-[#8C8275]">In Transit</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] text-[#8C8275] flex items-center justify-center mb-2">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#8C8275]">Hand Delivery</span>
                  <span className="text-[9px] text-[#8C8275]">Pending</span>
                </div>
              </div>
            </div>

            {/* Items Ordered */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#1A1A1A] pb-3 border-b border-[#E5E0D8]">
                Manifest Summary ({order.items.length} {order.items.length === 1 ? 'Item' : 'Items'})
              </h2>
              <div className="divide-y divide-[#E5E0D8]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-4 flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover border border-[#E5E0D8]"
                    />
                    <div className="flex-1">
                      <p className="font-serif text-sm text-[#1A1A1A]">{item.name}</p>
                      <p className="text-[11px] text-[#8C8275] font-mono mt-0.5">
                        Size: {item.selectedSize} | Color: {item.selectedColor.name} | Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-mono text-xs text-[#1A1A1A] font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Financials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E5E0D8] text-xs">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] mb-1">
                  Delivery Destination
                </p>
                <div className="text-[#3A3530] font-light leading-relaxed">
                  <p className="font-medium text-[#1A1A1A]">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
              <div className="bg-[#FAF8F5] p-4 border border-[#E5E0D8] space-y-2 font-mono">
                <div className="flex justify-between text-[#5A534A]">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#5A534A]">
                  <span>Air Courier</span>
                  <span>{order.shipping === 0 ? 'COMPLIMENTARY' : formatPrice(order.shipping)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Privilege Courtesy</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-semibold text-[#1A1A1A] pt-2 border-t border-[#E5E0D8]">
                  <span>Grand Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] hover:bg-black transition-colors"
          >
            Review in Client Dossier <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#FAF8F5] transition-colors"
          >
            Continue Exploring
          </Link>
        </div>
      </div>
    </div>
  );
};

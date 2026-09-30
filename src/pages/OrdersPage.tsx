import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, Truck, CheckCircle2, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrdersPage: React.FC = () => {
  const { orders, formatPrice, currentUser } = useShop();

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8C8275] mb-2">
            Client Acquisition Record
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light">
            My Orders & Shipments
          </h1>
          <p className="text-xs text-[#5A534A] mt-2 font-light">
            Review detailed manifests, tracking statuses, and concierge dispatch timelines for all atelier acquisitions.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-[#E5E0D8] p-12 text-center shadow-sm">
            <Package className="w-12 h-12 mx-auto text-[#8C8275] stroke-1 mb-4" />
            <h2 className="font-serif text-xl text-[#1A1A1A] font-light mb-2">
              No Prior Orders Found
            </h2>
            <p className="text-xs text-[#5A534A] max-w-sm mx-auto mb-8 font-light">
              You haven't acquired any Maison Atelier garments yet. Discover our curated collections.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-[#1A1A1A] text-white px-8 py-3 text-xs font-mono uppercase tracking-[0.2em] hover:bg-black transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#E5E0D8] shadow-sm hover:border-[#1A1A1A]/40 transition-colors"
              >
                {/* Header Bar */}
                <div className="p-5 sm:p-6 bg-[#FAF8F5]/60 border-b border-[#E5E0D8] flex flex-wrap justify-between items-center gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] block">
                        Order Dossier
                      </span>
                      <span className="font-mono font-bold text-[#1A1A1A]">{order.id}</span>
                    </div>
                    <div className="hidden sm:block border-l border-[#E5E0D8] pl-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] block">
                        Date Placed
                      </span>
                      <span className="font-mono text-[#5A534A]">{order.date}</span>
                    </div>
                    <div className="hidden md:block border-l border-[#E5E0D8] pl-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] block">
                        Air Waybill
                      </span>
                      <span className="font-mono text-[#1A1A1A]">{order.trackingNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest bg-white border border-[#E5E0D8] text-[#1A1A1A] font-medium">
                      {order.status}
                    </span>
                    <span className="font-mono text-sm font-semibold text-[#1A1A1A]">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-5 sm:p-6 divide-y divide-[#E5E0D8]/60">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-20 object-cover border border-[#E5E0D8] shrink-0"
                        />
                        <div>
                          <p className="font-serif text-sm sm:text-base text-[#1A1A1A]">{item.name}</p>
                          <p className="text-[11px] font-mono text-[#8C8275] mt-1">
                            Size: {item.selectedSize} | Color: {item.selectedColor.name} | Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="text-right font-mono text-xs text-[#1A1A1A] font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="p-4 sm:p-5 bg-white border-t border-[#E5E0D8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <p className="text-xs text-[#8C8275] font-light">
                    Destination: {order.shippingAddress.city}, {order.shippingAddress.country}
                  </p>
                  <Link
                    to={`/order/${order.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#1A1A1A] hover:underline"
                  >
                    View Full Dossier & Live Tracking <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

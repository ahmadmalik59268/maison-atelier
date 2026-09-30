import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle2, Clock, MapPin, Printer } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders, formatPrice } = useShop();

  const order = orders.find((o) => o.id === id || o.trackingNumber === id) || orders[0];

  if (!order) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-24 px-4 text-center">
        <h1 className="font-serif text-2xl text-[#1A1A1A] mb-4">Dossier Not Found</h1>
        <Link to="/orders" className="text-xs font-mono uppercase tracking-widest underline">
          Return to Orders
        </Link>
      </div>
    );
  }

  const steps = [
    { title: 'Dossier Initialized', date: `${order.date} 09:14 CET`, done: true },
    { title: 'Tailoring & White-Glove Inspection', date: `${order.date} 14:30 CET`, done: true },
    { title: 'Sealed & Handed to Global Air Express', date: 'In Transit', done: order.status !== 'pending' },
    { title: 'Customs Clearance & Hub Reception', date: 'Air Transit', done: order.status === 'shipped' || order.status === 'delivered' },
    { title: 'White-Glove Private Courier Delivery', date: 'Estimated 2-3 Days', done: order.status === 'delivered' },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation back */}
        <div className="flex justify-between items-center">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#5A534A] hover:text-[#1A1A1A]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to My Orders
          </Link>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#5A534A] hover:text-[#1A1A1A] border border-[#E5E0D8] px-3 py-1.5 bg-white"
          >
            <Printer className="w-3.5 h-3.5" /> Print Dossier
          </button>
        </div>

        {/* Top summary card */}
        <div className="bg-white border border-[#E5E0D8] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-[#E5E0D8] gap-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C8275]">
                Order Dossier
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-light mt-1">
                {order.id}
              </h1>
              <p className="text-xs text-[#8C8275] font-mono mt-0.5">
                Placed on {order.date} • Air Courier: {order.trackingNumber}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest bg-[#FAF8F5] border border-[#1A1A1A] text-[#1A1A1A] font-medium mb-1">
                Status: {order.status}
              </span>
              <p className="text-xs font-mono text-[#8C8275]">
                Total: <span className="text-[#1A1A1A] font-semibold">{formatPrice(order.total)}</span>
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="py-8">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#1A1A1A] mb-6">
              Dispatch & Transit Dossier
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E0D8]">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                      step.done ? 'border-[#1A1A1A] bg-[#1A1A1A]' : 'border-[#C4BDB3]'
                    }`}
                  >
                    {step.done && <CheckCircle2 className="w-3 h-3 text-white stroke-[2.5]" />}
                  </div>
                  <div>
                    <p className={`text-xs font-serif ${step.done ? 'text-[#1A1A1A] font-medium' : 'text-[#8C8275]'}`}>
                      {step.title}
                    </p>
                    <p className="text-[10px] font-mono text-[#8C8275] mt-0.5">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Manifest Table */}
          <div className="pt-6 border-t border-[#E5E0D8]">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#1A1A1A] mb-4">
              Garment Manifest
            </h3>
            <div className="divide-y divide-[#E5E0D8]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover border border-[#E5E0D8]"
                    />
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="font-serif text-sm sm:text-base text-[#1A1A1A] hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="text-[11px] font-mono text-[#8C8275] mt-1">
                        Size: {item.selectedSize} | Color: {item.selectedColor.name} | Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-mono text-xs font-semibold text-[#1A1A1A]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Financials & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E5E0D8] text-xs">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] mb-2">
                Shipping Destination
              </p>
              <div className="text-[#3A3530] leading-relaxed">
                <p className="font-semibold text-sm text-[#1A1A1A]">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                {order.shippingAddress.phone && (
                  <p className="font-mono text-[11px] text-[#8C8275] mt-1">Tel: {order.shippingAddress.phone}</p>
                )}
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-4 border border-[#E5E0D8] font-mono space-y-2">
              <div className="flex justify-between text-[#5A534A]">
                <span>Manifest Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#5A534A]">
                <span>Air Dispatch</span>
                <span>{order.shipping === 0 ? 'COMPLIMENTARY' : formatPrice(order.shipping)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Privilege Courtesy</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-semibold text-[#1A1A1A] pt-2 border-t border-[#E5E0D8]">
                <span>Total Settled</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

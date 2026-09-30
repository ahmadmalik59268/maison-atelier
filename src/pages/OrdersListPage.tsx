import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, Search, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrdersListPage: React.FC = () => {
  const { orders, formatPrice } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchCustomer = o.shippingAddress.fullName.toLowerCase().includes(q);
      const matchCity = o.shippingAddress.city.toLowerCase().includes(q);
      return matchId || matchCustomer || matchCity;
    }
    return true;
  });

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#E8E2D8] pb-6 sm:pb-8 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#9E4734] font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]">
            Patron Courier Tracking
          </span>
          <span className="text-[#77767B] font-sans text-[10px] sm:text-[11px] uppercase tracking-wider">
            — {filteredOrders.length} Orders in Record
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#18181B] tracking-tight font-normal">
          My Order Dossiers
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#77767B] mt-2 max-w-xl font-light leading-relaxed">
          Monitor your commissioned garments from master shearing and basting in Florence through priority international air transport.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E2D8]">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order ID (e.g. MA-2025-8831) or city..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8E2D8] text-xs font-sans text-[#18181B] focus:outline-none focus:border-[#18181B]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77767B]" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-sans text-[#77767B] uppercase tracking-wider font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E8E2D8] text-xs font-sans text-[#18181B] focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="In Atelier Production">In Atelier Production</option>
            <option value="Hand Finishing">Hand Finishing</option>
            <option value="Courier Transit">Courier Transit</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#F5F3F0] border border-[#E8E2D8] p-8 max-w-xl mx-auto">
          <Package className="w-10 h-10 text-[#77767B] mx-auto" />
          <h2 className="font-serif text-xl text-[#18181B]">No Orders Found</h2>
          <p className="font-sans text-xs text-[#77767B]">
            No commissions match your search or filter parameters.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-2 px-6 py-3 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest hover:bg-[#9E4734]"
          >
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white border border-[#E8E2D8] p-6 space-y-4 hover:border-[#18181B] transition-colors">
              {/* Top Order Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E2D8] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#18181B]">{order.id}</span>
                    <span className="px-2.5 py-0.5 bg-[#18181B] text-white text-[9px] font-sans font-bold uppercase tracking-wider">
                      {order.status}
                    </span>
                  </div>
                  <span className="text-xs text-[#77767B] font-sans">
                    Ordered on {order.date} • {order.items.length} works commissioned
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[10px] text-[#77767B] uppercase font-sans font-semibold block">Total</span>
                    <span className="font-mono text-base font-bold text-[#9E4734]">{formatPrice(order.total)}</span>
                  </div>

                  <Link
                    to={`/order/${order.id}`}
                    className="px-4 py-2.5 bg-[#F5F3F0] hover:bg-[#18181B] hover:text-white text-[#18181B] border border-[#E8E2D8] text-xs font-sans uppercase tracking-widest font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>View Telemetry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Items Preview */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3 overflow-x-auto">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#FAF8F5] p-2 border border-[#E8E2D8]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-14 object-cover bg-[#F2EFEB]"
                      />
                      <div className="text-[11px] font-sans">
                        <p className="font-serif font-medium text-[#18181B] max-w-[140px] truncate">{item.name}</p>
                        <p className="text-[#77767B] text-[10px]">{item.selectedSize} • {item.selectedColor.name}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs font-sans text-[#77767B] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#9E4734]" />
                  <span>{order.carrier}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

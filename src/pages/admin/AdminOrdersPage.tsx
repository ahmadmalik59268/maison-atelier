import React, { useState } from 'react';
import { ShoppingBag, Search, Eye, Filter, CheckCircle2, Truck, Clock, XCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { OrderStatus, OrderRecord } from '../../types';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus, formatPrice, addToast } = useShop();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  const statuses: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(search.toLowerCase()) ||
      o.trackingNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    addToast(`Order ${orderId} updated to "${newStatus}".`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C8275]">
            Fulfillment & Manifests
          </p>
          <h1 className="font-serif text-3xl text-[#1A1A1A] font-light">
            Client Order Registry ({orders.length})
          </h1>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#E5E0D8] p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Order ID, Patron name, AWB..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#E5E0D8] pl-10 pr-4 py-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-[10px] font-mono uppercase text-[#8C8275] shrink-0">Filter Status:</span>
          {['All', ...statuses].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider whitespace-nowrap border ${
                statusFilter === st
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white border-[#E5E0D8] text-[#5A534A]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E5E0D8] text-[#8C8275] uppercase text-[10px]">
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Patron & Destination</th>
                <th className="p-4">Garments</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="p-4 font-bold text-[#1A1A1A]">{o.id}</td>
                  <td className="p-4 text-[#8C8275]">{o.date}</td>
                  <td className="p-4">
                    <p className="font-semibold text-[#1A1A1A]">{o.shippingAddress.fullName}</p>
                    <p className="text-[10px] text-[#8C8275]">
                      {o.shippingAddress.city}, {o.shippingAddress.country}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className="text-[#1A1A1A]">{o.items.length} {o.items.length === 1 ? 'Garment' : 'Garments'}</span>
                  </td>
                  <td className="p-4 font-bold text-[#1A1A1A]">{formatPrice(o.total)}</td>
                  <td className="p-4">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                      className={`text-[10px] font-mono uppercase px-2 py-1 border rounded-none ${
                        o.status === 'delivered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : o.status === 'cancelled'
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-[#FAF8F5] text-[#1A1A1A] border-[#E5E0D8]'
                      }`}
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="border border-[#E5E0D8] px-3 py-1 text-[10px] font-mono uppercase hover:bg-[#FAF8F5] text-[#1A1A1A]"
                    >
                      Inspect Manifest
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E0D8] max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E0D8] mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8C8275]">Dossier Inspection</span>
                <h3 className="font-serif text-2xl text-[#1A1A1A]">{selectedOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-xs font-mono uppercase border border-[#E5E0D8] px-3 py-1"
              >
                Close
              </button>
            </div>

            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E5E0D8]">
                <div>
                  <p className="text-[10px] font-mono uppercase text-[#8C8275]">Patron Information</p>
                  <p className="font-semibold text-sm text-[#1A1A1A] mt-1">{selectedOrder.shippingAddress.fullName}</p>
                  <p className="text-[#5A534A]">{selectedOrder.shippingAddress.street}</p>
                  <p className="text-[#5A534A]">
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                  </p>
                  <p className="text-[#5A534A]">{selectedOrder.shippingAddress.country}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-[#8C8275]">Logistics</p>
                  <p className="font-mono mt-1">AWB: {selectedOrder.trackingNumber}</p>
                  <p className="font-mono">Carrier: {selectedOrder.carrier}</p>
                  <p className="font-mono">Date: {selectedOrder.date}</p>
                  <div className="mt-2">
                    <label className="text-[10px] font-mono uppercase text-[#8C8275] block mb-1">
                      Change Status:
                    </label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                      className="bg-[#FAF8F5] border border-[#E5E0D8] p-1.5 text-xs font-mono"
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase text-[#8C8275] mb-2">Itemized Garments</p>
                <div className="divide-y divide-[#E5E0D8]">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={it.image} alt={it.name} className="w-10 h-12 object-cover border" />
                        <div>
                          <p className="font-serif text-[#1A1A1A]">{it.name}</p>
                          <p className="text-[10px] font-mono text-[#8C8275]">
                            Size: {it.selectedSize} | Color: {it.selectedColor.name} | Qty: {it.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-mono font-medium text-[#1A1A1A]">
                        {formatPrice(it.price * it.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E0D8] flex justify-between items-center font-mono">
                <span className="text-sm font-semibold">Total Revenue:</span>
                <span className="text-base font-bold text-[#1A1A1A]">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AdminDashboardPage: React.FC = () => {
  const { products, orders, categories, formatPrice } = useShop();

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockProducts = products.filter((p) => p.stock_quantity <= 5);
  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      title: 'Total Gross Volume',
      value: formatPrice(totalSales),
      change: '+18.4% vs last cycle',
      icon: DollarSign,
    },
    {
      title: 'Total Orders Placed',
      value: orders.length.toString(),
      change: `${orders.filter((o) => o.status === 'pending').length} pending fulfillment`,
      icon: ShoppingBag,
    },
    {
      title: 'Active Products',
      value: products.length.toString(),
      change: `${categories.length} active categories`,
      icon: Package,
    },
    {
      title: 'Low Stock Alerts',
      value: lowStockProducts.length.toString(),
      change: 'Needs replenishment',
      icon: AlertTriangle,
      alert: lowStockProducts.length > 0,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C8275]">
            Maison Atelier • Control Room
          </p>
          <h1 className="font-serif text-3xl text-[#1A1A1A] font-light">
            Store Executive Overview
          </h1>
        </div>

        <div className="flex gap-3">
          <Link
            to="/admin/products"
            className="bg-[#1A1A1A] text-white px-4 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-black transition-colors"
          >
            + Add New Product
          </Link>
          <Link
            to="/admin/orders"
            className="border border-[#E5E0D8] bg-white text-[#1A1A1A] px-4 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-[#FAF8F5] transition-colors"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className={`bg-white border p-6 shadow-sm ${
                s.alert ? 'border-amber-400 bg-amber-50/20' : 'border-[#E5E0D8]'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275]">
                  {s.title}
                </span>
                <div className="p-2 bg-[#FAF8F5] rounded border border-[#E5E0D8]">
                  <Icon className="w-4 h-4 text-[#1A1A1A]" />
                </div>
              </div>
              <p className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-light">
                {s.value}
              </p>
              <p className="text-[11px] font-mono text-[#5A534A] mt-2 flex items-center gap-1">
                {s.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Grid for Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-8 bg-white border border-[#E5E0D8] p-6 shadow-sm">
          <div className="flex justify-between items-center pb-4 border-b border-[#E5E0D8] mb-4">
            <h2 className="font-serif text-lg text-[#1A1A1A] font-light">Recent Client Acquisitions</h2>
            <Link
              to="/admin/orders"
              className="text-xs font-mono uppercase tracking-widest text-[#8C8275] hover:text-[#1A1A1A]"
            >
              View All ({orders.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#E5E0D8] text-[#8C8275] uppercase text-[10px]">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Patron</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D8]/60">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF8F5]">
                    <td className="py-3.5 font-bold text-[#1A1A1A]">{order.id}</td>
                    <td className="py-3.5 text-[#5A534A]">{order.shippingAddress.fullName}</td>
                    <td className="py-3.5 text-[#8C8275]">{order.date}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest bg-[#FAF8F5] border border-[#E5E0D8] text-[#1A1A1A]">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-medium text-[#1A1A1A]">
                      {formatPrice(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 bg-white border border-[#E5E0D8] p-6 shadow-sm">
          <div className="flex justify-between items-center pb-4 border-b border-[#E5E0D8] mb-4">
            <h2 className="font-serif text-lg text-[#1A1A1A] font-light">Inventory Alerts</h2>
            <Link
              to="/admin/inventory"
              className="text-xs font-mono uppercase tracking-widest text-[#8C8275] hover:text-[#1A1A1A]"
            >
              Manage →
            </Link>
          </div>

          {lowStockProducts.length === 0 ? (
            <p className="text-xs text-[#8C8275] py-8 text-center">
              All inventory levels are healthy.
            </p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 p-3 bg-amber-50/40 border border-amber-200"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-12 h-14 object-cover border border-[#E5E0D8]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-serif text-[#1A1A1A] truncate">{p.name}</p>
                    <p className="text-[10px] font-mono text-amber-800">
                      Only {p.stock_quantity} units remaining
                    </p>
                  </div>
                  <Link
                    to="/admin/inventory"
                    className="text-[10px] font-mono uppercase text-[#1A1A1A] underline shrink-0"
                  >
                    Restock
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

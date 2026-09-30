import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Warehouse,
  ArrowLeft,
  LogOut,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Logo } from '../Logo';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useShop();

  // Route protection
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-24 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-[#E5E0D8] p-8 text-center shadow-lg">
          <div className="w-14 h-14 bg-rose-50 text-rose-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-200">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl text-[#1A1A1A] font-light mb-2">
            Restricted Atelier Console
          </h1>
          <p className="text-xs text-[#5A534A] leading-relaxed mb-6">
            Access to administrative store controls, financial metrics, and customer registries is restricted to authorized Ahmad Clothing personnel.
          </p>
          <div className="space-y-2">
            <Link
              to="/login"
              state={{ from: location }}
              className="block w-full bg-[#1A1A1A] text-white py-3 text-xs font-mono uppercase tracking-widest hover:bg-black"
            >
              Sign In with Admin Passkey
            </Link>
            <Link
              to="/"
              className="block w-full border border-[#E5E0D8] py-2.5 text-xs font-mono uppercase text-[#5A534A] hover:text-[#1A1A1A]"
            >
              Return to Public Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard, exact: true },
    { path: '/admin/products', label: 'Product Catalog', icon: Package },
    { path: '/admin/categories', label: 'Taxonomy & Categories', icon: Layers },
    { path: '/admin/orders', label: 'Client Orders', icon: ShoppingBag },
    { path: '/admin/customers', label: 'Customer Registry', icon: Users },
    { path: '/admin/inventory', label: 'Inventory & Stock', icon: Warehouse },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#141414] text-white flex flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/10">
            <Logo size="sm" variant="light" />
            <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#8C8275] mt-2">
              Admin Concierge Console
            </p>
          </div>

          {/* Navigation links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wider rounded-none transition-colors ${
                    isActive
                      ? 'bg-white text-[#141414] font-medium'
                      : 'text-[#A0988E] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User footer info */}
        <div className="p-4 border-t border-white/10 bg-black/40 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-white text-[11px] truncate max-w-[140px]">
                {currentUser.fullName}
              </p>
              <p className="text-[9px] font-mono text-[#8C8275] uppercase">Store Administrator</p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Sign Out"
              className="p-1.5 text-[#8C8275] hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            to="/"
            className="mt-3 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#A0988E] hover:text-white"
          >
            <ArrowLeft className="w-3 h-3" /> View Storefront
          </Link>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

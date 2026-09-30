import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Boxes,
  ShieldAlert,
  ArrowLeft,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, loginAsAdmin, logout } = useShop();

  const isCurrent = (path: string) => location.pathname === path;

  // Protect Admin Pages
  if (!isAdmin) {
    return (
      <div className="w-full min-h-[85vh] bg-[#FAF8F5] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border border-[#18181B] p-8 text-center space-y-5 shadow-lg">
          <div className="w-12 h-12 bg-[#9E4734] text-white flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-2xl text-[#18181B]">Maison Direction Portal Restricted</h2>

          <p className="font-sans text-xs text-[#77767B] leading-relaxed">
            This management console is restricted to authenticated Atelier Directors and administrative staff.
          </p>

          <div className="space-y-2 pt-2">
            <button
              onClick={loginAsAdmin}
              className="w-full py-3.5 bg-[#18181B] text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Authenticate as Atelier Director</span>
            </button>

            <Link
              to="/"
              className="w-full py-3 bg-[#F5F3F0] text-[#18181B] font-sans text-xs uppercase tracking-wider font-semibold block text-center border border-[#E8E2D8] hover:bg-[#FAF8F5]"
            >
              Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F5F3F0] flex flex-col font-sans">
      {/* Admin Top Header */}
      <header className="bg-[#18181B] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#333]">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-[#9E4734] transition-colors text-xs font-sans uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Storefront</span>
          </Link>
          <span className="text-white/30 select-none">|</span>
          <span className="font-serif text-lg tracking-tight uppercase font-medium text-white">
            Maison Atelier • Direction Portal
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 bg-[#9E4734] text-white text-[9px] font-bold uppercase tracking-wider">
            Admin Mode
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="hidden sm:inline text-white/70 font-mono">
            Director: <strong>{user?.fullName}</strong>
          </span>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="text-white/70 hover:text-white flex items-center gap-1 cursor-pointer"
            title="Sign out of director portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-3 sm:p-6 gap-4 sm:gap-6 overflow-x-hidden">
        {/* Admin Navigation Sidebar */}
        <nav className="w-full md:w-64 bg-white border border-[#E8E2D8] p-2 sm:p-3 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-1 shrink-0 self-start">
          <Link
            to="/admin"
            className={`whitespace-nowrap px-3.5 py-2.5 text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-2.5 transition-colors ${
              isCurrent('/admin')
                ? 'bg-[#18181B] text-white'
                : 'text-[#47464B] hover:bg-[#F5F3F0]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/products"
            className={`whitespace-nowrap px-3.5 py-2.5 text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-2.5 transition-colors ${
              isCurrent('/admin/products')
                ? 'bg-[#18181B] text-white'
                : 'text-[#47464B] hover:bg-[#F5F3F0]'
            }`}
          >
            <Package className="w-4 h-4 shrink-0" />
            <span>Products</span>
          </Link>

          <Link
            to="/admin/categories"
            className={`whitespace-nowrap px-3.5 py-2.5 text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-2.5 transition-colors ${
              isCurrent('/admin/categories')
                ? 'bg-[#18181B] text-white'
                : 'text-[#47464B] hover:bg-[#F5F3F0]'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Categories</span>
          </Link>

          <Link
            to="/admin/orders"
            className={`whitespace-nowrap px-3.5 py-2.5 text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-2.5 transition-colors ${
              isCurrent('/admin/orders')
                ? 'bg-[#18181B] text-white'
                : 'text-[#47464B] hover:bg-[#F5F3F0]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Orders</span>
          </Link>

          <Link
            to="/admin/customers"
            className={`whitespace-nowrap px-3.5 py-2.5 text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-2.5 transition-colors ${
              isCurrent('/admin/customers')
                ? 'bg-[#18181B] text-white'
                : 'text-[#47464B] hover:bg-[#F5F3F0]'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Patrons</span>
          </Link>

          <Link
            to="/admin/inventory"
            className={`whitespace-nowrap px-3.5 py-2.5 text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-2.5 transition-colors ${
              isCurrent('/admin/inventory')
                ? 'bg-[#18181B] text-white'
                : 'text-[#47464B] hover:bg-[#F5F3F0]'
            }`}
          >
            <Boxes className="w-4 h-4 shrink-0" />
            <span>Inventory</span>
          </Link>
        </nav>

        {/* Content Body */}
        <main className="flex-1 bg-white border border-[#E8E2D8] p-4 sm:p-8 min-w-0 overflow-x-hidden">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

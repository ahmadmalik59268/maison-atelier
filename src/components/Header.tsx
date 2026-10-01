import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Truck,
  Globe,
  ShieldAlert,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CURRENCIES } from '../data/atelierData';
import { CurrencyCode } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenSearchModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearchModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cartCount,
    wishlistCount,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsWishlistOpen,
    user,
    isAdmin,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const curr = CURRENCIES[currency] || CURRENCIES.PKR;
  const freeShippingConverted = Math.round(250 * curr.rate);

  const handleNav = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8]">
        {/* Top Announcement Bar with Currency & Global Dispatch Info */}
        <div className="w-full bg-[#EAE8E5] py-1.5 px-3 sm:px-6 flex items-center justify-between border-b border-[#E4E2DF] text-[9px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-[#47464B]">
          {/* Left: Shipping notice */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block w-1.5 h-1.5 bg-[#9E4734]" />
            <span>Complimentary Global Air Shipping on Orders Over {curr.symbol}{freeShippingConverted}</span>
          </div>

          {/* Right: Tracking, Admin Quicklink & Currency Switcher */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1 text-[#9E4734] font-bold hover:underline tracking-widest text-[9px] sm:text-[10px]"
                title="Atelier Management Portal"
              >
                <ShieldAlert className="w-3 h-3" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            <Link
              to="/orders"
              className="hidden md:flex items-center gap-1 text-[#47464B] hover:text-[#18181B] transition-colors"
            >
              <Truck className="w-3 h-3 text-[#9E4734]" />
              <span>Track Order</span>
            </Link>

            {/* Currency Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-[#18181B] hover:text-[#9E4734] transition-colors font-mono cursor-pointer"
                aria-label="Select currency"
              >
                <Globe className="w-3 h-3" />
                <span>{currency} ({curr.symbol})</span>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-[#E8E2D8] shadow-lg py-1 w-28 z-50 animate-in fade-in duration-150">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cCode) => (
                    <button
                      key={cCode}
                      onClick={() => {
                        setCurrency(cCode);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-[10px] font-mono flex items-center justify-between hover:bg-[#F5F3F0] cursor-pointer ${
                        currency === cCode ? 'bg-[#FAF8F5] font-bold text-[#9E4734]' : 'text-[#18181B]'
                      }`}
                    >
                      <span>{cCode}</span>
                      <span>{CURRENCIES[cCode].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="h-16 sm:h-20 w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
          {/* Left: Brand Wordmark & Emblem */}
          <div className="flex items-center shrink-0">
            <Logo size="md" />
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-7">
            <Link
              to="/shop"
              className={`text-[11px] font-sans font-semibold uppercase tracking-[0.14em] transition-colors relative py-1 hover:text-[#18181B] ${
                isCurrent('/shop') ? 'text-[#18181B] border-b border-[#18181B]' : 'text-[#47464B]'
              }`}
            >
              All Pieces
            </Link>
            <Link
              to="/new-arrivals"
              className={`text-[11px] font-sans font-semibold uppercase tracking-[0.14em] transition-colors relative py-1 hover:text-[#18181B] ${
                isCurrent('/new-arrivals') ? 'text-[#18181B] border-b border-[#18181B]' : 'text-[#47464B]'
              }`}
            >
              New Arrivals
            </Link>
            <Link
              to="/women"
              className={`text-[11px] font-sans font-semibold uppercase tracking-[0.14em] transition-colors relative py-1 hover:text-[#18181B] ${
                isCurrent('/women') ? 'text-[#18181B] border-b border-[#18181B]' : 'text-[#47464B]'
              }`}
            >
              Women
            </Link>
            <Link
              to="/men"
              className={`text-[11px] font-sans font-semibold uppercase tracking-[0.14em] transition-colors relative py-1 hover:text-[#18181B] ${
                isCurrent('/men') ? 'text-[#18181B] border-b border-[#18181B]' : 'text-[#47464B]'
              }`}
            >
              Men
            </Link>
            <Link
              to="/style-studio"
              className={`text-[11px] font-sans font-semibold uppercase tracking-[0.14em] transition-colors relative py-1 flex items-center gap-1.5 ${
                isCurrent('/style-studio') ? 'text-[#9E4734] border-b border-[#9E4734] font-bold' : 'text-[#9E4734] hover:text-[#18181B]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Style Studio
            </Link>
            <Link
              to="/lookbook"
              className={`text-[11px] font-sans font-semibold uppercase tracking-[0.14em] transition-colors relative py-1 hover:text-[#18181B] ${
                isCurrent('/lookbook') ? 'text-[#18181B] border-b border-[#18181B]' : 'text-[#47464B]'
              }`}
            >
              Runway Lookbook
            </Link>
            <Link
              to="/boutiques"
              className={`text-[11px] font-sans font-semibold uppercase tracking-[0.14em] transition-colors relative py-1 hover:text-[#18181B] ${
                isCurrent('/boutiques') ? 'text-[#18181B] border-b border-[#18181B]' : 'text-[#47464B]'
              }`}
            >
              Boutiques
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3.5 shrink-0">
            {/* Desktop Search Button */}
            <button
              onClick={() => {
                if (onOpenSearchModal) onOpenSearchModal();
                else navigate('/search');
              }}
              className="hidden sm:flex items-center bg-[#F5F3F0] px-3.5 py-1.5 border border-[#E8E2D8] hover:border-[#18181B] text-[#47464B] transition-colors gap-2 cursor-pointer"
              title="Search collection"
            >
              <Search className="w-3.5 h-3.5 text-[#47464B]" />
              <span className="text-xs font-sans text-[#77767B] pr-3">Search catalog...</span>
              <span className="text-[10px] font-mono border border-[#E8E2D8] px-1 bg-white text-[#77767B]">⌘K</span>
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={() => {
                if (onOpenSearchModal) onOpenSearchModal();
                else navigate('/search');
              }}
              aria-label="Search"
              className="sm:hidden p-2 text-[#18181B] hover:text-[#9E4734] transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative p-2 text-[#18181B] hover:text-[#9E4734] transition-colors cursor-pointer"
              title="View saved pieces"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute top-1 right-0.5 w-4 h-4 bg-[#EAE8E5] text-[#18181B] text-[9px] font-bold flex items-center justify-center border border-[#18181B]/20">
                {wishlistCount}
              </span>
            </Link>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative p-2 text-[#18181B] hover:text-[#9E4734] transition-colors cursor-pointer"
              title="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-0.5 w-4 h-4 bg-[#9E4734] text-white text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* VIP Guild / Client Account */}
            <Link
              to={user ? '/account' : '/login'}
              aria-label="VIP Guild & Account"
              className="hidden sm:flex w-8 h-8 bg-[#18181B] text-white items-center justify-center hover:bg-[#9E4734] transition-colors cursor-pointer"
              title={user ? `Account: ${user.fullName}` : 'Sign In / Register'}
            >
              <User className="w-4 h-4 text-white" />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#18181B] hover:text-[#9E4734] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF8F5] border-b border-[#E8E2D8] px-5 py-6 space-y-4 shadow-xl animate-in fade-in duration-200 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col divide-y divide-[#E8E2D8]/60">
              <button
                onClick={() => handleNav('/shop')}
                className="text-left font-sans text-xs uppercase tracking-widest font-semibold py-3 text-[#18181B] hover:text-[#9E4734] flex items-center justify-between"
              >
                <span>All Catalog Pieces</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#77767B]" />
              </button>
              <button
                onClick={() => handleNav('/new-arrivals')}
                className="text-left font-sans text-xs uppercase tracking-widest font-semibold py-3 text-[#18181B] hover:text-[#9E4734] flex items-center justify-between"
              >
                <span>New Arrivals</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#77767B]" />
              </button>
              <button
                onClick={() => handleNav('/women')}
                className="text-left font-sans text-xs uppercase tracking-widest font-semibold py-3 text-[#18181B] hover:text-[#9E4734] flex items-center justify-between"
              >
                <span>Women's Collection</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#77767B]" />
              </button>
              <button
                onClick={() => handleNav('/men')}
                className="text-left font-sans text-xs uppercase tracking-widest font-semibold py-3 text-[#18181B] hover:text-[#9E4734] flex items-center justify-between"
              >
                <span>Men's Collection</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#77767B]" />
              </button>
              <button
                onClick={() => handleNav('/style-studio')}
                className="text-left font-sans text-xs uppercase tracking-widest font-semibold py-3 text-[#9E4734] hover:text-[#18181B] flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Virtual Style Studio
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9E4734]" />
              </button>
              <button
                onClick={() => handleNav('/lookbook')}
                className="text-left font-sans text-xs uppercase tracking-widest font-semibold py-3 text-[#18181B] hover:text-[#9E4734] flex items-center justify-between"
              >
                <span>Runway Lookbook</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#77767B]" />
              </button>
              <button
                onClick={() => handleNav('/boutiques')}
                className="text-left font-sans text-xs uppercase tracking-widest font-semibold py-3 text-[#18181B] hover:text-[#9E4734] flex items-center justify-between"
              >
                <span>Global Salon Boutiques</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#77767B]" />
              </button>
              <button
                onClick={() => handleNav('/about')}
                className="text-left font-sans text-xs uppercase tracking-widest font-semibold py-3 text-[#18181B] hover:text-[#9E4734] flex items-center justify-between"
              >
                <span>About Maison Atelier</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#77767B]" />
              </button>
              <button
                onClick={() => handleNav('/contact')}
                className="text-left font-sans text-xs uppercase tracking-widest font-semibold py-3 text-[#18181B] hover:text-[#9E4734] flex items-center justify-between"
              >
                <span>Contact & Concierge</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#77767B]" />
              </button>
              <button
                onClick={() => handleNav(user ? '/account' : '/login')}
                className="text-left font-sans text-xs uppercase tracking-widest font-semibold py-3 text-[#18181B] hover:text-[#9E4734] flex items-center justify-between"
              >
                <span>{user ? `Account (${user.fullName})` : 'Client Sign In / Register'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#77767B]" />
              </button>

              {isAdmin && (
                <button
                  onClick={() => handleNav('/admin')}
                  className="text-left font-sans text-xs uppercase tracking-widest font-bold py-3 text-[#9E4734] hover:text-[#18181B] flex items-center justify-between bg-[#9E4734]/5 px-2 mt-2"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Admin Management Console
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9E4734]" />
                </button>
              )}
            </div>

            {/* Mobile Currency & Tracking Footer */}
            <div className="pt-4 flex items-center justify-between border-t border-[#E8E2D8] text-xs font-mono">
              <button
                onClick={() => handleNav('/orders')}
                className="text-[#47464B] flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5 text-[#9E4734]" />
                <span>Track Active Delivery</span>
              </button>
              <span className="text-[#9E4734] font-semibold">{currency} ({curr.symbol})</span>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Quick Action Bar for instant thumb accessibility */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FAF8F5]/98 backdrop-blur-md border-t border-[#E8E2D8] px-4 py-2.5 flex items-center justify-around text-[9px] font-sans font-semibold uppercase tracking-wider text-[#47464B]">
        <Link
          to="/shop"
          className={`flex flex-col items-center gap-1 ${isCurrent('/shop') ? 'text-[#9E4734]' : 'text-[#47464B]'}`}
        >
          <Search className="w-4 h-4" />
          <span>Shop</span>
        </Link>
        <Link
          to="/style-studio"
          className={`flex flex-col items-center gap-1 ${isCurrent('/style-studio') ? 'text-[#9E4734]' : 'text-[#47464B]'}`}
        >
          <Sparkles className="w-4 h-4 text-[#9E4734]" />
          <span>Studio</span>
        </Link>
        <Link
          to="/wishlist"
          className={`flex flex-col items-center gap-1 relative ${isCurrent('/wishlist') ? 'text-[#9E4734]' : 'text-[#47464B]'}`}
        >
          <Heart className="w-4 h-4" />
          <span>Archive</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-1 right-1 w-3.5 h-3.5 bg-[#18181B] text-white text-[8px] flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 relative text-[#47464B]"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 right-0 w-3.5 h-3.5 bg-[#9E4734] text-white text-[8px] flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <Link
          to={user ? '/account' : '/login'}
          className={`flex flex-col items-center gap-1 ${isCurrent('/account') || isCurrent('/login') ? 'text-[#9E4734]' : 'text-[#47464B]'}`}
        >
          <User className="w-4 h-4" />
          <span>Account</span>
        </Link>
      </div>
    </>
  );
};

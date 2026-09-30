import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Ruler,
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Check,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    logout,
    orders,
    wishlistProducts,
    formatPrice,
    updateUserProfile,
    addToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses' | 'settings'>('profile');

  // Address edit state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(null);
  const [newAddress, setNewAddress] = useState({
    id: '',
    fullName: currentUser?.fullName || '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: currentUser?.phone || '',
    isDefault: false,
  });

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    preferredCurrency: currentUser?.preferredCurrency || 'USD',
    height: currentUser?.measurements?.height || '',
    chest: currentUser?.measurements?.chest || '',
    waist: currentUser?.measurements?.waist || '',
    hips: currentUser?.measurements?.hips || '',
    shoulder: currentUser?.measurements?.shoulder || '',
    unit: currentUser?.measurements?.unit || 'in',
  });

  // If not logged in, redirect to login
  if (!currentUser) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-24 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 border border-[#E5E0D8]">
          <User className="w-12 h-12 mx-auto text-[#8C8275] mb-4 stroke-1" />
          <h1 className="font-serif text-2xl text-[#1A1A1A] mb-2 font-light">
            Authentication Required
          </h1>
          <p className="text-xs text-[#5A534A] mb-6 font-light">
            Please sign in to view your bespoke patron dossier and archives.
          </p>
          <Link
            to="/login"
            className="inline-block bg-[#1A1A1A] text-white px-8 py-3 text-xs font-mono uppercase tracking-[0.2em]"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      fullName: profileForm.fullName,
      phone: profileForm.phone,
      preferredCurrency: profileForm.preferredCurrency,
      measurements: {
        height: profileForm.height,
        chest: profileForm.chest,
        waist: profileForm.waist,
        hips: profileForm.hips,
        shoulder: profileForm.shoulder,
        unit: profileForm.unit as 'cm' | 'in',
      },
    });
    addToast('Client profile and measurements updated.', 'success');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const currentAddresses = currentUser.addresses || [];
    let updatedAddresses = [...currentAddresses];

    if (editingAddressIndex !== null) {
      updatedAddresses[editingAddressIndex] = {
        ...newAddress,
        id: updatedAddresses[editingAddressIndex].id,
      };
    } else {
      updatedAddresses.push({
        ...newAddress,
        id: `addr-${Date.now()}`,
      });
    }

    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((a, i) => ({
        ...a,
        isDefault: editingAddressIndex !== null ? i === editingAddressIndex : i === updatedAddresses.length - 1,
      }));
    }

    updateUserProfile({ addresses: updatedAddresses });
    setShowAddressModal(false);
    setEditingAddressIndex(null);
    addToast('Shipping address saved to dossier.', 'success');
  };

  const handleDeleteAddress = (index: number) => {
    const currentAddresses = currentUser.addresses || [];
    const updated = currentAddresses.filter((_, i) => i !== index);
    updateUserProfile({ addresses: updated });
    addToast('Address removed.', 'info');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Card */}
        <div className="bg-white border border-[#E5E0D8] p-4 sm:p-8 mb-6 sm:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 shadow-sm">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-lg sm:text-xl font-serif text-[#1A1A1A] uppercase shrink-0">
              {currentUser.fullName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-xl sm:text-3xl text-[#1A1A1A] font-light truncate">
                  {currentUser.fullName}
                </h1>
                {currentUser.role === 'admin' && (
                  <span className="bg-[#1A1A1A] text-white text-[9px] font-mono px-2 py-0.5 uppercase tracking-widest shrink-0">
                    Concierge Admin
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-[#8C8275] font-mono mt-0.5 truncate">
                Patron #{currentUser.id} • {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
            {currentUser.role === 'admin' && (
              <Link
                to="/admin"
                className="bg-[#1A1A1A] text-white px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-1.5 shrink-0"
              >
                Atelier Admin Console <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="border border-[#E5E0D8] text-[#5A534A] px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest hover:bg-[#FAF8F5] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Navigation Sidebar / Horizontal Tab Bar on Mobile */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5E0D8] p-2 sm:p-3 shadow-sm flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5">
              {[
                { id: 'profile', label: 'Client Profile', fullLabel: 'Client Profile & Sizing', icon: User },
                { id: 'orders', label: `Orders (${orders.length})`, fullLabel: `My Orders (${orders.length})`, icon: Package },
                { id: 'wishlist', label: `Wishlist (${wishlistProducts.length})`, fullLabel: `Private Wishlist (${wishlistProducts.length})`, icon: Heart },
                { id: 'addresses', label: 'Addresses', fullLabel: 'Bespoke Delivery Addresses', icon: MapPin },
                { id: 'settings', label: 'Preferences', fullLabel: 'Account Preferences', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`whitespace-nowrap flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-colors text-left shrink-0 ${
                      isActive
                        ? 'bg-[#1A1A1A] text-white font-medium'
                        : 'text-[#5A534A] hover:bg-[#FAF8F5] hover:text-[#1A1A1A]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="hidden lg:inline">{tab.fullLabel}</span>
                    <span className="lg:hidden">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Tab Content */}
          <div className="lg:col-span-3 min-w-0">
            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white border border-[#E5E0D8] p-6 sm:p-8 shadow-sm space-y-8">
                <div>
                  <h2 className="font-serif text-xl text-[#1A1A1A] font-light">
                    Client Identity & Atelier Measurements
                  </h2>
                  <p className="text-xs text-[#8C8275] font-light mt-1">
                    Your bespoke measurements allow our Parisian tailors to recommend the ideal silhouette for every garment.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1.5">
                        Direct Phone Contact
                      </label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-mono"
                      />
                    </div>
                  </div>

                  {/* Sizing Blueprint */}
                  <div className="pt-6 border-t border-[#E5E0D8]">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-[#8C8275]" />
                        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#1A1A1A]">
                          Bespoke Fit Calibration
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => setProfileForm({ ...profileForm, unit: 'in' })}
                          className={`px-2 py-0.5 border ${
                            profileForm.unit === 'in' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#E5E0D8] text-[#5A534A]'
                          }`}
                        >
                          Inches (in)
                        </button>
                        <button
                          type="button"
                          onClick={() => setProfileForm({ ...profileForm, unit: 'cm' })}
                          className={`px-2 py-0.5 border ${
                            profileForm.unit === 'cm' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#E5E0D8] text-[#5A534A]'
                          }`}
                        >
                          Centimeters (cm)
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">Height</label>
                        <input
                          type="text"
                          value={profileForm.height}
                          onChange={(e) => setProfileForm({ ...profileForm, height: e.target.value })}
                          placeholder={`5'9" or 175`}
                          className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-2 text-xs font-mono text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">Bust / Chest</label>
                        <input
                          type="text"
                          value={profileForm.chest}
                          onChange={(e) => setProfileForm({ ...profileForm, chest: e.target.value })}
                          placeholder={`36 ${profileForm.unit}`}
                          className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-2 text-xs font-mono text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">Natural Waist</label>
                        <input
                          type="text"
                          value={profileForm.waist}
                          onChange={(e) => setProfileForm({ ...profileForm, waist: e.target.value })}
                          placeholder={`27 ${profileForm.unit}`}
                          className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-2 text-xs font-mono text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">Hips</label>
                        <input
                          type="text"
                          value={profileForm.hips}
                          onChange={(e) => setProfileForm({ ...profileForm, hips: e.target.value })}
                          placeholder={`38 ${profileForm.unit}`}
                          className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-2 text-xs font-mono text-[#1A1A1A]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-[#1A1A1A] text-white px-8 py-3 text-xs font-mono uppercase tracking-[0.2em] hover:bg-black transition-colors"
                    >
                      Save Profile & Calibration
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div className="bg-white border border-[#E5E0D8] p-6 sm:p-8 shadow-sm">
                <div className="flex justify-between items-center pb-6 border-b border-[#E5E0D8] mb-6">
                  <div>
                    <h2 className="font-serif text-xl text-[#1A1A1A] font-light">Acquisition Archive</h2>
                    <p className="text-xs text-[#8C8275] font-light mt-0.5">
                      Review status, air waybill tracking, and complete dossiers for past acquisitions.
                    </p>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-10 h-10 mx-auto text-[#8C8275] stroke-1 mb-3" />
                    <p className="font-serif text-lg text-[#1A1A1A] font-light">No Acquisitions Found</p>
                    <p className="text-xs text-[#8C8275] mt-1 mb-6">Your bespoke wardrobe history is currently empty.</p>
                    <Link
                      to="/shop"
                      className="inline-block bg-[#1A1A1A] text-white px-6 py-2.5 text-xs font-mono uppercase tracking-widest"
                    >
                      Explore Collections
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-[#E5E0D8] p-5 bg-[#FAF8F5]/50 hover:bg-[#FAF8F5] transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-[#E5E0D8]">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-semibold text-[#1A1A1A]">{order.id}</span>
                              <span className="text-xs text-[#8C8275]">• {order.date}</span>
                            </div>
                            <p className="text-[11px] font-mono text-[#8C8275] mt-0.5">
                              Air Waybill: {order.trackingNumber}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-white border border-[#E5E0D8] text-[#1A1A1A]">
                              {order.status}
                            </span>
                            <span className="font-mono text-xs font-medium text-[#1A1A1A]">
                              {formatPrice(order.total)}
                            </span>
                          </div>
                        </div>

                        {/* Items preview */}
                        <div className="py-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 overflow-x-auto py-1">
                            {order.items.map((it, idx) => (
                              <img
                                key={idx}
                                src={it.image}
                                alt={it.name}
                                title={`${it.name} (${it.selectedSize})`}
                                className="w-12 h-14 object-cover border border-[#E5E0D8] shrink-0"
                              />
                            ))}
                          </div>
                          <Link
                            to={`/order/${order.id}`}
                            className="shrink-0 text-xs font-mono uppercase tracking-widest text-[#1A1A1A] hover:underline flex items-center gap-1"
                          >
                            View Details <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="bg-white border border-[#E5E0D8] p-6 sm:p-8 shadow-sm">
                <div className="flex justify-between items-center pb-6 border-b border-[#E5E0D8] mb-6">
                  <div>
                    <h2 className="font-serif text-xl text-[#1A1A1A] font-light">Curated Wishlist</h2>
                    <p className="text-xs text-[#8C8275] font-light mt-0.5">
                      Garments reserved in your private atelier wish cache.
                    </p>
                  </div>
                  <Link
                    to="/wishlist"
                    className="text-xs font-mono uppercase tracking-widest text-[#1A1A1A] hover:underline flex items-center gap-1"
                  >
                    Open Wishlist Page <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-10 h-10 mx-auto text-[#8C8275] stroke-1 mb-3" />
                    <p className="font-serif text-lg text-[#1A1A1A] font-light">Wishlist Empty</p>
                    <p className="text-xs text-[#8C8275] mt-1 mb-6">Save garments while exploring the collections.</p>
                    <Link
                      to="/shop"
                      className="inline-block bg-[#1A1A1A] text-white px-6 py-2.5 text-xs font-mono uppercase tracking-widest"
                    >
                      Browse Ready-to-Wear
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="bg-white border border-[#E5E0D8] p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-[#E5E0D8]">
                  <div>
                    <h2 className="font-serif text-xl text-[#1A1A1A] font-light">Bespoke Delivery Addresses</h2>
                    <p className="text-xs text-[#8C8275] font-light mt-0.5">
                      Manage international residential and concierge reception coordinates.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAddressIndex(null);
                      setNewAddress({
                        id: '',
                        fullName: currentUser.fullName,
                        street: '',
                        city: '',
                        state: '',
                        postalCode: '',
                        country: 'United States',
                        phone: currentUser.phone || '',
                        isDefault: (currentUser.addresses || []).length === 0,
                      });
                      setShowAddressModal(true);
                    }}
                    className="bg-[#1A1A1A] text-white px-4 py-2 text-xs font-mono uppercase tracking-widest flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Address
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(currentUser.addresses || []).map((addr, idx) => (
                    <div
                      key={addr.id || idx}
                      className="border border-[#E5E0D8] p-5 bg-[#FAF8F5] relative flex flex-col justify-between"
                    >
                      {addr.isDefault && (
                        <span className="absolute top-4 right-4 bg-[#1A1A1A] text-white text-[9px] font-mono px-2 py-0.5 uppercase tracking-widest">
                          Primary
                        </span>
                      )}
                      <div className="text-xs text-[#3A3530] space-y-1">
                        <p className="font-semibold text-sm text-[#1A1A1A] font-serif">{addr.fullName}</p>
                        <p>{addr.street}</p>
                        <p>
                          {addr.city}, {addr.state} {addr.postalCode}
                        </p>
                        <p>{addr.country}</p>
                        {addr.phone && <p className="font-mono text-[11px] text-[#8C8275]">Tel: {addr.phone}</p>}
                      </div>

                      <div className="flex gap-3 pt-4 mt-4 border-t border-[#E5E0D8]/60">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAddressIndex(idx);
                            setNewAddress({
                              id: addr.id,
                              fullName: addr.fullName,
                              street: addr.street,
                              city: addr.city,
                              state: addr.state || '',
                              postalCode: addr.postalCode,
                              country: addr.country,
                              phone: addr.phone || '',
                              isDefault: !!addr.isDefault,
                            });
                            setShowAddressModal(true);
                          }}
                          className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A] hover:underline flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(idx)}
                          className="text-[10px] font-mono uppercase tracking-widest text-rose-700 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Address modal */}
                {showAddressModal && (
                  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white border border-[#E5E0D8] max-w-lg w-full p-6 sm:p-8 shadow-xl">
                      <h3 className="font-serif text-xl text-[#1A1A1A] font-light mb-4">
                        {editingAddressIndex !== null ? 'Modify Address' : 'New Delivery Destination'}
                      </h3>

                      <form onSubmit={handleSaveAddress} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                            Recipient Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={newAddress.fullName}
                            onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                            className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-2 text-xs text-[#1A1A1A]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">
                            Street & Residence
                          </label>
                          <input
                            type="text"
                            required
                            value={newAddress.street}
                            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                            className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-2 text-xs text-[#1A1A1A]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">City</label>
                            <input
                              type="text"
                              required
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                              className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-2 text-xs text-[#1A1A1A]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">State / Province</label>
                            <input
                              type="text"
                              required
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                              className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-2 text-xs text-[#1A1A1A]"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">Postal Code</label>
                            <input
                              type="text"
                              required
                              value={newAddress.postalCode}
                              onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                              className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-2 text-xs font-mono text-[#1A1A1A]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-[#8C8275] mb-1">Country</label>
                            <input
                              type="text"
                              required
                              value={newAddress.country}
                              onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                              className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-2 text-xs text-[#1A1A1A]"
                            />
                          </div>
                        </div>

                        <label className="flex items-center gap-2 text-xs text-[#5A534A] pt-2">
                          <input
                            type="checkbox"
                            checked={newAddress.isDefault}
                            onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                            className="accent-[#1A1A1A]"
                          />
                          <span>Set as primary default destination</span>
                        </label>

                        <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E0D8]">
                          <button
                            type="button"
                            onClick={() => setShowAddressModal(false)}
                            className="border border-[#E5E0D8] px-4 py-2 text-xs font-mono uppercase"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-[#1A1A1A] text-white px-6 py-2 text-xs font-mono uppercase"
                          >
                            Save Address
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white border border-[#E5E0D8] p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="font-serif text-xl text-[#1A1A1A] font-light">Patron Account Settings</h2>
                  <p className="text-xs text-[#8C8275] font-light mt-0.5">
                    Configure notifications, currency display, and confidential security settings.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#E5E0D8] text-xs">
                  <div className="flex items-center justify-between py-3 border-b border-[#E5E0D8]">
                    <div>
                      <p className="font-medium text-[#1A1A1A]">Private Runway Invitations</p>
                      <p className="text-[#8C8275] text-[11px]">Receive early preview alerts 48 hours before public launch.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#1A1A1A] scale-110" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-[#E5E0D8]">
                    <div>
                      <p className="font-medium text-[#1A1A1A]">SMS Courier Notifications</p>
                      <p className="text-[#8C8275] text-[11px]">Direct mobile dispatch alerts from our white-glove carriers.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#1A1A1A] scale-110" />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => addToast('Preferences saved successfully.', 'success')}
                    className="bg-[#1A1A1A] text-white px-8 py-3 text-xs font-mono uppercase tracking-[0.2em]"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

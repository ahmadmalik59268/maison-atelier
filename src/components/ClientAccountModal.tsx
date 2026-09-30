import React, { useState } from 'react';
import { X, User, Ruler, Package, Award, Sparkles, Check, ChevronRight } from 'lucide-react';
import { UserMeasurements, CurrencyCode, OrderRecord } from '../types';
import { CURRENCIES, DEMO_ORDERS } from '../data/atelierData';

interface ClientAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onTrackOrder: (orderId: string) => void;
  onOpenLookbook: () => void;
  onOpenBoutiques: () => void;
}

export const ClientAccountModal: React.FC<ClientAccountModalProps> = ({
  isOpen,
  onClose,
  currency,
  onTrackOrder,
  onOpenLookbook,
  onOpenBoutiques,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'measurements' | 'orders'>('profile');
  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  const [measurements, setMeasurements] = useState<UserMeasurements>({
    heightCm: 175,
    bustChestCm: 92,
    waistCm: 74,
    hipCm: 98,
    preferredFit: 'Architectural Oversized',
  });

  const [calculatedSize, setCalculatedSize] = useState<{ fr: string; it: string; us: string; note: string }>({
    fr: '38 FR',
    it: '48 IT',
    us: '6 US (M)',
    note: 'Your proportions align with standard sample drape. We recommend FR 38 for jackets and trousers.',
  });

  if (!isOpen) return null;

  const calculateOptimalSize = (m: UserMeasurements) => {
    let fr = '38 FR';
    let it = '48 IT';
    let us = '6 US';
    let note = '';

    const bust = m.bustChestCm ?? 89;

    if (bust < 86) {
      fr = '34 FR';
      it = '44 IT';
      us = '2 US (XS)';
      note = 'Petite tailored frame. Opt for FR 34 for a disciplined shoulder.';
    } else if (bust < 90) {
      fr = '36 FR';
      it = '46 IT';
      us = '4 US (S)';
      note = 'Slender architectural silhouette. FR 36 provides effortless fluid drape.';
    } else if (bust < 96) {
      fr = '38 FR';
      it = '48 IT';
      us = '6 US (M)';
      note = 'Standard campaign sample proportion. FR 38 delivers the intended runway drape.';
    } else if (bust < 102) {
      fr = '40 FR';
      it = '50 IT';
      us = '8 US (L)';
      note = 'Generous sartorial volume. FR 40 ensures zero tension across shoulders.';
    } else {
      fr = '42 FR';
      it = '52 IT';
      us = '10 US (XL)';
      note = 'Commanding silhouette. FR 42 gives graceful movement across suiting.';
    }

    setCalculatedSize({ fr, it, us, note });
  };

  const handleMeasurementChange = (field: keyof UserMeasurements, val: any) => {
    const updated = { ...measurements, [field]: val };
    setMeasurements(updated);
    calculateOptimalSize(updated);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#18181B]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 lg:p-10 relative">
        <div className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E8E2D8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F5F3F0]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#18181B] text-white flex items-center justify-center font-serif text-sm">
                M
              </div>
              <div>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#9E4734] font-semibold block">
                  Private Atelier Guild
                </span>
                <h3 className="font-serif text-xl text-[#18181B] font-medium">
                  Client Profile &amp; Fitting File
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#18181B] hover:text-[#9E4734]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation tabs */}
          <div className="flex border-b border-[#E8E2D8] bg-white text-xs uppercase tracking-wider font-semibold">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 border-r border-[#E8E2D8] flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'profile' ? 'bg-[#18181B] text-white' : 'text-[#77767B] hover:bg-[#F5F3F0]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Patron Profile
            </button>
            <button
              onClick={() => setActiveTab('measurements')}
              className={`flex-1 py-3 border-r border-[#E8E2D8] flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'measurements' ? 'bg-[#18181B] text-white' : 'text-[#77767B] hover:bg-[#F5F3F0]'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              Bespoke Fit Advisor
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'orders' ? 'bg-[#18181B] text-white' : 'text-[#77767B] hover:bg-[#F5F3F0]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              Order Archive ({DEMO_ORDERS.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Guild Tier Hero Card */}
                <div className="p-6 bg-[#18181B] text-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-[#9E4734]">
                  <div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#9E4734]" />
                      <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#E8E2D8] font-semibold">
                        Guild Status: Tier I
                      </span>
                    </div>
                    <h4 className="font-serif text-2xl mt-1 text-[#FAF8F5]">
                      Patron Privilégié
                    </h4>
                    <p className="font-sans text-xs text-[#77767B] mt-1 font-light">
                      Member Dossier #MA-GUILD-8821 • Registered Paris Salon
                    </p>
                  </div>
                  <div className="text-left sm:text-right font-sans text-xs space-y-1">
                    <span className="px-3 py-1 bg-[#FAF8F5]/10 text-white border border-white/20 inline-block font-mono">
                      15% Permanent Runway Privilege
                    </span>
                    <p className="text-[11px] text-[#E8E2D8]/80">Next Runway: Paris Fashion Week SS26</p>
                  </div>
                </div>

                {/* Privileges Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-[#F5F3F0] border border-[#E8E2D8] space-y-1.5">
                    <span className="font-semibold text-[#18181B] block">Private Salon Fitting</span>
                    <p className="text-[#77767B]">Complimentary champagne &amp; tea tasting at Paris, NY, Tokyo, Milan, London suites.</p>
                  </div>
                  <div className="p-4 bg-[#F5F3F0] border border-[#E8E2D8] space-y-1.5">
                    <span className="font-semibold text-[#18181B] block">Lifetime Repair Care</span>
                    <p className="text-[#77767B]">Master seam reconstruction and hem adjustments at zero cost for life.</p>
                  </div>
                  <div className="p-4 bg-[#F5F3F0] border border-[#E8E2D8] space-y-1.5">
                    <span className="font-semibold text-[#18181B] block">Express Courier Vault</span>
                    <p className="text-[#77767B]">Same-day dispatch in museum-grade cedar storage boxes with carbon tracking.</p>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenLookbook();
                    }}
                    className="px-5 py-2.5 bg-[#18181B] text-white font-sans text-[10px] uppercase font-semibold tracking-wider hover:bg-[#9E4734] transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Preview Runway Capsule
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBoutiques();
                    }}
                    className="px-5 py-2.5 bg-white border border-[#E8E2D8] hover:border-[#18181B] text-[#18181B] font-sans text-[10px] uppercase font-semibold tracking-wider transition-colors"
                  >
                    Reserve Salon Fitting
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'measurements' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-xl text-[#18181B]">
                    Smart Architectural Fit Calculator
                  </h4>
                  <p className="font-sans text-xs text-[#77767B] font-light mt-1">
                    Enter your anatomical measurements to calibrate the exact tailoring size for Maison Atelier wools, silks, and cashmere.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inputs */}
                  <div className="space-y-4 bg-white p-5 border border-[#E8E2D8] text-xs">
                    <div>
                      <div className="flex justify-between font-semibold text-[#18181B] mb-1">
                        <span>Height</span>
                        <span className="font-mono">{measurements.heightCm} cm</span>
                      </div>
                      <input
                        type="range"
                        min="150"
                        max="205"
                        value={measurements.heightCm}
                        onChange={(e) => handleMeasurementChange('heightCm', Number(e.target.value))}
                        className="w-full accent-[#18181B]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-[#18181B] mb-1">
                        <span>Bust / Chest Circumference</span>
                        <span className="font-mono">{measurements.bustChestCm} cm</span>
                      </div>
                      <input
                        type="range"
                        min="75"
                        max="125"
                        value={measurements.bustChestCm}
                        onChange={(e) => handleMeasurementChange('bustChestCm', Number(e.target.value))}
                        className="w-full accent-[#18181B]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-[#18181B] mb-1">
                        <span>Natural Waist</span>
                        <span className="font-mono">{measurements.waistCm} cm</span>
                      </div>
                      <input
                        type="range"
                        min="58"
                        max="110"
                        value={measurements.waistCm}
                        onChange={(e) => handleMeasurementChange('waistCm', Number(e.target.value))}
                        className="w-full accent-[#18181B]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-[#18181B] mb-1">
                        <span>Hip Circumference</span>
                        <span className="font-mono">{measurements.hipCm} cm</span>
                      </div>
                      <input
                        type="range"
                        min="80"
                        max="130"
                        value={measurements.hipCm}
                        onChange={(e) => handleMeasurementChange('hipCm', Number(e.target.value))}
                        className="w-full accent-[#18181B]"
                      />
                    </div>
                  </div>

                  {/* Recommendation Card */}
                  <div className="bg-[#F5F3F0] p-6 border border-[#E8E2D8] flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#9E4734] font-semibold block">
                        Optimal Tailoring Recommendation
                      </span>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-3 bg-white border border-[#E8E2D8]">
                          <span className="text-[10px] text-[#77767B] uppercase block">French</span>
                          <span className="font-mono text-base font-bold text-[#18181B]">{calculatedSize.fr}</span>
                        </div>
                        <div className="p-3 bg-white border border-[#E8E2D8]">
                          <span className="text-[10px] text-[#77767B] uppercase block">Italian</span>
                          <span className="font-mono text-base font-bold text-[#18181B]">{calculatedSize.it}</span>
                        </div>
                        <div className="p-3 bg-white border border-[#E8E2D8]">
                          <span className="text-[10px] text-[#77767B] uppercase block">US / Intl</span>
                          <span className="font-mono text-base font-bold text-[#18181B]">{calculatedSize.us}</span>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-[#47464B] leading-relaxed">
                        {calculatedSize.note}
                      </p>
                    </div>

                    <div className="p-3 bg-white border border-[#E8E2D8] flex items-center gap-2 text-xs text-[#18181B]">
                      <Check className="w-4 h-4 text-[#9E4734]" />
                      <span>This profile is automatically referenced during Quick Add &amp; Checkout.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                {DEMO_ORDERS.map((ord) => (
                  <div key={ord.id} className="p-5 bg-white border border-[#E8E2D8] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E2D8] pb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#18181B]">{ord.id}</span>
                        <span className="text-xs text-[#77767B] ml-3">Placed: {ord.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#F5F3F0] text-[#9E4734] font-semibold text-[10px] uppercase border border-[#E8E2D8]">
                          {ord.status}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#18181B]">
                          {curr.symbol}{Math.round(ord.total * curr.rate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-[#77767B]">
                        <span>Carrier: {ord.carrier}</span>
                        <span className="mx-2">•</span>
                        <span>Est: {ord.estimatedDelivery}</span>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onTrackOrder(ord.id);
                        }}
                        className="text-xs font-semibold uppercase tracking-wider text-[#9E4734] hover:text-[#18181B] flex items-center gap-1"
                      >
                        Live Tracking Timeline
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

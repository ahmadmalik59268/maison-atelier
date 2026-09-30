import React, { useState } from 'react';
import { X, MapPin, Clock, Phone, UserCheck, Calendar, CheckCircle } from 'lucide-react';
import { Boutique, Product } from '../types';

interface BoutiqueModalProps {
  isOpen: boolean;
  onClose: () => void;
  boutiques: Boutique[];
  initialBoutiqueId?: string;
  selectedProduct?: Product | null;
  onBookingConfirmed: (msg: string) => void;
}

export const BoutiqueModal: React.FC<BoutiqueModalProps> = ({
  isOpen,
  onClose,
  boutiques,
  initialBoutiqueId,
  selectedProduct,
  onBookingConfirmed,
}) => {
  const [activeBoutiqueId, setActiveBoutiqueId] = useState<string>(initialBoutiqueId || boutiques[0]?.id || 'paris');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-10-15');
  const [preferredTime, setPreferredTime] = useState('14:30');
  const [notes, setNotes] = useState(selectedProduct ? `Bespoke fitting inquiry for: ${selectedProduct.name}` : '');
  const [booked, setBooked] = useState(false);

  React.useEffect(() => {
    if (initialBoutiqueId) {
      setActiveBoutiqueId(initialBoutiqueId);
    }
  }, [initialBoutiqueId]);

  React.useEffect(() => {
    if (selectedProduct) {
      setNotes(`Bespoke fitting inquiry for: ${selectedProduct.name} (${selectedProduct.fabric})`);
    }
  }, [selectedProduct]);

  if (!isOpen) return null;

  const currentBoutique = boutiques.find((b) => b.id === activeBoutiqueId) || boutiques[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    onBookingConfirmed(
      `Private appointment reserved at ${currentBoutique.city} Salon on ${preferredDate} at ${preferredTime} for ${clientName}.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#18181B]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-10 relative">
        <div className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E8E2D8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F5F3F0]">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#9E4734] font-semibold block">
                Atelier Salons
              </span>
              <h2 className="font-serif text-2xl text-[#18181B] font-medium">
                Boutiques &amp; Private Fitting Suites
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#18181B] hover:text-[#9E4734]"
              aria-label="Close boutiques"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Boutique Selector Tabs */}
          <div className="flex overflow-x-auto border-b border-[#E8E2D8] bg-white">
            {boutiques.map((b) => {
              const isActive = b.id === activeBoutiqueId;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setActiveBoutiqueId(b.id);
                    setBooked(false);
                  }}
                  className={`px-5 py-3 font-sans text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors border-r border-[#E8E2D8] ${
                    isActive
                      ? 'bg-[#18181B] text-white'
                      : 'text-[#77767B] hover:bg-[#F5F3F0] hover:text-[#18181B]'
                  }`}
                >
                  {b.city}
                </button>
              );
            })}
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 p-6 sm:p-8 gap-8">
            {/* Salon Details */}
            <div className="space-y-6">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#77767B] font-semibold">
                  {currentBoutique.district}
                </span>
                <h3 className="font-serif text-3xl text-[#18181B] font-normal mt-0.5">
                  Maison Atelier {currentBoutique.city}
                </h3>
              </div>

              <div className="space-y-3 text-xs text-[#47464B]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#9E4734] shrink-0 mt-0.5" />
                  <span>{currentBoutique.address}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#9E4734] shrink-0 mt-0.5" />
                  <span>{currentBoutique.hours}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#9E4734] shrink-0 mt-0.5" />
                  <span>{currentBoutique.phone}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <UserCheck className="w-4 h-4 text-[#9E4734] shrink-0 mt-0.5" />
                  <span>
                    Master Tailor in Residence: <strong className="text-[#18181B]">{currentBoutique.headTailor}</strong>
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8E2D8]">
                <p className="font-sans text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-2">
                  Complimentary Salon Services:
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {(currentBoutique.salonServices || []).map((svc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#77767B]">
                      <span className="w-1 h-1 bg-[#9E4734]" />
                      <span>{svc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Appointment Booking Form */}
            <div className="bg-[#F5F3F0] p-6 border border-[#E8E2D8]">
              {booked ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                  <CheckCircle className="w-10 h-10 text-[#9E4734]" />
                  <h4 className="font-serif text-xl text-[#18181B]">Appointment Confirmed</h4>
                  <p className="font-sans text-xs text-[#77767B] max-w-xs">
                    Our {currentBoutique.city} Concierge will welcome you on <strong>{preferredDate}</strong> at <strong>{preferredTime}</strong>. A confirmation has been dispatched.
                  </p>
                  <button
                    onClick={() => setBooked(false)}
                    className="text-xs uppercase tracking-widest text-[#9E4734] underline font-semibold mt-4"
                  >
                    Schedule Another Session
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <h4 className="font-serif text-lg text-[#18181B] font-medium">
                      Schedule a Private Fitting
                    </h4>
                    <p className="font-sans text-xs text-[#77767B] font-light">
                      Enjoy a dedicated suite, espresso &amp; champagne, and one-on-one consultation.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Helena Vance"
                      className="w-full px-3 py-2 bg-white border border-[#E8E2D8] text-xs font-sans focus:outline-none focus:border-[#18181B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@domaine.com"
                      className="w-full px-3 py-2 bg-white border border-[#E8E2D8] text-xs font-sans focus:outline-none focus:border-[#18181B]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8E2D8] text-xs font-sans focus:outline-none focus:border-[#18181B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-1">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        required
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E8E2D8] text-xs font-sans focus:outline-none focus:border-[#18181B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#18181B] mb-1">
                      Sartorial Notes or Pieces to Preview
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Specific garments or bespoke suiting preferences..."
                      className="w-full px-3 py-2 bg-white border border-[#E8E2D8] text-xs font-sans focus:outline-none focus:border-[#18181B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#18181B] text-white font-sans text-[10px] uppercase tracking-widest font-semibold hover:bg-[#9E4734] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Confirm Salon Reservation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

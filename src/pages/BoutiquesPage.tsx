import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Check, ArrowRight } from 'lucide-react';
import { BOUTIQUES } from '../data/atelierData';
import { useShop } from '../context/ShopContext';

export const BoutiquesPage: React.FC = () => {
  const { addToast } = useShop();
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string>(BOUTIQUES[0].id);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [patronName, setPatronName] = useState('');
  const [patronEmail, setPatronEmail] = useState('');
  const [serviceType, setServiceType] = useState('Haute Couture Fitting');
  const [isBooked, setIsBooked] = useState(false);

  const activeBoutique = BOUTIQUES.find(b => b.id === selectedBoutiqueId) || BOUTIQUES[0];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    addToast(`Private concierge fitting requested at ${activeBoutique.city}. Confirmation sent to ${patronEmail}.`, 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#8C8275] mb-2">
            Global Flagships & Salons
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-light tracking-tight">
            Maison Boutiques
          </h1>
          <p className="text-sm text-[#5A534A] font-light mt-3 leading-relaxed">
            Experience our tactile materials in person across Paris, London, New York, Tokyo, and Milan. Reserve a private dressing salon with our master tailors.
          </p>
        </div>

        {/* Boutique List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {BOUTIQUES.map((boutique) => {
            const isSelected = boutique.id === selectedBoutiqueId;
            return (
              <div
                key={boutique.id}
                onClick={() => {
                  setSelectedBoutiqueId(boutique.id);
                  setIsBooked(false);
                }}
                className={`bg-white border cursor-pointer overflow-hidden transition-all ${
                  isSelected ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#E5E0D8] hover:border-[#8C8275]'
                }`}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={boutique.image}
                    alt={boutique.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 text-white px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest">
                    {boutique.city}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl text-[#1A1A1A] font-light">{boutique.name}</h3>
                  <div className="space-y-1.5 text-xs text-[#5A534A] font-light">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#8C8275] shrink-0" />
                      <span>{boutique.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#8C8275] shrink-0" />
                      <span className="font-mono text-[11px]">{boutique.phone}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#8C8275] shrink-0" />
                      <span className="font-mono text-[11px]">{boutique.hours}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Private Fitting Concierge Booking Form */}
        <div className="bg-white border border-[#E5E0D8] p-8 sm:p-12 shadow-sm max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C8275]">
              Concierge Reservation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-light mt-1">
              Private Salon Appointment at {activeBoutique.name}
            </h2>
            <p className="text-xs text-[#5A534A] font-light mt-1">
              {activeBoutique.address} • White-glove beverage service & private fitting room provided.
            </p>
          </div>

          {isBooked ? (
            <div className="p-8 bg-[#FAF8F5] border border-[#E5E0D8] text-center space-y-3">
              <div className="w-12 h-12 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#1A1A1A]">Appointment Requested</h3>
              <p className="text-xs text-[#5A534A] max-w-md mx-auto">
                Thank you, {patronName}. Our master tailor at {activeBoutique.name} has reserved your slot for {serviceType}. A confirmation SMS and calendar dossier will follow.
              </p>
              <button
                type="button"
                onClick={() => setIsBooked(false)}
                className="mt-4 text-xs font-mono uppercase underline text-[#1A1A1A]"
              >
                Book Another Fitting
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1">
                    Patron Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patronName}
                    onChange={(e) => setPatronName(e.target.value)}
                    placeholder="Lady Catherine Grey"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-2.5 text-xs text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1">
                    Patron Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={patronEmail}
                    onChange={(e) => setPatronEmail(e.target.value)}
                    placeholder="catherine@grey.com"
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-2.5 text-xs font-mono text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1">
                    Preferred Date & Time *
                  </label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-2.5 text-xs font-mono text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1">
                    Service Experience *
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] font-mono"
                  >
                    <option>Haute Couture Fitting</option>
                    <option>Bespoke Overcoat Calibration</option>
                    <option>Private Runway Preview Salon</option>
                    <option>Bridal & Gala Wardrobe Consulting</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="bg-[#1A1A1A] text-white px-10 py-3.5 text-xs font-mono uppercase tracking-[0.2em] hover:bg-black transition-colors"
                >
                  Request Private Salon Slot
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

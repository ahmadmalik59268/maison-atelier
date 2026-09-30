import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Bespoke Order Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your inquiry has been relayed to our head concierge in Paris.', 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#8C8275]">
            Ahmad Clothing • Concierge Direct
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] font-light tracking-tight">
            Client Relations & Private Inquiries
          </h1>
          <p className="text-sm text-[#5A534A] font-light max-w-lg mx-auto">
            Our private client liaisons at Ahmad Clothing are at your service for styling advice, bespoke fittings, order tracking, and private salon appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="bg-white border border-[#E5E0D8] p-6 space-y-6 shadow-sm">
            <h3 className="font-serif text-xl text-[#1A1A1A]">Direct Channels</h3>
            
            <div className="space-y-4 text-xs text-[#5A534A] font-light">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] mb-1">Global Concierge Phone</p>
                <p className="font-mono text-sm text-[#1A1A1A]">+33 1 42 68 00 00</p>
                <p className="text-[11px] text-[#8C8275] mt-0.5">Mon – Sat, 9:00 – 19:00 CET</p>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] mb-1">Electronic Mail</p>
                <p className="font-mono text-xs text-[#1A1A1A]">concierge@ahmadclothing.com</p>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] mb-1">Head Atelier</p>
                <p className="text-[#1A1A1A]">24 Rue Saint-Honoré</p>
                <p>75001 Paris, France</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-white border border-[#E5E0D8] p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto stroke-1" />
                <h3 className="font-serif text-2xl text-[#1A1A1A]">Dossier Transmitted</h3>
                <p className="text-xs text-[#5A534A] max-w-md mx-auto">
                  Thank you, {formData.name}. Our master concierge will review your message and reply via encrypted electronic dispatch within 4 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Bespoke Order Inquiry', message: '' });
                  }}
                  className="mt-4 text-xs font-mono uppercase underline text-[#1A1A1A]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1">
                      Patron Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lord Julian Sterling"
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sterling@house.com"
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-2.5 text-xs font-mono text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1">
                    Subject Classification *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-2.5 text-xs text-[#1A1A1A] font-mono"
                  >
                    <option>Bespoke Order Inquiry</option>
                    <option>Sizing & Fit Consultation</option>
                    <option>Private Salon Appointment</option>
                    <option>Press & Editorial Inquiries</option>
                    <option>International Air Dispatch Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your styling requirements or inquiry..."
                    className="w-full bg-[#FAF8F5] border border-[#E5E0D8] p-3.5 text-xs text-[#1A1A1A]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#1A1A1A] text-white px-8 py-3 text-xs font-mono uppercase tracking-[0.2em] hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Transmit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Search, PackageCheck, Plane, CheckCircle2, Clock, MapPin, Truck, AlertCircle } from 'lucide-react';
import { OrderRecord, CurrencyCode } from '../types';
import { DEMO_ORDERS, CURRENCIES } from '../data/atelierData';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: CurrencyCode;
  initialOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  currency = 'USD',
  initialOrderId,
}) => {
  const [searchCode, setSearchCode] = useState(initialOrderId || 'MA-2025-8831');
  const [currentOrder, setCurrentOrder] = useState<OrderRecord | null>(DEMO_ORDERS[0]);
  const [searched, setSearched] = useState(true);
  const [notFound, setNotFound] = useState(false);

  React.useEffect(() => {
    if (initialOrderId) {
      setSearchCode(initialOrderId);
      handleSearch(initialOrderId);
    }
  }, [initialOrderId]);

  if (!isOpen) return null;

  const handleSearch = (codeToSearch?: string) => {
    const query = (codeToSearch || searchCode).trim().toUpperCase();
    setSearched(true);
    const found = DEMO_ORDERS.find((o) => o.id.toUpperCase() === query);
    if (found) {
      setCurrentOrder(found);
      setNotFound(false);
    } else if (query.startsWith('MA-2025-')) {
      // Dynamic simulated order for any custom placed order in current session
      const dynamicOrder: OrderRecord = {
        id: query,
        date: 'Today, 2025',
        total: 770,
        subtotal: 770,
        shipping: 0,
        discount: 0,
        currency: 'USD',
        status: 'pending',
        carrier: 'DHL Express VIP Air Courier',
        trackingNumber: `MA-AWB-${Math.floor(10000 + Math.random() * 90000)}`,
        estimatedDelivery: '3-4 Business Days',
        customerEmail: 'patron@atelier.com',
        paymentMethod: 'card',
        shippingAddress: {
          id: 'addr-dyn',
          fullName: 'Valued Atelier Patron',
          street: 'Private Residence',
          city: 'Paris',
          country: 'France',
          postalCode: '75001'
        },
        items: [
          DEMO_ORDERS[0].items[0]
        ],
        timeline: [
          {
            title: 'Dossier Registered & Pattern Basting',
            location: 'Florence Tailoring Studio',
            timestamp: 'Just now',
            completed: true,
            active: true,
            description: 'Virgin fibers measured, hand-chalked and queued for master sewing.'
          },
          {
            title: 'Artisanal Seam Construction',
            location: 'Florence Hub',
            timestamp: 'Pending Hand Assembly',
            completed: false,
            active: false,
            description: 'Master tailors applying pick-stitching and internal horn buttons.'
          },
          {
            title: 'Museum-Grade Boxing & Dispatch',
            location: 'Express Air Hub',
            timestamp: 'Pending Quality Seal',
            completed: false,
            active: false,
            description: 'Air dispatch with carbon-neutral priority tracking.'
          }
        ]
      };
      setCurrentOrder(dynamicOrder);
      setNotFound(false);
    } else {
      setCurrentOrder(null);
      setNotFound(true);
    }
  };

  const curr = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#18181B]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 lg:p-10 relative">
        <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#E8E2D8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F5F3F0]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#9E4734]" />
              <span className="font-serif text-lg text-[#18181B] font-medium uppercase tracking-tight">
                Concierge Dispatch &amp; Order Tracking
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#18181B] hover:text-[#9E4734]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 sm:p-6 bg-white border-b border-[#E8E2D8]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77767B]" />
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Enter courier reference (e.g. MA-2025-8831)"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] text-xs font-mono uppercase focus:outline-none focus:border-[#18181B]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#18181B] text-white font-sans text-[10px] uppercase font-semibold tracking-wider hover:bg-[#9E4734] transition-colors"
              >
                Track Shipment
              </button>
            </form>
            <div className="flex items-center gap-2 mt-2 text-[10px] text-[#77767B]">
              <span>Sample Active Trackings:</span>
              <button
                type="button"
                onClick={() => {
                  setSearchCode('MA-2025-8831');
                  handleSearch('MA-2025-8831');
                }}
                className="underline font-mono text-[#9E4734] hover:text-[#18181B]"
              >
                MA-2025-8831
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="p-5 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {notFound ? (
              <div className="py-12 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-[#ba1a1a] mx-auto opacity-70" />
                <p className="font-serif text-lg text-[#18181B]">Reference Not Found</p>
                <p className="font-sans text-xs text-[#77767B] max-w-sm mx-auto">
                  We could not locate reference &ldquo;{searchCode}&rdquo;. Please verify your tracking code or contact client concierge.
                </p>
              </div>
            ) : currentOrder ? (
              <div className="space-y-6">
                {/* Status Hero Card */}
                <div className="p-4 sm:p-5 bg-[#F5F3F0] border border-[#E8E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#18181B]">{currentOrder.id}</span>
                      <span className="px-2 py-0.5 bg-[#18181B] text-white text-[9px] uppercase tracking-wider font-semibold">
                        {currentOrder.status}
                      </span>
                    </div>
                    <p className="font-serif text-lg text-[#18181B] mt-1 font-medium">
                      Estimated Arrival: {currentOrder.estimatedDelivery}
                    </p>
                    <p className="font-sans text-xs text-[#77767B] mt-0.5">
                      Carrier: {currentOrder.carrier}
                    </p>
                  </div>

                  <div className="text-left sm:text-right font-sans text-xs border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E8E2D8]">
                    <span className="text-[#77767B] block">Destination:</span>
                    <span className="font-semibold text-[#18181B]">{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.country}</span>
                    <span className="text-[#9E4734] font-semibold block mt-0.5">
                      {curr.symbol}{Math.round(currentOrder.total * curr.rate)} Settled
                    </span>
                  </div>
                </div>

                {/* Step-by-Step Timeline */}
                <div>
                  <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#18181B] mb-4">
                    Sovereign Provenance &amp; Transit Log
                  </h4>

                  <div className="space-y-6 relative pl-6 border-l-2 border-[#E8E2D8] ml-3">
                    {(currentOrder.timeline || []).map((step, idx) => (
                      <div key={idx} className="relative">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-none flex items-center justify-center border ${
                            step.completed
                              ? 'bg-[#18181B] border-[#18181B] text-white'
                              : step.active
                              ? 'bg-[#9E4734] border-[#9E4734] text-white animate-pulse'
                              : 'bg-white border-[#E8E2D8] text-[#77767B]'
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : step.active ? (
                            <Plane className="w-2.5 h-2.5" />
                          ) : (
                            <Clock className="w-2.5 h-2.5" />
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-baseline gap-x-3">
                            <h5 className={`font-serif text-sm sm:text-base ${step.active ? 'text-[#9E4734] font-semibold' : 'text-[#18181B]'}`}>
                              {step.title}
                            </h5>
                            <span className="font-sans text-[10px] font-mono text-[#77767B]">
                              {step.timestamp}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-[#77767B] mt-0.5">
                            <MapPin className="w-3 h-3 text-[#9E4734] shrink-0" />
                            <span>{step.location}</span>
                          </div>
                          <p className="font-sans text-xs text-[#47464B] mt-1 font-light leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Package Manifest */}
                <div className="border-t border-[#E8E2D8] pt-4">
                  <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#18181B] mb-3">
                    Consignment Manifest
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentOrder.items.map((item) => (
                      <div key={item.id} className="flex gap-3 p-2.5 bg-[#F5F3F0] border border-[#E8E2D8]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-14 object-cover shrink-0 border border-[#E8E2D8]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-xs">
                          <h6 className="font-semibold text-[#18181B] line-clamp-1">{item.name}</h6>
                          <p className="text-[11px] text-[#77767B]">{item.fabric}</p>
                          <p className="text-[10px] text-[#18181B] font-mono mt-0.5">
                            Qty: {item.quantity} • {item.selectedSize} • {item.selectedColor.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

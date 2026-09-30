import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PolicyModal } from './PolicyModal';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, isAdmin } = useShop();
  const [gazetteEmail, setGazetteEmail] = useState('');
  const [policyModal, setPolicyModal] = useState<{ isOpen: boolean; title: string; content: string }>({
    isOpen: false,
    title: '',
    content: '',
  });

  const handleGazetteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gazetteEmail) return;
    showToast(`The Ahmad Gazette: Dispatched invitation confirmation to ${gazetteEmail}`);
    setGazetteEmail('');
  };

  const openPolicy = (title: string, content: string) => {
    setPolicyModal({ isOpen: true, title, content });
  };

  return (
    <>
      <footer className="w-full bg-[#F5F3F0] pt-12 sm:pt-16 pb-28 sm:pb-12 border-t border-[#E8E2D8]">
        <div className="w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 sm:pb-16 border-b border-[#E8E2D8]">
            {/* Brand & Gazette (col-span-2 sm:col-span-4 lg:col-span-4) */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-4 space-y-4">
              <Logo size="lg" />
              <p className="font-sans text-xs text-[#77767B] max-w-sm font-light leading-relaxed">
                An architectural dialogue of materiality, bespoke tailoring, and austere luxury. Designed by Ahmad Clothing, meticulously crafted globally across Italian and Portuguese ateliers.
              </p>

              <div className="pt-2">
                <p className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#18181B] mb-1">
                  The Maison Gazette
                </p>
                <p className="font-sans text-xs text-[#77767B] mb-3">
                  Receive invitation-only previews, private runway releases, and editorial essays.
                </p>
                <form onSubmit={handleGazetteSubmit} className="flex items-center max-w-sm border-b border-[#18181B] pb-1">
                  <input
                    type="email"
                    value={gazetteEmail}
                    onChange={(e) => setGazetteEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent font-sans text-xs text-[#18181B] placeholder:text-[#77767B] py-1 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest px-3 sm:px-4 py-1.5 bg-[#18181B] text-white hover:bg-[#9E4734] transition-colors shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Collections (col-span-1 sm:col-span-2 lg:col-span-2) */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-3">
              <h4 className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#18181B]">
                Collections
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/shop" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    All Catalog Pieces
                  </Link>
                </li>
                <li>
                  <Link to="/new-arrivals" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link to="/women" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Women’s Ready-to-Wear
                  </Link>
                </li>
                <li>
                  <Link to="/men" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Men’s Sartorial
                  </Link>
                </li>
                <li>
                  <Link to="/category/outerwear" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Outerwear &amp; Coats
                  </Link>
                </li>
                <li>
                  <Link to="/category/tailoring" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Tailored Suiting
                  </Link>
                </li>
                <li>
                  <Link to="/category/knitwear" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Fine Cashmere Knits
                  </Link>
                </li>
              </ul>
            </div>

            {/* Concierge & Client (col-span-1 sm:col-span-2 lg:col-span-2) */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-3">
              <h4 className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#18181B]">
                Concierge
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/account" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Private Patron Account
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Track Courier Delivery
                  </Link>
                </li>
                <li>
                  <Link to="/style-studio" className="font-sans text-xs text-[#9E4734] font-medium hover:text-[#18181B] transition-colors">
                    Virtual Style Studio
                  </Link>
                </li>
                <li>
                  <Link to="/lookbook" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Runway Lookbook
                  </Link>
                </li>
                <li>
                  <Link to="/boutiques" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Book Fitting Salon
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Contact Concierge
                  </Link>
                </li>
              </ul>
            </div>

            {/* Boutiques (col-span-1 sm:col-span-2 lg:col-span-2) */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-3">
              <h4 className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#18181B]">
                Boutique Salons
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/boutiques" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Paris — Rue Saint-Honoré
                  </Link>
                </li>
                <li>
                  <Link to="/boutiques" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    New York — Mercer St, SoHo
                  </Link>
                </li>
                <li>
                  <Link to="/boutiques" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Tokyo — Minami-Aoyama
                  </Link>
                </li>
                <li>
                  <Link to="/boutiques" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Milan — Montenapoleone
                  </Link>
                </li>
                <li>
                  <Link to="/boutiques" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    London — Mayfair Mount St
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors">
                    Heritage &amp; Savoir-Faire
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Governance (col-span-1 sm:col-span-2 lg:col-span-2) */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-3">
              <h4 className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#18181B]">
                Governance
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() =>
                      openPolicy(
                        'Complimentary Global Express Delivery',
                        'Maison Atelier provides carbon-neutral global priority delivery via DHL Express on all orders over $250. Orders are prepared in aromatic cedar boxes with white-glove signature required.'
                      )
                    }
                    className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors text-left cursor-pointer"
                  >
                    Global Dispatch Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      openPolicy(
                        'Complimentary Lifetime Atelier Tailoring',
                        'Every Maison Atelier piece includes complimentary seam, cuff, and waist alterations at our Paris, New York, Tokyo, Milan, and London salons for the lifetime of the garment.'
                      )
                    }
                    className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors text-left cursor-pointer"
                  >
                    Bespoke Guarantee
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      openPolicy(
                        'Traceability & Sustainable Fibers',
                        'All virgin wool, Surí alpaca, mulberry silk, and Mongolian cashmere lots are tagged with individual traceability IDs and certified non-mulesed, non-synthetic.'
                      )
                    }
                    className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors text-left cursor-pointer"
                  >
                    Traceability Charter
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      openPolicy(
                        'Client Confidentiality & Privacy',
                        'Maison Atelier maintains strict encryption standards for all patron biometric measurements, private fitting dossiers, and payment token authorizations.'
                      )
                    }
                    className="font-sans text-xs text-[#77767B] hover:text-[#18181B] transition-colors text-left cursor-pointer"
                  >
                    Privacy &amp; Data Security
                  </button>
                </li>
                <li>
                  <Link to="/admin" className="font-sans text-xs text-[#9E4734] font-medium hover:underline">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Accepted Payment Methods */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#77767B]">
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} Ahmad Clothing S.A. All rights reserved. Registered under French Haute Couture Federation.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[#47464B]">
              <span>Visa</span>
              <span>•</span>
              <span>Mastercard</span>
              <span>•</span>
              <span>Amex</span>
              <span>•</span>
              <span>Apple Pay</span>
              <span>•</span>
              <span>Cash on Delivery</span>
            </div>
          </div>
        </div>
      </footer>

      <PolicyModal
        isOpen={policyModal.isOpen}
        onClose={() => setPolicyModal({ isOpen: false, title: '', content: '' })}
        title={policyModal.title}
        content={policyModal.content}
      />
    </>
  );
};

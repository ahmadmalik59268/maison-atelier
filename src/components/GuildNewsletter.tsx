import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface GuildNewsletterProps {
  onSuccess?: (message: string) => void;
}

export const GuildNewsletter: React.FC<GuildNewsletterProps> = ({ onSuccess }) => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [memberCode, setMemberCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const generatedCode = 'GUILD-' + Math.floor(1000 + Math.random() * 9000);
    setMemberCode(generatedCode);
    setSubscribed(true);
    const msg = `Privilege access confirmed for ${email}. Code: ${generatedCode} (15% voucher applied)`;
    if (onSuccess) onSuccess(msg);
    else showToast(msg);
  };

  return (
    <section id="guild" className="w-full bg-[#FAF8F5] py-14 sm:py-20 lg:py-28 border-t border-[#E8E2D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-6">
        <span className="inline-block px-3 py-1 bg-[#F5F3F0] text-[#9E4734] font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest border border-[#E8E2D8]">
          The Private Atelier Guild
        </span>

        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#18181B] tracking-tight font-normal">
          Private Previews &amp; Bespoke Privileges
        </h2>

        <p className="font-sans text-xs sm:text-sm text-[#77767B] max-w-xl mx-auto leading-relaxed font-light">
          Enter your email for private salon access, early release invitations for our limited runway runs, and 15% off your maiden seasonal curation.
        </p>

        {subscribed ? (
          <div className="max-w-md mx-auto p-5 sm:p-6 bg-[#F5F3F0] border border-[#18181B] space-y-3 animate-in fade-in duration-300">
            <div className="w-8 h-8 bg-[#18181B] text-white flex items-center justify-center mx-auto">
              <Check className="w-4 h-4 text-white" />
            </div>
            <p className="font-serif text-base sm:text-lg text-[#18181B]">Welcome to the Maison Atelier Guild</p>
            <p className="font-sans text-xs text-[#77767B]">
              Your dossier has been registered. Enjoy 15% off using your private code:
            </p>
            <div className="p-2.5 bg-white border border-dashed border-[#18181B] font-mono text-xs font-bold tracking-widest text-[#9E4734]">
              {memberCode}
            </div>
            <p className="font-sans text-[10px] text-[#77767B] uppercase tracking-wider">
              An invitation to our upcoming Paris runway preview has been dispatched to {email}.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto pt-2 sm:pt-4 flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-grow px-4 sm:px-5 py-3 sm:py-4 bg-[#F5F3F0] font-sans text-xs sm:text-sm text-[#18181B] placeholder:text-[#77767B]/70 border border-[#E8E2D8] focus:outline-none focus:bg-[#FAF8F5] focus:border-[#9E4734] transition-all"
            />
            <button
              type="submit"
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#18181B] text-[#FAF8F5] font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest hover:bg-[#9E4734] hover:text-white transition-colors shadow-sm shrink-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Request Access
            </button>
          </form>
        )}

        <p className="font-sans text-[9px] sm:text-[10px] text-[#77767B]/70 uppercase tracking-widest">
          Discrete Communication • No Spam • Unsubscribe at Will
        </p>
      </div>
    </section>
  );
};

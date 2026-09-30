import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, User, Mail, Lock, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Logo } from '../components/Logo';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, addToast } = useShop();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passkeys do not match. Please re-enter.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Passkey must be at least 6 characters in length.');
      return;
    }

    setIsSubmitting(true);
    const res = await register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });
    setIsSubmitting(false);

    if (res.success) {
      addToast('Patron dossier initialized. Welcome to Ahmad Clothing.', 'success');
      navigate('/account');
    } else {
      setError(res.error || 'Registration failed. An account with this email address may already exist.');
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo size="lg" className="mb-4 justify-center" />
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8C8275] mb-2">
            Patronage Registration
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light tracking-tight">
            Patron Registration
          </h1>
          <p className="text-xs text-[#5A534A] mt-2 font-light">
            Create an exclusive account to receive tailored size calibrations, private runway presales, and bespoke concierge dispatch.
          </p>
        </div>

        <div className="bg-white border border-[#E5E0D8] p-8 sm:p-10 shadow-sm relative">
          {error && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1.5">
                Full Legal Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Lady Genevieve Vance"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
                <User className="w-4 h-4 text-[#8C8275] absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1.5">
                Patron Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. genevieve@vance-manor.com"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-mono"
                />
                <Mail className="w-4 h-4 text-[#8C8275] absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1.5">
                Passkey Creation *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-mono"
                />
                <Lock className="w-4 h-4 text-[#8C8275] absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1.5">
                Confirm Passkey *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Repeat passkey"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-mono"
                />
                <Lock className="w-4 h-4 text-[#8C8275] absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-[#5A534A] cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-0.5 accent-[#1A1A1A]"
                />
                <span>
                  I consent to the Maison Atelier Guild charter, privacy protocols, and bespoke client communications.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1A1A1A] text-white py-3.5 text-xs font-mono uppercase tracking-[0.2em] hover:bg-black transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                'Initializing...'
              ) : (
                <>
                  Register Dossier <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-[#5A534A]">
            Already an established patron?{' '}
            <Link to="/login" className="font-medium text-[#1A1A1A] underline hover:text-[#8C8275]">
              Authenticate Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

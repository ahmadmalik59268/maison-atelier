import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Lock, Mail, AlertTriangle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Logo } from '../components/Logo';
import { isSupabaseConfigured, getSupabaseConfigError } from '../lib/supabase';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, addToast } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConfigured = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isConfigured) {
      setError(getSupabaseConfigError() || 'Supabase authentication is not configured.');
      return;
    }

    setIsSubmitting(true);
    const res = await login(email, password, 'customer');
    setIsSubmitting(false);

    if (res.success) {
      addToast('Welcome back to Ahmad Clothing.', 'success');
      const from = (location.state as any)?.from?.pathname || (res.role === 'admin' ? '/admin' : '/account');
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Invalid credentials. Please verify your email and passkey.');
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo size="lg" className="mb-4 justify-center" />
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8C8275] mb-2">
            Client Portal
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light tracking-tight">
            Client Authentication
          </h1>
          <p className="text-xs text-[#5A534A] mt-2 font-light">
            Sign in to access your bespoke orders, curated private wishlist, and tailored fitting records.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E5E0D8] p-8 sm:p-10 shadow-sm relative">
          {!isConfigured && (
            <div className="mb-6 p-3.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Supabase credentials required. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.
              </span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#5A534A] mb-1.5">
                Client Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. client@patron.com"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-mono"
                />
                <Mail className="w-4 h-4 text-[#8C8275] absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-mono uppercase tracking-widest text-[#5A534A]">
                  Passkey / Secret *
                </label>
                <button
                  type="button"
                  onClick={() => addToast('Passkey reset link sent to registered email.', 'info')}
                  className="text-[10px] font-mono text-[#8C8275] hover:text-[#1A1A1A] underline"
                >
                  Forgot Key?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-mono"
                />
                <Lock className="w-4 h-4 text-[#8C8275] absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1A1A1A] text-white py-3.5 text-xs font-mono uppercase tracking-[0.2em] hover:bg-black transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                'Authenticating...'
              ) : (
                <>
                  Authenticate Dossier <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#5A534A]">
            New to Maison Atelier?{' '}
            <Link to="/register" className="font-medium text-[#1A1A1A] underline hover:text-[#8C8275]">
              Request Patron Registration
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

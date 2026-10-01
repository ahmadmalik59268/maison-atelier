import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, Lock, Mail, ArrowRight, AlertTriangle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Logo } from '../../components/Logo';
import { isSupabaseConfigured, getSupabaseConfigError } from '../../lib/supabase';

export const AdminLoginPage: React.FC = () => {
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

    try {
      const res = await login(email, password, 'admin');
      setIsSubmitting(false);

      if (res.success) {
        if (res.role === 'admin') {
          addToast('Admin authentication granted. Welcome to the Concierge Console.', 'success');
          const from = (location.state as any)?.from?.pathname || '/admin';
          navigate(from, { replace: true });
        } else {
          setError('Access Denied: Your account does not have administrator privileges.');
        }
      } else {
        setError(res.error || 'Invalid administrator passkey or email address.');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setError(err.message || 'An error occurred during authentication.');
    }
  };

  return (
    <div className="bg-[#141414] min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-white">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Brand Header */}
        <div className="text-center flex flex-col items-center">
          <Logo size="lg" variant="light" className="mb-4 justify-center" />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-[#DFCAAB] text-[10px] font-mono uppercase tracking-[0.2em] mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-[#E58A77]" />
            <span>Restricted Access Terminal</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-white">
            Admin Portal Login
          </h1>
          <p className="text-xs text-[#A1A1AA] font-light mt-2">
            Enter authorized administrator credentials to access financial metrics, inventory management, and order controls.
          </p>
        </div>

        {/* Form Box */}
        <div className="bg-[#1C1C1C] border border-white/10 p-8 shadow-2xl space-y-6">
          {!isConfigured && (
            <div className="p-4 bg-amber-950/80 border border-amber-700 text-amber-200 text-xs font-mono flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Supabase credentials required. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.
              </span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-sans leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-[#A1A1AA] mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yourdomain.com"
                  className="w-full bg-[#141414] border border-white/15 px-4 py-3 pl-10 text-xs font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-[#E58A77]"
                />
                <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-[#A1A1AA] mb-1.5">
                Passkey / Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#141414] border border-white/15 px-4 py-3 pl-10 text-xs font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-[#E58A77]"
                />
                <Lock className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-white text-[#141414] font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#DFCAAB] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Authenticating with Supabase...</span>
              ) : (
                <>
                  <span>Sign In as Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center text-xs">
          <Link to="/" className="text-white/60 hover:text-white font-mono text-[11px] uppercase tracking-wider">
            &larr; Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { user, isAdmin, isAuthLoading } = useShop();
  const location = useLocation();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-[#8C8275]">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  // Not logged in -> redirect to /admin/login
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Logged in as customer -> access denied
  if (!isAdmin) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen py-24 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-[#E5E0D8] p-8 text-center shadow-lg">
          <div className="w-14 h-14 bg-rose-50 text-rose-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-200">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl text-[#1A1A1A] font-light mb-2">
            Access Denied
          </h1>
          <p className="text-xs text-[#5A534A] leading-relaxed mb-6 font-light">
            You are signed in as a customer ({user.email}). Admin dashboard controls require an authorized administrator role.
          </p>
          <div className="space-y-2">
            <Link
              to="/admin/login"
              className="block w-full bg-[#1A1A1A] text-white py-3 text-xs font-mono uppercase tracking-widest hover:bg-black transition-colors"
            >
              Sign In with Admin Account
            </Link>
            <Link
              to="/account"
              className="flex items-center justify-center gap-2 w-full border border-[#E5E0D8] py-2.5 text-xs font-mono uppercase text-[#5A534A] hover:text-[#1A1A1A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to My Account</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

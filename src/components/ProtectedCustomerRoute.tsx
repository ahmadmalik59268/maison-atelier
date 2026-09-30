import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

interface ProtectedCustomerRouteProps {
  children: React.ReactNode;
}

export const ProtectedCustomerRoute: React.FC<ProtectedCustomerRouteProps> = ({ children }) => {
  const { user, isAuthenticated, isAuthLoading } = useShop();
  const location = useLocation();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-8 h-8 border-2 border-[#18181B] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-[#77767B]">
          Authenticating Patron Session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

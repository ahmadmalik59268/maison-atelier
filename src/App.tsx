import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Route Guards
import { ProtectedCustomerRoute } from './components/ProtectedCustomerRoute';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AccountPage } from './pages/AccountPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { LookbookPage } from './pages/LookbookPage';
import { StyleStudioPage } from './pages/StyleStudioPage';
import { BoutiquesPage } from './pages/BoutiquesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Admin Components & Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';

// Global Modals
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { VirtualStyleStudioModal } from './components/VirtualStyleStudioModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ToastContainer } from './components/ToastContainer';

// Scroll to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout container for storefront
const StoreLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased selection:bg-[#1A1A1A] selection:text-white overflow-x-hidden">
      <Header />
      <main className={`flex-grow w-full ${isHomePage ? '' : 'pt-24 sm:pt-28 lg:pt-32'} pb-20 sm:pb-12`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Global Modals renderer
const GlobalModals: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    isCartOpen,
    setIsCartOpen,
    isStyleStudioOpen,
    setIsStyleStudioOpen,
    isOrderTrackingOpen,
    setIsOrderTrackingOpen,
  } = useShop();

  return (
    <>
      <ProductDetailModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={closeQuickView}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      <VirtualStyleStudioModal
        isOpen={isStyleStudioOpen}
        onClose={() => setIsStyleStudioOpen(false)}
      />
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
      />
      <ToastContainer />
    </>
  );
};

function AppContent() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalModals />

      <Routes>
        {/* Dedicated Admin Login Route */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="inventory" element={<AdminInventoryPage />} />
        </Route>

        {/* Public Storefront Routes */}
        <Route
          path="/"
          element={
            <StoreLayout>
              <HomePage />
            </StoreLayout>
          }
        />
        <Route
          path="/shop"
          element={
            <StoreLayout>
              <ShopPage />
            </StoreLayout>
          }
        />
        <Route
          path="/new-arrivals"
          element={
            <StoreLayout>
              <CategoryPage />
            </StoreLayout>
          }
        />
        <Route
          path="/women"
          element={
            <StoreLayout>
              <CategoryPage />
            </StoreLayout>
          }
        />
        <Route
          path="/men"
          element={
            <StoreLayout>
              <CategoryPage />
            </StoreLayout>
          }
        />
        <Route
          path="/category/:category"
          element={
            <StoreLayout>
              <CategoryPage />
            </StoreLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <StoreLayout>
              <ProductDetailPage />
            </StoreLayout>
          }
        />
        <Route
          path="/search"
          element={
            <StoreLayout>
              <SearchResultsPage />
            </StoreLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <StoreLayout>
              <CartPage />
            </StoreLayout>
          }
        />
        <Route
          path="/login"
          element={
            <StoreLayout>
              <LoginPage />
            </StoreLayout>
          }
        />
        <Route
          path="/register"
          element={
            <StoreLayout>
              <RegisterPage />
            </StoreLayout>
          }
        />
        <Route
          path="/lookbook"
          element={
            <StoreLayout>
              <LookbookPage />
            </StoreLayout>
          }
        />
        <Route
          path="/style-studio"
          element={
            <StoreLayout>
              <StyleStudioPage />
            </StoreLayout>
          }
        />
        <Route
          path="/boutiques"
          element={
            <StoreLayout>
              <BoutiquesPage />
            </StoreLayout>
          }
        />
        <Route
          path="/about"
          element={
            <StoreLayout>
              <AboutPage />
            </StoreLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <StoreLayout>
              <ContactPage />
            </StoreLayout>
          }
        />

        {/* Protected Customer Routes */}
        <Route
          path="/wishlist"
          element={
            <StoreLayout>
              <ProtectedCustomerRoute>
                <WishlistPage />
              </ProtectedCustomerRoute>
            </StoreLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <StoreLayout>
              <ProtectedCustomerRoute>
                <CheckoutPage />
              </ProtectedCustomerRoute>
            </StoreLayout>
          }
        />
        <Route
          path="/order-success"
          element={
            <StoreLayout>
              <ProtectedCustomerRoute>
                <OrderSuccessPage />
              </ProtectedCustomerRoute>
            </StoreLayout>
          }
        />
        <Route
          path="/account"
          element={
            <StoreLayout>
              <ProtectedCustomerRoute>
                <AccountPage />
              </ProtectedCustomerRoute>
            </StoreLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <StoreLayout>
              <ProtectedCustomerRoute>
                <OrdersPage />
              </ProtectedCustomerRoute>
            </StoreLayout>
          }
        />
        <Route
          path="/order/:id"
          element={
            <StoreLayout>
              <ProtectedCustomerRoute>
                <OrderDetailPage />
              </ProtectedCustomerRoute>
            </StoreLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

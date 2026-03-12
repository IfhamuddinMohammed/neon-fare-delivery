import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import CartDrawer from "@/components/CartDrawer";

import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Ramzan from "./pages/Ramzan";
import Checkout from "./pages/Checkout";
import OrderConfirmed from "./pages/OrderConfirmed";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOffers from "./pages/admin/AdminOffers";
import AdminRamzan from "./pages/admin/AdminRamzan";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const CustomerLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <CartDrawer />
    <FloatingSocialBar />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CustomerLayout><Index /></CustomerLayout>} />
            <Route path="/products" element={<CustomerLayout><Products /></CustomerLayout>} />
            <Route path="/product/:id" element={<CustomerLayout><ProductDetail /></CustomerLayout>} />
            <Route path="/ramzan" element={<CustomerLayout><Ramzan /></CustomerLayout>} />
            <Route path="/checkout" element={<CustomerLayout><Checkout /></CustomerLayout>} />
            <Route path="/order-confirmed/:orderId" element={<CustomerLayout><OrderConfirmed /></CustomerLayout>} />
            <Route path="/account" element={<CustomerLayout><Account /></CustomerLayout>} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="offers" element={<AdminOffers />} />
              <Route path="ramzan" element={<AdminRamzan />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

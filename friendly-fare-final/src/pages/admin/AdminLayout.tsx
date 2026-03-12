import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FolderTree, ShoppingCart, Tag, Moon, Users, BarChart3, Settings, LogOut, Menu, X, ChevronRight } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: FolderTree, label: 'Categories', path: '/admin/categories' },
  { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
  { icon: Tag, label: 'Offers', path: '/admin/offers' },
  { icon: Moon, label: 'Ramzan Sale', path: '/admin/ramzan' },
  { icon: Users, label: 'Customers', path: '/admin/customers' },
  { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const AdminLayout: React.FC = () => {
  const isAuth = localStorage.getItem('ff_admin_auth') === 'true';
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuth) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    localStorage.removeItem('ff_admin_auth');
    window.location.href = '/admin/login';
  };

  const currentPage = navItems.find(n => n.path === location.pathname)?.label ?? 'Admin';

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <Link to="/admin" onClick={() => setSidebarOpen(false)}>
          <span className="font-display text-xl text-primary text-glow-red tracking-wider">FRIENDLY FARE</span>
          <span className="block text-[9px] text-gold tracking-[0.3em]">ADMIN PANEL</span>
        </Link>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-muted rounded-lg transition-colors">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary border-l-2 border-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
              {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-full px-3 py-2.5 rounded-xl hover:bg-muted"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — desktop always visible, mobile slide-in */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-secondary border-r border-border flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">

        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 bg-secondary border-b border-border px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-muted rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <span className="font-display text-primary tracking-wider text-sm">FRIENDLY FARE</span>
            <span className="text-muted-foreground text-xs ml-2">/ {currentPage}</span>
          </div>
          <Link to="/" className="ml-auto text-xs text-muted-foreground hover:text-primary transition-colors">
            View Site →
          </Link>
        </div>

        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center justify-between px-6 py-3 border-b border-border bg-secondary/50">
          <p className="text-sm text-muted-foreground">
            Welcome back, <span className="text-foreground font-semibold">Admin</span>
          </p>
          <Link to="/" target="_blank" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            View Live Site <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

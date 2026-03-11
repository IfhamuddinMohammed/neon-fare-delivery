import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FolderTree, ShoppingCart, Tag, Moon, Users, BarChart3, Settings, LogOut } from 'lucide-react';

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

  if (!isAuth) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    localStorage.removeItem('ff_admin_auth');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-60 bg-secondary border-r border-border flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-border">
          <Link to="/admin">
            <span className="font-display text-xl text-primary text-glow-red tracking-wider">FRIENDLY FARE</span>
            <span className="block text-[9px] text-gold tracking-[0.3em]">ADMIN PANEL</span>
          </Link>
        </div>
        <nav className="flex-1 py-4 space-y-0.5 px-2">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors w-full">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

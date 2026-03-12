import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, DollarSign, Truck, AlertTriangle, TrendingUp, Package } from 'lucide-react';
import { useAdminProducts } from '@/hooks/useProducts';
import { useOrders } from '@/hooks/useOrders';

const statusColors: Record<string, string> = {
  pending:    'bg-gold/20 text-gold',
  confirmed:  'bg-blue-500/20 text-blue-400',
  packed:     'bg-purple-500/20 text-purple-400',
  dispatched: 'bg-orange-500/20 text-orange-400',
  delivered:  'bg-emerald/20 text-emerald',
  cancelled:  'bg-primary/20 text-primary',
};

const AdminDashboard: React.FC = () => {
  const { products } = useAdminProducts();
  const { orders } = useOrders();

  const today = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === today);
  const todayRevenue = todayOrders.reduce((s, o) => s + (o.grand_total ?? 0), 0);
  const pendingDeliveries = orders.filter(o => ['confirmed','packed','dispatched'].includes(o.status)).length;
  const lowStockProducts = products.filter(p => p.stock_qty < 20);

  const stats = [
    { label: "Today's Orders", value: String(todayOrders.length), icon: ShoppingCart, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: "Today's Revenue", value: `₹${todayRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald', bg: 'bg-emerald/10' },
    { label: 'Pending Deliveries', value: String(pendingDeliveries), icon: Truck, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Low Stock Items', value: String(lowStockProducts.length), icon: AlertTriangle, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display text-2xl md:text-3xl text-foreground tracking-wider">DASHBOARD</h1>
        <div className="flex bg-muted rounded-full p-0.5">
          {['All','Branch 1','Branch 2'].map(b => (
            <button key={b} className={`px-3 py-1.5 text-xs rounded-full transition-all ${b==='All'?'bg-primary text-primary-foreground':'text-muted-foreground hover:text-foreground'}`}>{b}</button>
          ))}
        </div>
      </div>

      {/* Stats grid — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className={`card-glass rounded-xl p-4 border border-border`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs text-muted-foreground leading-tight">{s.label}</span>
              <div className={`p-1.5 rounded-lg ${s.bg}`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
            </div>
            <span className={`text-xl md:text-2xl font-bold ${s.color}`}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Quick actions — mobile friendly */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Add Product', to: '/admin/products', icon: '➕', color: 'border-primary/30 hover:bg-primary/5' },
          { label: 'View Orders', to: '/admin/orders', icon: '📋', color: 'border-gold/30 hover:bg-gold/5' },
          { label: 'Ramzan Sale', to: '/admin/ramzan', icon: '🌙', color: 'border-gold/30 hover:bg-gold/5' },
          { label: 'Reports', to: '/admin/reports', icon: '📊', color: 'border-emerald/30 hover:bg-emerald/5' },
        ].map(a => (
          <Link key={a.label} to={a.to} className={`card-glass rounded-xl p-4 text-center border ${a.color} transition-all hover:scale-105`}>
            <div className="text-2xl mb-2">{a.icon}</div>
            <p className="text-xs font-semibold text-foreground">{a.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="card-glass rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-base md:text-lg text-foreground tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> RECENT ORDERS
          </h2>
          <Link to="/admin/orders" className="text-xs text-primary hover:underline">View all →</Link>
        </div>

        {/* Mobile card view */}
        <div className="md:hidden divide-y divide-border">
          {orders.slice(0, 5).map(order => (
            <div key={order.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display text-primary text-xs tracking-wider">{order.order_number}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{order.customer_name}</p>
                  <p className="text-xs text-muted-foreground">{order.branch} · {order.payment_method}</p>
                </div>
                <span className="text-gold font-bold">₹{order.grand_total}</span>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="p-8 text-center text-muted-foreground text-sm">No orders yet</div>
          )}
        </div>

        {/* Desktop table view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                {['Order ID','Customer','Branch','Total','Payment','Status','Time'].map(h => (
                  <th key={h} className="text-left p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 8).map(order => {
                const mins = Math.floor((Date.now() - new Date(order.created_at).getTime()) / 60000);
                const timeAgo = mins < 60 ? `${mins}m ago` : `${Math.floor(mins/60)}h ago`;
                return (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-display text-primary text-xs tracking-wider">{order.order_number}</td>
                    <td className="p-3 text-foreground font-medium">{order.customer_name}</td>
                    <td className="p-3"><span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{order.branch}</span></td>
                    <td className="p-3 text-gold font-bold">₹{order.grand_total}</td>
                    <td className="p-3 text-muted-foreground">{order.payment_method}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span></td>
                    <td className="p-3 text-muted-foreground text-xs">{timeAgo}</td>
                  </tr>
                );
              })}
              {orders.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockProducts.length > 0 && (
        <div className="card-glass rounded-xl p-4">
          <h2 className="font-display text-base md:text-lg text-foreground tracking-wider mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-primary" /> LOW STOCK ALERTS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStockProducts.map(p => (
              <div key={p.id} className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex justify-between items-center gap-2">
                <div className="min-w-0">
                  <p className="text-sm text-foreground font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.brand}</p>
                </div>
                <span className="text-sm font-bold text-primary flex-shrink-0">{p.stock_qty} left</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

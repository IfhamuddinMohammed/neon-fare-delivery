import React from 'react';
import { ShoppingCart, DollarSign, Truck, AlertTriangle, TrendingUp } from 'lucide-react';
import { sampleProducts } from '@/data/sampleData';

const stats = [
  { label: "Today's Orders", value: '24', icon: ShoppingCart, color: 'text-blue-400' },
  { label: "Today's Revenue", value: '₹18,450', icon: DollarSign, color: 'text-emerald' },
  { label: 'Pending Deliveries', value: '8', icon: Truck, color: 'text-gold' },
  { label: 'Low Stock Items', value: '3', icon: AlertTriangle, color: 'text-primary' },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Fatima Begum', branch: 'Branch 1', items: 5, total: '₹850', payment: 'COD', status: 'pending', time: '10 min ago' },
  { id: 'ORD-002', customer: 'Rajesh Kumar', branch: 'Branch 2', items: 3, total: '₹420', payment: 'UPI', status: 'delivered', time: '25 min ago' },
  { id: 'ORD-003', customer: 'Ayesha Khan', branch: 'Branch 1', items: 8, total: '₹1,200', payment: 'COD', status: 'dispatched', time: '45 min ago' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-gold/20 text-gold',
  confirmed: 'bg-blue-500/20 text-blue-400',
  dispatched: 'bg-purple-500/20 text-purple-400',
  delivered: 'bg-emerald/20 text-emerald',
  cancelled: 'bg-primary/20 text-primary',
};

const AdminDashboard: React.FC = () => {
  const lowStock = sampleProducts.filter(p => p.stock_qty < 50);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-foreground tracking-wider">DASHBOARD</h1>
        <div className="flex bg-muted rounded-full p-0.5">
          <button className="px-4 py-1.5 text-xs rounded-full bg-primary text-primary-foreground">All</button>
          <button className="px-4 py-1.5 text-xs rounded-full text-muted-foreground hover:text-foreground">Branch 1</button>
          <button className="px-4 py-1.5 text-xs rounded-full text-muted-foreground hover:text-foreground">Branch 2</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="card-glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <span className="text-2xl font-bold text-foreground">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="card-glass rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-lg text-foreground tracking-wider">RECENT ORDERS</h2>
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-muted-foreground font-medium">Order ID</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Customer</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Branch</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Items</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Total</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Payment</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-3 text-foreground font-medium">{order.id}</td>
                  <td className="p-3 text-foreground">{order.customer}</td>
                  <td className="p-3"><span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{order.branch}</span></td>
                  <td className="p-3 text-muted-foreground">{order.items}</td>
                  <td className="p-3 text-gold font-medium">{order.total}</td>
                  <td className="p-3 text-muted-foreground">{order.payment}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span></td>
                  <td className="p-3 text-muted-foreground text-xs">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock */}
      <div className="card-glass rounded-xl p-4">
        <h2 className="font-display text-lg text-foreground tracking-wider mb-4">⚠️ LOW STOCK ALERTS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {lowStock.map(p => (
            <div key={p.id} className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex justify-between items-center">
              <div>
                <p className="text-sm text-foreground font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.brand}</p>
              </div>
              <span className="text-sm font-bold text-primary">{p.stock_qty} left</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

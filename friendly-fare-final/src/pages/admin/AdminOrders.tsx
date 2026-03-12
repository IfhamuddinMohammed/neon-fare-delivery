import React, { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { Phone, MessageCircle, MapPin, Truck, X, Loader2, RefreshCw } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-gold/20 text-gold border-gold/30',
  confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  packed:    'bg-purple-500/20 text-purple-400 border-purple-500/30',
  dispatched:'bg-orange-500/20 text-orange-400 border-orange-500/30',
  delivered: 'bg-emerald/20 text-emerald border-emerald/30',
  cancelled: 'bg-primary/20 text-primary border-primary/30',
};
const STATUS_FLOW = ['pending','confirmed','packed','dispatched','delivered'];
const DELIVERY_BOYS = ['Ravi','Suresh','Arjun','Kiran'];

const AdminOrders: React.FC = () => {
  const { orders, loading, updateStatus, assignDeliveryBoy, refetch } = useOrders();
  const [selected, setSelected] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBranch, setFilterBranch] = useState('all');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleStatus = async (id: string, status: string) => {
    await updateStatus(id, status);
    if (selected?.id === id) setSelected((s: any) => s ? { ...s, status } : null);
    showToast(`Status updated to ${status}`);
  };

  const handleAssign = async (id: string, boy: string) => {
    await assignDeliveryBoy(id, boy);
    if (selected?.id === id) setSelected((s: any) => s ? { ...s, delivery_boy: boy } : null);
    showToast(`Assigned to ${boy}`);
  };

  const filtered = orders.filter(o =>
    (filterStatus === 'all' || o.status === filterStatus) &&
    (filterBranch === 'all' || o.branch === filterBranch)
  );

  const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === new Date().toDateString());
  const pendingCount = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="p-6 space-y-6">
      {toast && <div className="fixed top-4 right-4 z-[200] bg-emerald text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium">✓ {toast}</div>}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl text-foreground tracking-wider">ORDERS</h1>
          <p className="text-muted-foreground text-sm mt-1">Live updates enabled · {todayOrders.length} today · {pendingCount} pending</p>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <button onClick={refetch} className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground" title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </button>
          <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none">
            <option value="all">All Branches</option>
            <option value="Branch 1">Branch 1</option>
            <option value="Branch 2">Branch 2</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none">
            <option value="all">All Statuses</option>
            {[...STATUS_FLOW, 'cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Today's Orders", value: todayOrders.length, color: 'text-blue-400' },
          { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'text-gold' },
          { label: 'Dispatched', value: orders.filter(o => o.status === 'dispatched').length, color: 'text-orange-400' },
          { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: 'text-emerald' },
        ].map(s => (
          <div key={s.label} className="card-glass rounded-xl p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card-glass rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span>Loading orders...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-muted-foreground">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {['Order #','Customer','Branch','Items','Total','Payment','Status','Time','Actions'].map(h => (
                    <th key={h} className="text-left p-3 text-muted-foreground font-semibold whitespace-nowrap text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => {
                  const items = Array.isArray(order.items) ? order.items : [];
                  const timeAgo = (() => {
                    const diff = Date.now() - new Date(order.created_at).getTime();
                    const m = Math.floor(diff / 60000);
                    if (m < 60) return `${m}m ago`;
                    return `${Math.floor(m/60)}h ago`;
                  })();
                  return (
                    <tr key={order.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setSelected(order)}>
                      <td className="p-3 font-display text-primary tracking-wider text-xs">{order.order_number}</td>
                      <td className="p-3"><div><p className="font-medium text-foreground">{order.customer_name}</p><p className="text-xs text-muted-foreground">{order.customer_phone}</p></div></td>
                      <td className="p-3"><span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{order.branch}</span></td>
                      <td className="p-3 text-muted-foreground">{items.length}</td>
                      <td className="p-3 text-gold font-bold">₹{order.grand_total}</td>
                      <td className="p-3 text-muted-foreground">{order.payment_method}</td>
                      <td className="p-3">
                        <select value={order.status} onClick={e => e.stopPropagation()} onChange={e => handleStatus(order.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full border bg-transparent cursor-pointer focus:outline-none ${STATUS_COLORS[order.status]}`}>
                          {[...STATUS_FLOW, 'cancelled'].map(s => <option key={s} value={s} className="bg-card text-foreground">{s}</option>)}
                        </select>
                      </td>
                      <td className="p-3 text-muted-foreground text-xs whitespace-nowrap">{timeAgo}</td>
                      <td className="p-3" onClick={e => e.stopPropagation()}>
                        <div className="flex gap-1">
                          <a href={`tel:${order.customer_phone}`} className="p-1.5 bg-emerald/20 text-emerald rounded-lg hover:bg-emerald/30 transition-colors"><Phone className="w-3.5 h-3.5" /></a>
                          <a href={`https://wa.me/${(order.customer_phone ?? '').replace(/\D/g,'')}?text=Hi ${order.customer_name}! Your order ${order.order_number} update from Friendly Fare.`} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-[#25D366]/20 text-[#25D366] rounded-lg hover:bg-[#25D366]/30 transition-colors"><MessageCircle className="w-3.5 h-3.5" /></a>
                          {order.maps_link && <a href={order.maps_link} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"><MapPin className="w-3.5 h-3.5" /></a>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="card-glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card/90 backdrop-blur-sm">
              <div>
                <h2 className="font-display text-xl text-primary tracking-wider">{selected.order_number}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[selected.status]}`}>{selected.status}</span>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-muted rounded-lg transition-colors"><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer info */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Customer</h3>
                <div className="card-glass rounded-xl p-4 space-y-3">
                  <p className="text-lg font-bold text-foreground">{selected.customer_name}</p>
                  <p className="text-sm text-muted-foreground">{selected.customer_phone}</p>
                  <div className="flex gap-2 flex-wrap">
                    <a href={`tel:${selected.customer_phone}`} className="flex items-center gap-1.5 bg-emerald/20 text-emerald px-3 py-2 rounded-lg text-sm hover:bg-emerald/30 transition-colors">
                      <Phone className="w-4 h-4" /> Call
                    </a>
                    <a href={`https://wa.me/${(selected.customer_phone ?? '').replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-[#25D366]/20 text-[#25D366] px-3 py-2 rounded-lg text-sm hover:bg-[#25D366]/30 transition-colors">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                  </div>
                  {selected.maps_link && (
                    <a href={selected.maps_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg text-sm hover:bg-blue-500/30 transition-colors w-full justify-center font-medium">
                      <MapPin className="w-4 h-4" /> 📍 VIEW CUSTOMER LOCATION
                    </a>
                  )}
                  {selected.delivery_address && <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">{selected.delivery_address}</p>}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Branch: </span><span className="text-foreground">{selected.branch}</span></div>
                    <div><span className="text-muted-foreground">Payment: </span><span className="text-foreground">{selected.payment_method}</span></div>
                  </div>
                </div>

                {/* Status */}
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {STATUS_FLOW.map(s => (
                    <button key={s} onClick={() => handleStatus(selected.id, s)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${selected.status === s ? STATUS_COLORS[s] + ' font-bold scale-105' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                      {s}
                    </button>
                  ))}
                  <button onClick={() => handleStatus(selected.id, 'cancelled')}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${selected.status === 'cancelled' ? STATUS_COLORS['cancelled'] + ' font-bold' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                    cancelled
                  </button>
                </div>

                {/* Delivery boy */}
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Assign Delivery Boy</h3>
                <div className="flex gap-2">
                  <Truck className="w-4 h-4 text-muted-foreground mt-2.5 flex-shrink-0" />
                  <select value={selected.delivery_boy ?? ''} onChange={e => handleAssign(selected.id, e.target.value)}
                    className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50">
                    <option value="">-- Unassigned --</option>
                    {DELIVERY_BOYS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {/* Order items */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Order Items</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {(Array.isArray(selected.items) ? selected.items : []).map((item: any, i: number) => (
                    <div key={i} className="card-glass rounded-lg p-3 flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-medium">{item.product?.name ?? item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-gold font-bold text-sm">₹{(item.product?.price ?? item.price) * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="card-glass rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span className="text-emerald">FREE</span></div>
                  <div className="flex justify-between font-bold text-base border-t border-border pt-2">
                    <span className="text-foreground">Total</span><span className="text-gold text-xl">₹{selected.grand_total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

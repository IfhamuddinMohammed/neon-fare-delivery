import React, { useState } from 'react';
import { User, ShoppingBag, Heart, MapPin, Phone, Mail, LogOut, ChevronRight } from 'lucide-react';
import { sampleProducts } from '@/data/sampleData';

type Tab = 'orders' | 'wishlist' | 'addresses' | 'profile';

const mockOrders = [
  { id: 'ORD-A1B2', date: '2025-03-10', items: 4, total: 820, status: 'delivered' },
  { id: 'ORD-C3D4', date: '2025-03-08', items: 2, total: 349, status: 'delivered' },
  { id: 'ORD-E5F6', date: '2025-03-11', items: 6, total: 1250, status: 'dispatched' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-gold/20 text-gold',
  confirmed: 'bg-blue-500/20 text-blue-400',
  dispatched: 'bg-purple-500/20 text-purple-400',
  delivered: 'bg-emerald/20 text-emerald',
  cancelled: 'bg-primary/20 text-primary',
};

const AccountPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>('orders');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const wishlistedProducts = sampleProducts.slice(0, 3);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card-glass rounded-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl text-foreground tracking-wider">MY ACCOUNT</h1>
            <p className="text-muted-foreground text-sm mt-1">Sign in to track orders & more</p>
          </div>
          <div className="space-y-4">
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 Phone Number" className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            {otpSent && <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />}
            <button
              onClick={() => { if (!otpSent) { setOtpSent(true); } else { setIsLoggedIn(true); } }}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-display text-lg tracking-wider btn-glow"
            >
              {otpSent ? 'VERIFY OTP' : 'SEND OTP'}
            </button>
            {otpSent && <p className="text-xs text-center text-muted-foreground">OTP sent to {phone}. Use any 4-digit code for demo.</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl text-foreground tracking-wider">MY ACCOUNT</h1>
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Profile card */}
        <div className="card-glass rounded-2xl p-5 mb-8 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Friendly Customer</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" /> +91 86863 99850</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tabs */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="card-glass rounded-xl overflow-hidden">
              {[
                { id: 'orders', label: 'My Orders', icon: <ShoppingBag className="w-4 h-4" /> },
                { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
                { id: 'addresses', label: 'Addresses', icon: <MapPin className="w-4 h-4" /> },
                { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
              ].map(t => (
                <button key={t.id} onClick={() => setTab(t.id as Tab)} className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-all ${tab === t.id ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                  {t.icon} {t.label} <ChevronRight className="w-4 h-4 ml-auto" />
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {tab === 'orders' && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-foreground tracking-wider">MY ORDERS</h2>
                {mockOrders.map(order => (
                  <div key={order.id} className="card-glass rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-display text-lg text-primary tracking-wider">{order.id}</p>
                      <p className="text-xs text-muted-foreground mt-1">{order.date} • {order.items} items</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gold font-bold">₹{order.total}</span>
                      <span className={`text-xs px-3 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                      <button className="text-xs text-primary border border-primary/40 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors">Reorder</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === 'wishlist' && (
              <div>
                <h2 className="font-display text-2xl text-foreground tracking-wider mb-4">WISHLIST</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistedProducts.map(p => (
                    <div key={p.id} className="card-glass rounded-xl overflow-hidden">
                      <div className="aspect-square bg-muted flex items-center justify-center text-4xl">🛒</div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-foreground">{p.name}</p>
                        <p className="text-gold font-bold mt-1">₹{p.price}</p>
                        <button className="w-full mt-2 bg-primary text-primary-foreground py-1.5 rounded text-xs font-display tracking-wider btn-glow">ADD TO CART</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === 'addresses' && (
              <div>
                <h2 className="font-display text-2xl text-foreground tracking-wider mb-4">SAVED ADDRESSES</h2>
                <div className="space-y-3">
                  <div className="card-glass rounded-xl p-4 border border-primary/30">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">HOME</span>
                    </div>
                    <p className="text-sm text-foreground">3, IAS Colony Rd, Toli Chowki, Hyderabad – 500008</p>
                    <button className="text-xs text-primary mt-2 hover:underline">Edit</button>
                  </div>
                  <button className="w-full border border-dashed border-border rounded-xl p-4 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all text-sm">
                    + Add New Address
                  </button>
                </div>
              </div>
            )}
            {tab === 'profile' && (
              <div>
                <h2 className="font-display text-2xl text-foreground tracking-wider mb-4">PROFILE</h2>
                <div className="card-glass rounded-xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Full Name</label>
                    <input defaultValue="Friendly Customer" className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Phone</label>
                    <input defaultValue="+91 86863 99850" className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Email (optional)</label>
                    <input placeholder="email@example.com" className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display tracking-wider btn-glow">SAVE CHANGES</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

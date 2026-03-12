import React, { useState } from 'react';
import { Save, Store, MapPin, Users, Globe, Moon } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [store, setStore] = useState({ name: 'New Friendly Fare Super Market', phone: '+91 86863 99850', whatsapp: '918686399850', instagram: 'https://instagram.com/friendlyfarehyderabad', facebook: 'https://facebook.com/friendlyfarehyderabad' });
  const [branch1, setBranch1] = useState({ address: '3, IAS Colony Rd, Toli Chowki, Hyderabad – 500008', maps: 'https://maps.google.com/?q=17.4068,78.4313' });
  const [branch2, setBranch2] = useState({ address: 'Door No 9-3, 238/A6, Near IBM Hospital, Tolichowki Road – 500008', maps: 'https://maps.google.com/?q=17.4041,78.4298' });
  const [ramzanEnd, setRamzanEnd] = useState('2025-04-10');
  const [boys, setBoys] = useState(['Ravi', 'Suresh', 'Arjun', 'Kiran']);
  const [newBoy, setNewBoy] = useState('');

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const inputCls = "w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50";

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-foreground tracking-wider">SETTINGS</h1>
        <button onClick={handleSave} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium btn-glow transition-all ${saved ? 'bg-emerald text-white' : 'bg-primary text-primary-foreground'}`}>
          <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Store Info */}
      <div className="card-glass rounded-xl p-6 space-y-4">
        <h2 className="font-display text-xl text-foreground tracking-wider flex items-center gap-2"><Store className="w-5 h-5 text-primary" /> STORE INFORMATION</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="block text-xs text-muted-foreground mb-1">Store Name</label><input value={store.name} onChange={e => setStore(s => ({ ...s, name: e.target.value }))} className={inputCls} /></div>
          <div><label className="block text-xs text-muted-foreground mb-1">Phone Number</label><input value={store.phone} onChange={e => setStore(s => ({ ...s, phone: e.target.value }))} className={inputCls} /></div>
          <div><label className="block text-xs text-muted-foreground mb-1">WhatsApp Number (with country code)</label><input value={store.whatsapp} onChange={e => setStore(s => ({ ...s, whatsapp: e.target.value }))} className={inputCls} /></div>
          <div><label className="block text-xs text-muted-foreground mb-1">Instagram URL</label><input value={store.instagram} onChange={e => setStore(s => ({ ...s, instagram: e.target.value }))} className={inputCls} /></div>
          <div className="sm:col-span-2"><label className="block text-xs text-muted-foreground mb-1">Facebook Page URL</label><input value={store.facebook} onChange={e => setStore(s => ({ ...s, facebook: e.target.value }))} className={inputCls} /></div>
        </div>
      </div>

      {/* Branches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[{ label: 'Branch 1', state: branch1, set: setBranch1 }, { label: 'Branch 2', state: branch2, set: setBranch2 }].map(b => (
          <div key={b.label} className="card-glass rounded-xl p-6 space-y-3">
            <h2 className="font-display text-xl text-foreground tracking-wider flex items-center gap-2"><MapPin className="w-5 h-5 text-gold" /> {b.label.toUpperCase()}</h2>
            <div><label className="block text-xs text-muted-foreground mb-1">Address</label><textarea value={b.state.address} onChange={e => b.set((s: any) => ({ ...s, address: e.target.value }))} rows={2} className={inputCls + ' resize-none'} /></div>
            <div><label className="block text-xs text-muted-foreground mb-1">Google Maps Link</label><input value={b.state.maps} onChange={e => b.set((s: any) => ({ ...s, maps: e.target.value }))} className={inputCls} /></div>
          </div>
        ))}
      </div>

      {/* Ramzan */}
      <div className="card-glass rounded-xl p-6 space-y-3">
        <h2 className="font-display text-xl text-foreground tracking-wider flex items-center gap-2"><Moon className="w-5 h-5 text-gold" /> RAMZAN SALE SETTINGS</h2>
        <div className="max-w-xs">
          <label className="block text-xs text-muted-foreground mb-1">Ramzan Sale End Date</label>
          <input type="date" value={ramzanEnd} onChange={e => setRamzanEnd(e.target.value)} className={inputCls} />
          <p className="text-xs text-muted-foreground mt-1">Sale auto-ends on this date. Countdown timer uses this date.</p>
        </div>
      </div>

      {/* Delivery Boys */}
      <div className="card-glass rounded-xl p-6 space-y-4">
        <h2 className="font-display text-xl text-foreground tracking-wider flex items-center gap-2"><Users className="w-5 h-5 text-emerald" /> DELIVERY BOY MANAGEMENT</h2>
        <div className="flex flex-wrap gap-2">
          {boys.map(b => (
            <div key={b} className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
              <span className="text-sm text-foreground">{b}</span>
              <button onClick={() => setBoys(prev => prev.filter(x => x !== b))} className="text-muted-foreground hover:text-primary transition-colors text-xs">✕</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 max-w-sm">
          <input value={newBoy} onChange={e => setNewBoy(e.target.value)} placeholder="Add delivery boy name" className={inputCls} />
          <button onClick={() => { if (newBoy.trim()) { setBoys(p => [...p, newBoy.trim()]); setNewBoy(''); } }} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium btn-glow flex-shrink-0">Add</button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

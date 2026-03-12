import React, { useState } from 'react';
import { Plus, X, ToggleLeft, ToggleRight, Pencil, Trash2 } from 'lucide-react';

const mockOffers = [
  { id: '1', name: 'Ramzan Special 20% Off', type: 'percent', value: 20, code: 'RAMZAN20', applies: 'All Products', end: '2025-04-10', active: true, is_ramzan: true },
  { id: '2', name: 'Flat ₹50 Off on ₹300+', type: 'flat', value: 50, code: 'SAVE50', applies: 'All Products', end: '2025-03-31', active: true, is_ramzan: false },
  { id: '3', name: 'Dairy 10% Off', type: 'percent', value: 10, code: 'DAIRY10', applies: 'Dairy & Eggs', end: '2025-03-25', active: false, is_ramzan: false },
];

const AdminOffers: React.FC = () => {
  const [offers, setOffers] = useState(mockOffers);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'percent', value: '', code: '', applies: 'All Products', end: '', is_ramzan: false });

  const toggleActive = (id: string) => setOffers(prev => prev.map(o => o.id === id ? { ...o, active: !o.active } : o));
  const deleteOffer = (id: string) => setOffers(prev => prev.filter(o => o.id !== id));

  const handleAdd = () => {
    setOffers(prev => [...prev, { id: String(Date.now()), ...form, value: Number(form.value), active: true }]);
    setShowModal(false);
    setForm({ name: '', type: 'percent', value: '', code: '', applies: 'All Products', end: '', is_ramzan: false });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-foreground tracking-wider">OFFERS & DISCOUNTS</h1>
        <button onClick={() => setShowModal(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium btn-glow flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Offer
        </button>
      </div>

      <div className="card-glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['Offer Name', 'Type', 'Value', 'Code', 'Applies To', 'Valid Until', 'Ramzan', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left p-3 text-muted-foreground font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {offers.map(o => (
                <tr key={o.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="p-3 text-foreground font-medium">{o.name}</td>
                  <td className="p-3"><span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{o.type}</span></td>
                  <td className="p-3 text-gold font-bold">{o.type === 'percent' ? `${o.value}%` : `₹${o.value}`}</td>
                  <td className="p-3"><code className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{o.code}</code></td>
                  <td className="p-3 text-muted-foreground text-xs">{o.applies}</td>
                  <td className="p-3 text-muted-foreground text-xs">{o.end}</td>
                  <td className="p-3">{o.is_ramzan ? <span className="text-gold">🌙</span> : <span className="text-muted-foreground">—</span>}</td>
                  <td className="p-3">
                    <button onClick={() => toggleActive(o.id)} className={`text-xs px-3 py-1 rounded-full transition-colors ${o.active ? 'bg-emerald/20 text-emerald' : 'bg-muted text-muted-foreground'}`}>
                      {o.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => deleteOffer(o.id)} className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-primary transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Offer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="card-glass rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl text-foreground tracking-wider">CREATE OFFER</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              <input placeholder="Offer Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50">
                  <option value="percent">Percentage %</option>
                  <option value="flat">Flat Amount ₹</option>
                </select>
                <input type="number" placeholder="Value" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} className="bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <input placeholder="Promo Code (optional)" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
              <input type="date" value={form.end} onChange={e => setForm(f => ({ ...f, end: e.target.value }))} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
              <label className="flex items-center gap-3 cursor-pointer">
                <button onClick={() => setForm(f => ({ ...f, is_ramzan: !f.is_ramzan }))} className={`relative w-12 h-6 rounded-full transition-colors ${form.is_ramzan ? 'bg-gold' : 'bg-muted'}`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.is_ramzan ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm text-foreground">Ramzan Offer 🌙</span>
              </label>
              <button onClick={handleAdd} className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-display tracking-wider btn-glow">CREATE OFFER</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOffers;

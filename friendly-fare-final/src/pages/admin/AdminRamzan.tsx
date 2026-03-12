import React, { useState } from 'react';
import { sampleProducts } from '@/data/sampleData';
import { Moon, Save } from 'lucide-react';
import { Product } from '@/types';

const AdminRamzan: React.FC = () => {
  const [products, setProducts] = useState(sampleProducts.map(p => ({ ...p, ramzan_price: p.ramzan_price ?? p.price })));

  const toggle = (id: string) => setProducts(prev => prev.map(p => p.id === id ? { ...p, is_ramzan_offer: !p.is_ramzan_offer } : p));
  const setRamzanPrice = (id: string, val: number) => setProducts(prev => prev.map(p => p.id === id ? { ...p, ramzan_price: val } : p));

  const ramzanCount = products.filter(p => p.is_ramzan_offer).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl text-foreground tracking-wider flex items-center gap-3">
            <Moon className="w-7 h-7 text-gold" /> RAMZAN SALE
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Toggle products in/out of Ramzan Sale and set special pricing</p>
        </div>
        <button className="bg-gold text-gold-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Active Ramzan Products', value: ramzanCount, color: 'text-gold' },
          { label: 'Total Ramzan Orders (Demo)', value: '38', color: 'text-emerald' },
          { label: 'Ramzan Revenue (Demo)', value: '₹14,820', color: 'text-primary' },
        ].map(s => (
          <div key={s.label} className="card-glass rounded-xl p-5">
            <p className="text-sm text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card-glass rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Moon className="w-4 h-4 text-gold" />
          <h2 className="font-display text-lg text-foreground tracking-wider">ALL PRODUCTS — RAMZAN TOGGLE</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-muted-foreground font-medium">Product</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Regular Price</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Ramzan Price (₹)</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Savings</th>
                <th className="text-left p-3 text-muted-foreground font-medium">In Ramzan Sale</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => {
                const saving = p.mrp - (p.ramzan_price ?? p.price);
                const savingPct = Math.round((saving / p.mrp) * 100);
                return (
                  <tr key={p.id} className={`border-b border-border/50 transition-colors ${p.is_ramzan_offer ? 'bg-gold/5' : 'hover:bg-muted/20'}`}>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-sm">🛒</div>
                        <div>
                          <p className="text-foreground font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-muted-foreground line-through text-xs">₹{p.mrp}</span>
                      <span className="text-foreground ml-2">₹{p.price}</span>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={p.ramzan_price ?? p.price}
                        onChange={e => setRamzanPrice(p.id, Number(e.target.value))}
                        disabled={!p.is_ramzan_offer}
                        className="w-24 bg-muted border border-border rounded px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-gold/50 disabled:opacity-40"
                      />
                    </td>
                    <td className="p-3">
                      {p.is_ramzan_offer && saving > 0 ? (
                        <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded">{savingPct}% OFF</span>
                      ) : <span className="text-muted-foreground text-xs">—</span>}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggle(p.id)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${p.is_ramzan_offer ? 'bg-gold' : 'bg-muted'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${p.is_ramzan_offer ? 'translate-x-7' : 'translate-x-1'}`} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRamzan;

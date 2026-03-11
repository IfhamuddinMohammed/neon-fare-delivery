import React from 'react';
import { sampleProducts } from '@/data/sampleData';
import { Pencil, Trash2 } from 'lucide-react';

const AdminProducts: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-foreground tracking-wider">PRODUCTS</h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium btn-glow">+ Add Product</button>
      </div>

      <div className="card-glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-muted-foreground font-medium">Product</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Category</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Price</th>
                <th className="text-left p-3 text-muted-foreground font-medium">MRP</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Discount</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Stock</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Branch</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Featured</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Ramzan</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sampleProducts.map(p => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-lg">🛒</div>
                      <div>
                        <p className="text-foreground font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">{p.category}</td>
                  <td className="p-3 text-gold font-medium">₹{p.price}</td>
                  <td className="p-3 text-muted-foreground line-through">₹{p.mrp}</td>
                  <td className="p-3"><span className="text-xs bg-emerald/20 text-emerald px-2 py-0.5 rounded">{p.discount_pct}%</span></td>
                  <td className="p-3">
                    <span className={`text-sm font-medium ${p.stock_qty > 50 ? 'text-emerald' : p.stock_qty > 10 ? 'text-gold' : 'text-primary'}`}>
                      {p.stock_qty}
                    </span>
                  </td>
                  <td className="p-3"><span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{p.branch}</span></td>
                  <td className="p-3">{p.is_featured ? '⭐' : '—'}</td>
                  <td className="p-3">{p.is_ramzan_offer ? '🌙' : '—'}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

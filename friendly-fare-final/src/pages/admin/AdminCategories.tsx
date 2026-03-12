import React, { useState } from 'react';
import { sampleCategories } from '@/data/sampleData';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState(sampleCategories);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', icon_emoji: '🛒', sort_order: categories.length + 1 });

  const handleAdd = () => {
    setCategories(prev => [...prev, { id: String(Date.now()), ...form }]);
    setShowModal(false);
    setForm({ name: '', icon_emoji: '🛒', sort_order: categories.length + 2 });
  };

  const del = (id: string) => setCategories(prev => prev.filter(c => c.id !== id));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-foreground tracking-wider">CATEGORIES</h1>
        <button onClick={() => setShowModal(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium btn-glow flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="card-glass rounded-xl p-4 flex items-center gap-4 group hover:border-primary/30 transition-all">
            <span className="text-4xl">{cat.icon_emoji}</span>
            <div className="flex-1">
              <p className="font-medium text-foreground">{cat.name}</p>
              <p className="text-xs text-muted-foreground">Sort: {cat.sort_order}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
              <button onClick={() => del(cat.id)} className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-primary transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="card-glass rounded-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl text-foreground tracking-wider">ADD CATEGORY</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              <input placeholder="Category Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
              <input placeholder="Emoji Icon (e.g. 🍎)" value={form.icon_emoji} onChange={e => setForm(f => ({ ...f, icon_emoji: e.target.value }))} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
              <input type="number" placeholder="Sort Order" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))} className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
              <button onClick={handleAdd} className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-display tracking-wider btn-glow">ADD CATEGORY</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;

import React, { useState } from 'react';
import { useAdminProducts } from '@/hooks/useProducts';
import { sampleCategories } from '@/data/sampleData';
import { Plus, Pencil, Trash2, X, Upload, Loader2, ImagePlus, ToggleLeft, ToggleRight, Search } from 'lucide-react';

const EMPTY_FORM = {
  name: '', brand: '', category: 'Fruits & Vegetables', description: '', nutritional_info: '',
  price: '', mrp: '', stock_qty: '', branch: 'Both',
  is_veg: true, is_featured: false, is_ramzan_offer: false, ramzan_price: '',
  tags: '', image_urls: [] as string[], is_active: true,
};

const AdminProducts: React.FC = () => {
  const { products, loading, addProduct, updateProduct, deleteProduct, uploadImage, refetch } = useAdminProducts();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openAdd = () => { setForm({ ...EMPTY_FORM }); setEditingId(null); setShowModal(true); };
  const openEdit = (p: any) => {
    setForm({
      name: p.name, brand: p.brand ?? '', category: p.category,
      description: p.description ?? '', nutritional_info: p.nutritional_info ?? '',
      price: String(p.price), mrp: String(p.mrp), stock_qty: String(p.stock_qty),
      branch: p.branch, is_veg: p.is_veg, is_featured: p.is_featured,
      is_ramzan_offer: p.is_ramzan_offer, ramzan_price: p.ramzan_price ? String(p.ramzan_price) : '',
      tags: (p.tags ?? []).join(', '), image_urls: p.image_urls ?? [], is_active: p.is_active,
    });
    setEditingId(p.id);
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) urls.push(url);
    }
    setForm(f => ({ ...f, image_urls: [...f.image_urls, ...urls] }));
    setUploading(false);
    showToast(`${urls.length} image(s) uploaded!`);
  };

  const removeImage = (idx: number) => setForm(f => ({ ...f, image_urls: f.image_urls.filter((_, i) => i !== idx) }));

  const handleSave = async () => {
    if (!form.name || !form.price || !form.mrp || !form.stock_qty) {
      showToast('Please fill all required fields', 'error'); return;
    }
    setSaving(true);
    const price = Number(form.price), mrp = Number(form.mrp);
    const payload = {
      name: form.name.trim(), brand: form.brand.trim(), category: form.category,
      description: form.description.trim(), nutritional_info: form.nutritional_info.trim(),
      price, mrp, discount_pct: Math.round(((mrp - price) / mrp) * 100),
      stock_qty: Number(form.stock_qty), branch: form.branch,
      is_veg: form.is_veg, is_featured: form.is_featured, is_active: form.is_active,
      is_ramzan_offer: form.is_ramzan_offer,
      ramzan_price: form.is_ramzan_offer && form.ramzan_price ? Number(form.ramzan_price) : null,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      image_urls: form.image_urls,
    };
    const err = editingId ? await updateProduct(editingId, payload) : await addProduct(payload);
    setSaving(false);
    if (err) { showToast(err.message, 'error'); return; }
    showToast(editingId ? 'Product updated!' : 'Product added!');
    setShowModal(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const err = await deleteProduct(id);
    if (err) showToast(err.message, 'error');
    else showToast('Product deleted');
  };

  const handleToggle = async (p: any, field: 'is_active' | 'is_featured' | 'is_ramzan_offer') => {
    await updateProduct(p.id, { [field]: !p[field] });
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    (p.brand ?? '').toLowerCase().includes(searchQ.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQ.toLowerCase())
  );

  const F = ({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">
        {label}{req && <span className="text-primary ml-1">*</span>}
      </label>
      {children}
    </div>
  );

  const inputCls = "w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";

  return (
    <div className="p-6 space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[200] px-5 py-3 rounded-xl shadow-2xl text-sm font-medium transition-all ${toast.type === 'success' ? 'bg-emerald text-white' : 'bg-primary text-white'}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl text-foreground tracking-wider">PRODUCTS</h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} total products in database</p>
        </div>
        <button onClick={openAdd} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold btn-glow flex items-center gap-2 hover:scale-105 transition-transform">
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search products..." className="w-full bg-muted border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40" />
      </div>

      {/* Table */}
      <div className="card-glass rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span>Loading products from database...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📦</p>
            <p className="text-foreground font-medium">{searchQ ? 'No products match your search' : 'No products yet'}</p>
            {!searchQ && <button onClick={openAdd} className="mt-4 text-primary hover:underline text-sm">Add your first product →</button>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-3 text-muted-foreground font-semibold">Product</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Category</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Price / MRP</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Stock</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Active</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Featured</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Ramzan</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => (
                  <tr key={p.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {p.image_urls?.[0] ? (
                          <img src={p.image_urls[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xl flex-shrink-0">🛒</div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">{p.category}</td>
                    <td className="p-3">
                      <span className="text-gold font-bold">₹{p.price}</span>
                      <span className="text-muted-foreground text-xs line-through ml-1">₹{p.mrp}</span>
                    </td>
                    <td className="p-3">
                      <span className={`font-bold text-sm ${p.stock_qty > 50 ? 'text-emerald' : p.stock_qty > 10 ? 'text-gold' : 'text-primary'}`}>
                        {p.stock_qty}
                      </span>
                    </td>
                    <td className="p-3">
                      <button onClick={() => handleToggle(p, 'is_active')} className={`relative w-10 h-5 rounded-full transition-colors ${p.is_active ? 'bg-emerald' : 'bg-muted'}`}>
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${p.is_active ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </td>
                    <td className="p-3">
                      <button onClick={() => handleToggle(p, 'is_featured')} className={`relative w-10 h-5 rounded-full transition-colors ${p.is_featured ? 'bg-gold' : 'bg-muted'}`}>
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${p.is_featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </td>
                    <td className="p-3">
                      <button onClick={() => handleToggle(p, 'is_ramzan_offer')} className={`relative w-10 h-5 rounded-full transition-colors ${p.is_ramzan_offer ? 'bg-gold' : 'bg-muted'}`}>
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${p.is_ramzan_offer ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => openEdit(p)} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors" title="Edit">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(p.id, p.name)} className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowModal(false)}>
          <div className="card-glass rounded-2xl w-full max-w-3xl my-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h2 className="font-display text-2xl text-foreground tracking-wider">{editingId ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">All fields marked * are required</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-muted rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-5 space-y-6">
              {/* Images Upload */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Product Images</label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {form.image_urls.map((url, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-border group">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removeImage(idx)} className="absolute inset-0 bg-background/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-5 h-5 text-primary" />
                      </button>
                    </div>
                  ))}
                  <label className={`w-20 h-20 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted transition-all ${uploading ? 'opacity-50' : ''}`}>
                    {uploading ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <><ImagePlus className="w-5 h-5 text-muted-foreground mb-1" /><span className="text-[10px] text-muted-foreground">Upload</span></>}
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={uploading} className="hidden" />
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">Upload JPG, PNG, WebP. First image is main product photo.</p>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <F label="Product Name" req><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Fresh Bananas 1 Dozen" className={inputCls} /></F>
                </div>
                <F label="Brand"><input value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} placeholder="e.g. Amul, MDH" className={inputCls} /></F>
                <F label="Category" req>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inputCls}>
                    {['Fruits & Vegetables','Dairy & Eggs','Bakery & Bread','Beverages','Snacks & Chips','Meat & Chicken','Rice & Grains','Spices & Masala','Household Items','Personal Care','Baby Products','Dry Fruits & Nuts'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </F>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <F label="Selling Price ₹" req><input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="0" className={inputCls} /></F>
                <F label="MRP ₹" req><input type="number" value={form.mrp} onChange={e => setForm(f => ({ ...f, mrp: e.target.value }))} placeholder="0" className={inputCls} /></F>
                <F label="Stock Qty" req><input type="number" value={form.stock_qty} onChange={e => setForm(f => ({ ...f, stock_qty: e.target.value }))} placeholder="0" className={inputCls} /></F>
                <F label="Branch">
                  <select value={form.branch} onChange={e => setForm(f => ({ ...f, branch: e.target.value }))} className={inputCls}>
                    <option value="Both">Both Branches</option>
                    <option value="Branch 1">Branch 1 Only</option>
                    <option value="Branch 2">Branch 2 Only</option>
                  </select>
                </F>
              </div>

              {/* Ramzan */}
              <div className="card-glass rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">🌙 Ramzan Special Offer</span>
                  <button onClick={() => setForm(f => ({ ...f, is_ramzan_offer: !f.is_ramzan_offer }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${form.is_ramzan_offer ? 'bg-gold' : 'bg-muted'}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.is_ramzan_offer ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
                {form.is_ramzan_offer && (
                  <F label="Ramzan Special Price ₹">
                    <input type="number" value={form.ramzan_price} onChange={e => setForm(f => ({ ...f, ramzan_price: e.target.value }))} placeholder="Special Ramzan price" className={inputCls} />
                  </F>
                )}
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: '✅ Active (visible on site)', field: 'is_active' as const },
                  { label: '⭐ Featured product', field: 'is_featured' as const },
                  { label: '🥗 Vegetarian', field: 'is_veg' as const },
                ].map(({ label, field }) => (
                  <div key={field} className="card-glass rounded-xl p-3 flex items-center justify-between">
                    <span className="text-xs text-foreground">{label}</span>
                    <button onClick={() => setForm(f => ({ ...f, [field]: !f[field] }))}
                      className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ml-2 ${form[field] ? 'bg-emerald' : 'bg-muted'}`}>
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form[field] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Description */}
              <F label="Description">
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Brief product description shown to customers..." className={inputCls + ' resize-none'} />
              </F>
              <F label="Tags (comma separated)">
                <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="e.g. fresh, organic, daily-use" className={inputCls} />
              </F>

              {/* Save */}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 border border-border text-foreground py-3 rounded-xl hover:bg-muted transition-colors font-medium">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-[2] bg-primary text-primary-foreground py-3 rounded-xl font-display text-lg tracking-wider btn-glow flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <>{editingId ? '✓ UPDATE PRODUCT' : '+ ADD PRODUCT'}</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;

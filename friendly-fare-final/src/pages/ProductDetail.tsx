import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sampleProducts, sampleCategories } from '@/data/sampleData';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Heart, Share2, ChevronLeft, Star, Truck, Shield, RotateCcw } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = sampleProducts.find(p => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutrition'>('desc');
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-5xl mb-4">🔍</p>
        <h2 className="font-display text-3xl text-foreground tracking-wider mb-2">PRODUCT NOT FOUND</h2>
        <Link to="/products" className="text-primary hover:underline mt-2">← Back to Products</Link>
      </div>
    );
  }

  const displayPrice = product.is_ramzan_offer && product.ramzan_price ? product.ramzan_price : product.price;
  const saving = product.mrp - displayPrice;
  const savingPct = Math.round((saving / product.mrp) * 100);
  const related = sampleProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = () => {
    window.open(`https://wa.me/?text=Check out this offer: ${product.name} at ₹${displayPrice} - ${window.location.href}`);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div className="space-y-3">
            <div className="card-glass rounded-2xl aspect-square flex items-center justify-center text-9xl relative overflow-hidden" style={{ boxShadow: '0 0 40px hsl(355 85% 50% / 0.05)' }}>
              🛒
              {product.is_ramzan_offer && (
                <span className="absolute top-4 left-4 bg-gold text-gold-foreground text-xs font-bold px-3 py-1 rounded-full">🌙 Ramzan Special</span>
              )}
              {product.is_featured && (
                <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full animate-pulse-glow">🔥 HOT DEAL</span>
              )}
            </div>
            {/* Thumbnails placeholder */}
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`card-glass rounded-lg aspect-square w-20 flex items-center justify-center text-2xl cursor-pointer transition-all ${i === 1 ? 'border border-primary' : 'hover:border-border'}`}>🛒</div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{product.brand}</p>
              <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-wide leading-tight">{product.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
            </div>

            {/* Veg indicator */}
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 border-2 rounded flex items-center justify-center ${product.is_veg ? 'border-emerald' : 'border-primary'}`}>
                <span className={`w-2.5 h-2.5 rounded-full ${product.is_veg ? 'bg-emerald' : 'bg-primary'}`} />
              </span>
              <span className="text-sm text-muted-foreground">{product.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}</span>
            </div>

            {/* Price */}
            <div className="card-glass rounded-xl p-4">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-bold text-gold">₹{displayPrice}</span>
                {saving > 0 && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">₹{product.mrp}</span>
                    <span className="bg-emerald/20 text-emerald text-sm font-bold px-2 py-1 rounded">Save ₹{saving} ({savingPct}% OFF)</span>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes • Free delivery</p>
            </div>

            {/* Stock */}
            <div>
              {product.stock_qty > 0 ? (
                <div className="flex items-center gap-2 text-emerald text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                  In Stock ({product.stock_qty} units available)
                </div>
              ) : (
                <div className="flex items-center gap-2 text-primary text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Out of Stock
                </div>
              )}
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex gap-3 items-center">
              <div className="flex items-center bg-muted rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 text-foreground hover:bg-primary/20 hover:text-primary transition-colors font-bold text-lg">−</button>
                <span className="px-5 py-3 text-foreground font-bold text-lg">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-4 py-3 text-foreground hover:bg-primary/20 hover:text-primary transition-colors font-bold text-lg">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock_qty === 0}
                className={`flex-1 py-3 rounded-xl font-display text-lg tracking-wider flex items-center justify-center gap-2 btn-glow transition-all ${added ? 'bg-emerald text-white' : 'bg-primary text-primary-foreground animate-pulse-glow'} disabled:opacity-40`}
              >
                <ShoppingCart className="w-5 h-5" />
                {added ? 'ADDED TO CART ✓' : 'ADD TO CART'}
              </button>
            </div>

            {/* Wishlist & Share */}
            <div className="flex gap-3">
              <button onClick={() => setWishlisted(w => !w)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all ${wishlisted ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-primary' : ''}`} />
                {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366]/10 text-sm transition-all">
                <Share2 className="w-4 h-4" /> Share on WhatsApp
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[{ icon: <Truck className="w-4 h-4" />, text: '20-Min Delivery' }, { icon: <Shield className="w-4 h-4" />, text: 'Quality Assured' }, { icon: <RotateCcw className="w-4 h-4" />, text: 'Easy Returns' }].map(b => (
                <div key={b.text} className="card-glass rounded-lg p-3 text-center">
                  <div className="text-gold flex justify-center mb-1">{b.icon}</div>
                  <p className="text-xs text-muted-foreground">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card-glass rounded-2xl overflow-hidden mb-16">
          <div className="flex border-b border-border">
            {[{ id: 'desc', label: 'Description' }, { id: 'nutrition', label: 'Nutritional Info' }].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id as 'desc' | 'nutrition')} className={`px-6 py-4 text-sm font-medium transition-all ${activeTab === t.id ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === 'desc' ? (
              <p className="text-muted-foreground leading-relaxed">{product.description || 'No description available.'}</p>
            ) : (
              <p className="text-muted-foreground">{product.nutritional_info || 'Nutritional information not available for this product.'}</p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-3xl text-foreground tracking-wider mb-6">YOU MAY ALSO LIKE</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map(p => {
                const rPrice = p.is_ramzan_offer && p.ramzan_price ? p.ramzan_price : p.price;
                return (
                  <Link key={p.id} to={`/product/${p.id}`} className="card-glass-hover rounded-xl overflow-hidden group">
                    <div className="aspect-square bg-muted flex items-center justify-center text-4xl">🛒</div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                      <p className="text-sm font-medium text-foreground line-clamp-2 mt-0.5">{p.name}</p>
                      <p className="text-gold font-bold mt-1">₹{rPrice}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;

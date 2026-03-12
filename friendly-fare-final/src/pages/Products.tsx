import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { sampleProducts, sampleCategories } from '@/data/sampleData';
import ProductCard from '@/components/ProductCard';
import CategoryIcon from '@/components/CategoryIcon';
import { SlidersHorizontal, X, Grid3X3, List } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || '';
  const searchFilter = searchParams.get('search') || '';
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [vegOnly, setVegOnly] = useState(false);
  const [priceMax, setPriceMax] = useState(600);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let products = [...sampleProducts];
    if (categoryFilter) products = products.filter(p => p.category === categoryFilter);
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (vegOnly) products = products.filter(p => p.is_veg);
    products = products.filter(p => p.price <= priceMax);
    switch (sortBy) {
      case 'price-low': products.sort((a, b) => a.price - b.price); break;
      case 'price-high': products.sort((a, b) => b.price - a.price); break;
      case 'discount': products.sort((a, b) => b.discount_pct - a.discount_pct); break;
      default: products.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }
    return products;
  }, [categoryFilter, searchFilter, sortBy, vegOnly, priceMax]);

  const clearAll = () => setSearchParams({});

  const pageTitle = searchFilter
    ? `Search: "${searchFilter}"`
    : categoryFilter || 'ALL PRODUCTS';

  return (
    <div className="min-h-screen">
      {/* Header bar */}
      <div className="bg-secondary/40 border-b border-border py-5">
        <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-wider">{pageTitle}</h1>
            <p className="text-muted-foreground text-sm mt-1">{filtered.length} products found</p>
          </div>
          {(categoryFilter || searchFilter) && (
            <button onClick={clearAll} className="flex items-center gap-2 text-sm text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors">
              <X className="w-3.5 h-3.5" /> Clear filter
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Mobile toggle */}
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 card-glass px-4 py-2.5 rounded-xl text-sm font-medium text-foreground w-full justify-center">
            <SlidersHorizontal className="w-4 h-4" /> {showFilters ? 'Hide' : 'Show'} Filters
          </button>

          {/* Sidebar */}
          <aside className={`w-full lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card-glass rounded-2xl p-5 space-y-6 sticky top-24">
              <div className="flex items-center gap-2 font-display text-lg text-foreground tracking-wider">
                <SlidersHorizontal className="w-5 h-5 text-primary" /> FILTERS
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">Category</h4>
                <div className="space-y-1 max-h-72 overflow-y-auto scrollbar-hide">
                  <Link to="/products" className={`flex items-center gap-2 w-full text-sm px-3 py-2 rounded-xl transition-all ${!categoryFilter && !searchFilter ? 'bg-primary/15 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                    🛍️ All Products
                  </Link>
                  {sampleCategories.map(cat => (
                    <Link key={cat.id} to={`/products?category=${encodeURIComponent(cat.name)}`}
                      className={`flex items-center gap-2 w-full text-sm px-3 py-2 rounded-xl transition-all ${categoryFilter === cat.name ? 'bg-primary/15 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                      <div className="w-5 h-5 flex-shrink-0"><CategoryIcon name={cat.name} className="w-5 h-5" /></div>
                      <span className="leading-tight">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">
                  Max Price: <span className="text-gold font-bold">₹{priceMax}</span>
                </h4>
                <input type="range" min={20} max={600} value={priceMax}
                  onChange={e => setPriceMax(Number(e.target.value))}
                  className="w-full accent-primary" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>₹20</span><span>₹600</span></div>
              </div>

              {/* Veg Only */}
              <div className="flex items-center justify-between card-glass rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-emerald rounded flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-emerald" />
                  </span>
                  <span className="text-sm text-foreground">Veg Only</span>
                </div>
                <button onClick={() => setVegOnly(!vegOnly)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${vegOnly ? 'bg-emerald' : 'bg-muted'}`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${vegOnly ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <button onClick={() => { setVegOnly(false); setPriceMax(600); clearAll(); }}
                className="w-full text-xs text-muted-foreground hover:text-primary underline transition-colors">
                Reset all filters
              </button>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">{filtered.length}</span> products
                {searchFilter && <span> for "<span className="text-primary">{searchFilter}</span>"</span>}
                {categoryFilter && <span> in <span className="text-primary">{categoryFilter}</span></span>}
              </p>
              <div className="flex items-center gap-2">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low–High</option>
                  <option value="price-high">Price: High–Low</option>
                  <option value="discount">Best Discount</option>
                </select>
                <div className="flex bg-muted rounded-xl p-0.5">
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground'}`}><Grid3X3 className="w-4 h-4" /></button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground'}`}><List className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-lg text-foreground font-medium">No products found</p>
                <p className="text-sm text-muted-foreground mt-2">Try a different search or adjust your filters</p>
                <button onClick={clearAll} className="mt-4 text-primary hover:underline text-sm">Clear all filters</button>
              </div>
            ) : (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filtered.map((product, i) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <ProductCard product={product} showRamzanBadge />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

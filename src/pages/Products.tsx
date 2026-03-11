import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sampleProducts, sampleCategories } from '@/data/sampleData';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, Grid3X3, List } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || '';
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [vegOnly, setVegOnly] = useState(false);

  const filtered = useMemo(() => {
    let products = [...sampleProducts];
    if (categoryFilter) products = products.filter(p => p.category === categoryFilter);
    if (vegOnly) products = products.filter(p => p.is_veg);
    switch (sortBy) {
      case 'price-low': products.sort((a, b) => a.price - b.price); break;
      case 'price-high': products.sort((a, b) => b.price - a.price); break;
      case 'discount': products.sort((a, b) => b.discount_pct - a.discount_pct); break;
      default: products.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }
    return products;
  }, [categoryFilter, sortBy, vegOnly]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="card-glass rounded-xl p-4 space-y-6 sticky top-24">
            <div className="flex items-center gap-2 text-foreground font-display text-lg tracking-wider">
              <SlidersHorizontal className="w-5 h-5" /> FILTERS
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Category</h4>
              <div className="space-y-1">
                {sampleCategories.map(cat => (
                  <a
                    key={cat.id}
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    className={`block text-sm px-2 py-1.5 rounded transition-colors ${categoryFilter === cat.name ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                  >
                    {cat.icon_emoji} {cat.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Veg toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Veg Only</span>
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`w-10 h-6 rounded-full transition-colors ${vegOnly ? 'bg-emerald' : 'bg-muted'}`}
              >
                <span className={`block w-4 h-4 rounded-full bg-foreground transition-transform ml-1 ${vegOnly ? 'translate-x-4' : ''}`} />
              </button>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">{filtered.length} products found</p>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-muted border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low–High</option>
                <option value="price-high">Price: High–Low</option>
                <option value="discount">Discount %</option>
              </select>
              <div className="flex bg-muted rounded-lg p-0.5">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} showRamzanBadge />
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No products found</p>
              <p className="text-sm mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

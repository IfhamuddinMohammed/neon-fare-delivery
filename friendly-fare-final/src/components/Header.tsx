import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, User, Search, MapPin, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { sampleProducts } from '@/data/sampleData';

const Header: React.FC = () => {
  const { totalItems, setIsOpen } = useCart();
  const [branch, setBranch] = useState<'1' | '2'>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Live search results
  const searchResults = searchQuery.trim().length > 1
    ? sampleProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileSearch(false);
      setSearchQuery('');
    }
  };

  const handleResultClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setSearchOpen(false);
    setMobileSearch(false);
  };

  const SearchBox = ({ autoFocus = false }: { autoFocus?: boolean }) => (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSearchSubmit}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
        <input
          autoFocus={autoFocus}
          type="text"
          placeholder="Search groceries, brands, categories..."
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
          onFocus={() => setSearchOpen(true)}
          className="w-full bg-muted border border-border rounded-xl pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        {searchQuery && (
          <button type="button" onClick={() => { setSearchQuery(''); setSearchOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Live Results Dropdown */}
      {searchOpen && searchQuery.trim().length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl z-[100] overflow-hidden">
          {searchResults.length > 0 ? (
            <>
              <div className="px-3 py-2 border-b border-border">
                <p className="text-xs text-muted-foreground font-medium">{searchResults.length} results for "{searchQuery}"</p>
              </div>
              {searchResults.map(product => {
                const price = product.is_ramzan_offer && product.ramzan_price ? product.ramzan_price : product.price;
                const saving = Math.round(((product.mrp - price) / product.mrp) * 100);
                return (
                  <button key={product.id} onClick={() => handleResultClick(product.id)}
                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-muted transition-colors text-left border-b border-border/50 last:border-0">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      {product.category === 'Fruits & Vegetables' ? '🍎' :
                       product.category === 'Dairy & Eggs' ? '🥛' :
                       product.category === 'Meat & Chicken' ? '🍗' :
                       product.category === 'Beverages' ? '🥤' :
                       product.category === 'Snacks & Chips' ? '🍿' :
                       product.category === 'Dry Fruits & Nuts' ? '🥜' :
                       product.category === 'Rice & Grains' ? '🌾' : '🛒'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.brand} · {product.category}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-gold">₹{price}</p>
                      {saving > 0 && <p className="text-[10px] text-emerald">{saving}% off</p>}
                    </div>
                  </button>
                );
              })}
              <button onClick={handleSearchSubmit as any}
                className="w-full px-3 py-2.5 text-center text-sm text-primary hover:bg-primary/5 transition-colors font-medium">
                See all results for "{searchQuery}" →
              </button>
            </>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-muted-foreground">No products found for "{searchQuery}"</p>
              <p className="text-xs text-muted-foreground mt-1">Try searching by product name, brand or category</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary overflow-hidden py-2">
        <div className="animate-marquee whitespace-nowrap flex">
          <span className="text-primary-foreground text-sm font-medium mx-8">
            🎉 Ramzan Special Offers Now Live! &nbsp;|&nbsp; 🚀 Free Delivery in 20 Minutes &nbsp;|&nbsp; 💰 Discounts on All Items &nbsp;|&nbsp; 📞 +91 86863 99850 &nbsp;|&nbsp; 🛒 Order Now
          </span>
          <span className="text-primary-foreground text-sm font-medium mx-8">
            🎉 Ramzan Special Offers Now Live! &nbsp;|&nbsp; 🚀 Free Delivery in 20 Minutes &nbsp;|&nbsp; 💰 Discounts on All Items &nbsp;|&nbsp; 📞 +91 86863 99850 &nbsp;|&nbsp; 🛒 Order Now
          </span>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-secondary border-b border-primary/30 shadow-lg">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex flex-col items-start group">
            <span className="font-display text-2xl text-primary text-glow-red tracking-wider leading-none group-hover:scale-105 transition-transform">FRIENDLY FARE</span>
            <span className="text-[9px] text-gold tracking-[0.3em] font-medium">SUPER MARKET</span>
          </Link>

          {/* Desktop Search */}
          <div className="flex-1 max-w-xl hidden md:block">
            <SearchBox />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3 ml-auto md:ml-0">

            {/* Mobile search toggle */}
            <button onClick={() => setMobileSearch(!mobileSearch)} className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
              <Search className="w-5 h-5 text-foreground" />
            </button>

            {/* Branch selector */}
            <div className="hidden md:flex items-center bg-muted rounded-full p-0.5">
              {(['1', '2'] as const).map(b => (
                <button key={b} onClick={() => setBranch(b)}
                  className={`px-3 py-1 text-xs rounded-full transition-all flex items-center gap-1 ${branch === b ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  <MapPin className="w-3 h-3" />Branch {b}
                </button>
              ))}
            </div>

            {/* Cart */}
            <button onClick={() => setIsOpen(true)} className="relative p-2 hover:bg-muted rounded-xl transition-colors group">
              <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse-glow">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Account */}
            <Link to="/account" className="p-2 hover:bg-muted rounded-xl transition-colors group">
              <User className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            </Link>

            {/* WhatsApp CTA - desktop only */}
            <a href="https://wa.me/918686399850?text=Hi,%20I%20want%20to%20order%20from%20Friendly%20Fare"
              target="_blank" rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-[#25D366] text-white text-xs font-bold px-3 py-2 rounded-xl hover:opacity-90 transition-opacity"
              style={{ boxShadow: '0 0 12px #25D36640' }}>
              💬 WhatsApp Order
            </a>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearch && (
          <div className="md:hidden px-4 pb-3 border-t border-border/50 pt-3">
            <SearchBox autoFocus />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

import React from 'react';
import { ShoppingCart, User, Search, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

const Header: React.FC = () => {
  const { totalItems, setIsOpen } = useCart();
  const [branch, setBranch] = useState<'1' | '2'>('1');
  const [searchQuery, setSearchQuery] = useState('');

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
      <header className="sticky top-0 z-50 bg-secondary border-b border-primary/30">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex flex-col items-start">
            <span className="font-display text-2xl text-primary-foreground text-glow-red tracking-wider leading-none">FRIENDLY FARE</span>
            <span className="text-[10px] text-gold tracking-[0.3em] font-medium">SUPER MARKET</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Branch selector */}
            <div className="hidden md:flex items-center bg-muted rounded-full p-0.5">
              <button
                onClick={() => setBranch('1')}
                className={`px-3 py-1 text-xs rounded-full transition-all ${branch === '1' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <MapPin className="w-3 h-3 inline mr-1" />Branch 1
              </button>
              <button
                onClick={() => setBranch('2')}
                className={`px-3 py-1 text-xs rounded-full transition-all ${branch === '2' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <MapPin className="w-3 h-3 inline mr-1" />Branch 2
              </button>
            </div>

            {/* Cart */}
            <button onClick={() => setIsOpen(true)} className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User */}
            <Link to="/account" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <User className="w-5 h-5 text-foreground" />
            </Link>

            {/* WhatsApp */}
            <a href="https://wa.me/918686399850?text=Hi,%20I%20want%20to%20order%20from%20Friendly%20Fare" target="_blank" rel="noopener noreferrer" className="hidden md:flex p-2 hover:bg-muted rounded-lg transition-colors">
              <Phone className="w-5 h-5 text-emerald" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

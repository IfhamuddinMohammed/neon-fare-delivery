import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-primary/20 mt-16">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand */}
        <div>
          <h3 className="font-display text-2xl text-primary text-glow-red tracking-wider">FRIENDLY FARE</h3>
          <p className="text-[10px] text-gold tracking-[0.3em] mb-3">SUPER MARKET</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Fresh. Fast. Friendly. Your trusted neighborhood supermarket in Hyderabad delivering groceries in 20 minutes.
          </p>
        </div>

        {/* Col 2: Branch 1 */}
        <div>
          <h4 className="font-display text-lg text-foreground tracking-wider mb-3">BRANCH 1</h4>
          <p className="text-sm text-muted-foreground mb-3">3, IAS Colony Rd, Toli Chowki, Hyderabad – 500008</p>
          <a href="https://maps.google.com/?q=17.4068,78.4313" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:text-glow-red transition-all">
            <MapPin className="w-4 h-4" /> Get Directions
          </a>
        </div>

        {/* Col 3: Branch 2 */}
        <div>
          <h4 className="font-display text-lg text-foreground tracking-wider mb-3">BRANCH 2</h4>
          <p className="text-sm text-muted-foreground mb-3">Door No 9-3, 238/A6, Near IBM Hospital, Tolichowki Road – 500008</p>
          <a href="https://maps.google.com/?q=17.4041,78.4298" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:text-glow-red transition-all">
            <MapPin className="w-4 h-4" /> Get Directions
          </a>
        </div>

        {/* Col 4: Contact */}
        <div>
          <h4 className="font-display text-lg text-foreground tracking-wider mb-3">CONTACT US</h4>
          <a href="tel:+918686399850" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3">
            <Phone className="w-4 h-4" /> +91 86863 99850
          </a>
          <div className="flex gap-3 mt-4">
            <a href="https://wa.me/918686399850" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center text-primary-foreground text-sm font-bold">W</a>
            <a href="https://instagram.com/friendlyfarehyderabad" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center text-primary-foreground text-sm font-bold">I</a>
            <a href="https://facebook.com/friendlyfarehyderabad" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center text-primary-foreground text-sm font-bold">F</a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-muted-foreground">
          © 2025 New Friendly Fare Super Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

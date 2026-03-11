import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { sampleProducts } from '@/data/sampleData';

const RamzanPage: React.FC = () => {
  const ramzanProducts = sampleProducts.filter(p => p.is_ramzan_offer);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    const tick = () => {
      const diff = endDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0D1B2A 0%, #0A0A0A 100%)' }}>
      {/* Header */}
      <div className="relative py-20 text-center overflow-hidden">
        <div className="absolute top-5 left-10 text-6xl opacity-10 pointer-events-none">🏮</div>
        <div className="absolute top-10 right-16 text-9xl opacity-10 text-gold pointer-events-none">🌙</div>
        <div className="absolute bottom-10 left-1/4 text-3xl opacity-5 pointer-events-none">✨</div>
        <div className="absolute bottom-5 right-1/3 text-2xl opacity-5 pointer-events-none">⭐</div>
        <div className="absolute top-5 right-10 text-6xl opacity-10 pointer-events-none">🏮</div>

        <h1 className="font-serif text-6xl md:text-8xl font-bold text-gold text-glow-gold mb-4 relative z-10">🌙 RAMZAN MUBARAK</h1>
        <p className="text-xl text-muted-foreground relative z-10 mb-10">Exclusive deals for the holy month</p>

        {/* Countdown */}
        <div className="flex justify-center gap-4 relative z-10">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="card-glass rounded-xl p-4 min-w-[80px]" style={{ borderColor: 'hsl(43 78% 46% / 0.3)' }}>
              <span className="font-display text-3xl md:text-4xl text-gold">{String(value).padStart(2, '0')}</span>
              <p className="text-xs text-muted-foreground uppercase mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ramzanProducts.map(product => (
            <ProductCard key={product.id} product={product} showRamzanBadge />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center card-glass rounded-2xl p-8" style={{ borderColor: 'hsl(43 78% 46% / 0.2)' }}>
          <p className="text-2xl font-display text-gold tracking-wider mb-2">🕌 Placing bulk orders for Iftar or Sehri parties?</p>
          <p className="text-muted-foreground mb-6">Contact us on WhatsApp for special bulk pricing</p>
          <a
            href="https://wa.me/918686399850?text=I%20want%20to%20place%20a%20bulk%20Ramzan%20order"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-gold-foreground px-8 py-3 rounded-lg font-display text-lg tracking-wider animate-pulse-gold"
          >
            MESSAGE US ON WHATSAPP
          </a>
        </div>
      </div>
    </div>
  );
};

export default RamzanPage;

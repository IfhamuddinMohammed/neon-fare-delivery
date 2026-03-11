import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Truck, BadgePercent, Leaf, Gift, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { sampleCategories, sampleProducts } from '@/data/sampleData';

const heroSlides = [
  {
    title: 'FRESH GROCERIES DELIVERED IN',
    highlight: '20 MINUTES',
    subtitle: 'Free delivery to your doorstep | Toli Chowki & Surrounding Areas',
    cta: 'ORDER NOW',
    ctaLink: '/products',
    style: 'red',
  },
  {
    title: 'RAMZAN MUBARAK 🌙',
    highlight: '',
    subtitle: 'Exclusive Deals for the Holy Month',
    cta: 'SHOP RAMZAN OFFERS',
    ctaLink: '/ramzan',
    style: 'gold',
  },
  {
    title: 'FREE DELIVERY ON',
    highlight: 'EVERY ORDER',
    subtitle: 'No minimum order. Always free.',
    cta: 'START SHOPPING',
    ctaLink: '/products',
    style: 'white',
  },
];

const trustBadges = [
  { icon: Truck, text: '20-Min Delivery', emoji: '🚀' },
  { icon: BadgePercent, text: 'Best Prices', emoji: '💰' },
  { icon: Leaf, text: 'Fresh Daily', emoji: '🌿' },
  { icon: Gift, text: 'Free Delivery', emoji: '🆓' },
];

const testimonials = [
  { name: 'Fatima Begum', area: 'Toli Chowki', text: 'Best grocery store! Always fresh vegetables and super fast delivery. Ramzan deals are amazing.', rating: 5 },
  { name: 'Rajesh Kumar', area: 'Mehdipatnam', text: 'Incredible prices and the delivery is always on time. My go-to store for daily needs.', rating: 5 },
  { name: 'Ayesha Khan', area: 'Shaikpet', text: 'Love the Ramzan special offers! Great quality dates and vermicelli. Highly recommend!', rating: 4 },
];

const Homepage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredProducts = sampleProducts.filter(p => p.is_featured);
  const ramzanProducts = sampleProducts.filter(p => p.is_ramzan_offer);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4 z-10 max-w-4xl"
          >
            {heroSlides[currentSlide].style === 'gold' ? (
              <>
                <h1 className="font-display text-6xl md:text-8xl text-gold text-glow-gold tracking-wider mb-4">
                  {heroSlides[currentSlide].title}
                </h1>
              </>
            ) : (
              <h1 className="font-display text-5xl md:text-7xl text-foreground tracking-wider mb-4">
                {heroSlides[currentSlide].title}{' '}
                <span className="text-primary text-glow-red">{heroSlides[currentSlide].highlight}</span>
              </h1>
            )}
            <p className="text-muted-foreground text-lg md:text-xl mb-8">{heroSlides[currentSlide].subtitle}</p>
            <Link
              to={heroSlides[currentSlide].ctaLink}
              className={`inline-block px-8 py-4 rounded-lg font-display text-xl tracking-wider transition-all ${
                heroSlides[currentSlide].style === 'gold'
                  ? 'bg-gold text-gold-foreground animate-pulse-gold'
                  : heroSlides[currentSlide].style === 'white'
                  ? 'border-2 border-foreground text-foreground hover:bg-foreground hover:text-background'
                  : 'bg-primary text-primary-foreground animate-pulse-glow'
              }`}
            >
              {heroSlides[currentSlide].cta}
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute bottom-8 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-primary w-8' : 'bg-muted-foreground/30'}`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl text-foreground tracking-wider">SHOP BY CATEGORY</h2>
          <div className="divider-glow mx-auto max-w-48 mt-3" />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sampleCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="card-glass-hover rounded-xl p-4 text-center group"
            >
              <span className="text-4xl block mb-2">{cat.icon_emoji}</span>
              <span className="text-xs md:text-sm font-medium text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="divider-glow mx-auto" />

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-3xl text-foreground tracking-wider">⚡ TODAY'S HOT DEALS</h2>
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">FEATURED</span>
            </div>
          </div>
          <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-[240px] max-w-[240px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Ramzan Section */}
      {ramzanProducts.length > 0 && (
        <section className="relative py-16 overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #1A0F00 0%, #0D1B2A 100%)' }}>
          {/* Decorative crescent */}
          <div className="absolute top-10 right-10 text-8xl opacity-10 text-gold pointer-events-none">🌙</div>
          <div className="absolute bottom-20 left-10 text-4xl opacity-5 text-gold pointer-events-none">✨</div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-gold text-glow-gold mb-3">🌙 RAMZAN SPECIAL OFFERS</h2>
              <p className="text-muted-foreground text-lg">Exclusive deals for the holy month of Ramzan</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {ramzanProducts.map((product) => (
                <ProductCard key={product.id} product={product} showRamzanBadge />
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href="https://wa.me/918686399850?text=I%20want%20to%20place%20a%20bulk%20Ramzan%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold text-gold-foreground px-8 py-3 rounded-lg font-display text-lg tracking-wider animate-pulse-gold"
              >
                🕌 BULK IFTAR/SEHRI ORDERS — MESSAGE ON WHATSAPP
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="border-y border-border">
        <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustBadges.map((badge, i) => (
            <div key={i} className="text-center">
              <span className="text-3xl mb-2 block">{badge.emoji}</span>
              <span className="text-sm font-medium text-foreground">{badge.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-3xl text-foreground tracking-wider text-center mb-10">WHAT OUR CUSTOMERS SAY</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card-glass rounded-xl p-6">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className={`w-4 h-4 ${s < t.rating ? 'text-gold fill-gold' : 'text-muted-foreground'}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
              <p className="text-sm font-medium text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.area}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;

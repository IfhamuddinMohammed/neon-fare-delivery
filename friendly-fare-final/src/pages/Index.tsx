import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import CategoryIcon from '@/components/CategoryIcon';
import { useProducts } from '@/hooks/useProducts';
import { sampleCategories, sampleProducts } from '@/data/sampleData';

const heroSlides = [
  { title:'FRESH GROCERIES DELIVERED IN', highlight:'20 MINUTES', subtitle:'Free delivery to your doorstep | Toli Chowki & Surrounding Areas', cta:'ORDER NOW', ctaLink:'/products', style:'red' },
  { title:'RAMZAN MUBARAK 🌙', highlight:'', subtitle:'Exclusive Deals — Dates, Vermicelli, Sharbat & More', cta:'SHOP RAMZAN OFFERS', ctaLink:'/ramzan', style:'gold' },
  { title:'FREE DELIVERY ON', highlight:'EVERY ORDER', subtitle:'No minimum order. No hidden charges. Always free.', cta:'START SHOPPING', ctaLink:'/products', style:'white' },
];
const trust = [
  {e:'🚀',t:'20-Min Delivery',s:'Lightning fast'},
  {e:'💰',t:'Best Prices',s:'Guaranteed savings'},
  {e:'🌿',t:'Always Fresh',s:'Daily restocked'},
  {e:'🆓',t:'Free Delivery',s:'On every order'},
];
const testimonials = [
  {name:'Fatima Begum',area:'Toli Chowki',text:'Best grocery store! Always fresh vegetables and super fast delivery. Ramzan deals are amazing!',rating:5},
  {name:'Rajesh Kumar',area:'Mehdipatnam',text:'Incredible prices and delivery always on time. My entire family orders from Friendly Fare.',rating:5},
  {name:'Ayesha Khan',area:'Shaikpet',text:'Love the Ramzan special offers! Great quality dates and vermicelli. Delivered in just 15 minutes!',rating:5},
];

const Homepage: React.FC = () => {
  const [slide, setSlide] = useState(0);
  const { products: dbProducts, loading } = useProducts();
  // Use DB products if available, else fall back to sample data
  const products = dbProducts.length > 0 ? dbProducts : sampleProducts;
  const featured = products.filter(p => p.is_featured);
  const ramzan = products.filter(p => p.is_ramzan_offer);

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = heroSlides[slide];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[88vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/6 rounded-full blur-3xl animate-pulse pointer-events-none" style={{animationDelay:'1s'}} />
        <AnimatePresence mode="wait">
          <motion.div key={slide} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-30}} transition={{duration:0.7}} className="text-center px-4 z-10 max-w-5xl">
            {s.style==='gold' ? (
              <h1 className="font-display text-6xl md:text-9xl text-gold text-glow-gold tracking-wider mb-4 leading-none">{s.title}</h1>
            ) : (
              <h1 className="font-display text-5xl md:text-8xl text-foreground tracking-wider mb-4 leading-none">
                {s.title} {s.highlight && <span className="text-primary text-glow-red block md:inline">{s.highlight}</span>}
              </h1>
            )}
            <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto">{s.subtitle}</p>
            <Link to={s.ctaLink} className={`inline-block px-10 py-5 rounded-2xl font-display text-xl md:text-2xl tracking-widest transition-all duration-300 hover:scale-105 ${s.style==='gold'?'bg-gold text-gold-foreground animate-pulse-gold shadow-2xl':s.style==='white'?'border-2 border-foreground text-foreground hover:bg-foreground hover:text-background':'bg-primary text-primary-foreground animate-pulse-glow shadow-2xl'}`}>
              {s.cta} →
            </Link>
          </motion.div>
        </AnimatePresence>
        <button onClick={()=>setSlide(p=>(p-1+heroSlides.length)%heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/30 hover:bg-background/60 rounded-full flex items-center justify-center backdrop-blur-sm z-10 transition-all"><ChevronLeft className="w-5 h-5 text-foreground"/></button>
        <button onClick={()=>setSlide(p=>(p+1)%heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/30 hover:bg-background/60 rounded-full flex items-center justify-center backdrop-blur-sm z-10 transition-all"><ChevronRight className="w-5 h-5 text-foreground"/></button>
        <div className="absolute bottom-8 flex gap-2 z-10">
          {heroSlides.map((_,i)=><button key={i} onClick={()=>setSlide(i)} className={`rounded-full transition-all duration-300 ${i===slide?'bg-primary w-8 h-3':'bg-muted-foreground/30 w-3 h-3'}`}/>)}
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trust.map((b,i)=>(
            <div key={i} className="text-center group">
              <span className="text-3xl block mb-1 group-hover:scale-125 transition-transform duration-200">{b.e}</span>
              <p className="text-sm font-bold text-foreground">{b.t}</p>
              <p className="text-xs text-muted-foreground">{b.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <h2 className="font-display text-4xl md:text-5xl text-foreground tracking-wider">SHOP BY CATEGORY</h2>
          <div className="divider-glow mx-auto max-w-48 mt-3"/>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {sampleCategories.map((cat,i)=>(
            <motion.div key={cat.id} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:i*0.04}}>
              <Link to={`/products?category=${encodeURIComponent(cat.name)}`} className="card-glass-hover rounded-2xl p-3 text-center group flex flex-col items-center gap-2">
                <div className="w-14 h-14 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                  <CategoryIcon name={cat.name} className="w-full h-full"/>
                </div>
                <span className="text-[11px] font-semibold text-foreground group-hover:text-primary transition-colors leading-tight text-center">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="divider-glow mx-16"/>

      {/* FEATURED */}
      <section className="container mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs text-primary font-bold tracking-widest uppercase mb-1">Hand-picked for you</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-wider flex items-center gap-3">
              ⚡ TODAY'S HOT DEALS
              {!loading && <span className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded-full animate-pulse-glow">LIVE</span>}
            </h2>
          </div>
          <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium whitespace-nowrap">View All <ChevronRight className="w-4 h-4"/></Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_,i)=><div key={i} className="card-glass rounded-2xl aspect-[3/4] animate-pulse"/>)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.slice(0,8).map((p,i)=>(
              <motion.div key={p.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}>
                <ProductCard product={p} showRamzanBadge/>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* RAMZAN */}
      {ramzan.length > 0 && (
        <section className="relative py-20 overflow-hidden" style={{background:'radial-gradient(ellipse at top, #1A0F00 0%, #0D1B2A 50%, #0a0a0a 100%)'}}>
          <div className="absolute top-8 right-8 pointer-events-none select-none text-gold" style={{fontSize:160,opacity:0.06}}>🌙</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"/>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h2 className="font-serif text-5xl md:text-7xl font-bold text-gold mb-3" style={{textShadow:'0 0 40px hsl(43 78% 46%), 0 0 80px hsl(43 78% 46% / 0.4)'}}>🌙 RAMZAN MUBARAK</h2>
              <p className="text-muted-foreground text-lg">Exclusive deals for the holy month</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
              {ramzan.map((p,i)=>(
                <motion.div key={p.id} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:i*0.1}}>
                  <ProductCard product={p} showRamzanBadge/>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <div className="inline-block card-glass rounded-2xl px-8 py-6" style={{borderColor:'hsl(43 78% 46% / 0.3)'}}>
                <p className="text-xl font-display text-gold tracking-wider mb-2">🕌 Bulk Iftar or Sehri Orders?</p>
                <p className="text-muted-foreground text-sm mb-5">Special bulk pricing for parties & gatherings</p>
                <a href="https://wa.me/918686399850?text=I%20want%20to%20place%20a%20bulk%20Ramzan%20order" target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-gold text-gold-foreground px-8 py-3 rounded-xl font-display text-lg tracking-wider animate-pulse-gold hover:scale-105 transition-transform">
                  MESSAGE ON WHATSAPP 💬
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-wider">WHAT CUSTOMERS SAY</h2>
          <div className="divider-glow mx-auto max-w-48 mt-3"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t,i)=>(
            <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.15}}
              className="card-glass rounded-2xl p-6">
              <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map(s=><Star key={s} className={`w-4 h-4 ${s<=t.rating?'text-gold fill-gold':'text-muted-foreground'}`}/>)}</div>
              <p className="text-sm text-muted-foreground italic leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">{t.name[0]}</div>
                <div><p className="text-sm font-semibold text-foreground">{t.name}</p><p className="text-xs text-muted-foreground">{t.area}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Homepage;

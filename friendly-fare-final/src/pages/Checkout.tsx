import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/hooks/useOrders';
import { MapPin, CheckCircle, ChevronRight, Smartphone, Banknote, CreditCard, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 1 | 2 | 3;
type PaymentMethod = 'COD' | 'UPI' | 'Bank';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, totalSavings, grandTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [step, setStep] = useState<Step>(1);
  const [locationStatus, setLocationStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [locationData, setLocationData] = useState<{lat:number;lng:number;url:string}|null>(null);
  const [manualAddress, setManualAddress] = useState('');
  const [branch, setBranch] = useState<'Branch 1'|'Branch 2'>('Branch 1');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-5xl mb-4">🛒</p>
      <h2 className="font-display text-3xl text-foreground tracking-wider mb-2">CART IS EMPTY</h2>
      <Link to="/products" className="mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-display tracking-wider btn-glow">SHOP NOW</Link>
    </div>
  );

  const handleShareLocation = () => {
    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setLocationData({ lat, lng, url: `https://maps.google.com/?q=${lat},${lng}` });
        setLocationStatus('success');
      },
      () => setLocationStatus('error'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    const orderData = {
      customer_name: customerName,
      customer_phone: customerPhone,
      branch,
      delivery_address: manualAddress || null,
      customer_lat: locationData?.lat || null,
      customer_lng: locationData?.lng || null,
      maps_link: locationData?.url || null,
      items: items.map(i => ({ product: { id: i.product.id, name: i.product.name, price: i.product.price }, quantity: i.quantity })),
      subtotal,
      grand_total: grandTotal,
      payment_method: paymentMethod,
      status: 'pending' as const,
    };
    const { error, order_number } = await placeOrder(orderData);
    setPlacing(false);
    if (error) { alert('Failed to place order. Please try WhatsApp instead.'); return; }
    clearCart();
    navigate(`/order-confirmed/${order_number}`);
  };

  const inputCls = "w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";
  const stepLabels = ['Delivery', 'Payment', 'Confirm'];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
        <h1 className="font-display text-4xl text-foreground tracking-wider mb-8">CHECKOUT</h1>

        {/* Steps */}
        <div className="flex items-center mb-10">
          {stepLabels.map((label, i) => {
            const s = (i + 1) as Step;
            const done = step > s, active = step === s;
            return (
              <React.Fragment key={label}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${done ? 'bg-emerald text-white' : active ? 'bg-primary text-white animate-pulse-glow' : 'bg-muted text-muted-foreground'}`}>
                    {done ? '✓' : s}
                  </div>
                  <span className={`text-sm font-medium ${active ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-px mx-3 ${done ? 'bg-emerald' : 'bg-border'}`} />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div key="s1" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="space-y-5">
                  <div className="card-glass rounded-2xl p-6 space-y-5">
                    <h2 className="font-display text-2xl text-foreground tracking-wider">📍 DELIVERY DETAILS</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="text-xs text-muted-foreground mb-1 block">Your Name *</label><input value={customerName} onChange={e=>setCustomerName(e.target.value)} placeholder="Full name" className={inputCls} /></div>
                      <div><label className="text-xs text-muted-foreground mb-1 block">Phone Number *</label><input value={customerPhone} onChange={e=>setCustomerPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputCls} /></div>
                    </div>

                    {/* GPS */}
                    <div className="border border-dashed border-emerald/40 rounded-2xl p-6 text-center bg-emerald/5">
                      <div className="text-4xl mb-3">📍</div>
                      <h3 className="font-display text-xl text-foreground tracking-wider mb-1">SHARE YOUR LIVE LOCATION</h3>
                      <p className="text-sm text-muted-foreground mb-5">Our delivery boy navigates directly to you — no typing needed!</p>
                      {locationStatus === 'idle' && (
                        <button onClick={handleShareLocation} className="w-full bg-emerald text-white py-4 rounded-xl font-display text-lg tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-green">
                          <MapPin className="w-5 h-5" /> SHARE MY LIVE LOCATION
                        </button>
                      )}
                      {locationStatus === 'loading' && <div className="flex items-center justify-center gap-3 text-gold py-4"><Loader2 className="w-5 h-5 animate-spin" /><span>Getting your location...</span></div>}
                      {locationStatus === 'success' && locationData && (
                        <div className="space-y-2">
                          <div className="bg-emerald/10 border border-emerald/30 rounded-xl p-3 text-emerald font-medium text-sm">
                            ✓ Location captured! Lat: {locationData.lat.toFixed(4)}, Lng: {locationData.lng.toFixed(4)}
                          </div>
                          <a href={locationData.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline">Preview on Maps</a>
                        </div>
                      )}
                      {locationStatus === 'error' && <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 text-primary text-sm">Couldn't get location — please enter address manually below.</div>}
                    </div>

                    <div className="flex items-center gap-3"><div className="flex-1 h-px bg-border"/><span className="text-xs text-muted-foreground">OR ENTER ADDRESS</span><div className="flex-1 h-px bg-border"/></div>
                    <textarea value={manualAddress} onChange={e=>setManualAddress(e.target.value)} placeholder="House No, Street, Area, Landmark..." rows={3} className={inputCls + ' resize-none'} />

                    <div className="grid grid-cols-2 gap-3">
                      {(['Branch 1','Branch 2'] as const).map(b => (
                        <button key={b} onClick={()=>setBranch(b)} className={`p-3 rounded-xl border text-left transition-all ${branch===b?'border-primary bg-primary/10 text-primary':'border-border text-muted-foreground hover:border-primary/40'}`}>
                          <p className="font-semibold text-sm">{b}</p>
                          <p className="text-xs mt-0.5 opacity-70">{b==='Branch 1'?'IAS Colony, Toli Chowki':'Near IBM Hospital, Tolichowki'}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={()=>setStep(2)} disabled={!customerName||!customerPhone||(!locationData&&!manualAddress)}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-display text-xl tracking-wider btn-glow animate-pulse-glow flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                    CONTINUE TO PAYMENT <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div key="s2" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="space-y-5">
                  <div className="card-glass rounded-2xl p-6 space-y-4">
                    <h2 className="font-display text-2xl text-foreground tracking-wider">💳 PAYMENT METHOD</h2>
                    {[
                      {id:'COD' as PaymentMethod,label:'Cash on Delivery',sub:'Pay when your order arrives',icon:<Banknote className="w-6 h-6"/>},
                      {id:'UPI' as PaymentMethod,label:'UPI Payment',sub:'GPay • PhonePe • Paytm',icon:<Smartphone className="w-6 h-6"/>},
                      {id:'Bank' as PaymentMethod,label:'Bank Transfer',sub:'NEFT / IMPS / RTGS',icon:<CreditCard className="w-6 h-6"/>},
                    ].map(opt=>(
                      <button key={opt.id} onClick={()=>setPaymentMethod(opt.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${paymentMethod===opt.id?'border-primary bg-primary/10':'border-border hover:border-primary/40'}`}>
                        <div className={paymentMethod===opt.id?'text-primary':'text-muted-foreground'}>{opt.icon}</div>
                        <div className="text-left flex-1">
                          <p className={`font-semibold ${paymentMethod===opt.id?'text-primary':'text-foreground'}`}>{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.sub}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod===opt.id?'border-primary':'border-muted-foreground'}`}>
                          {paymentMethod===opt.id&&<div className="w-2.5 h-2.5 rounded-full bg-primary"/>}
                        </div>
                      </button>
                    ))}
                    {paymentMethod==='UPI'&&<div className="bg-muted/50 rounded-xl p-4"><p className="text-sm text-muted-foreground mb-1">UPI ID:</p><p className="text-xl font-bold text-gold font-mono">friendlyfare@paytm</p><p className="text-xs text-muted-foreground mt-2">Pay and share screenshot on WhatsApp to confirm your order.</p></div>}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={()=>setStep(1)} className="flex-1 border border-border text-foreground py-4 rounded-2xl font-display tracking-wider hover:bg-muted transition-colors">BACK</button>
                    <button onClick={()=>setStep(3)} className="flex-[2] bg-primary text-primary-foreground py-4 rounded-2xl font-display text-xl tracking-wider btn-glow flex items-center justify-center gap-2">REVIEW ORDER <ChevronRight className="w-5 h-5"/></button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div key="s3" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="space-y-5">
                  <div className="card-glass rounded-2xl p-6 space-y-4">
                    <h2 className="font-display text-2xl text-foreground tracking-wider">✅ CONFIRM ORDER</h2>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {items.map(item=>(
                        <div key={item.product.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-lg">🛒</div>
                          <div className="flex-1"><p className="text-sm text-foreground">{item.product.name}</p><p className="text-xs text-muted-foreground">×{item.quantity}</p></div>
                          <span className="text-sm text-gold font-bold">₹{item.product.price*item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1.5 text-sm pt-2 border-t border-border">
                      {[['Customer',customerName],['Phone',customerPhone],['Branch',branch],['Payment',paymentMethod]].map(([k,v])=>(
                        <div key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="text-foreground">{v}</span></div>
                      ))}
                      {locationData&&<div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="text-emerald text-xs">📍 GPS Shared ✓</span></div>}
                      <div className="flex justify-between text-emerald"><span>Delivery</span><span>FREE 🎉</span></div>
                      <div className="flex justify-between text-foreground font-bold text-lg pt-2 border-t border-border">
                        <span>Total</span><span className="text-gold">₹{grandTotal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={()=>setStep(2)} className="flex-1 border border-border text-foreground py-4 rounded-2xl font-display tracking-wider hover:bg-muted transition-colors">BACK</button>
                    <button onClick={handlePlaceOrder} disabled={placing}
                      className="flex-[2] bg-primary text-primary-foreground py-4 rounded-2xl font-display text-xl tracking-wider btn-glow animate-pulse-glow flex items-center justify-center gap-2 disabled:opacity-60">
                      {placing?<><Loader2 className="w-5 h-5 animate-spin"/>Placing...</>:'PLACE ORDER 🚀'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary sidebar */}
          <div>
            <div className="card-glass rounded-2xl p-5 sticky top-24">
              <h3 className="font-display text-lg text-foreground tracking-wider mb-4">ORDER SUMMARY</h3>
              <div className="space-y-2 text-sm mb-4">
                {items.slice(0,3).map(item=>(
                  <div key={item.product.id} className="flex justify-between text-muted-foreground">
                    <span className="truncate mr-2">{item.product.name} ×{item.quantity}</span>
                    <span className="text-gold flex-shrink-0">₹{item.product.price*item.quantity}</span>
                  </div>
                ))}
                {items.length>3&&<p className="text-xs text-muted-foreground">+{items.length-3} more items</p>}
              </div>
              <div className="border-t border-border pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{subtotal}</span></div>
                {totalSavings>0&&<div className="flex justify-between text-emerald"><span>Savings</span><span>-₹{totalSavings}</span></div>}
                <div className="flex justify-between text-emerald"><span>Delivery</span><span>FREE 🎉</span></div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-border"><span className="text-foreground">Total</span><span className="text-gold">₹{grandTotal}</span></div>
              </div>
              <div className="mt-4 bg-emerald/10 border border-emerald/20 rounded-xl p-3 text-center">
                <p className="text-xs text-emerald font-semibold">🚀 Delivered in ~20 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

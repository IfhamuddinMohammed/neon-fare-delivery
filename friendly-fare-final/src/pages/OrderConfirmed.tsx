import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, MessageCircle, ShoppingBag } from 'lucide-react';

const OrderConfirmedPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  const waMessage = encodeURIComponent(`Hi! My order ID is ${orderId}, please confirm my order from Friendly Fare Super Market.`);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="card-glass rounded-3xl p-10 max-w-md w-full text-center"
      >
        {/* Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-emerald/20 border-2 border-emerald flex items-center justify-center mx-auto mb-6"
          style={{ boxShadow: '0 0 30px hsl(150 60% 32% / 0.4)' }}
        >
          <CheckCircle className="w-12 h-12 text-emerald" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h1 className="font-display text-4xl text-foreground tracking-wider mb-2">ORDER PLACED!</h1>
          <p className="text-muted-foreground mb-6">Your order has been successfully placed 🎉</p>

          {/* Order ID */}
          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-1">Order ID</p>
            <p className="font-display text-2xl text-primary text-glow-red tracking-wider">{orderId}</p>
          </div>

          {/* ETA */}
          <div className="flex items-center justify-center gap-3 bg-gold/10 border border-gold/20 rounded-xl p-4 mb-8">
            <Clock className="w-5 h-5 text-gold" />
            <div className="text-left">
              <p className="text-sm font-bold text-gold">Estimated Delivery</p>
              <p className="text-xs text-muted-foreground">Your order arrives in approximately 20 minutes</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <a
              href={`https://wa.me/918686399850?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-4 rounded-xl font-display text-lg tracking-wider flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
              style={{ boxShadow: '0 0 20px #25D36650' }}
            >
              <MessageCircle className="w-5 h-5" /> TRACK ON WHATSAPP
            </a>
            <Link
              to="/products"
              className="w-full border border-border text-foreground py-4 rounded-xl font-display tracking-wider flex items-center justify-center gap-3 hover:bg-muted transition-colors"
            >
              <ShoppingBag className="w-5 h-5" /> CONTINUE SHOPPING
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmedPage;

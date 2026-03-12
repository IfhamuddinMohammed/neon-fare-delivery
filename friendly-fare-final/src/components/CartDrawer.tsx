import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalItems, subtotal, totalSavings, grandTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={() => setIsOpen(false)} />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-secondary border-l border-border z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-display text-xl text-foreground tracking-wider">YOUR CART ({totalItems} items)</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-lg">Your cart is empty</p>
              <p className="text-sm mt-2">Start adding some groceries!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="card-glass rounded-lg p-3 flex gap-3">
                <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center text-2xl flex-shrink-0">
                  🛒
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                  <p className="text-sm font-bold text-gold mt-1">₹{item.product.price}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 bg-muted rounded-md">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:text-primary transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-4 text-center text-foreground">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:text-primary transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-3">
            {totalSavings > 0 && (
              <div className="bg-emerald/10 text-emerald rounded-lg px-3 py-2 text-sm font-medium text-center">
                🎉 You save ₹{totalSavings.toFixed(0)} on this order!
              </div>
            )}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span><span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-emerald">
                <span>Delivery</span><span>FREE</span>
              </div>
              <div className="flex justify-between text-foreground font-bold text-lg pt-2 border-t border-border">
                <span>Grand Total</span><span className="text-gold">₹{grandTotal.toFixed(0)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-lg font-display text-lg tracking-wider btn-glow animate-pulse-glow"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showRamzanBadge?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showRamzanBadge }) => {
  const { addItem } = useCart();
  const displayPrice = product.is_ramzan_offer && product.ramzan_price ? product.ramzan_price : product.price;
  const saving = product.mrp - displayPrice;

  return (
    <div className="card-glass-hover rounded-xl overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-square bg-muted flex items-center justify-center text-5xl">
        🛒
        {/* Badges */}
        {product.is_ramzan_offer && showRamzanBadge && (
          <span className="absolute top-2 left-2 bg-gold text-gold-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">🌙 Ramzan</span>
        )}
        {product.is_featured && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">HOT</span>
        )}
        <button className="absolute bottom-2 right-2 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">{product.name}</h3>
        
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gold">₹{displayPrice}</span>
          {saving > 0 && (
            <>
              <span className="text-xs text-muted-foreground line-through">₹{product.mrp}</span>
              <span className="text-[10px] font-bold text-emerald bg-emerald/10 px-1.5 py-0.5 rounded">Save ₹{saving}</span>
            </>
          )}
        </div>

        {/* Veg indicator */}
        <div className="flex items-center gap-1">
          <span className={`w-3 h-3 border rounded-sm flex items-center justify-center ${product.is_veg ? 'border-emerald' : 'border-primary'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${product.is_veg ? 'bg-emerald' : 'bg-primary'}`} />
          </span>
          <span className="text-[10px] text-muted-foreground">{product.is_veg ? 'Veg' : 'Non-Veg'}</span>
        </div>

        <button
          onClick={() => addItem(product)}
          className="w-full bg-primary text-primary-foreground text-sm font-medium py-2 rounded-lg btn-glow flex items-center justify-center gap-2 transition-all"
        >
          <ShoppingCart className="w-4 h-4" /> ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  showRamzanBadge?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showRamzanBadge }) => {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const displayPrice = product.is_ramzan_offer && product.ramzan_price ? product.ramzan_price : product.price;
  const saving = product.mrp - displayPrice;
  const savingPct = Math.round((saving / product.mrp) * 100);
  const mainImage = !imgErr && product.images?.[0] ? product.images[0] : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlisted(w => !w);
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="card-glass-hover rounded-2xl overflow-hidden flex flex-col h-full transition-transform duration-300 group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              onError={() => setImgErr(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl block mb-2">
                  {product.category === 'Fruits & Vegetables' ? '🍎' :
                   product.category === 'Dairy & Eggs' ? '🥛' :
                   product.category === 'Bakery & Bread' ? '🍞' :
                   product.category === 'Beverages' ? '🥤' :
                   product.category === 'Snacks & Chips' ? '🍿' :
                   product.category === 'Meat & Chicken' ? '🍗' :
                   product.category === 'Rice & Grains' ? '🌾' :
                   product.category === 'Spices & Masala' ? '🌶️' :
                   product.category === 'Household Items' ? '🏠' :
                   product.category === 'Personal Care' ? '🧴' :
                   product.category === 'Baby Products' ? '👶' :
                   product.category === 'Dry Fruits & Nuts' ? '🥜' : '🛒'}
                </span>
              </div>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.is_ramzan_offer && showRamzanBadge && (
              <span className="bg-gold text-gold-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">🌙 Ramzan</span>
            )}
            {savingPct > 0 && (
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse-glow">{savingPct}% OFF</span>
            )}
            {product.is_featured && !product.is_ramzan_offer && (
              <span className="bg-emerald text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">🔥 HOT</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${wishlisted ? 'bg-primary text-white scale-110' : 'bg-background/70 text-muted-foreground opacity-0 group-hover:opacity-100'}`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
          </button>

          {/* Veg indicator */}
          <div className="absolute bottom-2 left-2">
            <span className={`w-5 h-5 rounded border-2 flex items-center justify-center ${product.is_veg ? 'border-emerald bg-emerald/20' : 'border-primary bg-primary/20'}`}>
              <span className={`w-2 h-2 rounded-full ${product.is_veg ? 'bg-emerald' : 'bg-primary'}`} />
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{product.brand}</p>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">{product.name}</h3>

          {/* Stars */}
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-gold fill-gold" />)}
            <span className="text-[10px] text-muted-foreground ml-1">(4.5)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-xl font-bold text-gold">₹{displayPrice}</span>
            {saving > 0 && (
              <span className="text-xs text-muted-foreground line-through">₹{product.mrp}</span>
            )}
          </div>
          {saving > 0 && (
            <span className="text-[11px] font-semibold text-emerald bg-emerald/10 px-2 py-0.5 rounded-full w-fit">
              You save ₹{saving}
            </span>
          )}

          <button
            onClick={handleAdd}
            className={`w-full mt-2 py-2.5 rounded-xl font-display text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
              justAdded
                ? 'bg-emerald text-white scale-95'
                : 'bg-primary text-primary-foreground btn-glow hover:scale-[1.02]'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {justAdded ? '✓ ADDED!' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  mrp: number;
  discount_pct: number;
  images: string[];
  stock_qty: number;
  branch: 'Branch 1' | 'Branch 2' | 'Both';
  is_ramzan_offer: boolean;
  ramzan_price?: number;
  is_featured: boolean;
  tags: string[];
  description?: string;
  brand?: string;
  is_veg: boolean;
  nutritional_info?: string;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  parent_id?: string;
  icon_emoji: string;
  image_url?: string;
  sort_order: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customer_id?: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'packed' | 'dispatched' | 'delivered' | 'cancelled';
  branch: string;
  payment_method: string;
  delivery_address: string;
  customer_lat?: number;
  customer_lng?: number;
  maps_link?: string;
  subtotal: number;
  discount_total: number;
  grand_total: number;
  delivery_boy_name?: string;
  created_at: string;
}

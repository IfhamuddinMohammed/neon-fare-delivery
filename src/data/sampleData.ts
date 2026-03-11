import { Product, Category } from '@/types';

export const sampleCategories: Category[] = [
  { id: '1', name: 'Fruits & Vegetables', icon_emoji: '🍎', sort_order: 1 },
  { id: '2', name: 'Dairy & Eggs', icon_emoji: '🥛', sort_order: 2 },
  { id: '3', name: 'Bakery & Bread', icon_emoji: '🍞', sort_order: 3 },
  { id: '4', name: 'Beverages', icon_emoji: '🥤', sort_order: 4 },
  { id: '5', name: 'Snacks & Chips', icon_emoji: '🍿', sort_order: 5 },
  { id: '6', name: 'Meat & Chicken', icon_emoji: '🍗', sort_order: 6 },
  { id: '7', name: 'Rice & Grains', icon_emoji: '🌾', sort_order: 7 },
  { id: '8', name: 'Spices & Masala', icon_emoji: '🌶️', sort_order: 8 },
  { id: '9', name: 'Household Items', icon_emoji: '🏠', sort_order: 9 },
  { id: '10', name: 'Personal Care', icon_emoji: '🧴', sort_order: 10 },
  { id: '11', name: 'Baby Products', icon_emoji: '👶', sort_order: 11 },
  { id: '12', name: 'Dry Fruits & Nuts', icon_emoji: '🥜', sort_order: 12 },
];

export const sampleProducts: Product[] = [
  {
    id: '1', name: 'Fresh Bananas (1 Dozen)', category: 'Fruits & Vegetables', price: 45, mrp: 60, discount_pct: 25,
    images: [], stock_qty: 100, branch: 'Both', is_ramzan_offer: false, is_featured: true,
    tags: ['fresh', 'fruit'], description: 'Farm-fresh bananas, perfectly ripe and ready to eat.', brand: 'Farm Fresh', is_veg: true,
  },
  {
    id: '2', name: 'Amul Taza Milk 1L', category: 'Dairy & Eggs', price: 54, mrp: 58, discount_pct: 7,
    images: [], stock_qty: 200, branch: 'Both', is_ramzan_offer: false, is_featured: true,
    tags: ['dairy', 'milk'], description: 'Fresh toned milk, pasteurized and homogenized.', brand: 'Amul', is_veg: true,
  },
  {
    id: '3', name: 'India Gate Basmati Rice 5kg', category: 'Rice & Grains', price: 425, mrp: 520, discount_pct: 18,
    images: [], stock_qty: 50, branch: 'Both', is_ramzan_offer: false, is_featured: true,
    tags: ['rice', 'basmati'], description: 'Premium aged basmati rice with long grains.', brand: 'India Gate', is_veg: true,
  },
  {
    id: '4', name: 'Lays Classic Salted 52g', category: 'Snacks & Chips', price: 20, mrp: 20, discount_pct: 0,
    images: [], stock_qty: 300, branch: 'Both', is_ramzan_offer: false, is_featured: false,
    tags: ['snacks', 'chips'], description: 'Crispy potato chips with classic salted flavor.', brand: 'Lays', is_veg: true,
  },
  {
    id: '5', name: 'MDH Biryani Masala 50g', category: 'Spices & Masala', price: 65, mrp: 75, discount_pct: 13,
    images: [], stock_qty: 80, branch: 'Both', is_ramzan_offer: false, is_featured: true,
    tags: ['spices', 'masala', 'biryani'], description: 'Authentic biryani masala blend for perfect Hyderabadi biryani.', brand: 'MDH', is_veg: true,
  },
  {
    id: '6', name: 'Premium Ajwa Dates 500g', category: 'Dry Fruits & Nuts', price: 399, mrp: 550, discount_pct: 27,
    images: [], stock_qty: 40, branch: 'Both', is_ramzan_offer: true, ramzan_price: 349, is_featured: true,
    tags: ['dates', 'ramzan', 'dry-fruits'], description: 'Premium quality Ajwa dates, perfect for Iftar.', brand: 'Haramain', is_veg: true,
  },
  {
    id: '7', name: 'Bambino Vermicelli 900g', category: 'Rice & Grains', price: 85, mrp: 110, discount_pct: 23,
    images: [], stock_qty: 60, branch: 'Both', is_ramzan_offer: true, ramzan_price: 75, is_featured: false,
    tags: ['vermicelli', 'ramzan', 'seviyan'], description: 'Roasted vermicelli for delicious Sheer Khurma.', brand: 'Bambino', is_veg: true,
  },
  {
    id: '8', name: 'Rooh Afza Rose Sharbat 750ml', category: 'Beverages', price: 145, mrp: 180, discount_pct: 19,
    images: [], stock_qty: 90, branch: 'Both', is_ramzan_offer: true, ramzan_price: 125, is_featured: true,
    tags: ['sharbat', 'ramzan', 'beverage'], description: 'The iconic rose-flavored drink, perfect for Iftar.', brand: 'Hamdard', is_veg: true,
  },
];

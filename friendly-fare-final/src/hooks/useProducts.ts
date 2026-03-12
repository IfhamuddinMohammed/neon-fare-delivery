import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

const mapRow = (row: any): Product => ({
  id: row.id,
  name: row.name,
  brand: row.brand ?? '',
  category: row.category,
  price: row.price,
  mrp: row.mrp,
  discount_pct: row.discount_pct ?? Math.round(((row.mrp - row.price) / row.mrp) * 100),
  images: row.image_urls ?? [],
  stock_qty: row.stock_qty,
  branch: row.branch,
  is_featured: row.is_featured,
  is_veg: row.is_veg,
  is_ramzan_offer: row.is_ramzan_offer,
  ramzan_price: row.ramzan_price,
  tags: row.tags ?? [],
  description: row.description ?? '',
  nutritional_info: row.nutritional_info ?? '',
});

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (err) { setError(err.message); setLoading(false); return; }
    setProducts((data ?? []).map(mapRow));
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  return { products, loading, error, refetch: fetchProducts };
};

// Strip read-only/generated columns before any write
const sanitize = (obj: any) => {
  const { discount_pct, id, created_at, updated_at, ...safe } = obj;
  return safe;
};

export const useAdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const addProduct = async (product: any) => {
    const { error } = await supabase.from('products').insert([sanitize(product)]);
    if (!error) fetch();
    return error;
  };

  const updateProduct = async (id: string, updates: any) => {
    const { error } = await supabase.from('products').update(sanitize(updates)).eq('id', id);
    if (!error) fetch();
    return error;
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetch();
    return error;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('product-images').upload(path, file, { upsert: true });
    if (error) return null;
    const { data } = supabase.storage.from('product-images').getPublicUrl(path);
    return data.publicUrl;
  };

  return { products, loading, addProduct, updateProduct, deleteProduct, uploadImage, refetch: fetch };
};

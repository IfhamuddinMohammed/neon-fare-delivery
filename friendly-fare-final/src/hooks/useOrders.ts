import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    setOrders(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  // Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('orders-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetch)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetch]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('orders').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
    if (!error) fetch();
    return error;
  };

  const assignDeliveryBoy = async (id: string, delivery_boy: string) => {
    const { error } = await supabase.from('orders').update({ delivery_boy }).eq('id', id);
    if (!error) fetch();
    return error;
  };

  const placeOrder = async (orderData: any) => {
    const order_number = 'ORD-' + Date.now().toString(36).toUpperCase();
    const { data, error } = await supabase.from('orders').insert([{ ...orderData, order_number }]).select().single();
    return { data, error, order_number };
  };

  return { orders, loading, updateStatus, assignDeliveryBoy, placeOrder, refetch: fetch };
};

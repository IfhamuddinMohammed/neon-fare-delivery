export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          brand: string | null
          category: string
          description: string | null
          nutritional_info: string | null
          price: number
          mrp: number
          discount_pct: number
          stock_qty: number
          branch: 'Branch 1' | 'Branch 2' | 'Both'
          is_featured: boolean
          is_veg: boolean
          is_active: boolean
          is_ramzan_offer: boolean
          ramzan_price: number | null
          tags: string[]
          image_urls: string[]
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'discount_pct' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      categories: {
        Row: {
          id: string
          name: string
          icon_emoji: string
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_name: string
          customer_phone: string
          branch: string
          delivery_address: string | null
          customer_lat: number | null
          customer_lng: number | null
          maps_link: string | null
          items: Json
          subtotal: number
          grand_total: number
          payment_method: 'COD' | 'UPI' | 'Bank'
          status: 'pending' | 'confirmed' | 'packed' | 'dispatched' | 'delivered' | 'cancelled'
          delivery_boy: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'order_number' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
    }
  }
}

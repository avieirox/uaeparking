export interface Database {
  public: {
    Tables: {
      parkings: {
        Row: {
          id: string;
          name: string;
          address: string;
          latitude: number;
          longitude: number;
          rating: number;
          reviewCount: number;
          type: string;
          phone?: string;
          website?: string;
          openingHours?: string;
          pricePerHour: string;
          image: string;
          socialMedia?: {
            instagram?: string;
            facebook?: string;
            linkedin?: string;
          };
          description?: string;
          created_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['parkings']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['parkings']['Insert']>;
      };
    };
  };
}
export interface ParkingSpot {
  id: string;
  city: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  review_count: string;
  category: string;
  mobile_number?: string;
  website?: string;
  email_id?: string;
  plus_code?: string;
  closing_hours?: string;
  image_name?: string;
  social_media?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  created_at?: string;
}
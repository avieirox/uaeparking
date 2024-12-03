import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ParkingSpot } from '../types/parking';
import { getTableName } from '../db/schema';

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getParking = async (cityName: string, slug: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const normalizedCity = cityName.toLowerCase().replace(/-/g, ' ');
      const tableName = getTableName(normalizedCity);
      
      const { data, error: queryError } = await supabase
        .from(tableName)
        .select('*')
        .ilike('name', slug.replace(/-/g, ' '))
        .single();

      if (queryError) throw queryError;

      if (!data) {
        throw new Error('Parking not found');
      }

      return {
        id: data.id.toString(),
        city: cityName,
        name: data.name,
        address: data.address,
        latitude: parseFloat(data.latitude) || 0,
        longitude: parseFloat(data.longitude) || 0,
        rating: parseFloat(data.rating) || 0,
        review_count: data.review_count || '0 reviews',
        category: data.category || 'Parking lot',
        mobile_number: data.mobile_number,
        website: data.website,
        email_id: data.email_id,
        plus_code: data.plus_code,
        closing_hours: data.closing_hours,
        price_per_hour: data.price_per_hour || 'Contact for price',
        social_media: {
          instagram: data.instagram_profile,
          facebook: data.facebook_profile,
          linkedin: data.linkedin_profile,
          twitter: data.twitter_profile
        }
      };
    } catch (err) {
      console.error('Error fetching parking:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getParkings = async (
    city: string,
    page: number = 1,
    itemsPerPage: number = 10,
    filters: Record<string, any> = {}
  ) => {
    setLoading(true);
    setError(null);

    try {
      const normalizedCity = city.toLowerCase().replace(/-/g, ' ');
      const tableName = getTableName(normalizedCity);
      const from = (page - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      let query = supabase
        .from(tableName)
        .select('*', { count: 'exact' });

      if (filters.name) {
        query = query.ilike('name', `%${filters.name}%`);
      }

      const { data, error: queryError, count } = await query
        .range(from, to)
        .order('name');

      if (queryError) throw queryError;

      const parkings = data?.map(parking => ({
        id: parking.id.toString(),
        city,
        name: parking.name,
        address: parking.address,
        latitude: parseFloat(parking.latitude) || 0,
        longitude: parseFloat(parking.longitude) || 0,
        rating: parseFloat(parking.rating) || 0,
        review_count: parking.review_count || '0 reviews',
        category: parking.category || 'Parking lot',
        mobile_number: parking.mobile_number,
        website: parking.website,
        email_id: parking.email_id,
        plus_code: parking.plus_code,
        closing_hours: parking.closing_hours,
        price_per_hour: parking.price_per_hour || 'Contact for price',
        social_media: {
          instagram: parking.instagram_profile,
          facebook: parking.facebook_profile,
          linkedin: parking.linkedin_profile,
          twitter: parking.twitter_profile
        }
      })) || [];

      return {
        parkings,
        total: count || 0,
        currentPage: page,
        totalPages: Math.ceil((count || 0) / itemsPerPage)
      };
    } catch (err) {
      console.error('Error fetching parkings:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      return {
        parkings: [],
        total: 0,
        currentPage: page,
        totalPages: 0
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    getParking,
    getParkings,
    loading,
    error
  };
};
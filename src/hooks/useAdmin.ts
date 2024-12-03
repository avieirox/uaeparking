import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export const useAdmin = () => {
  const queryClient = useQueryClient();

  const getMetaData = async (path?: string) => {
    let query = supabase.from('meta_data').select('*');
    if (path) {
      query = query.eq('page_path', path);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  };

  const updateMetaData = async ({ path, title, description }: {
    path: string;
    title: string;
    description: string;
  }) => {
    const { data, error } = await supabase
      .from('meta_data')
      .upsert({ 
        page_path: path,
        meta_title: title,
        meta_description: description
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const getSettings = async (key?: string) => {
    let query = supabase.from('settings').select('*');
    if (key) {
      query = query.eq('key', key);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  };

  const updateSettings = async ({ key, value }: {
    key: string;
    value: any;
  }) => {
    const { data, error } = await supabase
      .from('settings')
      .upsert({ 
        key,
        value
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  return {
    useMetaData: (path?: string) => useQuery({
      queryKey: ['meta', path],
      queryFn: () => getMetaData(path)
    }),

    useUpdateMetaData: () => useMutation({
      mutationFn: updateMetaData,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['meta'] });
      }
    }),

    useSettings: (key?: string) => useQuery({
      queryKey: ['settings', key],
      queryFn: () => getSettings(key)
    }),

    useUpdateSettings: () => useMutation({
      mutationFn: updateSettings,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['settings'] });
      }
    })
  };
};
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Edit2, Trash2, Plus, Save, X, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { ParkingSpot } from '../../types/parking';
import { useSearchParams } from 'react-router-dom';

interface ParkingForm extends Omit<ParkingSpot, 'id' | 'social_media'> {
  id?: string;
  instagram_profile?: string;
  facebook_profile?: string;
  linkedin_profile?: string;
  twitter_profile?: string;
}

const emptyParking: ParkingForm = {
  name: '',
  address: '',
  city: '',
  latitude: 0,
  longitude: 0,
  rating: 0,
  review_count: '0 reviews',
  category: 'Parking lot',
  price_per_hour: '',
  mobile_number: '',
  website: '',
  email_id: '',
  plus_code: '',
  closing_hours: '',
};

const cities = [
  { value: 'dubai', label: 'Dubai', table: 'parking_dubai' },
  { value: 'abudhabi', label: 'Abu Dhabi', table: 'parking_abudhabi' }
];

export default function ParkingManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'dubai');
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingParking, setEditingParking] = useState<ParkingForm>(emptyParking);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  const getTableName = (cityValue: string) => {
    return cities.find(city => city.value === cityValue)?.table || 'parking_dubai';
  };

  useEffect(() => {
    const city = searchParams.get('city');
    if (city && cities.some(c => c.value === city)) {
      setSelectedCity(city);
    }
  }, [searchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-parkings', selectedCity, currentPage, searchQuery],
    queryFn: async () => {
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const tableName = getTableName(selectedCity);
      let query = supabase
        .from(tableName)
        .select('*', { count: 'exact' });

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data, error, count } = await query
        .range(from, to)
        .order('name');

      if (error) {
        console.error('Error fetching data:', error);
        throw error;
      }

      return {
        parkings: data || [],
        total: count || 0,
        totalPages: Math.ceil((count || 0) / itemsPerPage)
      };
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const tableName = getTableName(selectedCity);
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-parkings'] });
      toast.success('Parking spot deleted successfully');
    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast.error('Error deleting parking spot');
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (parking: ParkingForm) => {
      const tableName = getTableName(selectedCity);
      const { id, ...parkingData } = parking;
      
      // Add city to the parking data
      const dataWithCity = {
        ...parkingData,
        city: selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)
      };

      if (id) {
        const { error } = await supabase
          .from(tableName)
          .update(dataWithCity)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from(tableName)
          .insert([dataWithCity]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-parkings'] });
      setIsEditing(false);
      setEditingParking(emptyParking);
      toast.success('Parking spot saved successfully');
    },
    onError: (error) => {
      console.error('Save error:', error);
      toast.error('Error saving parking spot');
    }
  });

  const handleEdit = (parking: ParkingForm) => {
    setEditingParking(parking);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this parking spot?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(editingParking);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingParking(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    setSearchParams({ city });
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Parking Management</h1>
        {!isEditing && (
          <button 
            onClick={() => {
              setEditingParking(emptyParking);
              setIsEditing(true);
            }}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
            Add New
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-dark-200 rounded-xl shadow-soft p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-1">Name</label>
                <input
                  name="name"
                  value={editingParking.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Address</label>
                <input
                  name="address"
                  value={editingParking.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Category</label>
                <input
                  name="category"
                  value={editingParking.category}
                  onChange={handleChange}
                  className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Price per Hour</label>
                <input
                  name="price_per_hour"
                  value={editingParking.price_per_hour}
                  onChange={handleChange}
                  className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Latitude</label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={editingParking.latitude}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Longitude</label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={editingParking.longitude}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Mobile Number</label>
                <input
                  name="mobile_number"
                  value={editingParking.mobile_number}
                  onChange={handleChange}
                  className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Website</label>
                <input
                  name="website"
                  value={editingParking.website}
                  onChange={handleChange}
                  className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingParking(emptyParking);
                }}
                className="px-4 py-2 text-gray-400 hover:text-white flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-dark-200 rounded-xl shadow-soft p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="w-full md:w-48 bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
              >
                {cities.map(city => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search parking spots..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-dark-300">
                      <th className="pb-3 text-gray-400 font-medium">Name</th>
                      <th className="pb-3 text-gray-400 font-medium">Address</th>
                      <th className="pb-3 text-gray-400 font-medium">Rating</th>
                      <th className="pb-3 text-gray-400 font-medium">Price/Hour</th>
                      <th className="pb-3 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.parkings.map((parking) => (
                      <tr key={parking.id} className="border-b border-dark-300">
                        <td className="py-4 text-white">{parking.name}</td>
                        <td className="py-4 text-gray-400">{parking.address}</td>
                        <td className="py-4 text-white">{parking.rating}</td>
                        <td className="py-4 text-white">{parking.price_per_hour}</td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button 
                              className="p-2 text-blue-400 hover:bg-dark-300 rounded-lg"
                              onClick={() => handleEdit(parking)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-2 text-red-400 hover:bg-dark-300 rounded-lg"
                              onClick={() => handleDelete(parking.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {data?.totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${
                        currentPage === page
                          ? 'bg-primary-600 text-white'
                          : 'bg-dark-300 text-gray-400 hover:bg-dark-400'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
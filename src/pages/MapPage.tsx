import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ParkingSpot } from '../types/parking';

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: parkingSpots = [] } = useQuery<ParkingSpot[]>({
    queryKey: ['parkingSpots'],
    queryFn: async () => {
      // This would be replaced with actual API call
      return [];
    },
  });

  const filteredSpots = parkingSpots.filter(spot =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 relative">
      <SearchBar
        onSearch={setSearchQuery}
        onFilter={() => {}}
      />
      <Map parkingSpots={filteredSpots} />
    </div>
  );
}
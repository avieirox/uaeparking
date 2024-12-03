import { ParkingSpot } from '../types/parking';
import ParkingListItem from './ParkingListItem';

interface ParkingListProps {
  parkings: ParkingSpot[];
}

export default function ParkingList({ parkings }: ParkingListProps) {
  if (parkings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No parking spots found in this area.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {parkings.map((parking) => (
        <ParkingListItem 
          key={parking.id} 
          parking={parking}
          cityName={parking.city}
        />
      ))}
    </div>
  );
}
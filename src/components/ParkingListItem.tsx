import { MapPin, Star, Car, Phone, Clock, Globe, MapPinned } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParkingSpot } from '../types/parking';

interface ParkingListItemProps {
  parking: ParkingSpot;
  cityName: string;
}

export default function ParkingListItem({ parking, cityName }: ParkingListItemProps) {
  const cityPath = cityName.toLowerCase().replace(/\s+/g, '-');
  const parkingSlug = parking.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  return (
    <div className="bg-dark-200 rounded-xl shadow-soft hover:shadow-neon transition-all duration-300">
      <div className="flex items-start gap-4 p-4">
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg p-3 flex-shrink-0">
          <Car className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <Link 
            to={`/${cityPath}/${parkingSlug}`}
            className="text-lg font-semibold text-gray-100 hover:text-primary-400 transition-colors line-clamp-1"
          >
            {parking.name}
          </Link>
          
          <div className="mt-2 flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="font-medium text-gray-200">{parking.rating}</span>
            <span className="text-gray-400">
              ({parking.review_count})
            </span>
          </div>
          
          <Link 
            to={`/${cityPath}/${parkingSlug}`}
            className="mt-2 flex items-start gap-2 text-gray-400 group hover:text-primary-400 transition-colors"
          >
            <MapPin className="w-4 h-4 mt-1 flex-shrink-0 group-hover:text-primary-400" />
            <span className="text-sm line-clamp-2 group-hover:text-primary-400">{parking.address}</span>
          </Link>

          {parking.plus_code && (
            <div className="mt-2 flex items-start gap-2 text-gray-400">
              <MapPinned className="w-4 h-4 mt-1 flex-shrink-0" />
              <span className="text-sm">Plus Code: {parking.plus_code}</span>
            </div>
          )}
          
          {parking.mobile_number && (
            <div className="mt-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <a 
                href={`tel:${parking.mobile_number}`}
                className="text-sm text-primary-400 hover:text-primary-300"
              >
                {parking.mobile_number}
              </a>
            </div>
          )}

          {parking.website && (
            <div className="mt-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <a 
                href={parking.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-400 hover:text-primary-300 truncate"
              >
                {new URL(parking.website).hostname}
              </a>
            </div>
          )}
        </div>

        <div className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-400" />
            <span className="inline-block px-3 py-1 bg-primary-900/30 text-primary-400 text-sm font-medium rounded-full">
              {parking.price_per_hour}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
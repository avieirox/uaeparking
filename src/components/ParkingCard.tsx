import { MapPin, Phone, Globe, Star, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParkingSpot } from '../types/parking';

interface ParkingCardProps {
  parking: ParkingSpot;
}

export default function ParkingCard({ parking }: ParkingCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-hover transition-all duration-300 overflow-hidden group">
      <div 
        className="h-56 bg-cover bg-center relative overflow-hidden group-hover:opacity-90 transition-opacity"
        style={{ backgroundImage: `url(${parking.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        {parking.isFree ? (
          <span className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
            Free Parking
          </span>
        ) : (
          <span className="absolute top-4 right-4 px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
            Paid Parking
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{parking.name}</h3>
        
        <div className="flex items-center gap-1 mb-4">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="font-medium text-gray-900">{parking.rating}</span>
          <span className="text-sm text-gray-500">
            ({parking.reviewCount} reviews)
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <span className="text-gray-600 line-clamp-2">{parking.address}</span>
          </div>
          {parking.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-400" />
              <a href={`tel:${parking.phone}`} className="text-primary-600 hover:text-primary-700">
                {parking.phone}
              </a>
            </div>
          )}
        </div>

        <Link 
          to={`/parking/${parking.id}`}
          className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 group-hover:gap-3 transition-all"
        >
          View Details
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
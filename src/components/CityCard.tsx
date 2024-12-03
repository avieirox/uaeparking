import { MapPin, Car, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CityStats {
  name: string;
  totalSpots: number;
  availableNow: number;
  image: string;
}

export default function CityCard({ name, totalSpots, availableNow, image }: CityStats) {
  const citySlug = name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link 
      to={`/${citySlug}`}
      className="group block bg-dark-200 rounded-2xl shadow-soft hover:shadow-neon transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      <div className="h-56 relative overflow-hidden">
        <img 
          src={`/images/${citySlug}-parking.jpg`}
          alt={`${name} Parking`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary-400" />
            {name}
          </h3>
        </div>
      </div>
      <div className="p-6 space-y-4 bg-gradient-to-b from-dark-200 to-dark-300">
        <div className="flex items-center gap-3 text-gray-300">
          <Car className="w-5 h-5 text-primary-400" />
          <span className="font-medium">{totalSpots.toLocaleString()} total spots</span>
        </div>
        <div className="flex items-center gap-3 text-primary-300">
          <Clock className="w-5 h-5" />
          <span className="font-medium">{availableNow.toLocaleString()} available now</span>
        </div>
        <div className="pt-2">
          <span className="inline-flex items-center text-primary-400 font-medium group-hover:text-primary-300">
            View parking spots
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
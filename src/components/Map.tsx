import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ParkingSpot } from '../types/parking';
import { Star } from 'lucide-react';

interface MapProps {
  parkingSpots: ParkingSpot[];
  selectedSpot?: ParkingSpot;
}

export default function Map({ parkingSpots, selectedSpot }: MapProps) {
  return (
    <MapContainer
      center={[25.2048, 55.2708]}
      zoom={13}
      className="w-full h-[calc(100vh-4rem)]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {parkingSpots.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.latitude, spot.longitude]}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg">{spot.name}</h3>
              <p className="text-sm text-gray-600">{spot.address}</p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="ml-1">{spot.rating}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({spot.reviewCount} reviews)
                </span>
              </div>
              {spot.price && (
                <p className="mt-2 text-sm">
                  Price: {spot.price}
                </p>
              )}
              {spot.isFree && (
                <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                  Free Parking
                </span>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
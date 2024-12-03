import { ParkingSpot } from '../types/parking';

export const dubaiParkings: ParkingSpot[] = [
  {
    id: "1",
    name: "Dubai Mall Parking",
    address: "Financial Center Road, Downtown Dubai",
    latitude: 25.197197,
    longitude: 55.279378,
    rating: 4.8,
    reviewCount: 1250,
    type: "Mall Parking",
    phone: "+971 4 362 7500",
    website: "https://thedubaimall.com",
    openingHours: "24/7",
    pricePerHour: "AED 20/hour",
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&q=80",
    socialMedia: {
      instagram: "https://instagram.com/thedubaimall",
      facebook: "https://facebook.com/thedubaimall"
    },
    description: "The Dubai Mall's parking facility offers convenient access to the world's largest shopping mall. Features include smart parking guidance system, valet service, and electric vehicle charging stations."
  },
  {
    id: "11",
    name: "Miracle Garden Car Parking",
    address: "365V+4MQ - Al Barsha - Al Barsha South - Dubai",
    latitude: 25.0578342,
    longitude: 55.244232,
    rating: 4.7,
    reviewCount: 15,
    type: "Tourist Attraction Parking",
    pricePerHour: "AED 15/hour",
    image: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80"
  },
  {
    id: "12",
    name: "Royal Melody Parking Rental",
    address: "Al Sufouh - Dubai Internet City - Dubai",
    latitude: 25.1009289,
    longitude: 55.1740343,
    rating: 5.0,
    reviewCount: 30,
    type: "Public Parking",
    phone: "554568083",
    website: "https://royalparking.ae",
    pricePerHour: "AED 10/hour",
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&q=80"
  },
  // ... Add pricePerHour for all other entries similarly
];
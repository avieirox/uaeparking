import { useParams } from 'react-router-dom';
import ParkingListItem from '../components/ParkingListItem';
import Breadcrumbs from '../components/Breadcrumbs';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Pagination from '../components/Pagination';
import { useSupabase } from '../hooks/useSupabase';
import { useQuery } from '@tanstack/react-query';

const ITEMS_PER_PAGE = 10;

const SUPPORTED_CITIES = ['dubai', 'abu dhabi'];

export default function CityPage() {
  const { cityName } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { getParkings } = useSupabase();

  const formattedCityName = cityName?.charAt(0).toUpperCase() + cityName?.slice(1);
  const isCitySupported = cityName && SUPPORTED_CITIES.includes(cityName.toLowerCase());

  const { data, isLoading, error } = useQuery({
    queryKey: ['parkings', formattedCityName, currentPage, searchQuery],
    queryFn: () => {
      if (!isCitySupported) {
        return { parkings: [], total: 0, currentPage: 1, totalPages: 0 };
      }
      return getParkings(
        formattedCityName!, 
        currentPage, 
        ITEMS_PER_PAGE, 
        { ...(searchQuery && { name: searchQuery }) }
      );
    },
    keepPreviousData: true,
    staleTime: 30000 // Cache results for 30 seconds
  });

  const { parkings = [], total = 0, totalPages = 0 } = data || {};

  if (error) {
    console.error('Error loading parkings:', error);
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  // Show message for unsupported cities
  if (!isCitySupported) {
    return (
      <div className="min-h-screen bg-dark-100 pb-12">
        <section className="bg-dark-200 bg-hero-pattern py-12">
          <div className="container mx-auto">
            <Breadcrumbs
              items={[
                { label: 'Home', path: '/' },
                { label: `${formattedCityName} Parking` },
              ]}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
              Parking in {formattedCityName}
            </h1>
          </div>
        </section>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-gray-400 text-lg">
              Parking data for {formattedCityName} is coming soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-100 pb-12">
      {/* Hero Section */}
      <section className="bg-dark-200 bg-hero-pattern py-12">
        <div className="container mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: `${formattedCityName} Parking` },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
            Parking in {formattedCityName}
          </h1>
          <p className="text-gray-400 mt-2">
            Find the perfect parking spot in {formattedCityName}
          </p>
        </div>
      </section>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-dark-200 rounded-xl shadow-soft p-4 border border-dark-300">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for parking locations..."
              className="w-full pl-10 pr-4 py-2 bg-dark-300 border-dark-400 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="container mx-auto px-4 mt-8">
        <p className="text-gray-400 mb-4">
          {total} parking spots found
        </p>
      </div>

      {/* Parking Listings */}
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {parkings.map((parking) => (
                <ParkingListItem 
                  key={parking.id} 
                  parking={parking}
                  cityName={formattedCityName}
                />
              ))}
            </div>

            {parkings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No parking spots found matching your search.
                </p>
              </div>
            ) : (
              <div className="mt-8">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
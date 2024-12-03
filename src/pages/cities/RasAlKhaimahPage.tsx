import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ParkingList from '../../components/ParkingList';
import Pagination from '../../components/Pagination';
import { useSupabase } from '../../hooks/useSupabase';
import { useQuery } from '@tanstack/react-query';
import { getTableName } from '../../db/schema';

const ITEMS_PER_PAGE = 10;

export default function RasAlKhaimahPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { getParkings } = useSupabase();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['parkings', 'Ras Al Khaimah', currentPage],
    queryFn: () => getParkings('Ras Al Khaimah', currentPage, ITEMS_PER_PAGE),
    keepPreviousData: true
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (error) {
    console.error('Error loading Ras Al Khaimah parkings:', error);
  }

  return (
    <>
      <SEO 
        title="Ras Al Khaimah Parking near me"
        description="Find a place to parking your car in Ras Al Khaimah quickly near me. Ras Al Khaimah Parking Directory"
        canonical="/ras-al-khaimah-parking-near-me"
      />
      <div className="min-h-screen bg-dark-100">
        <section className="bg-dark-200 bg-hero-pattern py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
              Ras Al Khaimah Parking Spots
            </h1>
            <p className="text-gray-400 mt-2">
              {data?.total || 0} parking spots available in Ras Al Khaimah
            </p>
          </div>
        </section>
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <>
              <ParkingList parkings={data?.parkings || []} />
              {data?.totalPages && data.totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={data.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
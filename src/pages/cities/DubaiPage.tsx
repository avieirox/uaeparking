import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ParkingList from '../../components/ParkingList';
import Pagination from '../../components/Pagination';
import { useSupabase } from '../../hooks/useSupabase';
import { useQuery } from '@tanstack/react-query';

const ITEMS_PER_PAGE = 10;

export default function DubaiPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { getParkings } = useSupabase();
  
  const { data, isLoading } = useQuery({
    queryKey: ['parkings', 'Dubai', currentPage],
    queryFn: () => getParkings('Dubai', currentPage, ITEMS_PER_PAGE),
    keepPreviousData: true
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SEO 
        title="Dubai Parking Guide - Find Parking Spots & Locations in Dubai"
        description="Find the best parking spots in Dubai. Comprehensive guide to public parking, paid parking zones, and parking facilities across Dubai. Real-time availability and rates."
        canonical="/dubai"
        type="website"
        image="/images/dubai-parking.jpg"
      />
      <div className="min-h-screen bg-dark-100">
        <section className="bg-dark-200 bg-hero-pattern py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
              Dubai Parking Spots
            </h1>
            <p className="text-gray-400 mt-2">
              {data?.total || 0} parking spots available in Dubai
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
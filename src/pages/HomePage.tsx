import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CityCard from '../components/CityCard';
import BlogPreview from '../components/BlogPreview';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';
import { useSupabase } from '../hooks/useSupabase';
import { useQuery } from '@tanstack/react-query';
import { CITIES } from '../db/schema';
import { blogPosts } from '../data/blogPosts';

export default function HomePage() {
  const { getParkings } = useSupabase();
  const { data: cityStats } = useQuery({
    queryKey: ['cityStats'],
    queryFn: async () => {
      const stats = await Promise.all(
        CITIES.map(async (city) => {
          const data = await getParkings(city);
          return {
            city,
            total: data?.total || 0
          };
        })
      );
      return stats;
    }
  });

  const cities = (cityStats || []).map(stat => ({
    name: stat.city,
    totalSpots: stat.total,
    availableNow: Math.floor(stat.total * 0.3),
    image: `/images/${stat.city.toLowerCase().replace(/\s+/g, '-')}-parking.jpg`
  }));

  return (
    <>
      <SEO 
        title="UAE Parking Guide - Find Parking Spots in Dubai, Abu Dhabi & More"
        description="Find the best parking spots across UAE's major emirates. Comprehensive parking guide for Dubai, Abu Dhabi, Sharjah and other emirates with real-time availability and rates."
        canonical="/"
        type="website"
        image="/images/uae-parking-hero.jpg"
      />
      
      <div className="min-h-screen bg-dark-100">
        {/* Hero Section */}
        <section 
          className="relative py-20 px-4 bg-cover bg-center min-h-[600px] flex items-center"
          style={{ 
            backgroundImage: `url('/images/dubai-map-bg.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dark-100/95 to-primary-900/80" />
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
              Find Perfect Parking Spots in UAE
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Locate, compare, and choose from thousands of parking spaces across major UAE cities
            </p>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-neon-purple px-8 py-3 rounded-lg font-semibold text-white hover:shadow-neon transition-all duration-300"
            >
              Find Parking Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Cities Section */}
        <section className="py-16 px-4 bg-dark-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
              Major Cities
            </h2>
            <p className="text-gray-400 text-center mb-12">
              Discover parking spots in the UAE's most vibrant cities
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cities.map((city) => (
                <CityCard key={city.name} {...city} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-dark-200 bg-hero-pattern">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-center mb-12">
              Get answers to common parking questions in UAE
            </p>
            <div className="max-w-3xl mx-auto">
              <FAQ />
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 px-4 bg-dark-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
              Latest Updates
            </h2>
            <p className="text-gray-400 text-center mb-12">
              Stay informed with our latest parking insights and news
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <BlogPreview key={post.id} {...post} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-dark-200 bg-hero-pattern">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-gray-400 text-center mb-12">
              Experience hassle-free parking with our comprehensive features
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-dark-200 p-6 rounded-xl">
                <div className="w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                  <ArrowRight className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Real-time Availability</h3>
                <p className="text-gray-400">
                  Get instant updates on parking spot availability across all locations
                </p>
              </div>
              <div className="bg-dark-200 p-6 rounded-xl">
                <div className="w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                  <ArrowRight className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Compare Prices</h3>
                <p className="text-gray-400">
                  Find the best parking rates and compare prices across different locations
                </p>
              </div>
              <div className="bg-dark-200 p-6 rounded-xl">
                <div className="w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                  <ArrowRight className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Easy Navigation</h3>
                <p className="text-gray-400">
                  Get turn-by-turn directions to your chosen parking spot
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
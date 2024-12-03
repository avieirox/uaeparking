import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Globe, Star, Clock, Facebook, Instagram, Linkedin, Twitter, MapPinned } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Breadcrumbs from '../components/Breadcrumbs';
import { useEffect } from 'react';
import { useSupabase } from '../hooks/useSupabase';
import { useQuery } from '@tanstack/react-query';
import SEO from '../components/SEO';
import 'leaflet/dist/leaflet.css';

export default function ParkingDetailPage() {
  const { emirate, name } = useParams();
  const { getParking } = useSupabase();

  // Remove -parking-near-me from emirate name if present
  const cleanEmirateName = emirate?.replace(/-parking-near-me$/, '');
  
  const formattedEmirateName = cleanEmirateName?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const { data: parking, isLoading, error } = useQuery({
    queryKey: ['parking', formattedEmirateName, name],
    queryFn: () => getParking(formattedEmirateName!, name!),
    enabled: !!name && !!emirate
  });

  useEffect(() => {
    if (parking) {
      document.title = `${parking.name} - Parking ${formattedEmirateName}`;
    }
  }, [parking, formattedEmirateName]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !parking) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-400 mb-4">Parking spot not found</p>
          <Link 
            to={`/${emirate}`}
            className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-2"
          >
            Return to {formattedEmirateName} parking spots
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${parking.name} - Parking in ${formattedEmirateName} | Location & Rates`}
        description={`Find parking at ${parking.name} in ${formattedEmirateName}. ${parking.description || `Located at ${parking.address}`}. Get directions, rates, and real-time availability information.`}
        canonical={`/${emirate}`}
        type="business.business"
        image={parking.image || `/images/${emirate.toLowerCase()}-parking.jpg`}
      />
      
      <div className="min-h-screen bg-dark-100">
        <section className="bg-dark-200 bg-hero-pattern py-12">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              items={[
                { label: 'Home', path: '/' },
                { label: formattedEmirateName, path: `/${emirate}` },
                { label: parking.name },
              ]}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
              {parking.name}
            </h1>
            <div className="flex items-center gap-2 text-gray-400 mt-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-medium text-white">{parking.rating}</span>
              <span className="text-gray-500">•</span>
              <span>{parking.review_count}</span>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-dark-200 rounded-xl shadow-soft p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">About this parking</h2>
                <p className="text-gray-400 mb-6">
                  Located in {formattedEmirateName}, this parking facility offers convenient access to nearby attractions and businesses.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white">Location</h3>
                      <p className="text-gray-400">{parking.address}</p>
                    </div>
                  </div>

                  {parking.plus_code && (
                    <div className="flex items-start gap-3">
                      <MapPinned className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <h3 className="font-semibold text-white">Plus Code</h3>
                        <p className="text-gray-400">{parking.plus_code}</p>
                      </div>
                    </div>
                  )}

                  {parking.mobile_number && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <h3 className="font-semibold text-white">Contact</h3>
                        <a href={`tel:${parking.mobile_number}`} className="text-primary-400 hover:text-primary-300">
                          {parking.mobile_number}
                        </a>
                      </div>
                    </div>
                  )}

                  {parking.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <h3 className="font-semibold text-white">Website</h3>
                        <a 
                          href={parking.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-400 hover:text-primary-300"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}

                  {parking.social_media && (
                    Object.values(parking.social_media).some(value => value) && (
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 flex justify-center text-gray-400 mt-1">
                          <Star className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">Social Media</h3>
                          <div className="flex gap-4 mt-2">
                            {parking.social_media.facebook && (
                              <a
                                href={parking.social_media.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-400 hover:text-primary-300"
                              >
                                <Facebook className="w-5 h-5" />
                              </a>
                            )}
                            {parking.social_media.instagram && (
                              <a
                                href={parking.social_media.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-400 hover:text-primary-300"
                              >
                                <Instagram className="w-5 h-5" />
                              </a>
                            )}
                            {parking.social_media.linkedin && (
                              <a
                                href={parking.social_media.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-400 hover:text-primary-300"
                              >
                                <Linkedin className="w-5 h-5" />
                              </a>
                            )}
                            {parking.social_media.twitter && (
                              <a
                                href={parking.social_media.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-400 hover:text-primary-300"
                              >
                                <Twitter className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="bg-dark-200 rounded-xl shadow-soft p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Location</h2>
                <div className="h-96 rounded-lg overflow-hidden">
                  <MapContainer
                    center={[parking.latitude, parking.longitude]}
                    zoom={16}
                    className="h-full w-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[parking.latitude, parking.longitude]}>
                      <Popup>{parking.name}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-dark-200 rounded-xl shadow-soft p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4">Parking Details</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400">Type:</span>
                    <span className="ml-2 font-medium text-white">{parking.category}</span>
                  </div>
                  {parking.price_per_hour && (
                    <div>
                      <span className="text-gray-400">Price per hour:</span>
                      <span className="ml-2 text-primary-400 font-medium">
                        {parking.price_per_hour}
                      </span>
                    </div>
                  )}
                  {parking.closing_hours && (
                    <div>
                      <span className="text-gray-400">Hours:</span>
                      <span className="ml-2 font-medium text-white">{parking.closing_hours}</span>
                    </div>
                  )}
                  <button 
                    className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={() => window.open(`https://www.google.com/maps?q=${parking.latitude},${parking.longitude}`)}
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
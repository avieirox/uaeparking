import { Link } from 'react-router-dom';
import { ChevronRight, Home, Map, Building2, Car, FileText, Phone, Shield, Cookie } from 'lucide-react';
import SEO from '../components/SEO';

const cities = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];

export default function SitemapPage() {
  return (
    <>
      <SEO 
        title="Sitemap - UAE Parking Locator"
        description="Browse all pages and parking locations across UAE emirates. Find parking spots in Dubai, Abu Dhabi, Sharjah, and other emirates."
        canonical="/sitemap"
        type="website"
      />
      <div className="min-h-screen bg-dark-100">
        <section className="bg-dark-200 bg-hero-pattern py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
              Sitemap
            </h1>
            <p className="text-gray-400 mt-2">
              Complete overview of our website structure
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Main Pages */}
            <div className="bg-dark-200 rounded-xl p-6 shadow-soft">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Home className="w-5 h-5 text-primary-400" />
                Main Pages
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-primary-400 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/map" className="text-gray-400 hover:text-primary-400 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Interactive Map
                  </Link>
                </li>
              </ul>
            </div>

            {/* Emirates */}
            <div className="bg-dark-200 rounded-xl p-6 shadow-soft">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary-400" />
                Emirates Parking
              </h2>
              <ul className="space-y-3">
                {cities.map((city) => (
                  <li key={city}>
                    <Link 
                      to={`/${city.toLowerCase().replace(/\s+/g, '-')}-parking`}
                      className="text-gray-400 hover:text-primary-400 flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {city} Parking Guide
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="bg-dark-200 rounded-xl p-6 shadow-soft">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-primary-400" />
                Features
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/map" className="text-gray-400 hover:text-primary-400 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Find Parking
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-primary-400 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Parking Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div className="bg-dark-200 rounded-xl p-6 shadow-soft">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-400" />
                Information
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-primary-400 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-primary-400 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="bg-dark-200 rounded-xl p-6 shadow-soft">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-400" />
                Legal
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-primary-400 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-primary-400 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-gray-400 hover:text-primary-400 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-dark-200 rounded-xl p-6 shadow-soft">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary-400" />
                Contact
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-primary-400 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-gray-400 hover:text-primary-400 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
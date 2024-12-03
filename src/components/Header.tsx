import { MapPin, Menu, X, LogIn } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 rounded-lg group-hover:shadow-lg transition-all duration-300">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              UAE Parking Locator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-primary-600">Home</Link>
            <Link to="/map" className="text-gray-600 hover:text-primary-600">Find Parking</Link>
            <Link to="/blog" className="text-gray-600 hover:text-primary-600">Blog</Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary-600">Contact</Link>
            
            {user ? (
              <Link 
                to="/admin/dashboard"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                Admin Panel
              </Link>
            ) : (
              <Link 
                to="/admin/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">Home</Link>
            <Link to="/map" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">Find Parking</Link>
            <Link to="/blog" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">Blog</Link>
            <Link to="/contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">Contact</Link>
            {user ? (
              <Link 
                to="/admin/dashboard"
                className="block px-4 py-2 text-primary-600 hover:bg-gray-50"
              >
                Admin Panel
              </Link>
            ) : (
              <Link 
                to="/admin/login"
                className="block px-4 py-2 text-primary-600 hover:bg-gray-50"
              >
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
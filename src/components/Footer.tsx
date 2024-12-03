import { Facebook, Twitter, Instagram, Mail, Phone, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold text-lg mb-4">About Us</h4>
            <p className="text-sm">
              UAE Parking Locator helps you find the perfect parking spot across major cities
              in the United Arab Emirates.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/map" className="hover:text-white">Find Parking</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/sitemap" className="hover:text-white">Sitemap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Emirates</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dubai" className="hover:text-white">Dubai Parking</Link></li>
              <li><Link to="/abu-dhabi" className="hover:text-white">Abu Dhabi Parking</Link></li>
              <li><Link to="/sharjah" className="hover:text-white">Sharjah Parking</Link></li>
              <li><Link to="/ajman" className="hover:text-white">Ajman Parking</Link></li>
              <li><Link to="/ras-al-khaimah" className="hover:text-white">Ras Al Khaimah Parking</Link></li>
              <li><Link to="/fujairah" className="hover:text-white">Fujairah Parking</Link></li>
              <li><Link to="/umm-al-quwain" className="hover:text-white">Umm Al Quwain Parking</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-white"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white"><Instagram className="w-5 h-5" /></a>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@parkinglocator.ae</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+971 4 123 4567</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          {new Date().getFullYear()} UAE Parking Locator. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
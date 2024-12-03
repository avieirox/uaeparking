import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import ContactPage from './pages/ContactPage';
import DubaiPage from './pages/cities/DubaiPage';
import AbuDhabiPage from './pages/cities/AbuDhabiPage';
import SharjahPage from './pages/cities/SharjahPage';
import AjmanPage from './pages/cities/AjmanPage';
import RasAlKhaimahPage from './pages/cities/RasAlKhaimahPage';
import FujairahPage from './pages/cities/FujairahPage';
import UmmAlQuwainPage from './pages/cities/UmmAlQuwainPage';
import ParkingDetailPage from './pages/ParkingDetailPage';
import SitemapPage from './pages/SitemapPage';
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import DashboardPage from './pages/admin/DashboardPage';
import ParkingManagementPage from './pages/admin/ParkingManagementPage';
import SEOSettingsPage from './pages/admin/SEOSettingsPage';
import SettingsPage from './pages/admin/SettingsPage';

export default function App() {
  return (
    <div className="min-h-screen bg-dark-100">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="parking" element={<ParkingManagementPage />} />
                  <Route path="seo" element={<SEOSettingsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/cookies" element={<CookiePolicyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/dubai" element={<DubaiPage />} />
                  <Route path="/abu-dhabi" element={<AbuDhabiPage />} />
                  <Route path="/sharjah" element={<SharjahPage />} />
                  <Route path="/ajman" element={<AjmanPage />} />
                  <Route path="/ras-al-khaimah" element={<RasAlKhaimahPage />} />
                  <Route path="/fujairah" element={<FujairahPage />} />
                  <Route path="/umm-al-quwain" element={<UmmAlQuwainPage />} />
                  <Route path="/:emirate/:name" element={<ParkingDetailPage />} />
                  <Route path="/sitemap" element={<SitemapPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}
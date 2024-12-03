import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Settings, LogOut, LayoutDashboard, Database, FileEdit } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <div className="min-h-screen bg-dark-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-200 border-r border-dark-300">
        <div className="p-4">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <p className="text-sm text-gray-400 mt-1">{user?.email}</p>
        </div>
        
        <nav className="mt-8">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-dark-300 hover:text-white"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          
          <Link
            to="/admin/parking"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-dark-300 hover:text-white"
          >
            <Database className="w-5 h-5" />
            Parking Data
          </Link>
          
          <Link
            to="/admin/seo"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-dark-300 hover:text-white"
          >
            <FileEdit className="w-5 h-5" />
            SEO Settings
          </Link>
          
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-dark-300 hover:text-white"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
          
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-dark-300 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
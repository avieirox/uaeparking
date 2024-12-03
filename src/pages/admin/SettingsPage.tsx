import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const { useSettings, useUpdateSettings } = useAdmin();
  const { data: settings } = useSettings();
  const { mutate: updateSettings } = useUpdateSettings();

  const [formData, setFormData] = useState({
    siteName: 'UAE Parking Locator',
    contactEmail: 'contact@parkinglocator.ae',
    supportPhone: '+971 4 123 4567'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings({
        key: 'general',
        value: formData
      });
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Error updating settings');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>

      <div className="bg-dark-200 rounded-xl shadow-soft p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Site Name</label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
              className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Contact Email</label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
              className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Support Phone</label>
            <input
              type="tel"
              value={formData.supportPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, supportPhone: e.target.value }))}
              className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
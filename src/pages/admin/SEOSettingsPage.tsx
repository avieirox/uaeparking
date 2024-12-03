import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import toast from 'react-hot-toast';

export default function SEOSettingsPage() {
  const [selectedPage, setSelectedPage] = useState('/');
  const { useMetaData, useUpdateMetaData } = useAdmin();
  
  const { data: metaData } = useMetaData(selectedPage);
  const { mutate: updateMeta } = useUpdateMetaData();

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMeta({
        path: selectedPage,
        title: formData.title,
        description: formData.description
      });
      toast.success('SEO settings updated successfully');
    } catch (error) {
      toast.error('Error updating SEO settings');
    }
  };

  const pages = [
    { path: '/', name: 'Home' },
    { path: '/city/dubai', name: 'Dubai Parking' },
    { path: '/city/abu-dhabi', name: 'Abu Dhabi Parking' },
    { path: '/map', name: 'Interactive Map' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">SEO Settings</h1>

      <div className="bg-dark-200 rounded-xl shadow-soft p-6">
        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Select Page</label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
          >
            {pages.map((page) => (
              <option key={page.path} value={page.path}>
                {page.name}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Meta Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2"
              placeholder="Enter meta title"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Meta Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-dark-300 text-white border border-dark-400 rounded-lg px-4 py-2 h-32"
              placeholder="Enter meta description"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
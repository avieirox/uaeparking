import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Building2, Car, Map, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatsCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
  link?: string;
}

export default function DashboardPage() {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const promises = ['dubai', 'abudhabi'].map(async (city) => {
        const { count } = await supabase
          .from(`parking_${city}`)
          .select('*', { count: 'exact', head: true });
        return { city, count };
      });

      const results = await Promise.all(promises);
      return results.reduce((acc, { city, count }) => {
        acc[city] = count;
        return acc;
      }, {} as Record<string, number>);
    }
  });

  const statsCards: StatsCard[] = [
    {
      title: 'Total Cities',
      value: '7',
      icon: <Building2 className="w-6 h-6 text-emerald-500" />,
      description: 'Major UAE cities covered'
    },
    {
      title: 'Dubai Parkings',
      value: stats?.dubai || 0,
      icon: <Car className="w-6 h-6 text-blue-500" />,
      description: 'Manage Dubai parking locations',
      link: '/admin/parking?city=dubai'
    },
    {
      title: 'Abu Dhabi Parkings',
      value: stats?.abudhabi || 0,
      icon: <Map className="w-6 h-6 text-purple-500" />,
      description: 'Manage Abu Dhabi parking locations',
      link: '/admin/parking?city=abudhabi'
    },
    {
      title: 'Total Users',
      value: '2.5k+',
      icon: <Users className="w-6 h-6 text-pink-500" />,
      description: 'Monthly active users'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card) => (
          <div key={card.title} className="bg-dark-200 rounded-xl p-6 shadow-soft hover:shadow-neon transition-all duration-300">
            {card.link ? (
              <Link to={card.link} className="block">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-dark-300 rounded-lg p-3">
                    {card.icon}
                  </div>
                  <span className="text-2xl font-bold text-white">{card.value}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{card.title}</h3>
                <p className="text-sm text-gray-400">{card.description}</p>
              </Link>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-dark-300 rounded-lg p-3">
                    {card.icon}
                  </div>
                  <span className="text-2xl font-bold text-white">{card.value}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{card.title}</h3>
                <p className="text-sm text-gray-400">{card.description}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
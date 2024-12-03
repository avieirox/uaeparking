import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
}

export default function SearchBar({ onSearch, onFilter }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 p-4 bg-white shadow-lg">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search for parking spots..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      <button
        onClick={onFilter}
        className="p-2 rounded-lg border hover:bg-gray-50"
      >
        <Filter className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
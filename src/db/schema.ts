// Table names exactly as they exist in the database
export const PARKING_TABLES = {
  DUBAI: 'parking_dubai',
  ABU_DHABI: 'parking_abudhabi', // Fixed casing
  SHARJAH: 'parking_sharjah',
  AJMAN: 'parking_ajman',
  RAS_AL_KHAIMAH: 'parking_ras_al_khaimah',
  FUJAIRAH: 'parking_fujairah',
  UMM_AL_QUWAIN: 'parking_umm_al_quwain'
} as const;

// Helper to get the correct table name for a city
export const getTableName = (city: string): string => {
  const cityMapping: Record<string, string> = {
    'dubai': PARKING_TABLES.DUBAI,
    'abu dhabi': PARKING_TABLES.ABU_DHABI,
    'sharjah': PARKING_TABLES.SHARJAH,
    'ajman': PARKING_TABLES.AJMAN,
    'ras al khaimah': PARKING_TABLES.RAS_AL_KHAIMAH,
    'fujairah': PARKING_TABLES.FUJAIRAH,
    'umm al quwain': PARKING_TABLES.UMM_AL_QUWAIN
  };

  const normalizedCity = city.toLowerCase().trim();
  const tableName = cityMapping[normalizedCity];
  
  if (!tableName) {
    console.warn(`No table mapping found for city: ${city}`);
    return PARKING_TABLES.DUBAI;
  }
  
  return tableName;
};

// List of all available cities
export const CITIES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain'
] as const;

// Type for city names
export type CityName = typeof CITIES[number];

// Helper to format city name for URLs
export const formatCityUrl = (city: string): string => {
  return city.toLowerCase().replace(/\s+/g, '-');
};

// Helper to format city name for display
export const formatCityDisplay = (city: string): string => {
  return city.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};
-- Drop existing table if exists
DROP TABLE IF EXISTS parking_dubai;

-- Create the parking_dubai table
CREATE TABLE parking_dubai (
    id SERIAL PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(20),
    review_count VARCHAR(50),
    rating DECIMAL(3, 2),
    category VARCHAR(150),
    address TEXT,
    website VARCHAR(500),
    email_id VARCHAR(255),
    plus_code VARCHAR(100),
    closing_hours VARCHAR(100),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    instagram_profile VARCHAR(255),
    facebook_profile VARCHAR(255),
    linkedin_profile VARCHAR(255),
    twitter_profile VARCHAR(255),
    image_name VARCHAR(255),
    images_folder TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_parking_dubai_name ON parking_dubai(name);
CREATE INDEX idx_parking_dubai_city ON parking_dubai(city);
CREATE INDEX idx_parking_dubai_rating ON parking_dubai(rating);
CREATE INDEX idx_parking_dubai_category ON parking_dubai(category);

-- Enable RLS (Row Level Security)
ALTER TABLE parking_dubai ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous read access
CREATE POLICY "Enable read access for all users" ON parking_dubai
    FOR SELECT USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_parking_dubai_updated_at
    BEFORE UPDATE ON parking_dubai
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
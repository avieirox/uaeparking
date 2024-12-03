-- Create auth schema and enable RLS
CREATE SCHEMA IF NOT EXISTS auth;

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Enable admin access" ON admin_users
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM admin_users WHERE email = 'n0ses@be'
  ));

-- Insert default admin
INSERT INTO admin_users (email, role)
VALUES ('n0ses@be', 'superadmin')
ON CONFLICT (email) DO NOTHING;

-- Create meta_data table for SEO
CREATE TABLE IF NOT EXISTS meta_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT UNIQUE NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on meta_data
ALTER TABLE meta_data ENABLE ROW LEVEL SECURITY;

-- Create policies for meta_data
CREATE POLICY "Allow public read access" ON meta_data
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write access" ON meta_data
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM admin_users WHERE role = 'superadmin'
  ));

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on settings
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for settings
CREATE POLICY "Allow public read access" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write access" ON settings
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM admin_users WHERE role = 'superadmin'
  ));
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hvevmofmkdspwfpajjie.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2ZXZtb2Zta2RzcHdmcGFqamllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NDI3ODksImV4cCI6MjA0ODExODc4OX0.XOkT-IyzPb3bZjJJYfhAMUcAkx_YZKxwpz7KA5bK69I";
const supabase = createClient(supabaseUrl, supabaseKey);

async function initDatabase() {
  try {
    // Create meta_data table for SEO and site settings
    const { error: metaError } = await supabase.rpc('create_meta_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS meta_data (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          page_path TEXT NOT NULL UNIQUE,
          meta_title TEXT,
          meta_description TEXT,
          created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
        );

        -- Enable RLS
        ALTER TABLE meta_data ENABLE ROW LEVEL SECURITY;

        -- Create policies
        CREATE POLICY "Allow anonymous read access" ON meta_data
          FOR SELECT TO anon USING (true);

        CREATE POLICY "Allow authenticated full access" ON meta_data
          FOR ALL TO authenticated USING (true);
      `
    });

    if (metaError) {
      console.error('Error creating meta_data table:', metaError);
      return;
    }

    // Create admin_settings table
    const { error: settingsError } = await supabase.rpc('create_settings_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS admin_settings (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          setting_key TEXT NOT NULL UNIQUE,
          setting_value JSONB NOT NULL DEFAULT '{}'::jsonb,
          created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
        );

        -- Enable RLS
        ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

        -- Create policies
        CREATE POLICY "Allow anonymous read access" ON admin_settings
          FOR SELECT TO anon USING (true);

        CREATE POLICY "Allow authenticated full access" ON admin_settings
          FOR ALL TO authenticated USING (true);
      `
    });

    if (settingsError) {
      console.error('Error creating admin_settings table:', settingsError);
      return;
    }

    // Insert default meta data
    const { error: insertError } = await supabase
      .from('meta_data')
      .upsert([
        {
          page_path: '/',
          meta_title: 'UAE Parking Locator - Find Perfect Parking Spots',
          meta_description: 'Find and compare parking spots across major UAE cities. Real-time availability, rates, and directions for hassle-free parking.'
        },
        {
          page_path: '/city/dubai',
          meta_title: 'Dubai Parking Spots - UAE Parking Locator',
          meta_description: 'Discover parking locations in Dubai. Compare rates, check availability, and get directions to parking spots across Dubai.'
        },
        {
          page_path: '/city/abu-dhabi',
          meta_title: 'Abu Dhabi Parking Spots - UAE Parking Locator',
          meta_description: 'Find parking in Abu Dhabi. View rates, availability, and directions to parking locations throughout Abu Dhabi.'
        }
      ], { onConflict: 'page_path' });

    if (insertError) {
      console.error('Error inserting default meta data:', insertError);
      return;
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase().catch(console.error);
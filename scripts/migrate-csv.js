import { createClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const supabaseUrl = "https://hvevmofmkdspwfpajjie.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2ZXZtb2Zta2RzcHdmcGFqamllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NDI3ODksImV4cCI6MjA0ODExODc4OX0.XOkT-IyzPb3bZjJJYfhAMUcAkx_YZKxwpz7KA5bK69I";
const supabase = createClient(supabaseUrl, supabaseKey);

async function processDubaiFile() {
  console.log('Processing Dubai...');
  
  try {
    // Limpiar la tabla existente
    const { error: deleteError } = await supabase
      .from('parking_dubai')
      .delete()
      .not('id', 'is', null);

    if (deleteError) {
      console.error('Error cleaning table:', deleteError);
      return;
    }

    const fileContent = fs.readFileSync(
      path.join(__dirname, '../data/dubai.csv'), 
      { encoding: 'utf-8' }
    );

    const records = await new Promise((resolve, reject) => {
      parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relaxColumnCount: true
      }, (err, records) => {
        if (err) reject(err);
        else resolve(records);
      });
    });

    const validRecords = records
      .filter(record => record.Name?.trim() && record.Address?.trim())
      .map((record, index) => ({
        id: index + 1,
        city: 'Dubai',
        name: record.Name.trim(),
        mobile_number: record['Mobile Number']?.trim() || null,
        review_count: record['Review Count']?.trim() || '0 reviews',
        rating: record.Rating ? parseFloat(record.Rating) : 0,
        category: record.Catagory?.trim() || 'Parking lot',
        address: record.Address.trim(),
        website: record.Website?.trim() || null,
        email_id: record['Email Id']?.trim() || null,
        plus_code: record.PlusCode?.trim() || null,
        closing_hours: record['Closing Hours']?.trim() || null,
        latitude: record.latitude ? parseFloat(record.latitude) : 0,
        longitude: record.longitude ? parseFloat(record.longitude) : 0,
        instagram_profile: record['Instagram Profile']?.trim() || null,
        facebook_profile: record['Facebook Profile']?.trim() || null,
        linkedin_profile: record['Linkedin Profile']?.trim() || null,
        twitter_profile: record['Twitter Profile']?.trim() || null,
        image_name: record['Image Name']?.trim() || 'default-parking.png',
        images_folder: record['Images Folder']?.trim() || null,
        price_per_hour: 'Contact for price'
      }));

    console.log(`Found ${validRecords.length} valid records`);

    if (validRecords.length === 0) {
      console.error('No valid records found to insert');
      return;
    }

    // Insertar registros en lotes de 100
    const batchSize = 100;
    for (let i = 0; i < validRecords.length; i += batchSize) {
      const batch = validRecords.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from('parking_dubai')
        .insert(batch);

      if (insertError) {
        console.error(`Error inserting batch ${i/batchSize + 1}:`, insertError);
      } else {
        console.log(`Successfully inserted batch ${i/batchSize + 1} of ${Math.ceil(validRecords.length/batchSize)}`);
      }
    }

    console.log('Migration completed successfully');
  } catch (err) {
    console.error('Error processing Dubai file:', err);
  }
}

// Ejecutar migración
processDubaiFile().catch(console.error);
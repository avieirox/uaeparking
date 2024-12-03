import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hvevmofmkdspwfpajjie.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2ZXZtb2Zta2RzcHdmcGFqamllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NDI3ODksImV4cCI6MjA0ODExODc4OX0.XOkT-IyzPb3bZjJJYfhAMUcAkx_YZKxwpz7KA5bK69I";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
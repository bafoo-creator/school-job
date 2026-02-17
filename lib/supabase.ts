
import { createClient } from '@supabase/supabase-js';

// Ces variables doivent être définies dans Netlify (Environment Variables)
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Database functionality will be limited.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

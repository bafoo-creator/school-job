
import { createClient } from '@supabase/supabase-js';

// Récupération des variables d'environnement injectées par Vite
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

/**
 * On n'initialise le client que si les identifiants sont présents.
 * Cela évite l'erreur "supabaseUrl is required" au chargement.
 */
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl !== '') 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!supabase) {
  console.warn(
    "Identifiants Supabase manquants. " +
    "Veuillez configurer SUPABASE_URL et SUPABASE_ANON_KEY dans vos variables d'environnement Netlify."
  );
}
